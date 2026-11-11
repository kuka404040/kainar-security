import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, Download, User, GraduationCap, CheckCircle, Award, 
  Info, Calendar, Hash, Notebook, Sparkles, AlertTriangle, Flame, Globe
} from 'lucide-react';
import { generateKainarRulesPDF, generateKainarTeacherRulesPDF } from '../utils/pdfGenerator';
import { clsx } from 'clsx';
import { useLanguage } from '../context/LanguageContext';

const textDict = {
  kk: {
    brand: "Қауіпсіздік Баспасы",
    title: "Қауіпсіздік Ережелері",
    desc: "Жоғары Колледж «Қайнар» студенттеріне арналған ресми қауіпсіздік ережелері мен нұсқаулықтар жинағы. Мұнда сіз ережелерді оқып, сандық түрде танысып, өзіңізге арналған жеке PDF құжатын жүктей аласыз.",
    btnGeneralPdf: "Жалпы PDF жүктеу",
    formTitle: "Сандық Танысу Формасы",
    formDesc: "Мәліметтерді енгізіп, жеке PDF-ті алыңыз",
    labelName: "Студенттің Толық Аты-жөні",
    placeholderName: "Мысалы: Асанәлі Төлегенұлы",
    labelGroup: "Оқу Тобы / Мамандығы",
    placeholderGroup: "Мысалы: ВТ-22Б (Есептеу техникасы)",
    labelTicket: "Билет нөмірі",
    placeholderTicket: "№ 05421",
    labelDate: "Қол қойылған Күні",
    btnPersonalPdf: "Жеке PDF жүктеп алу",
    btnPersonalPdfSigned: "Сенімді қолмен PDF-ті жүктеу",
    successMsg: "Құжатыңыз сәтті дайындалды және жүктелді!",
    infoMsg: "Осы құжатты жүктеп алғанда, 7-ші беттің соңындағы қолтаңба мен аты-жөніңіздің орнына сіз енгізген мәліметтер автоматты түрде ресми басылады.",
    viewerTitle: "Құжат Оқушы",
    viewerPage: "бет",
    sheetTitle: "ЖОҒАРЫ КОЛЛЕДЖ «ҚАЙНАР» — ҚАУІПСІЗДІК ЕРЕЖЕЛЕРІ",
    page: "Бет",
    toc: "Мазмұны",
    rulesHeader: "СТУДЕНТТЕРГЕ АРНАЛҒАН ҚАУІПСІЗДІК ЕРЕЖЕЛЕРІ",
    rulesIntro: "Осы ережелер жиынтығы барлық студенттердің, оқытушылардың және қызметкерлердің колледж аумағында қауіпсіз және тәртіпті жұмыс жасауын қамтамасыз ету мақсатында дайындалған. Ережелерді мұқият оқып, күнделікті тәжірибеде қолданыңыз.",
    warning: "НАЗАР АУДАРЫҢЫЗ:",
    warningDesc: "Қауіпті байқасаңыз, дереу күзетке немесе администрацияға хабарлаңыз.",
    p2Intro: "Колледж аумағында болған кезде әрбір студент мынадай жалпы ережелерді қатаң сақтауға міндетті:",
    p2_1: "Колледжге кірерде студенттік билетті көрсетіңіз. Бейтаныстарды кіргізуге болмайды.",
    p2_2: "Дәрісханаларда, дәліздерде тәртіп пен үнсіздікті сақтаңыз; оқуға кедергі жасамаңыз.",
    p2_3: "Ғимарат ішінде жүгіруге, дауыс шығарып ойнауға тыйым салынады.",
    p2_4: "Күдікті затты көрсеңіз — ұстамаңыз, ашпаңыз, күзетке хабарлаңыз.",
    p3Title: "2. ӨРТКЕ ҚАРСЫ ҚАУІПСІЗДІК ШАРАЛАРЫ & ЭЛЕКТР ҚАУІПСІЗДІГІ",
    p3_1: "Эвакуация барысында жүгірмеңіз, бір-бірді итермеңіз, алдыңғыларды бақылаңыз.",
    p3_2: "Өрт дабылын әзіл ретінде пайдаланбаңыз — бұл заңмен қуғындалады.",
    p3_srv: "Қызмет",
    p3_num: "Шұғыл нөмір",
    p3_fire: "Өртке қарсы қызмет",
    p3_med: "Жедел медициналық көмек",
    p4Title: "4. ДЕНСАУЛЫҚ ЖӘНЕ САНИТАРЛЫҚ НОРМАЛАР",
    p4_1: "Жұқпалы белгілер (жөтел, қызу) байқалса, кураторға хабарлап, үйде болыңыз.",
    p4_2: "Тамақ алдында, дәретханадан кейін қолды сабынмен жақсылап жуыңыз.",
    p4_3: "Тамақты тек асхана немесе кафетерийде жеңіз. Аудиторияда рұқсат жоқ.",
    p4_med: "✓ Медпункт 1-қабатта орналасқан. Жұмыс уақыты: 08:00 - 17:00",
    p5Title: "6. АВАРИЯЛЫҚ ЖАҒДАЙЛАРДА ІС-ӘРЕКЕТ АЛГОРИТМІ",
    p5_hdr1: "Жағдай",
    p5_hdr2: "Әрекет",
    p5_case1: "Өрт шықса:",
    p5_act1: "Дабыл соғып, баспалдақпен шығыңыз, 101-ге хабарлаңыз",
    p5_case2: "Жер сілкінісі:",
    p5_act2: "Еденге жатып, басыңызды жабыңыз, берік жиһаз паналаңыз",
    p5_case3: "Күдікті зат:",
    p5_act3: "Ұстамаңыз, аймақты босатып, күзетке (102) хабарлаңыз",
    p6Title: "7. ПСИХОЛОГИЯЛЫҚ ҚАУІПСІЗДІК ЖӘНЕ СЫЙЛАСТЫҚ",
    p6_desc1: "Колледжде кемсітуге, кибербуллингке немесе қорлауға қатаң тыйым салынады.",
    p6_desc2: "Қайтадан бұзу немесе мүлікті бүлдіру жағдайында тәртіптік жаза мен материалдық жауапкершілік қарастырылған.",
    p7Title: "ТАНЫСТЫМ ЖӘНЕ ОРЫНДАУҒА МІНДЕТТЕНЕМІН",
    p7_stud: "Студент:",
    p7_grp: "Топ / Мамандық:",
    p7_tkt: "Студенттік билет:",
    p7_date: "Қол қойылған күні:",
    p7_status: "Мәртебесі:",
    p7_signed: "ҚОЛ ҚОЙЫЛҒАН (САНДЫҚ)",
    p7_pending: "ҚОЛТАНБА КҮТІЛУДЕ",
    sheetFooter: "Жоғары Колледж «Қайнар» | Қауіпсіздік бөлімі",
    teacherTitle: "Оқытушыларға арналған қауіпсіздік ережелері",
    teacherDesc: "Оқу кабинетіне кіру, эвакуация жұмыстарын бақылау және алғашқы көмек көрсету нұсқаулықтары.",
    teacherBtn: "Оқытушы нұсқаулықтарын жүктеу",
    labelDocLang: "Жүктелетін құжат тілі (Файл нұсқасы)",
    rulesLangKk: "🇰🇿 Қазақ тіліндегі ресми құжат (PDF)",
    rulesLangRu: "🇷🇺 Орыс тіліндегі ресми құжат (PDF)",
    rulesLangEn: "🇬🇧 Ағылшын тіліндегі ресми құжат (PDF)",
    btnFillForm: "Форманы толтырып жүктеу",
    validationError: "Қате: Құжатты жүктеу үшін студенттің аты-жөні мен оқу тобын толық енгізу міндетті!",
    errPdf: "PDF генерациялау кезінде қате орын алды."
  },
  ru: {
    brand: "Издательство Безопасности",
    title: "Правила Безопасности",
    desc: "Официальный свод правил безопасности и инструкций для студентов Высшего Колледжа «Кайнар». Здесь вы можете ознакомиться с правилами и скачать персонализированный PDF-документ.",
    btnGeneralPdf: "Скачать общий PDF",
    formTitle: "Цифровая Форма Ознакомления",
    formDesc: "Введите ваши данные, чтобы получить персональный PDF",
    labelName: "ФИО Студента",
    placeholderName: "Например: Асанали Толегенович",
    labelGroup: "Учебная Группа / Специальность",
    placeholderGroup: "Например: ВТ-22Б (Вычислительная техника)",
    labelTicket: "Номер билета",
    placeholderTicket: "№ 05421",
    labelDate: "Дата подписания",
    btnPersonalPdf: "Скачать персональный PDF",
    btnPersonalPdfSigned: "Скачать подписанный PDF",
    successMsg: "Ваш документ успешно сгенерирован и загружен!",
    infoMsg: "При загрузке этого документа на 7-й странице ваши фамилия, имя и подпись будут автоматически официально проставлены в электронном виде.",
    viewerTitle: "Просмотрщик документа",
    viewerPage: "страница",
    sheetTitle: "ВЫСШИЙ КОЛЛЕДЖ «КАЙНАР» — ПРАВИЛА БЕЗОПАСНОСТИ",
    page: "Стр.",
    toc: "Содержание",
    rulesHeader: "ПРАВИЛА БЕЗОПАСНОСТИ ДЛЯ СТУДЕНТОВ",
    rulesIntro: "Этот свод правил разработан для обеспечения безопасной работы и учебы всех студентов, преподавателей и сотрудников на территории колледжа. Пожалуйста, внимательно изучите правила.",
    warning: "ВНИМАНИЕ:",
    warningDesc: "Если вы заметили опасность, немедленно сообщите охране или администрации.",
    p2Intro: "При нахождении на территории колледжа каждый студент обязан соблюдать следующие общие правила:",
    p2_1: "Показывайте студенческий билет при входе в колледж. Не проводите посторонних людей.",
    p2_2: "Соблюдайте порядок и тишину в аудиториях и коридорах; не мешайте учебному процессу.",
    p2_3: "Внутри здания строго запрещается бегать и устраивать шумные игры.",
    p2_4: "При обнаружении подозрительных предметов — не трогайте и сообщите охране.",
    p3Title: "2. ПОЖАРНАЯ И ЭЛЕКТРОБЕЗОПАСНОСТЬ",
    p3_1: "При эвакуации не бегите, не толкайте друг друга, следите за идущими впереди.",
    p3_2: "Не используйте пожарную сигнализацию в шутку — это преследуется по закону.",
    p3_srv: "Служба",
    p3_num: "Экстренный номер",
    p3_fire: "Пожарная служба",
    p3_med: "Скорая медицинская помощь",
    p4Title: "4. ЗДОРОВЬЕ И САНИТАРНЫЕ НОРМЫ",
    p4_1: "Если у вас симптомы болезни (кашель, температура), предупредите куратора и оставайтесь дома.",
    p4_2: "Тщательно мойте руки с мылом перед едой и после посещения санузла.",
    p4_3: "Принимайте пищу только в столовой или кафетерии. В аудиториях это запрещено.",
    p4_med: "✓ Медпункт находится на 1 этаже. Время работы: 08:00 - 17:00",
    p5Title: "6. АЛГОРИТМ ДЕЙСТВИЙ В ЧРЕЗВЫЧАЙНЫХ СИТУАЦИЯХ",
    p5_hdr1: "Ситуация",
    p5_hdr2: "Действие",
    p5_case1: "При пожаре:",
    p5_act1: "Включите тревогу, выходите по лестнице, звоните в 101",
    p5_case2: "Землетрясение:",
    p5_act2: "Лягте на пол, прикройте голову, укройтесь под прочной мебелью",
    p5_case3: "Подозрительный предмет:",
    p5_act3: "Не трогайте, освободите зону, сообщите в полицию/охрану (102)",
    p6Title: "7. ПСИХОЛОГИЧЕСКАЯ БЕЗОПАСНОСТЬ И УВАЖЕНИЕ",
    p6_desc1: "В колледже категорически запрещены дискриминация, кибербуллинг и оскорбления.",
    p6_desc2: "За повторные нарушения или порчу имущества предусмотрены дисциплинарные и материальные наказания.",
    p7Title: "ОЗНАКОМЛЕН И ОБЯЗУЮСЬ ВЫПОЛНЯТЬ",
    p7_stud: "Студент:",
    p7_grp: "Группа / Специальность:",
    p7_tkt: "Студенческий билет:",
    p7_date: "Дата подписания:",
    p7_status: "Статус:",
    p7_signed: "ПОДПИСАНО (ЦИФРОВАЯ)",
    p7_pending: "ОЖИДАЕТ ПОДПИСИ",
    sheetFooter: "Высший Колледж «Кайнар» | Отдел безопасности",
    teacherTitle: "Правила безопасности для преподавателей",
    teacherDesc: "Инструкции по допуску в учебные аудитории, контролю за эвакуацией и оказанию первой помощи.",
    teacherBtn: "Скачать инструкции для преподавателей",
    labelDocLang: "Язык скачиваемого документа (Версия файла)",
    rulesLangKk: "🇰🇿 Официальный документ на казахском (PDF)",
    rulesLangRu: "🇷🇺 Официальный документ на русском (PDF)",
    rulesLangEn: "🇬🇧 Официальный документ на английском (PDF)",
    btnFillForm: "Заполнить форму для скачивания",
    validationError: "Ошибка: Для скачивания документа обязательно укажите ФИО и учебную группу!",
    errPdf: "Произошла ошибка при генерации PDF."
  },
  en: {
    brand: "Safety Publishing Office",
    title: "Safety Regulations",
    desc: "Official set of security guidelines and memorandums for students of Kainar Higher College. Review instructions, digitally sign, and download your personalized official PDF document.",
    btnGeneralPdf: "Download General PDF",
    formTitle: "Digital Acquaintance Form",
    formDesc: "Enter details below to compile your security certificate PDF",
    labelName: "Student Full Name",
    placeholderName: "Example: Asanali Tolegenuly",
    labelGroup: "Class Group / Major",
    placeholderGroup: "Example: VT-22B (Computer Science)",
    labelTicket: "Student Card No.",
    placeholderTicket: "No. 05421",
    labelDate: "Signature Date",
    btnPersonalPdf: "Download Custom PDF",
    btnPersonalPdfSigned: "Download Digitally Signed PDF",
    successMsg: "Your security certificate was compiled and downloaded!",
    infoMsg: "When compiling this customized document, your printed details and signing confirmation are automatically engraved officially on Page 7.",
    viewerTitle: "Document Reader Workspace",
    viewerPage: "page",
    sheetTitle: "KAINAR HIGHER COLLEGE — SECURITY PROTOCOLS",
    page: "Page",
    toc: "Table of Contents",
    rulesHeader: "STUDENT HIGH QUALITY SECURITY REGULATIONS",
    rulesIntro: "This regulatory frame was established to preserve absolute safety, discipline, and security of all students, lecturers, and visitors of Kainar. Please examine rules carefully.",
    warning: "ALERT STATE:",
    warningDesc: "On identifying raw safety violations or physical hazards, immediately inform the main desk.",
    p2Intro: "While residing inside college bounds, all students must strictly perform following general duties:",
    p2_1: "Present your valid student card on entry. Welcoming outside third parties is strictly forbidden.",
    p2_2: "Keep order and quiet in study areas, lobbies and libraries; preserve educational focus.",
    p2_3: "Jogging, running, playing loud physical games is strictly banned inside hallways.",
    p2_4: "Never touch unknown boxes or backpacks. Notify safety officers immediately.",
    p3Title: "2. FIRE PREVENTION & POWER SAFETY",
    p3_1: "During fire drills, proceed calmly, do not push onwards, track persons in front of you.",
    p3_2: "Triggering false alarms is a serious criminal offense under state laws.",
    p3_srv: "Service",
    p3_num: "Emergency helpline",
    p3_fire: "Fire dispatcher service",
    p3_med: "Emergency medical aid",
    p4Title: "4. SANITARY COMPLIANCE & PERSONAL HEALTH",
    p4_1: "On tracking virus symptoms, contact your curator and remain home under surveillance.",
    p4_2: "Wash hands meticulously with soap before dining and after bathroom visits.",
    p4_3: "Consume meals only inside the cafeteria. Eating inside libraries/classrooms is banned.",
    p4_med: "✓ First aid room is located on Floor 1. Shift: 08:00 - 17:00",
    p5Title: "6. DISASTER REACTION ALGORITHMS",
    p5_hdr1: "Scenario",
    p5_hdr2: "Reactions",
    p5_case1: "On Fire ignition:",
    p5_act1: "Sound alarm, exit via concrete fire-escapes, alert 101/112",
    p5_case2: "Earthquake wave:",
    p5_act2: "Drop to floor, secure head under static strong desks",
    p5_case3: "Suspicious object:",
    p5_act3: "Do not touch, clear immediate area, notify security (102)",
    p6Title: "7. PSYCHOLOGICAL SAFE HARBOR & RESPECT",
    p6_desc1: "Discrimination, harsh treatment, bullying, cyber-harrassment is strictly outlawed.",
    p6_desc2: "Persistent violation of rules or college property damages entails disciplinary actions and materials fine.",
    p7Title: "READ, DOCUMENTED AND ENGAGED TO PERFORM",
    p7_stud: "Student name:",
    p7_grp: "Class Group:",
    p7_tkt: "Student card ID:",
    p7_date: "Declaration Date:",
    p7_status: "Status state:",
    p7_signed: "SIGNED DIGITALLY",
    p7_pending: "PENDING SIGNATURE",
    sheetFooter: "Kainar Higher College | Protection & Safety Board",
    teacherTitle: "Fire and work safety rules for Lecturers",
    teacherDesc: "Strict regulatory requirements concerning class checks, fire evacuation drills, and medical incidents.",
    teacherBtn: "Download lecturer guide handbook",
    labelDocLang: "Document / File Download Language",
    rulesLangKk: "🇰🇿 Official Kazakh Document (PDF)",
    rulesLangRu: "🇷🇺 Official Russian Document (PDF)",
    rulesLangEn: "🇬🇧 Official English Document (PDF)",
    btnFillForm: "Fill Form to Download",
    validationError: "Validation Error: Student Full Name and Academic Group are strictly required to download the document!",
    errPdf: "An error occurred during compiling PDF document."
  }
};

