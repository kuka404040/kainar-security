import { AlertTriangle, Bell, PhoneCall, Map, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useState } from 'react';
import { KainarLogo } from '../components/KainarLogo';
import { useLanguage } from '../context/LanguageContext';

export function Home() {
  const [sosActive, setSosActive] = useState(false);
  const { t } = useLanguage();

  const handleSos = async () => {
    if (confirm(t('home.sos.confirm'))) {
      setSosActive(true);
      try {
        const res = await fetch('/api/sos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ location: 'Басты ғимарат' }),
        });
        if (!res.ok) throw new Error(`SOS failed: HTTP ${res.status}`);
        alert(t('home.sos.sent'));
      } catch (error) {
        console.error(error);
        alert('⚠️ Дабыл жіберілмеді! Қайталап көріңіз немесе дереу 112 нөміріне қоңырау шалыңыз.\n⚠️ Сигнал не отправлен! Повторите попытку или сразу звоните 112.');
      }
      setTimeout(() => setSosActive(false), 5000);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-12 animate-fade-in"
    >
      {/* Hero Banner */}
      <section className="relative rounded-3xl overflow-hidden bg-slate-900 text-white shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-slate-900/90 mix-blend-multiply z-10" />
        <img 
          src="https://picsum.photos/seed/college/1920/600" 
          alt="College Campus" 
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="relative z-20 px-8 py-24 sm:px-16 sm:py-32 flex flex-col items-center text-center">
          <div className="bg-white rounded-full p-2 mb-6 shadow-2xl">
            <KainarLogo className="w-24 h-24" />
          </div>
          <h1 className="text-3xl sm:text-6xl font-extrabold tracking-tight mb-6 max-w-4xl leading-tight">
            {t('home.hero.title')}
          </h1>
          <p className="text-lg sm:text-xl text-slate-200 max-w-3xl font-medium">
            {t('home.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* SOS Button */}
      <section className="flex justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSos}
          className={`relative group overflow-hidden rounded-full w-64 h-64 flex flex-col items-center justify-center shadow-2xl transition-colors ${
            sosActive ? 'bg-red-750 animate-pulse' : 'bg-red-600 hover:bg-red-500'
          }`}
        >
          <div className="absolute inset-0 rounded-full border-4 border-red-400/30 group-hover:animate-ping" />
          <AlertTriangle className="w-24 h-24 text-white mb-4 animate-bounce" />
          <span className="text-white font-black text-3xl uppercase tracking-widest">{t('home.sos.title')}</span>
          <span className="text-red-100 text-xs mt-2 font-black uppercase tracking-wider">{t('home.sos.btn_text')}</span>
        </motion.button>
      </section>

      {/* Quick Actions */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/report" className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all border border-slate-100 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">{t('home.action.report.title')}</h3>
          <p className="text-slate-500 text-sm">{t('home.action.report.desc')}</p>
        </Link>
        
        <Link to="/notifications" className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all border border-slate-100 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Bell className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">{t('home.action.notif.title')}</h3>
          <p className="text-slate-500 text-sm">{t('home.action.notif.desc')}</p>
        </Link>

        <Link to="/contacts" className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all border border-slate-100 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <PhoneCall className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">{t('home.action.contacts.title')}</h3>
          <p className="text-slate-500 text-sm">{t('home.action.contacts.desc')}</p>
        </Link>
      </section>

      {/* Key Features */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-900 rounded-3xl p-10 text-white relative overflow-hidden shadow-sm group">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Map className="w-48 h-48" />
          </div>
          <h3 className="text-2xl font-bold mb-4 relative z-10">{t('home.feat.map.title')}</h3>
          <p className="text-slate-400 mb-8 relative z-10 max-w-md text-sm leading-relaxed">
            {t('home.feat.map.desc')}
          </p>
          <Link to="/road-safety" className="inline-flex items-center text-blue-400 font-bold hover:text-blue-300 relative z-10 uppercase text-xs tracking-wider">
            {t('home.feat.map.btn')}
          </Link>
        </div>

        <div className="bg-blue-600 rounded-3xl p-10 text-white relative overflow-hidden shadow-sm group">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Activity className="w-48 h-48" />
          </div>
          <h3 className="text-2xl font-bold mb-4 relative z-10">{t('home.feat.quiz.title')}</h3>
          <p className="text-blue-100 mb-8 relative z-10 max-w-md text-sm leading-relaxed">
            {t('home.feat.quiz.desc')}
          </p>
          <Link to="/game" className="inline-flex items-center text-white font-bold hover:text-blue-100 relative z-10 uppercase text-xs tracking-wider">
            {t('home.feat.quiz.btn')}
          </Link>
        </div>
      </section>
    </motion.div>
  );
}
