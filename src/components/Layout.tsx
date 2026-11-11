import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { useLanguage } from '../context/LanguageContext';

export function Layout() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      <Header />
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      <footer className="bg-slate-900 text-slate-400 py-8 text-center border-t border-slate-800">
        <p className="text-sm">{t('footer.rights')}</p>
      </footer>
    </div>
  );
}