export function Memos() {
  const { lang, t } = useLanguage();
  
  // Page UI dictionary strictly bound to global website language `lang` from the header
  const d = textDict[lang] || textDict['kk'];

  // Selected file/document language: Kazakh, Russian, or English (for PDF compilation and live preview)
  const [rulesLang, setRulesLang] = useState<'kk' | 'ru' | 'en'>('kk');

  // Document text dictionary strictly bound to `rulesLang`
  const docD = textDict[rulesLang] || textDict['kk'];

  // Personalization form state
  const [studentName, setStudentName] = useState('');
  const [studentGroup, setStudentGroup] = useState('');
  const [studentTicket, setStudentTicket] = useState('');
  const [signDate, setSignDate] = useState(new Date().toISOString().split('T')[0]);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Preview Page index (1 to 7)
  const [activePreviewPage, setActivePreviewPage] = useState(1);

  const [isGeneratingTeacher, setIsGeneratingTeacher] = useState(false);

  // Trigger Teacher PDF build
  const handleGenerateTeacherPDF = async () => {
    setIsGeneratingTeacher(true);
    setSuccessMsg(false);
    setErrorMsg('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 850));
      await generateKainarTeacherRulesPDF();
      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), 5000);
    } catch (err) {
      console.error(err);
      alert(d.errPdf);
    } finally {
      setIsGeneratingTeacher(false);
    }
  };

  // Trigger PDF build with strict validation and admin logging
  const handleGeneratePDF = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    // Strict form validation: form MUST be filled to download!
    if (!studentName.trim() || !studentGroup.trim()) {
      setErrorMsg(d.validationError);
      const input = document.getElementById('student-name-input');
      input?.focus();
      return;
    }

    setErrorMsg('');
    setIsGenerating(true);
    setSuccessMsg(false);
    
    try {
      // 1. Record download to backend database for Administrator surveillance log
      try {
        await fetch('/api/safety-rules-download', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: studentName.trim(),
            group_name: studentGroup.trim(),
            ticket_number: studentTicket.trim() || '-',
            language: rulesLang,
            sign_date: signDate || new Date().toISOString().split('T')[0]
          }),
        });
      } catch (logErr) {
        console.error('Failed to log rules download:', logErr);
      }

      // 2. Simulate small buffer for sleek UX then generate personalized PDF in chosen language
      await new Promise(resolve => setTimeout(resolve, 850));
      await generateKainarRulesPDF(
        studentName.trim(),
        studentGroup.trim(),
        studentTicket.trim() || undefined,
        signDate || undefined,
        rulesLang
      );
      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), 6000);
    } catch (err) {
      console.error(err);
      alert(d.errPdf);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10 pb-12 animate-fade-in"
    >
      {/* Upper Brand Info Banner */}
      <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-end gap-5">
        <div>
          <div className="flex items-center gap-1.5 text-blue-400 text-sm font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-5 h-5" /> 
            {d.brand}
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight">{d.title}</h1>
          <p className="text-slate-400 mt-2 text-sm max-w-2xl leading-relaxed">
            {d.desc}
          </p>
        </div>
        <button 
          onClick={() => {
            const formEl = document.getElementById('rules-form');
            formEl?.scrollIntoView({ behavior: 'smooth' });
            const input = document.getElementById('student-name-input');
            input?.focus();
          }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold px-5 py-3 rounded-xl shadow-md transition-all flex items-center gap-2 uppercase tracking-wider cursor-pointer shrink-0"
        >
          <FileText className="w-4.5 h-4.5" />
          {d.btnFillForm}
        </button>
      </div>

      {/* Main Grid: Form Left, PDF Interactive Preview Right */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Left Column: Personalization & Interactive Signer */}
        <div className="lg:col-span-2 space-y-6">
          <div id="rules-form" className="bg-white rounded-3xl p-6 shadow-md border border-slate-100 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-3 mb-5 border-b border-slate-100 pb-4">
                <div className="w-11 h-11 bg-indigo-50 text-indigo-700 rounded-xl flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-950">{d.formTitle}</h3>
                  <p className="text-xs text-slate-500">{d.formDesc}</p>
                </div>
              </div>

              {/* Error banner if form not filled */}
              <AnimatePresence>
                {errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-3.5 mb-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-start gap-2.5 font-bold"
                  >
                    <AlertTriangle className="w-4.5 h-4.5 text-red-600 shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleGeneratePDF} className="space-y-4">
                {/* Language Selection Dropdown */}
                <div>
                  <label className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{d.labelDocLang}</span>
                  </label>
                  <div className="relative">
                    <select 
                      value={rulesLang}
                      onChange={(e) => {
                        setRulesLang(e.target.value as 'kk' | 'ru' | 'en');
                        setErrorMsg('');
                      }}
                      className="w-full bg-slate-50 border border-indigo-200 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 rounded-xl py-2.5 px-3.5 text-xs font-bold outline-none transition-all cursor-pointer text-slate-900"
                    >
                      <option value="kk">{d.rulesLangKk}</option>
                      <option value="ru">{d.rulesLangRu}</option>
                      <option value="en">{d.rulesLangEn}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">
                    {d.labelName} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4.5 h-4.5 text-slate-400 absolute left-3.5 top-3" />
                    <input 
                      id="student-name-input"
                      type="text" 
                      value={studentName}
                      onChange={(e) => {
                        setStudentName(e.target.value);
                        if (errorMsg) setErrorMsg('');
                      }}
                      placeholder={d.placeholderName}
                      className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 rounded-xl py-2.5 pl-10 pr-4 text-xs font-bold outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">
                    {d.labelGroup} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Notebook className="w-4.5 h-4.5 text-slate-400 absolute left-3.5 top-3" />
                    <input 
                      type="text" 
                      value={studentGroup}
                      onChange={(e) => {
                        setStudentGroup(e.target.value);
                        if (errorMsg) setErrorMsg('');
                      }}
                      placeholder={d.placeholderGroup}
                      className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 rounded-xl py-2.5 pl-10 pr-4 text-xs font-bold outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">
                      {d.labelTicket}
                    </label>
                    <div className="relative">
                      <Hash className="w-4.5 h-4.5 text-slate-400 absolute left-3.5 top-3" />
                      <input 
                        type="text" 
                        value={studentTicket}
                        onChange={(e) => setStudentTicket(e.target.value)}
                        placeholder={d.placeholderTicket}
                        className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 rounded-xl py-2.5 pl-10 pr-4 text-xs font-bold outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">
                      {d.labelDate}
                    </label>
                    <div className="relative">
                      <Calendar className="w-4.5 h-4.5 text-slate-400 absolute left-3.5 top-3" />
                      <input 
                        type="date" 
                        value={signDate}
                        onChange={(e) => setSignDate(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 rounded-xl py-2.5 pl-10 pr-4 text-xs font-bold outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-3">
                  <button 
                    type="submit"
                    disabled={isGenerating}
                    className="w-full bg-slate-950 hover:bg-slate-900 disabled:bg-slate-800 text-white font-extrabold py-3.5 rounded-2xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    {isGenerating ? (
                      <span className="w-4 h-4 rounded-full border-2 border-slate-600 border-t-white animate-spin" />
                    ) : (
                      <Download className="w-4.5 h-4.5" />
                    )}
                    {studentName ? d.btnPersonalPdfSigned : d.btnPersonalPdf}
                  </button>
                  <p className="text-[10px] text-slate-400 text-center mt-2 font-medium">
                    * {rulesLang === 'en' ? 'Filling Full Name and Group is mandatory for download' : rulesLang === 'ru' ? 'Заполнение ФИО и группы обязательно для скачивания' : 'Аты-жөні мен топты толтыру жүктеу үшін міндетті'}
                  </p>
                </div>
              </form>
            </div>

            {/* Notification triggers */}
            <div className="mt-8 pt-5 border-t border-slate-100 space-y-3">
              <AnimatePresence>
                {successMsg && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs rounded-xl flex items-center gap-2 font-bold mb-4"
                  >
                    <CheckCircle className="w-4 h-4 shrink-0" />
                    {d.successMsg}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex gap-2 p-3 bg-indigo-50/50 border border-indigo-100/50 text-indigo-900 rounded-xl text-xs leading-relaxed font-semibold">
                <Info className="w-4.5 h-4.5 text-indigo-600 shrink-0 mt-0.5" />
                <span>{d.infoMsg}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: High Fidelity 7-Page PDF Interactive Viewer Workspace */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-slate-950 rounded-3xl p-5 shadow-2xl border border-slate-850">
            {/* Viewer Head controls */}
            <div className="flex justify-between items-center border-b border-slate-850 pb-4 mb-4">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-indigo-400" />
                <span className="text-white text-xs font-bold font-mono uppercase tracking-widest">
                  {d.viewerTitle}: {activePreviewPage} / 7 {d.viewerPage}
                </span>
              </div>
              <div className="flex gap-1 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
                {Array.from({ length: 7 }, (_, i) => i + 1).map((idx) => (
                  <button
                    key={idx}
                    onClick={() => setActivePreviewPage(idx)}
                    className={clsx(
                      "w-6 h-6 rounded-md text-[10px] font-extrabold flex items-center justify-center transition-all cursor-pointer",
                      activePreviewPage === idx 
                        ? "bg-indigo-600 text-white shadow" 
                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                    )}
                  >
                    {idx}
                  </button>
                ))}
              </div>
            </div>

            {/* Simulated Live Sheet Body */}
            <div className="bg-white rounded-2xl min-h-[500px] p-6 text-slate-900 border border-slate-800 select-none shadow-inner flex flex-col justify-between">
              
              {/* Inside sheet container header */}
              <div>
                <div className="bg-[#113a70] text-white p-3.5 rounded-lg text-center mb-6 font-bold text-xs uppercase tracking-wider relative">
                  {docD.sheetTitle}
                  <span className="absolute right-3.5 top-3.5 text-[9px] opacity-75 font-mono">{docD.page} {activePreviewPage}</span>
                </div>

                {/* --- PAGE CONTENTS BASED ON LIVE SELECTIONS --- */}
                {activePreviewPage === 1 && (
                  <div className="space-y-6 animate-fadeIn py-4">
                    <div className="bg-[#113a70] text-center p-6 rounded-xl text-white font-black text-lg shadow-sm font-sans">
                      {rulesLang === 'en' ? 'KAINAR HIGHER COLLEGE' : rulesLang === 'ru' ? 'ВЫСШИЙ КОЛЛЕДЖ «КАЙНАР»' : 'ЖОҒАРЫ КОЛЛЕДЖ «ҚАЙНАР»'}
                    </div>
                    <div className="h-1 bg-red-600 w-full rounded-full" />
                    
                    <div className="text-center space-y-2">
                      <h4 className="text-base font-extrabold text-slate-950 uppercase tracking-tight">
                        {docD.rulesHeader}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed max-w-lg mx-auto italic">
                        {docD.rulesIntro}
                      </p>
                    </div>

                    <div className="border border-slate-200 rounded-xl overflow-hidden mt-6">
                      <div className="bg-slate-900 text-white text-[11px] font-extrabold p-2.5 text-center">{docD.toc}</div>
                      <div className="divide-y divide-slate-100 text-xs font-bold text-slate-700">
                        {(rulesLang === 'en' 
                          ? ['1. General safety responsibilities', '2. Fire & electricity prevention guidelines', '3. Electric equipment guidelines', '4. Sanitary and personal hygiene codes', '5. Technical laboratory and workshop regulations', '6. Evacuation and emergency guidelines', '7. Psychological harmony and mutual respect', '8. Institutional accountability and fines']
                          : rulesLang === 'ru'
                          ? ['1. Общие требования безопасности', '2. Противопожарные действия', '3. Правила электробезопасности', '4. Санитарные нормы и здоровье', '5. Поведение в учебных кабинетах', '6. Алгоритм чрезвычайных ситуаций', '7. Психологическая культура', '8. Санкции и дисциплинарные меры']
                          : ['1. Жалпы қауіпсіздік ережелері', '2. Өртке қарсы қауіпсіздік шаралары', '3. Электр қауіпсіздігі', '4. Денсаулық пен санитарлық нормалар', '5. Зертхана және кабинет қауіпсіздігі', '6. Авариялық алгоритм', '7. Психологиялық мәдениет', '8. Санкциялар мен жауапкершілік']
                        ).map((t, idx) => (
                          <div key={idx} className="p-2.5 px-4 bg-slate-50/50 flex justify-between items-center">
                            <span>{t}</span>
                            <span className="text-indigo-600 font-mono text-[10px]">{docD.page} {Math.min(7, idx + 2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activePreviewPage === 2 && (
                  <div className="space-y-5 animate-fadeIn text-xs">
                    <div className="bg-indigo-900 text-white p-2 rounded-lg font-extrabold text-[11px] uppercase tracking-wider">
                      {rulesLang === 'en' ? '1. GENERAL SAFETY PROTOCOLS' : rulesLang === 'ru' ? '1. ОБЩИЕ ПРАВИЛА БЕЗОПАСНОСТИ' : '1. ЖАЛПЫ ҚАУІПСІЗДІК ЕРЕЖЕЛЕРІ'}
                    </div>
                    <p className="text-slate-500 italic">{docD.p2Intro}</p>
                    
                    <ul className="space-y-3.5 text-slate-700 font-bold">
                      <li className="flex gap-2.5 items-start">
                        <span className="bg-blue-100 text-blue-800 w-5 h-5 rounded-md flex items-center justify-center text-[10px] shrink-0 mt-0.5">1</span>
                        <span>{docD.p2_1}</span>
                      </li>
                      <li className="flex gap-2.5 items-start">
                        <span className="bg-blue-100 text-blue-800 w-5 h-5 rounded-md flex items-center justify-center text-[10px] shrink-0 mt-0.5">2</span>
                        <span>{docD.p2_2}</span>
                      </li>
                      <li className="flex gap-2.5 items-start">
                        <span className="bg-blue-100 text-blue-800 w-5 h-5 rounded-md flex items-center justify-center text-[10px] shrink-0 mt-0.5">3</span>
                        <span>{docD.p2_3}</span>
                      </li>
                      <li className="flex gap-2.5 items-start">
                        <span className="bg-blue-100 text-blue-800 w-5 h-5 rounded-md flex items-center justify-center text-[10px] shrink-0 mt-0.5">4</span>
                        <span>{docD.p2_4}</span>
                      </li>
                    </ul>

                    <div className="bg-red-50 border border-red-200 p-3 rounded-lg flex gap-2.5 items-start text-[10px]">
                      <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
                      <div>
                        <b className="text-red-800 block mb-0.5">{docD.warning}</b>
                        <p className="text-slate-700 leading-snug">{docD.warningDesc}</p>
                      </div>
                    </div>
                  </div>
                )}

                {activePreviewPage === 3 && (
                  <div className="space-y-5 animate-fadeIn text-xs">
                    <div className="bg-red-800 text-white p-2 rounded-lg font-extrabold text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                      <Flame className="w-4 h-4" />
                      {docD.p3Title}
                    </div>
                    
                    <ul className="space-y-3 text-slate-700 font-bold">
                      <li className="flex gap-2 items-start">
                        <span className="bg-red-100 text-red-800 w-5 h-5 rounded-md flex items-center justify-center text-[10px] shrink-0 mt-0.5">5</span>
                        <span>{docD.p3_1}</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="bg-red-100 text-red-800 w-5 h-5 rounded-md flex items-center justify-center text-[10px] shrink-0 mt-0.5">6</span>
                        <span>{docD.p3_2}</span>
                      </li>
                    </ul>

                    {/* Quick contacts table */}
                    <table className="w-full text-left border-collapse border border-slate-200 rounded-lg overflow-hidden text-xs">
                      <thead>
                        <tr className="bg-slate-900 text-white font-extrabold text-[10px]">
                          <th className="p-2 pl-3">{docD.p3_srv}</th>
                          <th className="p-2 pr-3 text-right">{docD.p3_num}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-slate-50 border-b border-slate-200">
                          <td className="p-2 pl-3 text-slate-800 font-bold">{docD.p3_fire}</td>
                          <td className="p-2 pr-3 text-right text-red-600 font-extrabold">101</td>
                        </tr>
                        <tr className="bg-white">
                          <td className="p-2 pl-3 text-slate-800 font-bold">{docD.p3_med}</td>
                          <td className="p-2 pr-3 text-right text-red-600 font-extrabold">103</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}

                {activePreviewPage === 4 && (
                  <div className="space-y-5 animate-fadeIn text-xs">
                    <div className="bg-green-700 text-white p-2 rounded-lg font-extrabold text-[11px] uppercase tracking-wider">
                      {docD.p4Title}
                    </div>
                    <ul className="space-y-3 text-slate-700 font-bold">
                      <li className="flex gap-2 items-start">
                        <span className="bg-green-100 text-green-800 w-5 h-5 rounded-md flex items-center justify-center text-[10px] shrink-0 mt-0.5">1</span>
                        <span>{docD.p4_1}</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="bg-green-100 text-green-800 w-5 h-5 rounded-md flex items-center justify-center text-[10px] shrink-0 mt-0.5">2</span>
                        <span>{docD.p4_2}</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="bg-green-100 text-green-800 w-5 h-5 rounded-md flex items-center justify-center text-[10px] shrink-0 mt-0.5">3</span>
                        <span>{docD.p4_3}</span>
                      </li>
                    </ul>

                    <div className="bg-green-50 border border-green-200 p-3 rounded-lg text-[10px] flex items-center gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span className="text-green-800 font-semibold">{docD.p4_med}</span>
                    </div>
                  </div>
                )}

                {activePreviewPage === 5 && (
                  <div className="space-y-4 animate-fadeIn text-xs">
                    <div className="bg-[#f97316] text-white p-2 rounded-lg font-extrabold text-[11px] uppercase tracking-wider">
                      {docD.p5Title}
                    </div>

                    <div className="border border-slate-200 rounded-lg overflow-hidden divide-y divide-slate-100">
                      <div className="bg-slate-900 text-white p-2 font-black text-[10px] flex justify-between">
                        <span>{docD.p5_hdr1}</span>
                        <span>{docD.p5_hdr2}</span>
                      </div>
                      <div className="p-2 flex gap-3 bg-red-50/50">
                        <b className="text-red-700 shrink-0 w-32">{docD.p5_case1}</b>
                        <span className="text-slate-700">{docD.p5_act1}</span>
                      </div>
                      <div className="p-2 flex gap-3">
                        <b className="text-blue-700 shrink-0 w-32">{docD.p5_case2}</b>
                        <span className="text-slate-700">{docD.p5_act2}</span>
                      </div>
                      <div className="p-2 flex gap-3 bg-red-50/50">
                        <b className="text-amber-700 shrink-0 w-32">{docD.p5_case3}</b>
                        <span className="text-slate-700">{docD.p5_act3}</span>
                      </div>
                    </div>
                  </div>
                )}

                {activePreviewPage === 6 && (
                  <div className="space-y-4 animate-fadeIn text-xs">
                    <div className="bg-[#113a70] text-white p-2 rounded-lg font-extrabold text-[11px] uppercase tracking-wider">
                      {docD.p6Title}
                    </div>
                    <p className="text-slate-500 italic">{docD.p6_desc1}</p>

                    <div className="bg-indigo-50 border border-indigo-100 p-3 rounded-lg text-slate-800 text-xs">
                      {docD.p6_desc2}
                    </div>
                  </div>
                )}

                {activePreviewPage === 7 && (
                  <div className="space-y-4 animate-fadeIn text-xs">
                    <div className="bg-[#113a70] text-white p-3 rounded-lg text-center font-extrabold text-[11px] uppercase tracking-wider">
                      {docD.p7Title}
                    </div>

                    <div className="p-4 border border-indigo-200 bg-indigo-50/30 rounded-xl space-y-3">
                      <div className="flex justify-between border-b border-indigo-100 pb-2">
                        <span className="text-slate-500 font-bold">{docD.p7_stud}</span>
                        <span className={clsx("font-extrabold", studentName ? "text-indigo-800 italic" : "text-slate-400 font-mono")}>
                          {studentName || '_____________________________'}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-indigo-100 pb-2">
                        <span className="text-slate-500 font-bold">{docD.p7_grp}</span>
                        <span className={clsx("font-extrabold", studentGroup ? "text-indigo-800 italic" : "text-slate-400 font-mono")}>
                          {studentGroup || '_____________________________'}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-indigo-100 pb-2">
                        <span className="text-slate-500 font-bold">{docD.p7_tkt}</span>
                        <span className={clsx("font-extrabold", studentTicket ? "text-indigo-800 italic" : "text-slate-400 font-mono")}>
                          {studentTicket || '_____________________________'}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-indigo-100 pb-2">
                        <span className="text-slate-500 font-bold">{docD.p7_date}</span>
                        <span className="font-extrabold text-[#113a70]">
                          {signDate}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-bold">{docD.p7_status}</span>
                        <span className={clsx("font-extrabold flex items-center gap-1", studentName ? "text-emerald-600" : "text-amber-600")}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
                          {studentName ? docD.p7_signed : docD.p7_pending}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Inside sheet container footer */}
              <div className="border-t border-slate-150 pt-3 flex justify-between items-center text-[10px] text-slate-450 font-bold">
                <span>{docD.sheetFooter}</span>
                <span>www.kaynar.edu.kz</span>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Teachers Memo Segment Box */}
      <div className="bg-gradient-to-r from-emerald-50/50 via-white to-white rounded-3xl p-8 shadow-sm border border-emerald-100/80">
        <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-emerald-600 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-md shadow-emerald-600/20">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-slate-900">{d.teacherTitle}</h3>
              <p className="text-slate-600 text-sm mt-0.5 max-w-xl">{d.teacherDesc}</p>
            </div>
          </div>
          <button 
            onClick={() => handleGenerateTeacherPDF()}
            disabled={isGeneratingTeacher}
            className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 disabled:bg-emerald-400 text-white font-black text-xs rounded-xl shadow-lg shadow-emerald-600/25 hover:shadow-xl transition-all flex items-center gap-2.5 cursor-pointer uppercase tracking-wider shrink-0"
          >
            {isGeneratingTeacher ? (
              <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
            ) : (
              <Download className="w-5 h-5 text-white" />
            )}
            <span>{d.teacherBtn}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
