// Доступ к админским эндпоинтам: пароль хранится только на время сессии вкладки.
const KEY = 'kainar_admin_pw';

export const getAdminPassword = (): string => {
  try { return sessionStorage.getItem(KEY) || ''; } catch { return ''; }
};
export const setAdminPassword = (pw: string) => {
  try { sessionStorage.setItem(KEY, pw); } catch { /* ignore */ }
};
export const clearAdminPassword = () => {
  try { sessionStorage.removeItem(KEY); } catch { /* ignore */ }
};

export async function adminFetch(input: string, init: RequestInit = {}): Promise<Response> {
  const res = await fetch(input, {
    ...init,
    headers: { ...(init.headers || {}), 'x-admin-password': getAdminPassword() },
  });
  if (res.status === 401) {
    clearAdminPassword();
    window.dispatchEvent(new Event('admin-unauthorized'));
  }
  return res;
}
