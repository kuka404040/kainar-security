import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import { createClient, type Client, type InArgs } from '@libsql/client';
import { createHash, timingSafeEqual } from 'node:crypto';
import { projectFilesList } from '../src/assets/projects/projectData.js';
import { emergencyProjectFilesList } from '../src/assets/projects/emergencyProjectData.js';
import { convertTextToWordHtml } from '../src/utils/wordGenerator.js';

/**
 * Единый бэкенд портала.
 *  - На Vercel: запускается как serverless-функция (vercel.json перенаправляет /api/* сюда).
 *  - Локально: его подключает server.ts.
 *
 * База данных — Turso (libSQL, тот же SQLite, но в облаке).
 * Переменные окружения: TURSO_DATABASE_URL, TURSO_AUTH_TOKEN, ADMIN_PASSWORD.
 */

// ---------- База данных ----------
const onVercel = !!process.env.VERCEL;
const dbUrl = process.env.TURSO_DATABASE_URL || (onVercel ? '' : 'file:database.sqlite');

let client: Client | null = null;
let schemaReady: Promise<void> | null = null;

function getClient(): Client {
  if (!dbUrl) throw new Error('TURSO_DATABASE_URL не задан в Environment Variables');
  if (!client) client = createClient({ url: dbUrl, authToken: process.env.TURSO_AUTH_TOKEN });
  return client;
}

function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = getClient()
      .batch(
        [
          `CREATE TABLE IF NOT EXISTS incidents (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT, group_name TEXT, type TEXT, location TEXT,
            description TEXT, media_url TEXT, datetime TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
          )`,
          `CREATE TABLE IF NOT EXISTS sos_alerts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            location TEXT,
            status TEXT DEFAULT 'Белсенді',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
          )`,
          `CREATE TABLE IF NOT EXISTS safety_rules_downloads (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT, group_name TEXT, ticket_number TEXT, language TEXT, sign_date TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
          )`,
          `CREATE TABLE IF NOT EXISTS dynamic_images (key TEXT PRIMARY KEY, value TEXT)`,
        ],
        'write'
      )
      .then(() => undefined)
      .catch((e) => {
        schemaReady = null; // повторить попытку при следующем запросе
        throw e;
      });
  }
  return schemaReady;
}

type Row = Record<string, any>;

async function query(sql: string, args: InArgs = []) {
  await ensureSchema();
  const rs = await getClient().execute({ sql, args });
  const rows: Row[] = rs.rows.map((r) => Object.fromEntries(rs.columns.map((c, i) => [c, r[i]])));
  return { rows, lastInsertRowid: rs.lastInsertRowid !== undefined ? Number(rs.lastInsertRowid) : undefined };
}

// ---------- Вспомогательное ----------
const str = (v: unknown, max: number) => String(v ?? '').slice(0, max);

const wrap =
  (fn: (req: Request, res: Response) => Promise<unknown>) =>
  (req: Request, res: Response) => {
    fn(req, res).catch((e) => {
      console.error(`[API ${req.method} ${req.path}]`, e);
      res.status(500).json({ error: 'Server error', detail: String(e?.message ?? e) });
    });
  };

const sha = (s: string) => createHash('sha256').update(s).digest();

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    return res.status(503).json({ error: 'ADMIN_PASSWORD не задан в Environment Variables' });
  }
  const given = String(req.header('x-admin-password') ?? '');
  if (!timingSafeEqual(sha(given), sha(expected))) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

const parseId = (v: unknown) => {
  const n = Number(v);
  return Number.isInteger(n) && n > 0 ? n : null;
};

// ---------- Приложение ----------
const app = express();
app.use(express.json({ limit: '4mb' }));

// Админские данные не должны кэшироваться ни браузером, ни Vercel CDN
app.use('/api', (_req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});

app.get('/api/health', wrap(async (_req, res) => {
  await query('SELECT 1');
  res.json({ status: 'ok', db: 'ok' });
}));

// --- Админ: проверка пароля ---
app.get('/api/admin/check', requireAdmin, (_req, res) => res.json({ ok: true }));

// --- SOS ---
app.post('/api/sos', wrap(async (req, res) => {
  const location = str(req.body?.location, 200) || 'Басты ғимарат / Барлық блоктар';
  const r = await query('INSERT INTO sos_alerts (location, status) VALUES (?, ?)', [location, 'Белсенді']);
  res.json({ success: true, id: r.lastInsertRowid });
}));

app.get('/api/sos', requireAdmin, wrap(async (_req, res) => {
  const r = await query('SELECT * FROM sos_alerts ORDER BY created_at DESC, id DESC');
  res.json(r.rows);
}));

app.post('/api/sos/:id/resolve', requireAdmin, wrap(async (req, res) => {
  const id = parseId(req.params.id);
  if (!id) return res.status(400).json({ error: 'Bad id' });
  await query("UPDATE sos_alerts SET status = 'Қаралды / Орындалды' WHERE id = ?", [id]);
  res.json({ success: true });
}));

app.delete('/api/sos/:id', requireAdmin, wrap(async (req, res) => {
  const id = parseId(req.params.id);
  if (!id) return res.status(400).json({ error: 'Bad id' });
  await query('DELETE FROM sos_alerts WHERE id = ?', [id]);
  res.json({ success: true });
}));

