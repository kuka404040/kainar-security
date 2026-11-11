import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Camera, MapPin, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function Report() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    group_name: '',
    type: 'Төбелес',
    location: '',
    description: '',
    media_url: '',
    datetime: new Date().toISOString().slice(0, 16),
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('/api/incidents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus('success');
        setFormData({
          name: '',
          group_name: '',
          type: 'Төбелес',
          location: '',
          description: '',
          media_url: '',
          datetime: new Date().toISOString().slice(0, 16),
        });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto animate-fade-in"
    >
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        <div className="bg-slate-900 p-8 text-white text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-3xl font-extrabold mb-2">{t('report.header')}</h2>
          <p className="text-slate-400 font-medium">{t('report.subheader')}</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {status === 'success' && (
            <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl border border-emerald-200 flex items-center">
              <span className="font-semibold">{t('report.success')}</span>
            </div>
          )}
          {status === 'error' && (
            <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 flex items-center">
              <span className="font-semibold">{t('report.error')}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-700 uppercase tracking-wider">{t('report.label.name')}</label>
              <input
                required
                type="text"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder={t('report.placeholder.name')}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-700 uppercase tracking-wider">{t('report.label.group')}</label>
              <input
                required
                type="text"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder={t('report.placeholder.group')}
                value={formData.group_name}
                onChange={(e) => setFormData({ ...formData, group_name: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-700 uppercase tracking-wider">{t('report.label.type')}</label>
            <select
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white font-medium"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              <option value="Төбелес">{t('report.type.fight')}</option>
              <option value="Өрт">{t('report.type.fire')}</option>
              <option value="Медициналық көмек">{t('report.type.medical')}</option>
              <option value="Күдікті зат">{t('report.type.suspicious')}</option>
              <option value="Бұзушылық">{t('report.type.violation')}</option>
              <option value="Басқа">{t('report.type.other')}</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-700 uppercase tracking-wider">{t('report.label.location')}</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
              <input
                required
                type="text"
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder={t('report.placeholder.location')}
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-700 uppercase tracking-wider">{t('report.label.datetime')}</label>
            <input
              required
              type="datetime-local"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={formData.datetime}
              onChange={(e) => setFormData({ ...formData, datetime: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-700 uppercase tracking-wider">{t('report.label.description')}</label>
            <textarea
              required
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              placeholder={t('report.placeholder.description')}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-700 uppercase tracking-wider">{t('report.label.media')}</label>
            <div className="relative">
              <Camera className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
              <input
                type="url"
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder={t('report.placeholder.media')}
                value={formData.media_url}
                onChange={(e) => setFormData({ ...formData, media_url: e.target.value })}
              />
            </div>
            <p className="text-xs text-slate-500 mt-1">{t('report.hint.media')}</p>
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-md"
          >
            {status === 'submitting' ? (
              <span className="animate-pulse">{t('report.btn.submitting')}</span>
            ) : (
              <>
                <Send className="w-5 h-5 animate-pulse" />
                {t('report.btn.submit')}
              </>
            )}
          </button>
        </form>
      </div>
    </motion.div>
  );
}
