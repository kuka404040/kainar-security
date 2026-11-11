import { motion, AnimatePresence } from 'motion/react';
import { Flame, Activity, ShieldAlert, HeartPulse, Tornado, Globe, FileText, Download, X } from 'lucide-react';
import React, { useState } from 'react';
import { clsx } from 'clsx';
import { emergencyProjectFilesList, ProjectFile } from '../assets/projects/emergencyProjectData';
import { convertTextToWordHtml } from '../utils/wordGenerator';
import { useLanguage } from '../context/LanguageContext';

const categories = [
  { id: 'fire', icon: Flame, color: 'text-red-500', bg: 'bg-red-50' },
  { id: 'earthquake', icon: Activity, color: 'text-amber-500', bg: 'bg-amber-50' },
  { id: 'terror', icon: ShieldAlert, color: 'text-slate-800', bg: 'bg-slate-100' },
  { id: 'medical', icon: HeartPulse, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { id: 'nature', icon: Tornado, color: 'text-blue-500', bg: 'bg-blue-50' },
];

const categoryTitles: Record<string, Record<string, string>> = {
  fire: { kk: 'Өрт', ru: 'Пожар', en: 'Fire Incident' },
  earthquake: { kk: 'Жер сілкінісі', ru: 'Землетрясение', en: 'Earthquake Safety' },
  terror: { kk: 'Террорлық қауіп', ru: 'Террористическая угроза', en: 'Terrorist Threat' },
  medical: { kk: 'Медициналық көмек', ru: 'Медицинская помощь', en: 'Medical Emergency' },
  nature: { kk: 'Табиғи апаттар', ru: 'Стихийные бедствия', en: 'Natural Disasters' }
};

const instructions: Record<string, Record<string, string[]>> = {
  fire: {
    kk: [
      'Дабыл түймесін басыңыз немесе 101 нөміріне қоңырау шалыңыз.',
      'Дүрбелеңге түспей, ғимараттан эвакуация жоспарына сай шығыңыз.',
      'Түтін болған жағдайда, еңкейіп немесе еңбектеп қозғалыңыз.',
      'Ауыз бен мұрынды дымқыл шүберекпен жабыңыз.',
      'Лифтті пайдаланбаңыз, тек баспалдақпен түсіңіз.',
    ],
    ru: [
      'Активируйте кнопку тревоги или наберите короткий номер 101.',
      'Без паники покиньте здание согласно утвержденной схеме эвакуации.',
      'В случае задымления передвигайтесь пригнувшись или ползком.',
      'Закройте рот и нос влажной чистой тканью.',
      'Не пользуйтесь лифтом, спускайтесь только по баспалдаку.',
    ],
    en: [
      'Press the fire alarm trigger or call emergency responders at 101/112.',
      'Exit the building calmly adhering strictly to the nearest exit direction.',
      'If smoke is heavy, crouch low or crawl forward to preserve breath.',
      'Cover your nose and mouth using a clean damp cloth.',
      'Do not use elevators under any circumstances. Proceed via stairs.',
    ]
  },
  earthquake: {
    kk: [
      'Ғимарат ішінде болсаңыз: мықты үстелдің астына кіріңіз немесе ішкі қабырғаның бұрышына тұрыңыз.',
      'Терезелерден, айналардан және құлауы мүмкін заттардан аулақ болыңыз.',
      'Дүмпулер аяқталған соң ғана ғимараттан шығыңыз.',
      'Далада болсаңыз: ғимараттардан, ағаштардан және электр желілерінен алыс тұрыңыз.',
    ],
    ru: [
      'Если вы внутри: укройтесь под прочным столом или встаньте в проеме несущих стен.',
      'Держитесь подальше от окон, зеркал и тяжелых падающих предметов.',
      'Покиньте здание только после полного прекращения толчков.',
      'Если вы снаружи: отойдите от зданий, столбов и линий электропередач.',
    ],
    en: [
      'If indoors: seek immediate shelter under heavy tables or stand in structural door frames.',
      'Stay far away from windows, mirrors, bookcases, or heavy equipment.',
      'Leave the facility only after all seismic shocks have completely ceased.',
      'If outdoors: move into open air away from wall structures, electric grids, and trees.',
    ]
  },
  terror: {
    kk: [
      'Күдікті зат көрсеңіз, оған тиіспеңіз және күзетке хабарлаңыз.',
      'Атыс кезінде: еденге жатыңыз, терезелерден алыс болыңыз.',
      'Мүмкіндік болса, қауіпсіз жерге тығылыңыз және есікті құлыптаңыз.',
      'Телефон дыбысын өшіріңіз.',
      'Полиция келгенде, қолдарыңызды көрінетіндей етіп ұстаңыз, күрт қимыл жасамаңыз.',
    ],
    ru: [
      'При обнаружении подозрительных вещей не трогайте их, сообщите охране.',
      'При слышимости выстрелов лягте на пол, держитесь в стороне от окон.',
      'При возможности забаррикадируйтесь в кабинете и заприте замок.',
      'Переведите все мобильные телефоны на полностью бесшумный режим.',
      'При штурме полиции держите руки на виду, не совершайте резких движений.',
    ],
    en: [
      'Do not touch suspicious bags or abandoned items. Notify guards safely.',
      'During shooting incidents: immediately drop to floor level away from glass.',
      'If possible, shelter inside a room, lock the door, and set barriers.',
      'Disable all telephone ringers, alarms, and vibration patterns.',
      'When officers arrive, keep hands fully visible, avoid sudden moves.',
    ]
  },
  medical: {
    kk: [
      'Жедел жәрдем шақырыңыз (103) немесе медпунктке хабарласыңыз.',
      'Зардап шеккен адамды қауіпсіз жерге орналастырыңыз.',
      'Қажет болса, алғашқы көмек көрсетіңіз (егер білсеңіз).',
      'Дәрігерлер келгенше қасында болыңыз.',
    ],
    ru: [
      'Вызовите бригаду скорой помощи (103) или сообщите в медицинский пункт.',
      'Обеспечьте пострадавшему безопасное и комфортное положение.',
      'Окажите базовую первую помощь, если обладаете нужными знаниями.',
      'Будьте рядом с пострадавшим до прибытия медицинских работников.',
    ],
    en: [
      'Call national emergency line 103 or reach out directly to college clinic.',
      'Move the victim into a safe, calm, and climate-controlled zone.',
      'Administer basic aid (CPR, pressure bandage) if qualified.',
      'Remain alongside the victim until professional healthcare workers arrive.',
    ]
  },
  nature: {
    kk: [
      'Дауыл кезінде: ғимарат ішінде қалыңыз, терезелерден аулақ болыңыз.',
      'Су тасқыны кезінде: жоғары қабаттарға немесе төбеге көтеріліңіз.',
      'Радио немесе теледидар арқылы ресми ақпаратты тыңдаңыз.',
    ],
    ru: [
      'При сильном ветре: оставайтесь внутри помещений, отойдите от окон.',
      'При угрозе подтоплений: переместитесь на верхние этажи здания.',
      'Постоянно слушайте инструкции штаба по радио или мобильному.',
    ],
    en: [
      'During heavy storms: stay indoors, close all shutters and stay off glass.',
      'During flooding alerts: evacuate to upper floors or roof decks.',
      'Listen to official disaster response broadcasters via radio or device alerts.',
    ]
  }
};

export function Emergency() {
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState('fire');
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

  // Files state (loaded directly from emergencyProjectFilesList to ensure fresh content)
  const [files, setFiles] = useState<ProjectFile[]>(emergencyProjectFilesList);

  const handleProjectDownload = (file: ProjectFile) => {
    const link = document.createElement('a');
    link.href = `/api/download-project-file?category=emergency&id=${encodeURIComponent(file.id)}`;
    link.setAttribute('download', file.fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getActiveTabTitle = () => {
    return categoryTitles[activeTab]?.[lang] || categoryTitles[activeTab]?.['kk'] || activeTab;
  };

  const currentInstructions = instructions[activeTab]?.[lang] || instructions[activeTab]?.['kk'] || [];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-12 animate-fade-in"
    >
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-extrabold text-slate-950 mb-4 tracking-tight">{t('emergency.title')}</h1>
        <p className="text-lg text-slate-600 font-medium">{t('emergency.subtitle')}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeTab === cat.id;
          const titleText = categoryTitles[cat.id]?.[lang] || categoryTitles[cat.id]?.['kk'];
          return (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={clsx(
                'flex flex-col items-center justify-center p-6 rounded-3xl transition-all border-2 cursor-pointer',
                isActive 
                  ? `${cat.bg} border-${cat.color.split('-')[1]}-500 shadow-md scale-105` 
                  : 'bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50'
              )}
            >
              <Icon className={clsx('w-10 h-10 mb-3', isActive ? cat.color : 'text-slate-400')} />
              <span className={clsx('text-sm font-bold text-center', isActive ? 'text-slate-900' : 'text-slate-500')}>
                {titleText}
              </span>
            </button>
          );
        })}
      </div>

      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
        <div className="flex items-center gap-4 mb-8">
          {categories.find(c => c.id === activeTab)?.icon && (
            <div className={clsx('w-16 h-16 rounded-2xl flex items-center justify-center', categories.find(c => c.id === activeTab)?.bg)}>
              {(() => {
                const Icon = categories.find(c => c.id === activeTab)?.icon;
                return Icon ? <Icon className={clsx('w-8 h-8', categories.find(c => c.id === activeTab)?.color)} /> : null;
              })()}
            </div>
          )}
          <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">
            {getActiveTabTitle()} {lang === 'en' ? 'Actions' : lang === 'ru' ? '— порядок действий' : 'кезіндегі әрекеттер'}
          </h2>
        </div>

        <div className="space-y-6">
          {currentInstructions.map((step, index) => (
            <div key={index} className="flex gap-6 items-start">
              <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 font-extrabold flex items-center justify-center shrink-0 text-lg">
                {index + 1}
              </div>
              <p className="text-lg text-slate-700 pt-1 leading-relaxed font-medium">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Multilingual Emergency Project Files Section */}
      <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold mb-4">
            <Globe className="w-3.5 h-3.5" />
            <span>Жоба файлдары / Проектные файлы / Project Documents</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-950 mb-3 tracking-tight">
            {t('emergency.p_files')}
          </h2>
          <p className="text-slate-600 font-medium text-sm sm:text-base">
            {t('emergency.p_files_desc')}
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
                  <div className="w-10 h-10 bg-amber-50 text-amber-700 rounded-lg flex items-center justify-center font-bold">
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
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors cursor-pointer"
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

      {/* Modern Word Document Preview Modal */}
      <AnimatePresence>
        {previewFile && (
          <div 
            id="emergency-preview-overlay"
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
                  <div className="w-10 h-10 bg-slate-800 text-amber-500 rounded-lg flex items-center justify-center animate-pulse">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold line-clamp-1">{previewFile.fileName}</h3>
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
                id="emergency-preview-scroll-container"
                ref={scrollRef}
                tabIndex={0}
                className="overflow-y-auto outline-none focus:outline-none p-6 sm:p-8 bg-slate-100 max-h-[60vh] min-h-[350px]"
              >
                <div className="mx-auto max-w-2xl w-full bg-white shadow-xl border border-slate-200 p-6 sm:p-10 font-serif text-slate-800 leading-relaxed text-xs sm:text-sm select-text rounded-2xl relative overflow-hidden">
                  <div className="text-center mb-8 pb-6 border-b-2 border-double border-amber-900">
                    <h2 className="font-sans font-extrabold text-lg sm:text-xl text-amber-900 leading-tight uppercase mb-2">
                      {previewFile.title}
                    </h2>
                    <p className="text-xs font-sans text-slate-500 italic">
                      Official College Security Plan • {previewFile.langName}
                    </p>
                  </div>
                  
                  <div className="space-y-4 text-justify">
                    {previewFile.content.split('\n').reduce((acc: React.ReactNode[], line, index) => {
                      const trimmed = line.trim();
                      if (!trimmed || trimmed.startsWith('=====')) {
                        return acc;
                      }
                      
                      // Title block detection
                      if (trimmed === trimmed.toUpperCase() && trimmed.length > 20 && !trimmed.includes('-') && !trimmed.includes(':')) {
                        acc.push(
                          <h3 key={index} className="font-sans font-extrabold text-[#78350f] text-center text-sm sm:text-base border-b border-double border-[#78350f] pb-2 uppercase mb-4 mt-6">
                            {trimmed}
                          </h3>
                        );
                        return acc;
                      }
                      
                      // Skip raw dashes
                      if (trimmed.startsWith('-----')) {
                        return acc;
                      }
                      
                      const numMatch = trimmed.match(/^(\d+)[\.\)]\s*(.*)$/);
                      const bulletMatch = trimmed.match(/^[\-\*]\s*(.*)$/);
                      
                      if (numMatch) {
                        acc.push(
                          <div key={index} className="flex gap-2.5 items-start pl-4 text-xs sm:text-sm text-slate-700 font-sans">
                            <span className="font-bold text-[#b45309]">{numMatch[1]}.</span>
                            <span>{numMatch[2]}</span>
                          </div>
                        );
                      } else if (bulletMatch) {
                        acc.push(
                          <div key={index} className="flex gap-2.5 items-start pl-4 text-xs sm:text-sm text-slate-700 font-sans">
                            <span className="text-[#b45309] font-bold">•</span>
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

              <div className="p-6 bg-white border-t border-slate-100 flex justify-between items-center sm:flex-row flex-col gap-4 shrink-0">
                <p className="text-xs text-slate-500 max-w-md">
                  * Educational research paper for emergency drill models.
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
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors cursor-pointer"
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
    </motion.div>
  );
}
