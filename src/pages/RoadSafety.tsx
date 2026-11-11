import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, ShieldCheck, Car, Footprints, ZoomIn, X, Download, FileText, Globe } from 'lucide-react';
// @ts-ignore
import roadSafetyMap from '../assets/images/road_safety_map_1779362470597.png';
import { projectFilesList, ProjectFile } from '../assets/projects/projectData';
import { convertTextToWordHtml } from '../utils/wordGenerator';
import { useLanguage } from '../context/LanguageContext';

export function RoadSafety() {
  const { lang, t } = useLanguage();
  const [isZoomed, setIsZoomed] = useState(false);
  const [previewFile, setPreviewFile] = useState<ProjectFile | null>(null);

  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (previewFile && scrollRef.current) {
      setTimeout(() => {
        scrollRef.current?.focus();
      }, 50);
    }
  }, [previewFile]);

  const handleModalWheel = (e: React.WheelEvent) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop += e.deltaY;
    }
  };

  // Files state (loaded directly from projectFilesList to ensure fresh content)
  const [files, setFiles] = useState<ProjectFile[]>(projectFilesList);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = roadSafetyMap;
    link.download = `road-safety-map.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleProjectDownload = (file: ProjectFile) => {
    const link = document.createElement('a');
    link.href = `/api/download-project-file?category=road_safety&id=${encodeURIComponent(file.id)}`;
    link.setAttribute('download', file.fileName);
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
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-extrabold text-slate-950 mb-4 tracking-tight">{t('road.title')}</h1>
        <p className="text-base text-slate-600 font-medium">{t('road.subtitle')}</p>
      </div>

      {/* High-Fidelity Exact 1:1 Map Showcase */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-md border border-slate-100 p-4 max-w-5xl mx-auto">
        <div className="relative bg-slate-900 rounded-2xl overflow-hidden group">
          <img 
            src={roadSafetyMap} 
            alt="Жол қауіпсіздігі схемасы" 
            referrerPolicy="no-referrer"
            className="w-full h-auto object-contain max-h-[600px] mx-auto block"
          />
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-slate-955/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-xs">
            <button 
              onClick={() => setIsZoomed(true)}
              className="bg-white text-slate-950 px-5 py-3 rounded-xl hover:bg-slate-50 transition-all font-bold text-sm shadow-xl flex items-center gap-2 cursor-pointer"
            >
              <ZoomIn className="w-4 h-4 text-blue-600" />
              {t('road.view_large')}
            </button>
            <button 
              onClick={handleDownload}
              className="bg-blue-650 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition-all font-bold text-sm shadow-xl flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              {lang === 'en' ? 'Download' : lang === 'ru' ? 'Скачать' : 'Жүктеу'}
            </button>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap justify-between items-center px-2 gap-4">
          <p className="text-xs text-slate-500 font-medium max-w-md">
            {t('road.caption')}
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setIsZoomed(true)}
              className="inline-flex items-center gap-1.5 px-6 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
            >
              <ZoomIn className="w-3.5 h-3.5" />
              {t('road.btn_view')}
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              {lang === 'en' ? 'Download' : lang === 'ru' ? 'Скачать' : 'Жүктеу'}
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isZoomed && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-6xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[92vh]"
            >
              <div className="p-6 bg-slate-950 text-white flex justify-between items-center border-b border-slate-800 shrink-0">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-emerald-400 animate-pulse" />
                  <div>
                    <h3 className="text-xl font-bold">{t('road.title')}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Original Map Layout (PNG)</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsZoomed(false)}
                  className="p-2 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                >
                  <X className="w-6 h-6 text-slate-300 hover:text-white" />
                </button>
              </div>

              <div className="overflow-auto p-6 bg-slate-955 flex justify-center items-center min-h-[450px]">
                <img
                  src={roadSafetyMap}
                  alt="Жол қауіпсіздігі схемасы үлкейтілген"
                  referrerPolicy="no-referrer"
                  className="w-full max-h-[72vh] object-contain mx-auto rounded-lg"
                />
              </div>

              <div className="p-6 bg-white border-t border-slate-100 flex justify-end items-center sm:flex-row flex-col gap-4 shrink-0">
                <p className="text-sm text-slate-600 max-w-xl">
                  {lang === 'en' 
                    ? 'In accordance with municipal guidelines, strictly follow traffic marks, warning indicators, and pedestrian pathways.'
                    : lang === 'ru'
                    ? 'В соответствии с правилами дорожного движения, строго соблюдайте дорожные знаки и безопасные пешеходные маршруты.'
                    : 'Жол қауіпсіздігі ережелеріне сәйкес, жол қозғалысы белгілері мен ұсынылған қауіпсіз бағыттарды қатаң сақтаңыз.'}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsZoomed(false)}
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-extrabold transition-colors cursor-pointer"
                  >
                    {lang === 'en' ? 'Close' : lang === 'ru' ? 'Закрыть' : 'Жабу'}
                  </button>
                  <button
                    onClick={() => {
                      handleDownload();
                      setIsZoomed(false);
                    }}
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold transition-colors cursor-pointer"
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

      {/* Three Language Project Documents Section */}
      <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 space-y-10">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold mb-4">
            <Globe className="w-3.5 h-3.5" />
            <span>Жоба жұмыстары / Проектные работы / Project Works</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-950 mb-3 tracking-tight">
            {t('road.project_files')}
          </h2>
          <p className="text-slate-600 font-medium text-sm sm:text-base">
            {t('road.project_files_desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {files.map((file) => (
            <div 
              key={file.id} 
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60 hover:shadow-md transition-shadow flex flex-col justify-between relative overflow-hidden"
            >
              {file.binaryData && (
                <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                  Uploaded
                </div>
              )}
              <div>
                <div className="flex justify-between items-start gap-2 mb-4">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center font-bold">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="text-xs px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full font-bold">
                    {file.size}
                  </span>
                </div>
                
                <h3 className="font-bold text-slate-900 text-base line-clamp-2 min-h-[48px]">
                  {file.title}
                </h3>
                
                <p className="text-xs text-slate-500 mt-2 line-clamp-4 leading-relaxed">
                  {file.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-xs font-medium text-slate-400">
                  <span>Language: {file.langName}</span>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setPreviewFile(file)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
                  >
                    {t('road.btn_view')}
                  </button>
                  <button
                    onClick={() => handleProjectDownload(file)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    {t('road.btn_download')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project File Preview Modal */}
      <AnimatePresence>
        {previewFile && (
          <div 
            id="road-safety-preview-overlay"
            onWheel={handleModalWheel}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[85vh]"
            >
              <div className="p-6 bg-slate-900 text-white flex justify-between items-center border-b border-slate-800 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-800 text-blue-400 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{previewFile.fileName}</h3>
                    <p className="text-xs text-slate-400">{previewFile.langName}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setPreviewFile(null)}
                  className="p-2 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                >
                  <X className="w-6 h-6 text-slate-300 hover:text-white" />
                </button>
              </div>

              <div 
                id="road-safety-preview-scroll-container"
                ref={scrollRef}
                tabIndex={0}
                className="overflow-y-auto outline-none focus:outline-none p-6 sm:p-8 bg-slate-100 max-h-[60vh] min-h-[350px]"
              >
                <div className="mx-auto max-w-2xl w-full bg-white shadow-xl border border-slate-200 p-6 sm:p-10 font-serif text-slate-800 leading-relaxed text-xs sm:text-sm select-text rounded-2xl relative overflow-hidden">
                  <div className="text-center mb-8 pb-6 border-b-2 border-double border-blue-900">
                    <h2 className="font-sans font-extrabold text-lg sm:text-xl text-blue-900 leading-tight uppercase mb-2">
                      {previewFile.title}
                    </h2>
                    <p className="text-xs font-sans text-slate-500 italic">
                      Official Research Document Monograph • {previewFile.langName}
                    </p>
                  </div>
                  
                  <div className="space-y-4 text-justify">
                    {previewFile.content.split('\n').reduce((acc: React.ReactNode[], line, index) => {
                      const trimmed = line.trim();
                      if (!trimmed || trimmed.startsWith('=====')) {
                        return acc;
                      }
                      
                      // Title line
                      if (trimmed === trimmed.toUpperCase() && trimmed.length > 20 && !trimmed.includes('-') && !trimmed.includes(':')) {
                        acc.push(
                          <h3 key={index} className="font-sans font-extrabold text-[#1e3a8a] text-center text-sm sm:text-base border-b border-double border-[#1e3a8a] pb-2 uppercase mb-4 mt-6">
                            {trimmed}
                          </h3>
                        );
                        return acc;
                      }
                      
                      // Skip dash lines
                      if (trimmed.startsWith('-----')) {
                        return acc;
                      }
                      
                      const numMatch = trimmed.match(/^(\d+)[\.\)]\s*(.*)$/);
                      const bulletMatch = trimmed.match(/^[\-\*]\s*(.*)$/);
                      
                      if (numMatch) {
                        acc.push(
                          <div key={index} className="flex gap-2.5 items-start pl-4 text-xs sm:text-sm text-slate-700 font-sans">
                            <span className="font-bold text-[#1e40af]">{numMatch[1]}.</span>
                            <span>{numMatch[2]}</span>
                          </div>
                        );
                      } else if (bulletMatch) {
                        acc.push(
                          <div key={index} className="flex gap-2.5 items-start pl-4 text-xs sm:text-sm text-slate-700 font-sans">
                            <span className="text-[#1e40af] font-bold">•</span>
                            <span>{bulletMatch[1]}</span>
                          </div>
                        );
                      } else {
                        acc.push(
                          <p key={index} className="text-slate-700 text-xs sm:text-sm font-sans leading-relaxed indent-4">
                            {trimmed}
                          </p>
                        );
                      }
                      
                      return acc;
                    }, [])}
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white border-t border-slate-100 flex justify-end items-center sm:flex-row flex-col gap-4 shrink-0">
                <p className="text-xs text-slate-500 max-w-md">
                  * Official college safety study. Accessible freely for academic references.
                </p>
                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => setPreviewFile(null)}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                  >
                    {lang === 'en' ? 'Close' : lang === 'ru' ? 'Закрыть' : 'Жабу'}
                  </button>
                  <button
                    onClick={() => {
                      handleProjectDownload(previewFile);
                      setPreviewFile(null);
                    }}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    {t('road.btn_download')}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Rules Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
              <Footprints className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">{t('road.rules.pedestrian')}</h3>
          </div>
          <ul className="space-y-4 text-slate-600 font-medium">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span>{t('road.rules.p1')}</span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span>{t('road.rules.p2')}</span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span>{t('road.rules.p3')}</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <span>{t('road.rules.p4')}</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center">
              <Car className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">{t('road.rules.driver')}</h3>
          </div>
          <ul className="space-y-4 text-slate-600 font-medium">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span>{t('road.rules.d1')}</span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span>{t('road.rules.d2')}</span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span>{t('road.rules.d3')}</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <span>{t('road.rules.d4')}</span>
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
