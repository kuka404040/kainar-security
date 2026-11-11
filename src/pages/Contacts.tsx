import { motion } from 'motion/react';
import { Phone, Shield, HeartPulse, Building2, Flame } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const textDict = {
  kk: {
    title: "Шұғыл байланыс",
    subtitle: "Төтенше жағдайларда қажет болатын маңызды телефон нөмірлері.",
    guardTitle: "Колледж күзеті",
    guardDesc: "Тәулік бойы жұмыс істейді. Күдікті жағдайларда хабарласыңыз.",
    clinicTitle: "Медпункт",
    clinicDesc: "Жұмыс уақыты: 08:00 - 18:00. Алғашқы медициналық көмек.",
    adminTitle: "Әкімшілік",
    adminDesc: "Жұмыс уақыты: 09:00 - 18:00. Жалпы мәселелер бойынша.",
    policeTitle: "Полиция",
    policeDesc: "Құқық бұзушылық немесе қылмыс болған жағдайда.",
    fireTitle: "Өрт сөндіру қызметі",
    fireDesc: "Өрт немесе түтін байқалған жағдайда.",
    ambulanceTitle: "Жедел жәрдем",
    ambulanceDesc: "Шұғыл медициналық көмек қажет болғанда."
  },
  ru: {
    title: "Экстренные контакты",
    subtitle: "Важные телефонные номера, которые могут понадобиться в чрезвычайных ситуациях.",
    guardTitle: "Охрана колледжа",
    guardDesc: "Работает круглосуточно. Звоните при подозрении на угрозу безопасности.",
    clinicTitle: "Медпункт",
    clinicDesc: "Время работы: 08:00 - 18:00. Первая медицинская помощь.",
    adminTitle: "Администрация",
    adminDesc: "Время работы: 09:00 - 18:00. По общим и правовым вопросам.",
    policeTitle: "Полиция",
    policeDesc: "В случае правонарушений, краж или преступлений.",
    fireTitle: "Пожарная служба",
    fireDesc: "При обнаружении задымления, пожара или возгорания.",
    ambulanceTitle: "Скорая медицинская помощь",
    ambulanceDesc: "При угрозе жизни и необходимости срочной госпитализации."
  },
  en: {
    title: "Emergency Contacts",
    subtitle: "Critical phone numbers and hotlines for immediate physical safety or health assistance.",
    guardTitle: "College Security Guard",
    guardDesc: "Operational 24/7. Call immediately on recognizing physical threats.",
    clinicTitle: "First Aid Clinic",
    clinicDesc: "Shift: 08:00 - 18:00. Urgent healthcare assistance.",
    adminTitle: "Administration Desk",
    adminDesc: "Shift: 09:00 - 18:00. General enquiries or registration.",
    policeTitle: "Police Department",
    policeDesc: "Report active crimes, physical attacks, or public property destruction.",
    fireTitle: "Fire Dispatch Service",
    fireDesc: "Report smoke emissions, gas leaks, or active fires.",
    ambulanceTitle: "Ambulance Station",
    ambulanceDesc: "Immediate medical emergency transport or resuscitation."
  }
};

export function Contacts() {
  const { lang } = useLanguage();
  const d = textDict[lang] || textDict['kk'];

  const contacts = [
    {
      title: d.guardTitle,
      phone: '+7 (727) 123-45-67',
      desc: d.guardDesc,
      icon: Shield,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-100'
    },
    {
      title: d.clinicTitle,
      phone: '+7 (708) 692-52-42',
      desc: d.clinicDesc,
      icon: HeartPulse,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-100'
    },
    {
      title: d.adminTitle,
      phone: '+7 (705) 339-74-76',
      desc: d.adminDesc,
      icon: Building2,
      color: 'text-slate-600',
      bg: 'bg-slate-50',
      border: 'border-slate-200'
    },
    {
      title: d.policeTitle,
      phone: '102',
      desc: d.policeDesc,
      icon: Phone,
      color: 'text-slate-900',
      bg: 'bg-slate-100',
      border: 'border-slate-300'
    },
    {
      title: d.fireTitle,
      phone: '101',
      desc: d.fireDesc,
      icon: Flame,
      color: 'text-red-600',
      bg: 'bg-red-50',
      border: 'border-red-100'
    },
    {
      title: d.ambulanceTitle,
      phone: '103',
      desc: d.ambulanceDesc,
      icon: HeartPulse,
      color: 'text-red-600',
      bg: 'bg-red-50',
      border: 'border-red-100'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-12 animate-fade-in"
    >
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-extrabold text-slate-950 mb-4 tracking-tight">{d.title}</h1>
        <p className="text-lg text-slate-600 font-medium">{d.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contacts.map((contact, index) => {
          const Icon = contact.icon;
          return (
            <div 
              key={index} 
              className={`bg-white rounded-3xl p-8 shadow-sm border ${contact.border} hover:shadow-xl hover:scale-[1.02] transition-all group flex flex-col h-full`}
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shrink-0 ${contact.bg}`}>
                <Icon className={`w-8 h-8 ${contact.color}`} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">{contact.title}</h3>
              <p className="text-slate-500 mb-6 flex-grow font-medium text-sm leading-relaxed">{contact.desc}</p>
              <a 
                href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`}
                className={`inline-flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold text-lg transition-colors cursor-pointer ${contact.bg} ${contact.color} hover:bg-slate-950 hover:text-white`}
              >
                <Phone className="w-5 h-5 animate-pulse" />
                {contact.phone}
              </a>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
