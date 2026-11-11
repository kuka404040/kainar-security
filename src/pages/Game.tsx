import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Gamepad2, Timer, Trophy, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const questionDict = {
  kk: [
    {
      id: 1,
      scenario: 'Колледж дәлізінде өрт дабылы іске қосылды. Сіздің әрекетіңіз?',
      options: [
        { text: 'Терезеден секіремін', correct: false },
        { text: 'Лифтке мініп, төмен түсемін', correct: false },
        { text: 'Мұғалімнің нұсқауын тыңдап, баспалдақпен эвакуация жоспарына сай шығамын', correct: true },
        { text: 'Заттарымды жинау үшін аудиторияға қайтамын', correct: false },
      ]
    },
    {
      id: 2,
      scenario: 'Жер сілкінісі басталды. Сіз 3-ші қабаттасыз.',
      options: [
        { text: 'Далаға қарай жүгіремін', correct: false },
        { text: 'Мықты үстелдің астына немесе ішкі бұрышқа тұрамын', correct: true },
        { text: 'Терезенің жанына барып қараймын', correct: false },
        { text: 'Лифтпен төмен түсемін', correct: false },
      ]
    },
    {
      id: 3,
      scenario: 'Дәлізде иесіз күдікті сөмке жатыр.',
      options: [
        { text: 'Ішінде не бар екенін ашып қараймын', correct: false },
        { text: 'Оны басқа жерге апарып тастаймын', correct: false },
        { text: 'Ешкімге айтпай өтіп кетемін', correct: false },
        { text: 'Оған тиіспей, дереу күзетке немесе мұғалімге хабарлаймын', correct: true },
      ]
    }
  ],
  ru: [
    {
      id: 1,
      scenario: 'В коридоре колледжа сработала пожарная тревога. Ваши действия?',
      options: [
        { text: 'Буду прыгать из окна квартиры или класса', correct: false },
        { text: 'Воспользуюсь лифтом для быстрого спуска', correct: false },
        { text: 'Выйду по лестнице согласно плану эвакуации, следуя указаниям преподавателя', correct: true },
        { text: 'Вернусь в аудиторию за личными вещами и рюкзаком', correct: false },
      ]
    },
    {
      id: 2,
      scenario: 'Началось сильное землетрясение. Вы находитесь на 3-м этаже.',
      options: [
        { text: 'Немедленно побегу вниз на улицу', correct: false },
        { text: 'Укроюсь под прочным столом или встану в проеме внутренней несущей стены', correct: true },
        { text: 'Подойду поближе к окну посмотреть на улицу', correct: false },
        { text: 'Воспользуюсь лифтом для спуска', correct: false },
      ]
    },
    {
      id: 3,
      scenario: 'В коридоре лежит подозрительная бесхозная сумка или рюкзак.',
      options: [
        { text: 'Открою и проверю её содержимое', correct: false },
        { text: 'Перенесу её в другое, более безопасное место', correct: false },
        { text: 'Пройду мимо, решив проигнорировать ситуацию', correct: false },
        { text: 'Не прикасаясь к предмету, немедленно сообщу дежурному преподавателю или охране', correct: true },
      ]
    }
  ],
  en: [
    {
      id: 1,
      scenario: 'The fire alarm is triggered in the hallway. What are your immediate actions?',
      options: [
        { text: 'Jump out of the window', correct: false },
        { text: 'Ride the passenger lift down to escape', correct: false },
        { text: 'Follow teachers guidance and exit via stairs following evacuation layouts', correct: true },
        { text: 'Return inside class to pick up my personal backpack', correct: false },
      ]
    },
    {
      id: 2,
      scenario: 'An earthquake began. You are currently positioned on Floor 3.',
      options: [
        { text: 'Sprint immediately out to the courtyard', correct: false },
        { text: 'Hide under a robust desk or stand next to an inner structural load wall', correct: true },
        { text: 'Walk closely to window grid to evaluate the damage', correct: false },
        { text: 'Take the elevator immediately to descend', correct: false },
      ]
    },
    {
      id: 3,
      scenario: 'An abandoned suspicious looking case/backpack is detected in the corridor.',
      options: [
        { text: 'Open it up to investigate the inner items', correct: false },
        { text: 'Discard or carry it into a different sector', correct: false },
        { text: 'Pass by and assume it is safe to ignore', correct: false },
        { text: 'Do not touch it; immediately report to the guard desk or responsible staff', correct: true },
      ]
    }
  ]
};

