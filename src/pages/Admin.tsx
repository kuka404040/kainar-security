import { useState, useEffect, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, FileText, AlertTriangle, MapPin, Clock, 
  Download, User, Notebook, Calendar, CheckCircle2, 
  Search, Trash2, RefreshCw, Radio, BarChart3, BellRing, Eye
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { adminFetch, getAdminPassword, setAdminPassword } from '../utils/adminApi';

interface SafetyDownload {
  id: number;
  name: string;
  group_name: string;
  ticket_number: string;
  language: string;
  sign_date: string;
  created_at: string;
}

interface SosAlert {
  id: number;
  location: string;
  status: string;
  created_at: string;
}

interface Incident {
  id: number;
  name: string;
  group_name: string;
  type: string;
  location: string;
  description: string;
  media_url: string;
  datetime: string;
  created_at: string;
}

interface Stats {
  totalIncidents: number;
  totalSos: number;
  totalSafetyDownloads: number;
  types: { type: string; count: number }[];
}

const textDict = {
  kk: {
    title: "Әкімшілік Басқару Панелі",
    subtitle: "Қауіпсіздік ережелерін жүктеу мониторингі және жедел дабыл (SOS) журналдары",
    role: "Бас Администратор",
    tabDownloads: "Ережелерді жүктегендер",
    tabSos: "Дабыл (SOS) журналдары",
    tabIncidents: "Оқиғалар",
    tabStats: "Жалпы Аналитика",
    kpiSos: "Дабыл (SOS) сигналдары",
    kpiDownloads: "Ереже жүктеген студенттер",
    kpiIncidents: "Хабарланған оқиғалар",
    tblId: "№",
    tblStudent: "Студенттің аты-жөні",
    tblGroup: "Оқу тобы / Мамандығы",
    tblTicket: "Билет №",
    tblLang: "Таңдалған тілі",
    tblSignDate: "Қол қойылған күні",
    tblRegistered: "Жүйеге тіркелген уақыты",
    tblStatus: "Мәртебесі",
    tblActions: "Әрекет",
    tblLocation: "Оқиға / Дабыл орны",
    tblAlarmTime: "Дабыл уақыты",
    tblMarkResolved: "Қаралды деп белгілеу",
    tblResolved: "Қаралды / Орындалды",
    tblActive: "Белсенді Дабыл!",
    searchPlaceholder: "Студент аты немесе тобы бойынша іздеу...",
    noDownloads: "Қауіпсіздік ережелерін жүктеген студенттер әлі тіркелмеген.",
    noSos: "Тіркелген дабыл сигналдары жоқ.",
    noIncidents: "Хабарланған оқиғалар жоқ.",
    refreshBtn: "Жаңарту",
    signedStatus: "Ресми танысты (Сандық қол)"
  },
  ru: {
    title: "Панель Управления Администратора",
    subtitle: "Мониторинг скачиваний правил безопасности и журнал экстренной тревоги (SOS)",
    role: "Главный Администратор",
    tabDownloads: "Скачавшие правила",
    tabSos: "Журнал тревоги (SOS)",
    tabIncidents: "Инциденты",
    tabStats: "Аналитика",
    kpiSos: "Сигналы тревоги (SOS)",
    kpiDownloads: "Студентов скачали правила",
    kpiIncidents: "Зарегистрировано происшествий",
    tblId: "№",
    tblStudent: "ФИО Студента",
    tblGroup: "Учебная группа",
    tblTicket: "Билет №",
    tblLang: "Язык документа",
    tblSignDate: "Дата подписания",
    tblRegistered: "Время фиксации",
    tblStatus: "Статус",
    tblActions: "Действие",
    tblLocation: "Локация тревоги",
    tblAlarmTime: "Время срабатывания",
    tblMarkResolved: "Отметить рассмотренным",
    tblResolved: "Рассмотрен / Завершен",
    tblActive: "Активная тревога!",
    searchPlaceholder: "Поиск по ФИО студента или группе...",
    noDownloads: "Студентов, скачавших правила, пока не зафиксировано.",
    noSos: "Зафиксированных сигналов тревоги нет.",
    noIncidents: "Зарегистрированные инциденты отсутствуют.",
    refreshBtn: "Обновить",
    signedStatus: "Официально ознакомлен (Эл. подпись)"
  },
  en: {
    title: "Administrator Control Dashboard",
    subtitle: "Safety rules download compliance registry and emergency alarm (SOS) telemetry",
    role: "Lead Administrator",
    tabDownloads: "Safety Rules Downloads",
    tabSos: "Alarm (SOS) Logs",
    tabIncidents: "Incident Reports",
    tabStats: "Telemetry & Stats",
    kpiSos: "Emergency Alarms",
    kpiDownloads: "Certified Downloads",
    kpiIncidents: "Reported Incidents",
    tblId: "No.",
    tblStudent: "Student Full Name",
    tblGroup: "Class Group",
    tblTicket: "Card ID",
    tblLang: "Language",
    tblSignDate: "Signature Date",
    tblRegistered: "Logged Timestamp",
    tblStatus: "Status",
    tblActions: "Actions",
    tblLocation: "Alarm Spot",
    tblAlarmTime: "Trigger Time",
    tblMarkResolved: "Mark Resolved",
    tblResolved: "Resolved / Secured",
    tblActive: "Active Alarm!",
    searchPlaceholder: "Search by student name or group...",
    noDownloads: "No student compliance records logged yet.",
    noSos: "No emergency alarm logs present.",
    noIncidents: "No incident reports queued.",
    refreshBtn: "Refresh",
    signedStatus: "Formally Signed (Digital)"
  }
};

function AdminPanel() {
  const { lang } = useLanguage();
  const d = textDict[lang] || textDict['kk'];

  const [activeTab, setActiveTab] = useState<'downloads' | 'sos' | 'incidents' | 'stats'>('downloads');
  const [downloads, setDownloads] = useState<SafetyDownload[]>([]);
  const [sosAlerts, setSosAlerts] = useState<SosAlert[]>([]);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchAllData();
  }, [activeTab]);

  const [loadError, setLoadError] = useState('');

  const fetchAllData = async () => {
    setLoading(true);
    setLoadError('');
    try {
      const [downRes, sosRes, incRes, statRes] = await Promise.all([
        adminFetch('/api/safety-rules-downloads'),
        adminFetch('/api/sos'),
        adminFetch('/api/incidents'),
        adminFetch('/api/stats')
      ]);

      const failed = [downRes, sosRes, incRes, statRes].find(r => !r.ok);
      if (failed && failed.status !== 401) {
        setLoadError(`Деректерді жүктеу қатесі (HTTP ${failed.status}). Сервер/дерекқор баптауын тексеріңіз.`);
      }
      if (downRes.ok) setDownloads(await downRes.json());
      if (sosRes.ok) setSosAlerts(await sosRes.json());
      if (incRes.ok) setIncidents(await incRes.json());
      if (statRes.ok) setStats(await statRes.json());
    } catch (e) {
      console.error('Error fetching admin data:', e);
      setLoadError('Серверге қосылу мүмкін болмады.');
    } finally {
      setLoading(false);
    }
  };

  const handleResolveSos = async (id: number) => {
    try {
      await adminFetch(`/api/sos/${id}/resolve`, { method: 'POST' });
      setSosAlerts(prev => prev.map(item => item.id === id ? { ...item, status: 'Қаралды / Орындалды' } : item));
    } catch (e) {
      console.error('Failed to resolve SOS:', e);
    }
  };

  const handleDeleteSos = async (id: number) => {
    if (!confirm('Дабыл жазбасын өшіруді растайсыз ба?')) return;
    try {
      await adminFetch(`/api/sos/${id}`, { method: 'DELETE' });
      setSosAlerts(prev => prev.filter(item => item.id !== id));
    } catch (e) {
      console.error('Failed to delete SOS:', e);
    }
  };

  const handleDeleteDownload = async (id: number) => {
    if (!confirm('Осы жазбаны тізімнен өшіруді растайсыз ба?')) return;
    try {
      await adminFetch(`/api/safety-rules-downloads/${id}`, { method: 'DELETE' });
      setDownloads(prev => prev.filter(item => item.id !== id));
    } catch (e) {
      console.error('Failed to delete download:', e);
    }
  };

  const filteredDownloads = downloads.filter(item => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return item.name?.toLowerCase().includes(q) || item.group_name?.toLowerCase().includes(q) || item.ticket_number?.toLowerCase().includes(q);
  });

  const getLangBadge = (language: string) => {
    if (language === 'ru') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black bg-blue-50 text-blue-700 border border-blue-200">
          🇷🇺 Русский (RU)
        </span>
      );
    }
    if (language === 'en') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black bg-amber-50 text-amber-700 border border-amber-200">
          🇬🇧 English (EN)
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
        🇰🇿 Қазақша (KK)
      </span>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 animate-fade-in"
    >
      {/* Admin Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl flex flex-col md:flex-row justify-between md:items-center gap-6">
        <div>
          <div className="flex items-center gap-2.5 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>{d.role}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">{d.title}</h1>
          <p className="text-slate-400 mt-2 text-sm max-w-2xl font-medium leading-relaxed">
            {d.subtitle}
          </p>
        </div>

        <button
          onClick={fetchAllData}
          disabled={loading}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-extrabold transition-all shadow-md self-start md:self-auto cursor-pointer"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          {d.refreshBtn}
        </button>
      </div>

      {loadError && (
        <div className="rounded-2xl border border-red-200 bg-red-50 text-red-700 px-5 py-4 text-sm font-bold">
          {loadError}
        </div>
      )}

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Total Downloads KPI */}
        <div 
          onClick={() => setActiveTab('downloads')}
          className={`p-6 rounded-3xl border transition-all cursor-pointer ${
            activeTab === 'downloads' 
              ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20 border-indigo-500 scale-[1.02]' 
              : 'bg-white hover:bg-indigo-50/40 border-slate-100 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <span className={`text-xs font-black uppercase tracking-wider ${activeTab === 'downloads' ? 'text-indigo-100' : 'text-slate-500'}`}>
              {d.kpiDownloads}
            </span>
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${activeTab === 'downloads' ? 'bg-white/20 text-white' : 'bg-indigo-100 text-indigo-600'}`}>
              <Download className="w-5 h-5" />
            </div>
          </div>
          <div className="text-4xl font-black">{downloads.length}</div>
          <p className={`text-xs mt-2 font-medium ${activeTab === 'downloads' ? 'text-indigo-200' : 'text-slate-400'}`}>
            Ережелерді жүктеп алған студенттер
          </p>
        </div>

        {/* SOS Alarms KPI */}
        <div 
          onClick={() => setActiveTab('sos')}
          className={`p-6 rounded-3xl border transition-all cursor-pointer ${
            activeTab === 'sos' 
              ? 'bg-red-600 text-white shadow-xl shadow-red-600/20 border-red-500 scale-[1.02]' 
              : 'bg-white hover:bg-red-50/40 border-slate-100 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <span className={`text-xs font-black uppercase tracking-wider ${activeTab === 'sos' ? 'text-red-100' : 'text-slate-500'}`}>
              {d.kpiSos}
            </span>
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${activeTab === 'sos' ? 'bg-white/20 text-white' : 'bg-red-100 text-red-600'}`}>
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="text-4xl font-black">{sosAlerts.length}</div>
          <p className={`text-xs mt-2 font-medium ${activeTab === 'sos' ? 'text-red-200' : 'text-slate-400'}`}>
            Басылған шұғыл дабыл белгілері
          </p>
        </div>

        {/* Incidents KPI */}
        <div 
          onClick={() => setActiveTab('incidents')}
          className={`p-6 rounded-3xl border transition-all cursor-pointer ${
            activeTab === 'incidents' 
              ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/20 border-slate-800 scale-[1.02]' 
              : 'bg-white hover:bg-slate-100 border-slate-100 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <span className={`text-xs font-black uppercase tracking-wider ${activeTab === 'incidents' ? 'text-slate-300' : 'text-slate-500'}`}>
              {d.kpiIncidents}
            </span>
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${activeTab === 'incidents' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-800'}`}>
              <BellRing className="w-5 h-5" />
            </div>
          </div>
          <div className="text-4xl font-black">{incidents.length}</div>
          <p className={`text-xs mt-2 font-medium ${activeTab === 'incidents' ? 'text-slate-300' : 'text-slate-400'}`}>
            Студенттер хабарлаған оқиғалар
          </p>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex flex-wrap gap-3 border-b border-slate-200 pb-4">
        <button
          onClick={() => setActiveTab('downloads')}
          className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === 'downloads'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200/70'
          }`}
        >
          <FileText className="w-4 h-4" />
          {d.tabDownloads} ({downloads.length})
        </button>

        <button
          onClick={() => setActiveTab('sos')}
          className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === 'sos'
              ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200/70'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          {d.tabSos} ({sosAlerts.length})
        </button>

        <button
          onClick={() => setActiveTab('incidents')}
          className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === 'incidents'
              ? 'bg-slate-900 text-white shadow-md shadow-slate-900/20'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200/70'
          }`}
        >
          <BellRing className="w-4 h-4" />
          {d.tabIncidents} ({incidents.length})
        </button>

        <button
          onClick={() => setActiveTab('stats')}
          className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === 'stats'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200/70'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          {d.tabStats}
        </button>
      </div>

      {/* TAB 1: Safety Rules Downloads List */}
      {activeTab === 'downloads' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200/60 shadow-xs">
            <div className="relative flex-1">
              <Search className="w-4.5 h-4.5 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={d.searchPlaceholder}
                className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 rounded-xl py-2 pl-10 pr-4 text-xs font-bold outline-none transition-all"
              />
            </div>
            <div className="text-xs font-bold text-slate-500 px-2 shrink-0">
              Табылды: {filteredDownloads.length} жазба
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[11px] font-black uppercase tracking-wider">
                    <th className="p-4">{d.tblId}</th>
                    <th className="p-4">{d.tblStudent}</th>
                    <th className="p-4">{d.tblGroup}</th>
                    <th className="p-4">{d.tblTicket}</th>
                    <th className="p-4">{d.tblLang}</th>
                    <th className="p-4">{d.tblSignDate}</th>
                    <th className="p-4">{d.tblRegistered}</th>
                    <th className="p-4">{d.tblStatus}</th>
                    <th className="p-4 text-right">{d.tblActions}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-xs text-slate-700">
                  {filteredDownloads.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 text-slate-400 font-mono font-bold">#{item.id}</td>
                      <td className="p-4 font-bold text-slate-900 flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 font-black flex items-center justify-center shrink-0">
                          {item.name?.charAt(0) || 'С'}
                        </div>
                        <span>{item.name}</span>
                      </td>
                      <td className="p-4 text-slate-800 font-semibold">{item.group_name}</td>
                      <td className="p-4 text-slate-500 font-mono">{item.ticket_number || '-'}</td>
                      <td className="p-4">{getLangBadge(item.language)}</td>
                      <td className="p-4 text-slate-600 font-semibold">{item.sign_date || '-'}</td>
                      <td className="p-4 text-slate-500 text-[11px]">
                        {new Date(item.created_at).toLocaleString()}
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          {d.signedStatus}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleDeleteDownload(item.id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                          title="Жазбаны өшіру"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredDownloads.length === 0 && (
                    <tr>
                      <td colSpan={9} className="p-12 text-center text-slate-500 font-bold">
                        {d.noDownloads}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Emergency Alarms (SOS) */}
      {activeTab === 'sos' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sosAlerts.map((alert) => {
              const isActive = alert.status === 'Белсенді';
              return (
                <div 
                  key={alert.id} 
                  className={`bg-white rounded-3xl p-6 shadow-sm border relative overflow-hidden transition-all ${
                    isActive ? 'border-red-300 ring-2 ring-red-400/20' : 'border-slate-200'
                  }`}
                >
                  <div className={`absolute top-0 left-0 w-2.5 h-full ${isActive ? 'bg-red-500' : 'bg-emerald-500'}`} />
                  
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                        isActive ? 'bg-red-50 text-red-600 animate-pulse' : 'bg-emerald-50 text-emerald-600'
                      }`}>
                        <AlertTriangle className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-slate-950 text-base">Шұғыл Дабыл (SOS)</h3>
                        <p className="text-slate-400 text-xs font-mono">ID: #{alert.id}</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleDeleteSos(alert.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                      title="Өшіру"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-3 text-xs font-semibold text-slate-700 bg-slate-50 p-3.5 rounded-2xl mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>{alert.location || 'Басты ғимарат'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="text-slate-600">
                        {new Date(alert.created_at).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 pt-1 border-t border-slate-200">
                      <span className="text-slate-400">Мәртебесі:</span>
                      <span className={`px-2 py-0.5 rounded-md font-bold text-[11px] ${
                        isActive ? 'bg-red-100 text-red-700 animate-pulse' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {alert.status || (isActive ? d.tblActive : d.tblResolved)}
                      </span>
                    </div>
                  </div>

                  {isActive ? (
                    <button
                      onClick={() => handleResolveSos(alert.id)}
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-extrabold cursor-pointer transition-colors shadow-xs"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      {d.tblMarkResolved}
                    </button>
                  ) : (
                    <div className="text-center py-2 text-xs font-bold text-emerald-700 bg-emerald-50 rounded-xl">
                      ✓ {d.tblResolved}
                    </div>
                  )}
                </div>
              );
            })}
            {sosAlerts.length === 0 && (
              <div className="col-span-full bg-white rounded-3xl p-12 text-center text-slate-500 font-bold border border-slate-100">
                {d.noSos}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: Incident Reports */}
      {activeTab === 'incidents' && (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs font-bold uppercase tracking-wider">
                  <th className="p-4">{d.tblId}</th>
                  <th className="p-4">Хабарлаушы</th>
                  <th className="p-4">Топ</th>
                  <th className="p-4">Оқиға түрі</th>
                  <th className="p-4">Орны</th>
                  <th className="p-4">Уақыты</th>
                  <th className="p-4">Сипаттама</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-xs text-slate-700">
                {incidents.map((inc) => (
                  <tr key={inc.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 text-slate-400 font-mono">#{inc.id}</td>
                    <td className="p-4 font-bold text-slate-900">{inc.name}</td>
                    <td className="p-4 text-slate-600">{inc.group_name}</td>
                    <td className="p-4">
                      <span className="bg-indigo-50 text-indigo-750 px-3 py-1 rounded-full text-xs font-bold">
                        {inc.type}
                      </span>
                    </td>
                    <td className="p-4 text-slate-600 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>{inc.location}</span>
                    </td>
                    <td className="p-4 text-slate-500 text-xs">
                      {new Date(inc.datetime).toLocaleString()}
                    </td>
                    <td className="p-4 text-slate-500 max-w-xs truncate" title={inc.description}>
                      {inc.description}
                    </td>
                  </tr>
                ))}
                {incidents.length === 0 && (
                  <tr>
                    <td colSpan={7} className="p-12 text-center text-slate-500 font-bold">
                      {d.noIncidents}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: Overall Stats */}
      {activeTab === 'stats' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 space-y-6">
            <h3 className="text-xl font-extrabold text-slate-950">Жүйелік белсенділік көрсеткіштері</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
                <span className="text-sm font-bold text-slate-700">Ережелерді жүктеген студенттер:</span>
                <span className="text-lg font-black text-indigo-600">{downloads.length}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
                <span className="text-sm font-bold text-slate-700">Тіркелген дабылдар (SOS):</span>
                <span className="text-lg font-black text-red-600">{sosAlerts.length}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
                <span className="text-sm font-bold text-slate-700">Барлық оқиға хабарламалары:</span>
                <span className="text-lg font-black text-slate-900">{incidents.length}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 space-y-6">
            <h3 className="text-xl font-extrabold text-slate-950">Оқиғалар санаттары</h3>
            <div className="space-y-3">
              {stats?.types && stats.types.length > 0 ? (
                stats.types.map((t, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl text-xs font-bold text-slate-700">
                    <span>{t.type}</span>
                    <span className="px-2.5 py-1 bg-indigo-100 text-indigo-800 rounded-lg">{t.count}</span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400">Санаттар бойынша деректер жинақталуда...</p>
              )}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}


export function Admin() {
  const [authed, setAuthed] = useState(() => !!getAdminPassword());
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    const onUnauthorized = () => { setAuthed(false); setError('Құпия сөз қате немесе мерзімі өтті.'); };
    window.addEventListener('admin-unauthorized', onUnauthorized);
    return () => window.removeEventListener('admin-unauthorized', onUnauthorized);
  }, []);

  const login = async (e: FormEvent) => {
    e.preventDefault();
    setChecking(true);
    setError('');
    try {
      const res = await fetch('/api/admin/check', { headers: { 'x-admin-password': pw } });
      if (res.ok) {
        setAdminPassword(pw);
        setAuthed(true);
        setPw('');
      } else if (res.status === 503) {
        setError('Серверде ADMIN_PASSWORD бапталмаған (Vercel → Environment Variables).');
      } else {
        setError('Құпия сөз қате.');
      }
    } catch {
      setError('Серверге қосылу мүмкін болмады.');
    } finally {
      setChecking(false);
    }
  };

  if (!authed) {
    return (
      <div className="max-w-md mx-auto mt-16 bg-white rounded-3xl border border-slate-100 shadow-xl p-8 space-y-5">
        <div className="flex items-center gap-2.5 text-slate-900 font-extrabold text-xl">
          <ShieldCheck className="w-6 h-6 text-emerald-500" />
          Әкімші кіруі
        </div>
        <form onSubmit={login} className="space-y-4">
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="Құпия сөз"
            autoFocus
            className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium"
          />
          {error && <p className="text-red-600 text-sm font-bold">{error}</p>}
          <button
            type="submit"
            disabled={checking || !pw}
            className="w-full px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-sm font-extrabold cursor-pointer"
          >
            {checking ? '...' : 'Кіру'}
          </button>
        </form>
      </div>
    );
  }

  return <AdminPanel />;
}