// --- Оқиғалар (ЧС) ---
app.post('/api/incidents', wrap(async (req, res) => {
  const b = req.body ?? {};
  const r = await query(
    'INSERT INTO incidents (name, group_name, type, location, description, media_url, datetime) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [
      str(b.name, 200),
      str(b.group_name, 200),
      str(b.type, 100),
      str(b.location, 300),
      str(b.description, 5000),
      str(b.media_url, 2000),
      str(b.datetime, 50),
    ]
  );
  res.json({ success: true, id: r.lastInsertRowid });
}));

app.get('/api/incidents', requireAdmin, wrap(async (_req, res) => {
  const r = await query('SELECT * FROM incidents ORDER BY created_at DESC, id DESC');
  res.json(r.rows);
}));

// --- Журнал скачивания правил ---
app.post('/api/safety-rules-download', wrap(async (req, res) => {
  const b = req.body ?? {};
  const name = str(b.name, 200).trim();
  const group = str(b.group_name, 200).trim();
  if (!name || !group) {
    return res.status(400).json({ error: 'Аты-жөні мен оқу тобын толтыру міндетті!' });
  }
  const r = await query(
    'INSERT INTO safety_rules_downloads (name, group_name, ticket_number, language, sign_date) VALUES (?, ?, ?, ?, ?)',
    [
      name,
      group,
      str(b.ticket_number, 100).trim() || '-',
      str(b.language, 10) || 'kk',
      str(b.sign_date, 20) || new Date().toISOString().split('T')[0],
    ]
  );
  res.json({ success: true, id: r.lastInsertRowid });
}));

app.get('/api/safety-rules-downloads', requireAdmin, wrap(async (_req, res) => {
  const r = await query('SELECT * FROM safety_rules_downloads ORDER BY created_at DESC, id DESC');
  res.json(r.rows);
}));

app.delete('/api/safety-rules-downloads/:id', requireAdmin, wrap(async (req, res) => {
  const id = parseId(req.params.id);
  if (!id) return res.status(400).json({ error: 'Bad id' });
  await query('DELETE FROM safety_rules_downloads WHERE id = ?', [id]);
  res.json({ success: true });
}));

// --- Статистика ---
app.get('/api/stats', requireAdmin, wrap(async (_req, res) => {
  const [inc, sos, dl, types] = await Promise.all([
    query('SELECT COUNT(*) AS count FROM incidents'),
    query('SELECT COUNT(*) AS count FROM sos_alerts'),
    query('SELECT COUNT(*) AS count FROM safety_rules_downloads'),
    query('SELECT type, COUNT(*) AS count FROM incidents GROUP BY type'),
  ]);
  res.json({
    totalIncidents: Number(inc.rows[0].count),
    totalSos: Number(sos.rows[0].count),
    totalSafetyDownloads: Number(dl.rows[0].count),
    types: types.rows.map((t) => ({ type: t.type, count: Number(t.count) })),
  });
}));

// --- Динамические изображения ---
app.get('/api/images', wrap(async (_req, res) => {
  const r = await query('SELECT key, value FROM dynamic_images');
  const images: Record<string, string> = {};
  r.rows.forEach((row) => (images[row.key] = row.value));
  res.json(images);
}));

app.post('/api/images', requireAdmin, wrap(async (req, res) => {
  const key = str(req.body?.key, 200);
  if (!key) return res.status(400).json({ error: 'key required' });
  await query('INSERT OR REPLACE INTO dynamic_images (key, value) VALUES (?, ?)', [key, str(req.body?.value, 3_000_000)]);
  res.json({ success: true });
}));

app.delete('/api/images/:key', requireAdmin, wrap(async (req, res) => {
  await query('DELETE FROM dynamic_images WHERE key = ?', [req.params.key]);
  res.json({ success: true });
}));

// --- Скачивание документов проекта (данные лежат в коде, БД не нужна) ---
app.get('/api/download-project-file', (req, res) => {
  const { category, id } = req.query;
  if (!category || !id) return res.status(400).json({ error: 'Параметрлер жеткіліксіз.' });

  try {
    const list = category === 'road_safety' ? projectFilesList : emergencyProjectFilesList;
    const file = list.find((f) => f.id === id);
    if (!file) return res.status(404).json({ error: 'Құжат табылмады.' });

    let fileName = file.fileName || `${file.id}.doc`;

    if (file.binaryData) {
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
      res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(fileName)}"`);
      const marker = ';base64,';
      const i = file.binaryData.indexOf(marker);
      const b64 = i !== -1 ? file.binaryData.substring(i + marker.length) : file.binaryData;
      return res.send(Buffer.from(b64, 'base64'));
    }

    if (fileName.endsWith('.docx')) fileName = fileName.replace(/\.docx$/, '.doc');
    res.setHeader('Content-Type', 'application/msword; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(fileName)}"`);
    return res.send(Buffer.from(convertTextToWordHtml(file.title, file.content, file.langName), 'utf-8'));
  } catch (e: any) {
    console.error('[Download error]', e);
    return res.status(500).json({ error: 'Аударып алу қатесі: ' + e.message });
  }
});

// Неизвестные /api/* маршруты — JSON 404 (а не index.html)
app.use('/api', (_req, res) => res.status(404).json({ error: 'Not found' }));

export default app;