const textDict = {
  kk: {
    heroTitle: "Қауіпсіздік симуляторы",
    heroDesc: "Төтенше жағдайларда дұрыс шешім қабылдауды үйреніңіз.",
    badgeSim: "СИМУЛЯТОР",
    ready: "Дайынсыз ба?",
    readyDesc: "Сізге әртүрлі төтенше жағдайлар ұсынылады. Берілген уақыт ішінде ең дұрыс және қауіпсіз әрекетті таңдауыңыз керек.",
    startBtn: "Ойынды бастау",
    situation: "Жағдай",
    totalPoints: "ұпай",
    gameOver: "Ойын аяқталды!",
    scorePerfect: "Керемет! Сіз қауіпсіздік ережелерін өте жақсы білесіз.",
    scoreGood: "Жақсы нәтиже, бірақ қауіпсіздік ережелерін қайталап оқуға кеңес береміз.",
    retryBtn: "Қайта ойнау"
  },
  ru: {
    heroTitle: "Симулятор безопасности",
    heroDesc: "Научитесь принимать жизненно важные решения в экстренных ситуациях.",
    badgeSim: "СИМУЛЯТОР",
    ready: "Вы готовы?",
    readyDesc: "Вам будут предложены различные кризисные ситуации. Выберите наиболее правильное и безопасное действие за отведенное время.",
    startBtn: "Начать игру",
    situation: "Ситуация",
    totalPoints: "очков",
    gameOver: "Игра окончена!",
    scorePerfect: "Превосходно! Вы идеально знаете правила безопасности при кризисных сценариях.",
    scoreGood: "Хороший результат, но рекомендуем освежить в памяти правила безопасности.",
    retryBtn: "Играть снова"
  },
  en: {
    heroTitle: "Safety Interactive Simulator",
    heroDesc: "Learn to make split-second life-saving decisions under stressful environments.",
    badgeSim: "SIMULATOR",
    ready: "Are you ready?",
    readyDesc: "You'll face critical crisis scenarios. Select the safest course of action under the allocated countdown limits.",
    startBtn: "Launch Simulation",
    situation: "Situation",
    totalPoints: "score",
    gameOver: "Simulation Concluded!",
    scorePerfect: "Magnificent! You demonstrated complete compliance with safety directives.",
    scoreGood: "A fair result, but we suggest re-reading the emergency guidance charts.",
    retryBtn: "Re-run Simulation"
  }
};

export function Game() {
  const { lang } = useLanguage();
  const d = textDict[lang] || textDict['kk'];
  const questions = questionDict[lang] || questionDict['kk'];

  const [gameState, setGameState] = useState<'start' | 'playing' | 'finished'>('start');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  useEffect(() => {
    let timer: any;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && gameState === 'playing') {
      setGameState('finished');
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const startGame = () => {
    setGameState('playing');
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(60);
    setSelectedAnswer(null);
  };

  const handleAnswer = (index: number, isCorrect: boolean) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(index);
    if (isCorrect) setScore((prev) => prev + 100);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedAnswer(null);
      } else {
        setGameState('finished');
      }
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-12 animate-fade-in"
    >
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-slate-950 mb-4 tracking-tight">{d.heroTitle}</h1>
        <p className="text-lg text-slate-600 font-medium">{d.heroDesc}</p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        {/* Game Header */}
        <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Gamepad2 className="w-8 h-8 text-indigo-400" />
            <span className="font-extrabold text-xl tracking-wider">{d.badgeSim}</span>
          </div>
          {gameState === 'playing' && (
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-xl">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <span className="font-mono font-black">{score}</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-xl">
                <Timer className="w-5 h-5 text-red-400" />
                <span className="font-mono font-black">00:{timeLeft.toString().padStart(2, '0')}</span>
              </div>
            </div>
          )}
        </div>

        {/* Game Content */}
        <div className="p-8 md:p-12 min-h-[400px] flex flex-col justify-center">
          {gameState === 'start' && (
            <div className="text-center space-y-8">
              <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-12 h-12 text-indigo-600" />
              </div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{d.ready}</h2>
              <p className="text-slate-600 max-w-md mx-auto font-medium">
                {d.readyDesc}
              </p>
              <button 
                onClick={startGame}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 px-12 rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg shadow-indigo-600/10 cursor-pointer"
              >
                {d.startBtn}
              </button>
            </div>
          )}

          {gameState === 'playing' && (
            <div className="space-y-8">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <span className="text-sm font-extrabold text-indigo-600 uppercase tracking-wider mb-2 block">
                  {d.situation} {currentQuestion + 1} / {questions.length}
                </span>
                <h3 className="text-2xl font-black text-slate-900 leading-snug">
                  {questions[currentQuestion].scenario}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {questions[currentQuestion].options.map((option, index) => {
                  let btnClass = "bg-white border-2 border-slate-200 hover:border-indigo-500 text-slate-700 hover:bg-slate-50";
                  if (selectedAnswer === index) {
                    btnClass = option.correct 
                      ? "bg-emerald-50 border-emerald-500 text-emerald-800" 
                      : "bg-red-50 border-red-500 text-red-800";
                  } else if (selectedAnswer !== null && option.correct) {
                    btnClass = "bg-emerald-50 border-emerald-500 text-emerald-800";
                  }

                  return (
                    <button
                      key={index}
                      disabled={selectedAnswer !== null}
                      onClick={() => handleAnswer(index, option.correct)}
                      className={`p-6 rounded-2xl text-left font-bold transition-all flex items-center justify-between cursor-pointer leading-relaxed ${btnClass}`}
                    >
                      <span className="pr-2">{option.text}</span>
                      {selectedAnswer !== null && option.correct && <CheckCircle className="w-6 h-6 text-emerald-500 shrink-0" />}
                      {selectedAnswer === index && !option.correct && <XCircle className="w-6 h-6 text-red-500 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {gameState === 'finished' && (
            <div className="text-center space-y-8">
              <div className="w-24 h-24 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-12 h-12 text-yellow-500 animate-bounce" />
              </div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{d.gameOver}</h2>
              <div className="text-6xl font-black text-slate-900 font-mono">
                {score} <span className="text-2xl text-slate-500 font-sans font-semibold">{d.totalPoints}</span>
              </div>
              <p className="text-slate-600 max-w-md mx-auto font-medium">
                {score === questions.length * 100 
                  ? d.scorePerfect
                  : d.scoreGood}
              </p>
              <button 
                onClick={startGame}
                className="bg-slate-900 hover:bg-slate-800 text-white font-black py-4 px-12 rounded-xl text-lg transition-all shadow-md cursor-pointer"
              >
                {d.retryBtn}
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
