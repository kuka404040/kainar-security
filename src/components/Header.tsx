import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { useState } from 'react';
import { clsx } from 'clsx';
import { KainarLogo } from './KainarLogo';
import { useLanguage, Language } from '../context/LanguageContext';

const navLinks = [
  { path: '/', key: 'nav.home' },
  { path: '/report', key: 'nav.report' },
  { path: '/road-safety', key: 'nav.roadSafety' },
  { path: '/evacuation', key: 'nav.evacuation' },
  { path: '/emergency', key: 'nav.emergency' },
  { path: '/memos', key: 'nav.memos' },
  { path: '/game', key: 'nav.game' },
  { path: '/cctv', key: 'nav.cctv' },
  { path: '/contacts', key: 'nav.contacts' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { lang, setLang, t } = useLanguage();

  const handleLangChange = (newLang: Language) => {
    setLang(newLang);
  };

  return (
    <header className="bg-slate-900 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-3">
            <KainarLogo className="w-12 h-12 shrink-0" />
            <div>
              <h1 className="text-lg md:text-xl font-black tracking-tight leading-none uppercase">
                {t('header.title')}
              </h1>
              <p className="text-xs text-blue-400 font-bold uppercase tracking-wider mt-1">
                {t('header.subtitle')}
              </p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={clsx(
                  'px-2.5 py-2 rounded-xl text-xs font-bold transition-all',
                  location.pathname === link.path
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                )}
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>

          {/* Language Selector (Desktop) */}
          <div className="hidden xl:flex items-center gap-1.5 bg-slate-800/80 p-1.5 rounded-2xl border border-slate-700/60 shadow-inner">
            <Globe className="w-3.5 h-3.5 text-slate-400 mx-1" />
            {(['kk', 'ru', 'en'] as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => handleLangChange(l)}
                className={clsx(
                  'px-2.5 py-1 text-[11px] font-black tracking-wide rounded-lg uppercase transition-all cursor-pointer',
                  lang === l
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-700'
                )}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="xl:hidden flex items-center gap-3">
            {/* Language Selector (Mobile Quick Selector) */}
            <div className="flex items-center bg-slate-800/80 p-1 rounded-xl border border-slate-700/50">
              {(['kk', 'ru', 'en'] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => handleLangChange(l)}
                  className={clsx(
                    'px-2 py-0.5 text-[10px] font-black rounded-md uppercase transition-all cursor-pointer',
                    lang === l ? 'bg-blue-600 text-white' : 'text-slate-400'
                  )}
                >
                  {l}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-white focus:outline-none p-1"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="xl:hidden bg-slate-850 border-t border-slate-800">
          <div className="px-3 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={clsx(
                  'block px-4 py-2.5 rounded-xl text-sm font-bold transition-all',
                  location.pathname === link.path
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                )}
              >
                {t(link.key)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
