import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, ZoomIn, Map, X, FileImage, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// @ts-ignore
import floorPlan1 from '../assets/images/evacuation_floor_1_1779363044807.png';
// @ts-ignore
import floorPlan3 from '../assets/images/evacuation_floor_3_1779363075468.png';
// @ts-ignore
import floorPlan4 from '../assets/images/evacuation_floor_4_1779363099876.png';
// @ts-ignore
import floorPlan5 from '../assets/images/evacuation_floor_5_1779363120250.png';
// @ts-ignore
import verticalPoster from '../assets/images/vertical_evacuation_poster_1782105050128.jpg';

interface FloorDef {
  id: number;
  nameKey: string;
  defaultKkName: string;
  plan: string;
}

const FLOORS_DATA: FloorDef[] = [
  { id: 1, nameKey: '1_floor', defaultKkName: '1-ші қабат', plan: floorPlan1 },
  { id: 3, nameKey: '3_floor', defaultKkName: '3-ші қабат', plan: floorPlan3 },
  { id: 4, nameKey: '4_floor', defaultKkName: '4-ші қабат', plan: floorPlan4 },
  { id: 5, nameKey: '5_floor', defaultKkName: '5-ші қабат', plan: floorPlan5 },
];

export function Evacuation() {
  const { lang, t } = useLanguage();
  const [zoomedImg, setZoomedImg] = useState<{ src: string; title: string } | null>(null);
  const [isPosterZoomed, setIsPosterZoomed] = useState(false);

  // Generate nice localized title for a floor
  const getFloorName = (id: number) => {
    if (lang === 'en') return `${id}${id === 1 ? 'st' : id === 3 ? 'rd' : 'th'} Floor`;
    if (lang === 'ru') return `${id}-й этаж`;
    return `${id}-ші қабат`;
  };

  const handleDownloadImage = (src: string, filename: string) => {
    const link = document.createElement('a');
    link.href = src;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-12 animate-fade-in"
    >
      <div className="border-b border-slate-100 pb-6 text-center md:text-left">
        <h1 className="text-4xl font-extrabold text-slate-950 mb-3 tracking-tight">
          {t('evac.title')}
        </h1>
        <p className="text-base text-slate-600 font-medium max-w-3xl">
          {t('evac.subtitle')}
        </p>
      </div>

      {/* Main Floor Plans presentation - Only clean floor plans without language version tags */}
      <div className="space-y-8">
        {FLOORS_DATA.map((floor) => (
          <div key={floor.id} className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-5 hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold shrink-0">
                  <Map className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-slate-950">{getFloorName(floor.id)}</h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {floor.defaultKkName} эвакуациялық сызбасы мен қауіпсіз шығу жолдары
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setZoomedImg({ src: floor.plan, title: `${getFloorName(floor.id)} — Эвакуация жоспары` })}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold cursor-pointer transition-colors"
                >
                  <ZoomIn className="w-4 h-4 text-blue-600" />
                  {t('road.btn_view')}
                </button>
                <button 
                  onClick={() => handleDownloadImage(floor.plan, `evacuation-floor-${floor.id}.png`)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold cursor-pointer transition-colors shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  {lang === 'en' ? 'Download' : lang === 'ru' ? 'Скачать' : 'Жүктеу'}
                </button>
              </div>
            </div>

            {/* Plan Display Card */}
            <div className="bg-slate-950 rounded-2xl overflow-hidden relative group p-3 flex items-center justify-center min-h-[300px] max-h-[460px]">
              <img
                src={floor.plan}
                alt={`${getFloorName(floor.id)}`}
                referrerPolicy="no-referrer"
                className="max-h-[440px] max-w-full object-contain rounded-lg transition-transform"
              />

              {/* Hover quick overlay */}
              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-3 backdrop-blur-xs">
                <button 
                  onClick={() => setZoomedImg({ src: floor.plan, title: `${getFloorName(floor.id)} — Эвакуация жоспары` })}
                  className="bg-white text-slate-950 px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-slate-50 shadow-lg cursor-pointer flex items-center gap-1.5"
                >
                  <ZoomIn className="w-4 h-4 text-blue-600" />
                  {t('road.btn_view')}
                </button>
                <button 
                  onClick={() => handleDownloadImage(floor.plan, `evacuation-floor-${floor.id}.png`)}
                  className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-blue-700 shadow-lg cursor-pointer flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4" />
                  {lang === 'en' ? 'Download' : lang === 'ru' ? 'Скачать' : 'Жүктеу'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal for any Floor Plan */}
      <AnimatePresence>
        {zoomedImg && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-6xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[92vh]"
            >
              <div className="p-6 bg-slate-950 text-white flex justify-between items-center border-b border-slate-800 shrink-0">
                <div className="flex items-center gap-3">
                  <Map className="w-6 h-6 text-blue-400 animate-pulse" />
                  <div>
                    <h3 className="text-xl font-bold">{zoomedImg.title}</h3>
                  </div>
                </div>
                <button 
                  onClick={() => setZoomedImg(null)}
                  className="p-2 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                >
                  <X className="w-6 h-6 text-slate-300 hover:text-white" />
                </button>
              </div>

              <div className="overflow-auto p-6 bg-slate-950 flex justify-center items-center min-h-[450px]">
                <img
                  src={zoomedImg.src}
                  alt={zoomedImg.title}
                  referrerPolicy="no-referrer"
                  className="w-full max-h-[70vh] object-contain mx-auto rounded-lg"
                />
              </div>

              <div className="p-6 bg-white border-t border-slate-100 flex justify-between items-center sm:flex-row flex-col gap-4 shrink-0">
                <p className="text-sm text-slate-600 max-w-xl">
                  {lang === 'en' 
                    ? 'In accordance with safety regulations, move quickly to the nearest emergency escape exit using direction vectors.'
                    : lang === 'ru'
                    ? 'В соответствии с правилами безопасности, быстро двигайтесь к ближайшему аварийному выходу.'
                    : 'Қауіпсіздік ережелеріне сәйкес, нұсқағыштар арқылы ең жақын эвакуациялық шығу жолына жылдам қозғалыңыз.'}
                </p>
                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => setZoomedImg(null)}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                  >
                    {lang === 'en' ? 'Close' : lang === 'ru' ? 'Закрыть' : 'Жабу'}
                  </button>
                  <button
                    onClick={() => {
                      handleDownloadImage(zoomedImg.src, 'large-evacuation-view.jpg');
                      setZoomedImg(null);
                    }}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    {lang === 'en' ? 'Download' : lang === 'ru' ? 'Скачать' : 'Жүктеу'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Rules and Vertical Poster Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-blue-50/60 rounded-3xl p-8 border border-blue-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-6 text-blue-900">
              <ShieldAlert className="w-6 h-6 shrink-0" />
              <h3 className="text-2xl font-black tracking-tight">
                {t('evac.rules_title')}
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex gap-4 p-4 bg-white/70 backdrop-blur-xs rounded-2xl border border-blue-100/40">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shrink-0 shadow-xs">1</div>
                <div className="space-y-1">
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    {t('evac.rule1.title')}
                  </h4>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {t('evac.rule1.desc')}
                  </p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-white/70 backdrop-blur-xs rounded-2xl border border-blue-100/40">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shrink-0 shadow-xs">2</div>
                <div className="space-y-1">
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    {t('evac.rule2.title')}
                  </h4>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {t('evac.rule2.desc')}
                  </p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-white/70 backdrop-blur-xs rounded-2xl border border-blue-100/40">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shrink-0 shadow-xs">3</div>
                <div className="space-y-1">
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    {t('evac.rule3.title')}
                  </h4>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {t('evac.rule3.desc')}
                  </p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-white/70 backdrop-blur-xs rounded-2xl border border-blue-100/40">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shrink-0 shadow-xs">4</div>
                <div className="space-y-1">
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    {t('evac.rule4.title')}
                  </h4>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {t('evac.rule4.desc')}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-blue-100/80 flex items-center gap-3 text-xs font-semibold text-blue-700 bg-blue-50/50 p-4 rounded-2xl">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0 inline-block animate-ping"></span>
            <span>
              {t('evac.emergency_warning')}
            </span>
          </div>
        </div>

        {/* Vertical safety poster spotlight card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
          <div>
            <div className="flex items-center gap-2 mb-4 text-slate-900">
              <FileImage className="w-5 h-5 text-blue-600 shrink-0" />
              <h4 className="font-extrabold text-base tracking-tight">
                {t('evac.poster_title')}
              </h4>
            </div>
            
            <p className="text-xs text-slate-500 mb-4 font-medium leading-relaxed">
              {t('evac.poster_desc')}
            </p>

            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-950 border border-slate-100 group">
              <img 
                src={verticalPoster} 
                alt="Тік эвакуациялық нұсқаулық плақаты" 
                className="w-full h-full object-cover font-sans"
                referrerPolicy="no-referrer"
              />
              
              <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2.5 backdrop-blur-xs">
                <button 
                  onClick={() => setIsPosterZoomed(true)}
                  className="bg-white text-slate-950 px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors shadow-lg cursor-pointer flex items-center gap-2"
                >
                  <ZoomIn className="w-4 h-4 text-blue-600" />
                  {t('road.btn_view')}
                </button>
                <button 
                  onClick={() => handleDownloadImage(verticalPoster, 'vertical-evacuation-poster.jpg')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors shadow-lg cursor-pointer flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  {lang === 'en' ? 'Download' : lang === 'ru' ? 'Скачать' : 'Жүктеу'}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex gap-2">
            <button
              onClick={() => setIsPosterZoomed(true)}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
            >
              <ZoomIn className="w-3.5 h-3.5" />
              {t('road.btn_view')}
            </button>
            <button
              onClick={() => handleDownloadImage(verticalPoster, 'vertical-evacuation-poster.jpg')}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              {lang === 'en' ? 'Download' : lang === 'ru' ? 'Скачать' : 'Жүктеу'}
            </button>
          </div>
        </div>
      </div>

      {/* Poster Zoom Modal */}
      <AnimatePresence>
        {isPosterZoomed && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-lg w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col max-h-[92vh]"
            >
              <div className="p-5 bg-slate-950 text-white flex justify-between items-center border-b border-slate-800 shrink-0">
                <div className="flex items-center gap-3">
                  <FileImage className="w-5 h-5 text-blue-500 animate-pulse" />
                  <h3 className="text-base font-bold text-white">
                    {t('evac.poster_title')}
                  </h3>
                </div>
                <button 
                  onClick={() => setIsPosterZoomed(false)}
                  className="p-2 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5 text-slate-300 hover:text-white" />
                </button>
              </div>

              <div className="overflow-auto p-4 bg-slate-950 flex justify-center items-center min-h-[350px]">
                <img
                  src={verticalPoster}
                  alt="Тік эвакуациялық плакат"
                  referrerPolicy="no-referrer"
                  className="max-h-[68vh] object-contain mx-auto rounded-lg"
                />
              </div>

              <div className="p-5 bg-slate-900 border-t border-slate-800 flex justify-end items-center sm:flex-row flex-col gap-3 shrink-0">
                <span className="text-xs text-slate-400">
                  Portrait layout (3:4)
                </span>
                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => setIsPosterZoomed(false)}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-xl border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs font-bold transition-colors cursor-pointer"
                  >
                    {lang === 'en' ? 'Close' : lang === 'ru' ? 'Закрыть' : 'Жабу'}
                  </button>
                  <button
                    onClick={() => handleDownloadImage(verticalPoster, 'vertical-evacuation-poster.jpg')}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    {lang === 'en' ? 'Download' : lang === 'ru' ? 'Скачать' : 'Жүктеу'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
