import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'kk' | 'ru' | 'en';

type TranslationDict = Record<string, Record<Language, string>>;

const translations: TranslationDict = {
  // Navigation & Header
  'nav.home': { kk: 'Басты бет', ru: 'Главная', en: 'Home' },
  'nav.report': { kk: 'Оқиға хабарлау', ru: 'Сообщить о ЧС', en: 'Report Incident' },
  'nav.roadSafety': { kk: 'Жол қауіпсіздігі', ru: 'Дорожная безопасность', en: 'Road Safety' },
  'nav.evacuation': { kk: 'Эвакуация', ru: 'Эвакуация', en: 'Evacuation' },
  'nav.emergency': { kk: 'Төтенше жағдай әрекеттері', ru: 'Действия при ЧС', en: 'Emergency Actions' },
  'nav.memos': { kk: 'Қауіпсіздік ережелері', ru: 'Правила безопасности', en: 'Safety Memos' },
  'nav.game': { kk: 'Оқу ойыны', ru: 'Обучающая игра', en: 'Training Game' },
  'nav.cctv': { kk: 'Бейнебақылау', ru: 'Видеонаблюдение', en: 'CCTV' },
  'nav.contacts': { kk: 'Байланыс', ru: 'Контакты', en: 'Contacts' },
  'nav.admin': { kk: 'Админ', ru: 'Админ', en: 'Admin' },
  'nav.notifications': { kk: 'Хабарламалар', ru: 'Уведомления', en: 'Notifications' },
  
  'header.title': { kk: 'KAINAR COLLEGE', ru: 'КОЛЛЕДЖ КАЙНАР', en: 'KAINAR COLLEGE' },
  'header.subtitle': { kk: 'Қауіпсіздік порталы', ru: 'Портал безопасности', en: 'Security Portal' },
  'header.select_lang': { kk: 'Тілді таңдаңыз', ru: 'Выберите язык', en: 'Select Language' },

  // Footer
  'footer.rights': { kk: '© 2026 Kainar College. Барлық құқықтар қорғалған.', ru: '© 2026 Колледж Кайнар. Все права защищены.', en: '© 2026 Kainar College. All rights reserved.' },

  // Home Page
  'home.hero.title': { kk: 'Қауіпсіз колледж — қауіпсіз болашақ', ru: 'Безопасный колледж — безопасное будущее', en: 'Safe College — Safe Future' },
  'home.hero.subtitle': { kk: 'Қайнар колледжінің зияткерлік қауіпсіздік порталы. Біз сіздің қауіпсіздігіңіз үшін жұмыс істейміз.', ru: 'Интеллектуальный портал безопасности Колледжа Кайнар. Мы работаем ради вашей безопасности.', en: 'Intellectual security portal of Kainar College. We work for your safety.' },
  'home.sos.confirm': { kk: 'Шұғыл дабыл қағуды растайсыз ба?', ru: 'Вы действительно подтверждаете сигнал тревоги?', en: 'Are you sure you want to trigger the emergency alarm?' },
  'home.sos.sent': { kk: 'Дабыл жіберілді! Әкімшілікке хабарланды.', ru: 'Сигнал отправлен! Администрация оповещена.', en: 'Alarm sent! Administration has been notified.' },
  'home.sos.title': { kk: 'SOS', ru: 'SOS', en: 'SOS' },
  'home.sos.btn_text': { kk: 'Шұғыл дабыл', ru: 'Экстренная тревога', en: 'Emergency Alarm' },
  
  'home.action.report.title': { kk: 'Төтенше жағдай хабарлау', ru: 'Сообщить о происшествии', en: 'Report Incident' },
  'home.action.report.desc': { kk: 'Оқиға туралы жедел ақпарат беру', ru: 'Предоставить оперативную информацию', en: 'Provide instant details on accidents' },
  'home.action.notif.title': { kk: 'Маңызды хабарламалар', ru: 'Важные сообщения', en: 'Important Notifications' },
  'home.action.notif.desc': { kk: 'Ескертулер мен жаңалықтар', ru: 'Предупреждения и новости', en: 'Warnings and current safety feed' },
  'home.action.contacts.title': { kk: 'Шұғыл байланыс', ru: 'Экстренные контакты', en: 'Emergency Contacts' },
  'home.action.contacts.desc': { kk: 'Қажетті телефон нөмірлері', ru: 'Необходимые номера телефонов', en: 'Critical emergency telephone numbers' },
  
  'home.feat.map.title': { kk: 'Интерактивті карта', ru: 'Интерактивная карта', en: 'Interactive Road Map' },
  'home.feat.map.desc': { kk: 'Колледж аумағындағы қауіпсіз бағыттарды, бейнекамераларды және эвакуация жолдарын көріңіз.', ru: 'Просмотр безопасных маршрутов, видеокамер и путей эвакуации территории колледжа.', en: 'Explore safe pedestrian paths, CCTV zones, and rescue routes on campus.' },
  'home.feat.map.btn': { kk: 'Картаны ашу →', ru: 'Открыть карту →', en: 'Open Map →' },
  'home.feat.quiz.title': { kk: 'Онлайн тест', ru: 'Онлайн тест', en: 'Online Quiz' },
  'home.feat.quiz.desc': { kk: 'Өз біліміңізді тексеріңіз. Қауіпсіздік ережелері бойынша тест тапсырып, нәтижеңізді біліңіз.', ru: 'Проверьте свои знания. Пройдите тест по правилам безопасности и узнайте свой результат.', en: 'Verify your safety competence. Take the rules test and view your results instantly.' },
  'home.feat.quiz.btn': { kk: 'Тестті бастау →', ru: 'Начать тест →', en: 'Start Test →' },

  // Report Form Page
  'report.header': { kk: 'Оқиға хабарлау', ru: 'Сообщить об инциденте', en: 'Report Incident' },
  'report.subheader': { kk: 'Төтенше жағдай немесе қауіп туралы жедел ақпарат беріңіз', ru: 'Срочно предоставьте информацию о ЧС или угрозе безопасности', en: 'Urgetly notify us of emergencies, hazards, or technical faults' },
  'report.success': { kk: 'Хабарлама сәтті жіберілді! Әкімшілік жақын арада шара қолданады.', ru: 'Сообщение успешно отправлено! Администрация примет меры в ближайшее время.', en: 'Report successfully submitted. Administration will initiate reaction protocols.' },
  'report.error': { kk: 'Қате кетті. Қайтадан көріңіз.', ru: 'Произошла ошибка. Пожалуйста, попробуйте еще раз.', en: 'An error occurred. Please try again later.' },
  'report.label.name': { kk: 'Аты-жөні', ru: 'ФИО', en: 'Full Name' },
  'report.placeholder.name': { kk: 'Мысалы: Асан Үсенов', ru: 'Например: Иван Иванов', en: 'Example: John Doe' },
  'report.label.group': { kk: 'Топ / Бөлім', ru: 'Группа / Отдел', en: 'Class Group / Department' },
  'report.placeholder.group': { kk: 'Мысалы: ИС-22', ru: 'Например: ИС-22', en: 'Example: IS-22' },
  'report.label.type': { kk: 'Оқиға түрі', ru: 'Тип инцидента', en: 'Incident Type' },
  'report.type.fight': { kk: 'Төбелес / Агрессия', ru: 'Драка / Агрессия', en: 'Fight / Active Aggression' },
  'report.type.fire': { kk: 'Өрт / Түтін', ru: 'Пожар / Дым', en: 'Fire / Visible Smoke' },
  'report.type.medical': { kk: 'Медициналық көмек қажет', ru: 'Требуется медпомощь', en: 'Medical Emergencies' },
  'report.type.suspicious': { kk: 'Күдікті зат / Адам', ru: 'Подозрительный предмет / Человек', en: 'Suspicious object or person' },
  'report.type.violation': { kk: 'Тәртіп бұзушылық', ru: 'Нарушение порядка', en: 'Disburbance / Rule Violation' },
  'report.type.other': { kk: 'Басқа', ru: 'Другое', en: 'Other incident context' },
  'report.label.location': { kk: 'Оқиға орны', ru: 'Место происшествия', en: 'Occurrence Location' },
  'report.placeholder.location': { kk: 'Мысалы: 3 қабат, 305 дәрісхана', ru: 'Например: 3 этаж, 305 аудитория', en: 'Example: Floor 3, Lecture room 305' },
  'report.label.datetime': { kk: 'Күні мен уақыты', ru: 'Дата и время', en: 'Incident Date & Time' },
  'report.label.description': { kk: 'Сипаттама', ru: 'Описание происшествия', en: 'Detailed Description' },
  'report.placeholder.description': { kk: 'Оқиғаны толық сипаттаңыз...', ru: 'Подробно опишите произошедшее...', en: 'Provide a complete summary of the incident...' },
  'report.label.media': { kk: 'Фото немесе видео (URL сілтемесі)', ru: 'Фото или видео (ссылка URL)', en: 'Media attachment (URL Link)' },
  'report.placeholder.media': { kk: 'https://...', ru: 'https://...', en: 'https://...' },
  'report.hint.media': { kk: 'Бұлтты қоймаға жүктелген файл сілтемесін енгізіңіз.', ru: 'Введите ссылку на файл, загруженный в облачное хранилище.', en: 'Insert a cloud-hosted URL link holding photos/recordings' },
  'report.btn.submit': { kk: 'Жіберу', ru: 'Отправить сообщение', en: 'Submit Emergency Report' },
  'report.btn.submitting': { kk: 'Жіберілуде...', ru: 'Отправка...', en: 'Submitting Report...' },

  // Road Safety Page
  'road.title': { kk: 'Жол қауіпсіздігі', ru: 'Дорожная безопасность', en: 'Road Safety guidelines' },
  'road.subtitle': { kk: 'Колледж аумағындағы және оның маңындағы қауіпсіз қозғалыс ережелері мен маршруттары.', ru: 'Правила и безопасные маршруты передвижения на территории колледжа и прилегающих зонах.', en: 'Official protocols for risk-minimizing transit on and around college perimeters.' },
  'road.view_large': { kk: 'Үлкейтіп көру', ru: 'Открыть во весь экран', en: 'Zoom in view' },
  'road.download_map': { kk: 'Картаны жүктеу', ru: 'Скачать карту', en: 'Download Map' },
  'road.caption': { kk: '* Картада Қабанбай батыр көшесі мен Қаным Мұхамедханов даңғылы қиылысы, жаяу жүргінші өткелдері мен тұрақтар көрсетілген.', ru: '* На карте показаны перекресток улицы Кабанбай батыра и проспекта Каныма Мухамедханова, пешеходные переходы и парковки.', en: '* The map depicts the critical intersection of Kabanbay Batyr and Kanym Mukhamedkhanov road lines, crossroads, and designated parking docks.' },
  'road.project_files': { kk: 'Жол қауіпсіздігі жобасының файлдары', ru: 'Файлы проекта дорожной безопасности', en: 'Road Safety Project Monographs' },
  'road.project_files_desc': { kk: 'Колледж аумағындағы және маңындағы жол қозғалысын оңтайландыру жобасының ресми нұсқалары.', ru: 'Официальные версии проектов исследовательских работ по оптимизации дорожного движения возле колледжа.', en: 'Comprehensive safety proposal documents regarding pedestrian route structural enhancements.' },
  'road.btn_view': { kk: 'Көру', ru: 'Просмотр', en: 'Preview' },
  'road.btn_download': { kk: 'Жүктеу', ru: 'Скачать', en: 'Download File' },
  'road.rules.pedestrian': { kk: 'Жаяу жүргіншілерге нұсқаулық', ru: 'Инструкции для пешеходов', en: 'Rules for Pedestrians' },
  'road.rules.p1': { kk: 'Жолды тек белгіленген өткелдерден (зебра) өтіңіз.', ru: 'Переходите дорогу только по обозначенным переходам (зебре).', en: 'Cross roads exclusively via striped designated pathways (zebra lines).' },
  'road.rules.p2': { kk: 'Жолдан өтерде телефонға қарамаңыз және құлаққапты шешіңіз.', ru: 'Не отвлекайтесь на телефон и снимите наушники при переходе.', en: 'Store your phone and detach audio earphones before stepping onto crosswalks.' },
  'road.rules.p3': { kk: 'Көліктердің толық тоқтағанына көз жеткізіңіз.', ru: 'Убедитесь, что все транспортные средства полностью остановились.', en: 'Verify oncoming vehicles have decelerated to a absolute standstill.' },
  'road.rules.p4': { kk: 'Қараңғы уақытта жарық шағылыстыратын элементтерді тағыңыз.', ru: 'Носите светоотражающие элементы на одежде в темное время суток.', en: 'Wear reflective clothes/elements during nighttime or low-visibility weather.' },
  'road.rules.driver': { kk: 'Көлік жүргізушілеріне нұсқаулық', ru: 'Инструкции для водителей', en: 'Rules for Vehicle Drivers' },
  'road.rules.d1': { kk: 'Колледж аумағында жылдамдықты 20 км/сағ асырмаңыз.', ru: 'Не превышайте скорость 20 км/ч на территории колледжа.', en: 'Respect a strict Speed limit of 20 km/h inside college zones.' },
  'road.rules.d2': { kk: 'Көлікті тек рұқсат етілген тұрақтарға қойыңыз.', ru: 'Паркуйте автомобили только в разрешенных парковочных местах.', en: 'Secure vehicles strictly at official parking docks.' },
  'road.rules.d3': { kk: 'Жаяу жүргіншілерге әрқашан жол беріңіз.', ru: 'Всегда уступайте дорогу пешеходам.', en: 'Always grant absolute right of way to walking pedestrians.' },
  'road.rules.d4': { kk: 'Эвакуациялық шығу жолдарын жаппаңыз.', ru: 'Никогда не блокируйте аварийные и эвакуационные выезды.', en: 'Never block evacuation fire exits or emergency driveway lanes.' },

  // Evacuation Page
  'evac.title': { kk: 'Эвакуация жоспары', ru: 'Планы эвакуации', en: 'Evacuation Plans Portfolio' },
  'evac.subtitle': { kk: 'Төтенше жағдай кезінде ғимараттан қауіпсіз шығу сызбалары мен эвакуациялық карталар.', ru: 'Официальные графические схемы безопасного выхода из здания колледжа и эвакуационные карты.', en: 'Official architectural floor maps showing rescue directions and assembly locations.' },
  'evac.desc_floor': { kk: 'Өртке қарсы құралдар мен шығу бағыттарының орналасу орындарын көрсететін ресми схема.', ru: 'Официальная схема расположения средств пожаротушения, пожарных кранов и направлений выходов.', en: 'Structural graphic plotting firefighting implements, alarms, and safe exit routes.' },
  'evac.poster_title': { kk: 'Тік эвакуациялық плакат', ru: 'Вертикальный эвакуационный плакат', en: 'Vertical Escape Sign Post' },
  'evac.poster_desc': { kk: 'Ғимарат дәліздеріндегі ресми мемлекеттік қауіпсіздік нұсқаулығы. Төтенше жағдайдағы іс-әрекет алгоритмі.', ru: 'Официальный информационный стенд правил пожарной безопасности в коридорах колледжа.', en: 'Standardized regulatory hazard guidance board mounted along hallway structures.' },
  'evac.rules_title': { kk: 'Эвакуация кезіндегі басты ережелер', ru: 'Главные правила при эвакуации', en: 'Key Life-saving Evacuation Rules' },
  'evac.rule1.title': { kk: 'Сабырлық сақтау', ru: 'Сохраняйте спокойствие', en: 'Stay Calm' },
  'evac.rule1.desc': { kk: 'Дүрбелеңге түспеңіз. Үрейді жеңіп, ұйымдасқан түрде, сабыр сақтап, мұғалімдердің нұсқауын тыңдаңыз.', ru: 'Не паникуйте. Сохраняйте самообладание и четко выполняйте команды преподавателей.', en: 'Repress feelings of panic. Move in a disciplined collective structure under staff guidance.' },
  'evac.rule2.title': { kk: 'Жеке заттарды қалдыру', ru: 'Оставьте личные вещи', en: 'Abandon Personal Luggage' },
  'evac.rule2.desc': { kk: 'Құжаттардан басқа ауыр заттарды жинауға уақыт жоғалтпаңыз. Ең бастысы - сіздің өміріңіз.', ru: 'Не тратьте драгоценное время на сбор сумок и учебников. Жизнь и здоровье важнее всего.', en: 'Do not delay escape by collecting heavy bags or clothes. Your physical exit is paramount.' },
  'evac.rule3.title': { kk: 'Бағыт бойынша қозғалу', ru: 'Двигайтесь по указателям', en: 'Trace Luminous Exits' },
  'evac.rule3.desc': { kk: 'Дәліздердегі жасыл түсті «ШЫҒУ» (EMERGENCY EXIT) нұсқағыш жарық белгілерін негізге алып қозғалыңыз.', ru: 'Ориентируйтесь по коридорным настенным светящимся табличкам «ВЫХОД» (EMERGENCY EXIT).', en: 'Orient your escape direction around green-colored glowing "EXIT" signs.' },
  'evac.rule4.title': { kk: 'Қауіпсіз жиналу орны', ru: 'Безопасное место сбора', en: 'Safe Assembly Zone' },
  'evac.rule4.desc': { kk: 'Ғимараттан шыққан бойда сыртта белгіленген қауіпсіз жиналу нүктесіне (автотұрақ аймағына) жиналыңыз.', ru: 'Сразу после выхода соберитесь на безопасной площадке (колледжная парковка).', en: 'Assemble on the designated open-air parking yards away from active response personnel.' },
  'evac.emergency_warning': { kk: 'Төтенше жағдай орын алса, дереу 112 немесе 101 қызметтерін шақырыңыз!', ru: 'При возникновении ЧС незамедлительно вызывайте службы 112 или 101!', en: 'During active hazardous incidents, immediately notify state lines 112 or 101!' },

  // Emergency Actions Page
  'emergency.title': { kk: 'Төтенше жағдай әрекеттері', ru: 'Действия при ЧС', en: 'Emergency Guidelines' },
  'emergency.subtitle': { kk: 'Өрт, жер сілкінісі, террористік қауіп немесе су тасқыны кезіндегі іс-әрекеттердің ресми регламенті.', ru: 'Официальные инструкции поведения при землетрясениях, пожаре, террористических действиях и ЧС.', en: 'Sanctioned workflow directives for handling seismological, fire, or safety threats.' },
  'emergency.p_files': { kk: 'Төтенше жағдайлар бойынша жобалық файлдар', ru: 'Проектные файлы по чрезвычайным ситуациям', en: 'Emergency Management Files' },
  'emergency.p_files_desc': { kk: 'Колледж қауіпсіздік жүйесі мен эвакуацияны ұйымдастыруды жақсарту жөніндегі зерттеу жобасы файлдары.', ru: 'Файлы исследовательского проекта по улучшению эвакуационных планов и обеспечению надежной безопасности.', en: 'Official study papers outlining optimized structural reaction models for emergencies.' },

  // Contacts Page
  'contacts.title': { kk: 'Шұғыл байланыс', ru: 'Экстренные контакты', en: 'Emergency Hotlines' },
  'contacts.subtitle': { kk: 'Төтенше жағдайларда қажет болатын маңызды телефон нөмірлері.', ru: 'Контакты и важные государственные номера телефонов, необходимые в экстренных ситуациях.', en: 'Critical communication numbers and hazard assistance helplines.' },
  'contacts.lbl1': { kk: 'Колледж күзеті', ru: 'Охрана колледжа', en: 'College Security' },
  'contacts.desc1': { kk: 'Тәулік бойы жұмыс істейді. Күдікті жағдайларда хабарласыңыз.', ru: 'Работает круглосуточно. Звоните при любых подозрительных случаях.', en: 'Operational 24/7. Reach out immediately on tracking suspicious tasks.' },
  'contacts.lbl2': { kk: 'Медпункт', ru: 'Медпункт', en: 'Medical Room' },
  'contacts.desc2': { kk: 'Жұмыс уақыты: 08:00 - 18:00. Алғашқы медициналық көмек.', ru: 'Время работы: 08:00 - 18:00. Первая медицинская помощь.', en: 'Shift hours: 08:00 - 18:00. First response medical diagnostics.' },
  'contacts.lbl3': { kk: 'Әкімшілік', ru: 'Администрация', en: 'Administration Office' },
  'contacts.desc3': { kk: 'Жұмыс уақыты: 09:00 - 18:00. Жалпы мәселелер бойынша.', ru: 'Время работы: 09:00 - 18:00. По общим и организационным вопросам.', en: 'Office hours: 09:00 - 18:00. General coordination inquiries.' },
  'contacts.lbl4': { kk: 'Полиция', ru: 'Полиция', en: 'Police Dispatcher' },
  'contacts.desc4': { kk: 'Құқық бұзушылық немесе қылмыс болған жағдайда.', ru: 'При правонарушениях, кражах или угрозе совершения преступлений.', en: 'Notify in events of violent crimes, theft, or order disturbances.' },
  'contacts.lbl5': { kk: 'Өрт сөндіру қызметі', ru: 'Пожарная служба', en: 'Fire & Rescue Service' },
  'contacts.desc5': { kk: 'Өрт немесе түтін байқалған жағдайда.', ru: 'При обнаружении открытого возгорания, сильного задымления или тепла.', en: 'Dial on spotting open ignition sources, smoke, or intense heat.' },
  'contacts.lbl6': { kk: 'Жедел жәрдем', ru: 'Скорая медицинская помощь', en: 'Ambulance Service' },
  'contacts.desc6': { kk: 'Шұғыл медициналық көмек қажет болғанда.', ru: 'При острых заболеваниях, травмах или несчастных случаях.', en: 'Urgent emergency healthcare assistance or transport requests.' },

  // Admin Dashboard
  'admin.title': { kk: 'Әкімшілік панель', ru: 'Панель администратора', en: 'Admin Panel' },
  'admin.desc': { kk: 'Қауіпсіздік жүйесінің ахуалы мен статистикасы, келіп түскен оқиғаларды басқару.', ru: 'Статистика системы безопасности, мониторинг чрезвычайных ситуаций и инцидентов.', en: 'Security portal statistics and emergency event log dispatching controls.' },
  'admin.stats.total_incidents': { kk: 'Жалпы инциденттер', ru: 'Всего инцидентов', en: 'Total Incidents Recorded' },
  'admin.stats.sos_alerts': { kk: 'SOS Дабылдары', ru: 'SOS Сигналы', en: 'SOS Alarms Triggered' },
  'admin.incident_list_title': { kk: 'Келіп түскен хабарламалар тізімі', ru: 'Список поступивших сообщений', en: 'Active Incident Feed' },
  'admin.media_view': { kk: 'Файлды көру', ru: 'Просмотр медиа', en: 'View Attachment' },
  'admin.no_incidents': { kk: 'Қазіргі уақытта белсенді хабарламалар жоқ.', ru: 'В настоящее время нет активных сообщений.', en: 'Currently there are zero active emergency messages.' },
  'admin.reset_btn': { kk: 'Бастапқы қалпына келтіру', ru: 'Сбросить базу данных', en: 'Reset Database to Default' },
  'admin.file_sync_title': { kk: 'Файлдарды серверлік дискпен үндестіру', ru: 'Синхронизация файлов на диск сервера', en: 'Sync Local Files to Server Disk' },
  'admin.file_sync_desc': { kk: 'Осы панельден жүктелген немесе өзгертілген жоба құжаттарын сервердің .ts файлына жазып, тұрақты сақтау.', ru: 'Прямая синхронизация всех загруженных документов в постоянные структуры данных .ts на сервере.', en: 'Save uploaded and customized safety texts straight into permanent Node.js TS structures.' },
  'admin.btn_save_server': { kk: 'Серверге сақтау', ru: 'Сохранить на сервере', en: 'Write to Server Disk' },

  // Notifications Page
  'notif.title': { kk: 'Маңызды хабарламалар', ru: 'Важные объявления', en: 'Important Announcements' },
  'notif.desc': { kk: 'Колледж әкімшілігінен соңғы ескертулер мен жаңалықтар.', ru: 'Последние официальные предупреждения и новости от администрации колледжа.', en: 'Active hazard notices and recent informational alerts.' },
  'notif.badge.warning': { kk: 'Қауіпті ескерту', ru: 'Внимание', en: 'Warning' },
  'notif.badge.info': { kk: 'Шара', ru: 'Событие', en: 'Info' },
  'notif.badge.success': { kk: 'Аяқталды', ru: 'Завершено', en: 'Completed' },

  // Safety Memos / Rules Page
  'memos.title': { kk: 'Қауіпсіздік ережелері', ru: 'Правила безопасности (памятки)', en: 'Safety Memorandums' },
  'memos.subtitle': { kk: 'Түрлі төтенше жағдайларда өзіңізді қалай ұстау керек? Пайдалы нұсқаулықтар.', ru: 'Как вести себя в различных чрезвычайных ситуациях? Полезные наглядные памятки.', en: 'Structured rules explaining optimal response patterns facing various situations.' },

  // CCTV / Camera View
  'cctv.tag.live': { kk: 'ТІКЕЛЕЙ ЭФИР', ru: 'ПРЯМОЙ ЭФИР', en: 'LIVE STREAM' },
  'cctv.latency': { kk: 'Жүйе кідірісі', ru: 'Задержка сети', en: 'Latency' },
  'cctv.btn.stop_smoke': { kk: 'Сынамалы Отты өшіру', ru: 'Выключить огонь', en: 'Toggle Fire Off' },
  'cctv.btn.test_smoke': { kk: 'От ошағын сынау', ru: 'Тест возгорания', en: 'Simulate Fire' },
  'cctv.btn.stop_person': { kk: 'Адамды өшіру', ru: 'Убрать человека', en: 'Toggle Person Off' },
  'cctv.btn.test_person': { kk: 'Адамды сынау', ru: 'Тест движения', en: 'Simulate Human' },
  'cctv.btn.sound_on': { kk: 'Дыбысты дабыл: ҚОСУЛЫ', ru: 'Звуковая сирена: ВКЛ', en: 'Siren State: ON' },
  'cctv.btn.sound_off': { kk: 'Дыбысты дабыл: ӨШІРУЛІ', ru: 'Звуковая сирена: ВЫКЛ', en: 'Siren State: OFF' },
  'cctv.ai_controls': { kk: 'AI Интерактивті Басқару Панелі', ru: 'Интерактивная панель управления AI', en: 'AI Control Panel' },
  'cctv.person_mod': { kk: 'Адамды анықтау модулі', ru: 'Модуль обнаружения человека', en: 'Human Detection Module' },
  'cctv.person_mod_sub': { kk: 'Live Траектория сызуы', ru: 'Черчение траекторий в реальном времени', en: 'Realtime Trajectory Mapping' },
  'cctv.fire_mod': { kk: 'Түтін мен От бақылаушысы', ru: 'Детектор огня и задымления', en: 'Fire & Smoke Detection' },
  'cctv.fire_mod_sub': { kk: 'Пиксельді сканер', ru: 'Пиксельный сканер задымления', en: 'Computer Vision Color Scanner' },
  'cctv.emergency_notif_test': { kk: 'Шұғыл ауқымды хабарландыру тесті', ru: 'Тестирование систем экстренного оповещения', en: 'Emergency Notification Test Center' },
  'cctv.btn_sms': { kk: '☎️ SMS жіберу', ru: '☎️ Сигнал через SMS', en: '☎️ Send Broadcast SMS' },
  'cctv.btn_email': { kk: '✉️ Email жіберу', ru: '✉️ Сигнал через Email', en: '✉️ Send Broadcast email' },
  'cctv.btn_push': { kk: '🔔 Тест Push хабарландыруы', ru: '🔔 Тест Push-нотификаций', en: '🔔 Send Push Alert' },
  'cctv.feed_select': { kk: 'Камераны таңдаңыз', ru: 'Выберите видеокамеру', en: 'Select Camera Feed' },
  'cctv.logs_title': { kk: 'Жүйелік белсенділік пен AI Оқиғалар Журналы', ru: 'Системный лог и AI журнал активности', en: 'Active System Log & Computer Vision Events' },
  'cctv.active': { kk: 'Қосулы', ru: 'Активно', en: 'Active' },
  'cctv.inactive': { kk: 'Өшірулі', ru: 'Неактивно', en: 'Inactive' },
  'cctv.add_analytics_module': { kk: 'Аналитикалық модульді қосу', ru: 'Добавить модуль аналитики', en: 'Add Analytics Module' },
  'cctv.lbl_webcam_replica': { kk: 'Ноутбуктің Live камерасы', ru: 'Реальная веб-камера ноутбука', en: 'Laptop Native Webcam' },

  // Game / Quiz Module
  'game.header': { kk: 'Қауіпсіздік негіздері бойынша оқу ойыны', ru: 'Игра по основам безопасности', en: 'Interactive Safety Quiz Game' },
  'game.intro': { kk: 'Тест сұрақтарына жылдам жауап беріп, ұпай жинаңыз. Ойын соңында білім деңгейіңіздің сертификатын алыңыз!', ru: 'Ответьте на вопросы по технике безопасности, наберите очки и получите сертификат!', en: 'Complete multiple-choice questions assessing safety rules, collect points and secure a certificate!' },
  'game.score': { kk: 'Ұпай', ru: 'Очки', en: 'Points' },
  'game.question': { kk: 'Сұрақ', ru: 'Вопрос', en: 'Question' },
  'game.of': { kk: '-тен', ru: 'из', en: 'of' },
  'game.game_over': { kk: 'Ойын аяқталды!', ru: 'Игра завершена!', en: 'Game Finished!' },
  'game.your_score': { kk: 'Сіздің нәтижеңіз', ru: 'Ваш результат', en: 'Your final score' },
  'game.perfect': { kk: 'Тамаша! Сіз қауіпсіздік ережелерін өте жақсы білесіз.', ru: 'Отлично! Вы превосходно знаете правила безопасности.', en: 'Outstanding! You possess an impeccable grasp of security rules.' },
  'game.good': { kk: 'Керемет! Бірақ кейбір тұстарды қайталау артық етпейді.', ru: 'Хорошо! Однако рекомендуем освежить некоторые правила.', en: 'Good! However, reviewing details on several emergency scenarios is advised.' },
  'game.normal': { kk: 'Қанағаттанарлық. Қауіпсіздік ережелерін мұқият оқып шығуды ұсынамыз.', ru: 'Удовлетворительно. Рекомендуем еще раз детально изучить памятки.', en: 'Satisfactory. We highly recommend reviewing safety guides and fire paths.' },
  'game.restart': { kk: 'Қайта бастау', ru: 'Начать сначала', en: 'Try Again / Restart' },
  'game.download_cert': { kk: 'Сертификатты жүктеу (PDF)', ru: 'Скачать сертификат (PDF)', en: 'Download Certificate (PDF)' },
  'game.cert_title': { kk: 'ҚАУІПСІЗДІК СЕРТИФИКАТЫ', ru: 'СЕРТИФИКАТ БЕЗОПАСНОСТИ', en: 'SAFETY PROFICIENCY CERTIFICATE' },
  'game.cert_p1': { kk: 'Осы құжат білім порталында сәтті аттестаттаудан өткені үшін берілді:', ru: 'Настоящий сертификат подтверждает успешное прохождение теста:', en: 'This document certifies successful passing of safety rules training on portal:' }
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    // Clear any previous persistent storage so initial load is always Kazakh ('kk')
    try {
      localStorage.removeItem('kainar_portal_lang');
    } catch {
      // ignore
    }

    // If language was explicitly changed in current active tab session:
    try {
      const sessionLang = sessionStorage.getItem('kainar_portal_lang');
      if (sessionLang === 'kk' || sessionLang === 'ru' || sessionLang === 'en') {
        return sessionLang as Language;
      }
    } catch {
      // ignore
    }

    // Default: Always open in Kazakh on first open
    return 'kk';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      sessionStorage.setItem('kainar_portal_lang', newLang);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key: string): string => {
    const dict = translations[key];
    if (!dict) {
      // Return key itself if translation is missing, as a fallback
      return key;
    }
    return dict[lang] || dict['kk'] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
