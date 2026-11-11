import { motion } from 'motion/react';
import { Bell, AlertTriangle, Info, CheckCircle } from 'lucide-react';
import { clsx } from 'clsx';
import { useLanguage } from '../context/LanguageContext';

const textDict = {
  kk: {
    pageTitle: "Маңызды хабарламалар",
    pageSubtitle: "Колледж әкімшілігінен соңғы ескертулер мен жаңалықтар.",
    notifs: [
      {
        id: 1,
        title: 'Дауылды ескерту',
        content: 'Құрметті студенттер мен оқытушылар! Бүгін кешке қатты жел мен жауын-шашын күтілуде. Сақ болыңыздар.',
      },
      {
        id: 2,
        title: 'Оқу-жаттығу жиыны',
        content: 'Ертең сағат 11:00-де өрт қауіпсіздігі бойынша жоспарлы оқу-жаттығу эвакуациясы өтеді. Барлықтарыңыздың қатысуларыңыз сұралады.',
      },
      {
        id: 3,
        title: 'Жөндеу жұмыстары аяқталды',
        content: 'Басты ғимараттың 2-ші қабатындағы жөндеу жұмыстары толық аяқталды. Дәліз ашық.',
      }
    ]
  },
  ru: {
    pageTitle: "Важные объявления",
    pageSubtitle: "Последние оповещения и важные объявления от администрации колледжа.",
    notifs: [
      {
        id: 1,
        title: 'Штормовое предупреждение',
        content: 'Уважаемые студенты и преподаватели! Сегодня вечером ожидается шквальный ветер и обильные осадки. Будьте предельно осторожны на улице.',
      },
      {
        id: 2,
        title: 'Плановая тренировочная эвакуация',
        content: 'Завтра в 10:00 состоится плановая учебная тренировка по противопожарной эвакуации. Участие всех находящихся в здании строго обязательно.',
      },
      {
        id: 3,
        title: 'Ремонтные работы завершены',
        content: 'Ремонтные работы на 2-м этаже главного корпуса успешно завершены. Коридоры полностью открыты для свободного прохода.',
      }
    ]
  },
  en: {
    pageTitle: "Critical Broadcasts",
    pageSubtitle: "Latest official press releases and warning indices from the administration desk.",
    notifs: [
      {
        id: 1,
        title: 'Extreme Weather Warning',
        content: 'Dear students & personnel: Heavy precipitation and high intensity winds are expected tonight. Please exercise extreme caution.',
      },
      {
        id: 2,
        title: 'Planned Evacuation Drill',
        content: 'A scheduled fire drill evacuation simulation will occur tomorrow at 11:00 AM. 100% participation of on-site students is expected.',
      },
      {
        id: 3,
        title: 'Restoration Works Completed',
        content: 'Civil reconstruction on floor 2 main campus is fully completed. Access paths and hallways are fully reopened.',
      }
    ]
  }
};

export function Notifications() {
  const { lang } = useLanguage();
  const d = textDict[lang] || textDict['kk'];

  const staticConfig = [
    {
      id: 1,
      type: 'warning',
      date: '2026-10-06 14:30',
      icon: AlertTriangle,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      border: 'border-amber-200'
    },
    {
      id: 2,
      type: 'info',
      date: '2026-09-21 10:00',
      icon: Info,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-200'
    },
    {
      id: 3,
      type: 'success',
      date: '2026-09-01 16:45',
      icon: CheckCircle,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto space-y-8 animate-fade-in"
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center shadow-md shrink-0">
          <Bell className="w-8 h-8 animate-pulse" />
        </div>
        <div>
          <h1 className="text-4xl font-extrabold text-slate-950 mb-2 tracking-tight">{d.pageTitle}</h1>
          <p className="text-slate-600 font-medium">{d.pageSubtitle}</p>
        </div>
      </div>

      <div className="space-y-6">
        {staticConfig.map((item) => {
          const trans = d.notifs.find(n => n.id === item.id) || d.notifs[0];
          const Icon = item.icon;
          return (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              className={clsx(
                'bg-white rounded-3xl p-6 md:p-8 shadow-sm border transition-all hover:shadow-xl hover:scale-[1.01] relative overflow-hidden',
                item.border
              )}
            >
              <div className={clsx('absolute top-0 left-0 w-2 h-full', item.bg.replace('50', '500'))} />
              <div className="flex gap-6">
                <div className={clsx('w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm', item.bg)}>
                  <Icon className={clsx('w-6 h-6', item.color)} />
                </div>
                <div className="flex-grow">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                    <h3 className="text-xl font-bold text-slate-900 leading-tight">{trans.title}</h3>
                    <span className="text-xs font-bold font-mono text-slate-500 bg-slate-100 px-3 py-1 rounded-full w-fit">
                      {item.date}
                    </span>
                  </div>
                  <p className="text-slate-700 leading-relaxed font-medium text-sm">{trans.content}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
