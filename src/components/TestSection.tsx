import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  HelpCircle,
  RotateCcw,
  Award,
  Printer,
  Sparkles,
  Timer,
  ChevronRight,
  XCircle,
  FileText
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MascotBilimdon } from './MascotBilimdon';
import { ANTONYM_WORDS } from '../data/words';
import {
  playClickSound,
  playCorrectSound,
  playWrongSound,
  playWinSound
} from '../utils/audio';

interface QuizItem {
  id: number;
  question: string;
  type: 'mcq' | 'true_false' | 'fill' | 'odd_one_out';
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export const TestSection: React.FC = () => {
  const {
    language,
    muted,
    t,
    progress,
    saveTestScore,
    addXp,
    addStars,
    triggerConfetti,
    setUserName
  } = useApp();

  const [questions, setQuestions] = useState<QuizItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showCertificate, setShowCertificate] = useState<boolean>(false);
  const [timerEnabled, setTimerEnabled] = useState<boolean>(false);
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);

  // Generates 10 questions with varied types
  const generateQuestions = (): QuizItem[] => {
    return [
      {
        id: 1,
        question: "1. 'Baland' so'zining zid ma'nolisi qaysi javobda to'g'ri berilgan?",
        type: 'mcq',
        options: ["past", "uzun", "katta", "keng"],
        correctAnswer: "past",
        explanation: "'Baland' so'zining zid ma'nolisi — 'past'."
      },
      {
        id: 2,
        question: "2. Rost yoki Yolg'on: 'Issiq' so'zining adabiy zid ma'nolisi 'sovuq'dir.",
        type: 'true_false',
        options: ["Rost (To'g'ri)", "Yolg'on (Noto'g'ri)"],
        correctAnswer: "Rost (To'g'ri)",
        explanation: "Ha, 'issiq' so'zining qarama-qarshi zidi aynan 'sovuq' hisoblanadi."
      },
      {
        id: 3,
        question: "3. Qaysi qatorda zid ma'noli bo'lmagan (ortiqcha) juftlik berilgan?",
        type: 'odd_one_out',
        options: ["oq — qora", "baland — past", "go'zal — chiroyli", "yaxshi — yomon"],
        correctAnswer: "go'zal — chiroyli",
        explanation: "'Go'zal' va 'chiroyli' sinonim (ma'nodosh) so'zlardir, antonim emas!"
      },
      {
        id: 4,
        question: "4. Maqolni to'ldiring: 'Yaxshi bilan yursang yetarsan murodga, ... bilan yursang qolarsan uyatga.'",
        type: 'fill',
        options: ["yomon", "past", "yosh", "sovuq"],
        correctAnswer: "yomon",
        explanation: "'Yaxshi' so'ziga zid bo'lgan so'z 'yomon'dir."
      },
      {
        id: 5,
        question: "5. 'Bilimli' so'ziga zid ma'noli so'z yasash uchun qaysi qo'shimcha ishlatiladi?",
        type: 'mcq',
        options: ["-siz (bilimsiz)", "-cha", "-roq", "-dor"],
        correctAnswer: "-siz (bilimsiz)",
        explanation: "-siz qo'shimchasi qarama-qarshi zid ma'no yasaydi: bilimli ↔ bilimsiz."
      },
      {
        id: 6,
        question: "6. 'Kun' so'ziga zid ma'noli so'z qaysi so'z turkumiga kiradi?",
        type: 'mcq',
        options: ["Ot (tun — nima?)", "Sifat (qanday?)", "Fe'l (nima qildi?)", "Son"],
        correctAnswer: "Ot (tun — nima?)",
        explanation: "Antonimlar bir xil so'z turkumidan bo'ladi. 'Kun' (ot) so'zining zidi 'tun' ham otdir."
      },
      {
        id: 7,
        question: "7. 'Kuchsiz' so'zining qarama-qarshisi qaysi?",
        type: 'mcq',
        options: ["kuchli", "zaif", "og'ir", "yengil"],
        correctAnswer: "kuchli",
        explanation: "'Kuchsiz' so'zining zidi 'kuchli'."
      },
      {
        id: 8,
        question: "8. 'Daryoning o'rtasi chuqur, qirg'og'i esa ... .' Nuqtalar o'rniga mos so'z:",
        type: 'fill',
        options: ["sayoz", "tor", "qisqa", "eski"],
        correctAnswer: "sayoz",
        explanation: "'Chuqur' so'ziga zid so'z 'sayoz' bo'ladi."
      },
      {
        id: 9,
        question: "9. Qaysi qatordagi fe'llar o'zaro zid ma'noli?",
        type: 'mcq',
        options: ["kelmoq — ketmoq", "yozmoq — o'qimoq", "yugurmoq — sakramoq", "ko'rmoq — qaramoq"],
        correctAnswer: "kelmoq — ketmoq",
        explanation: "'Kelmoq' harakatiga 'ketmoq' harakati qarama-qarshidir."
      },
      {
        id: 10,
        question: "10. 'Asal shirin, qalampir esa ... .' Nuqtalar o'rniga qaysi so'z qo'yiladi?",
        type: 'fill',
        options: ["achchiq", "tuzsiz", "issiq", "nordon"],
        correctAnswer: "achchiq",
        explanation: "'Shirin' so'zining eng yaqin adabiy zidi 'achchiq'dir."
      }
    ];
  };

  const startNewTest = () => {
    playClickSound(muted);
    setQuestions(generateQuestions());
    setCurrentIndex(0);
    setSelectedAnswers({});
    setIsSubmitted(false);
    setShowCertificate(false);
    setSecondsElapsed(0);
  };

  useEffect(() => {
    setQuestions(generateQuestions());
  }, []);

  useEffect(() => {
    let interval: any;
    if (timerEnabled && !isSubmitted) {
      interval = setInterval(() => {
        setSecondsElapsed(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerEnabled, isSubmitted]);

  const handleSelectOption = (opt: string) => {
    playClickSound(muted);
    setSelectedAnswers(prev => ({
      ...prev,
      [currentIndex]: opt
    }));
  };

  const currentQ = questions[currentIndex];
  const isAnswered = selectedAnswers[currentIndex] !== undefined;

  const handleNext = () => {
    playClickSound(muted);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    playClickSound(muted);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmitTest = () => {
    playClickSound(muted);
    // Calculate score
    let score = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        score += 1;
      }
    });

    setIsSubmitted(true);
    saveTestScore(score);
    addXp(score * 10);
    addStars(score >= 8 ? 3 : score >= 5 ? 2 : 1);

    if (score >= 8) {
      playWinSound(muted);
      triggerConfetti();
    } else {
      playCorrectSound(muted);
    }
  };

  // Calculate final score
  const correctCount = questions.filter(
    (q, idx) => selectedAnswers[idx] === q.correctAnswer
  ).length;

  return (
    <div className="space-y-6 pb-20">
      {/* Test Header */}
      <div className="rounded-3xl bg-white dark:bg-slate-800 border-2 border-emerald-300 dark:border-slate-700 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase">
            Yakuniy sinov
          </span>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white mt-1">
            {t.test.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
            {t.test.subtitle}
          </p>
        </div>

        {/* Timer toggle & Reset */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setTimerEnabled(!timerEnabled)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold border transition-colors ${
              timerEnabled
                ? 'bg-amber-100 border-amber-300 text-amber-800 dark:bg-amber-950/60 dark:text-amber-200'
                : 'bg-slate-100 border-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
            }`}
          >
            <Timer size={16} />
            <span>
              {timerEnabled
                ? `${Math.floor(secondsElapsed / 60)}:${(secondsElapsed % 60)
                    .toString()
                    .padStart(2, '0')}`
                : t.test.timerToggle}
            </span>
          </button>

          <button
            onClick={startNewTest}
            title="Qayta boshlash"
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-amber-100"
          >
            <RotateCcw size={18} />
          </button>
        </div>
      </div>

      {/* Test In Progress or Results */}
      {!isSubmitted ? (
        <div className="rounded-3xl bg-white dark:bg-slate-800 border-2 border-emerald-200 dark:border-slate-700 p-6 sm:p-10 shadow-sm space-y-6">
          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-extrabold text-slate-600 dark:text-slate-300">
              <span>Savol {currentIndex + 1} / {questions.length}</span>
              <span>
                {Math.round(((currentIndex + 1) / questions.length) * 100)}%
              </span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Active Question Box */}
          {currentQ && (
            <div className="space-y-6 py-2">
              <div className="p-6 rounded-3xl bg-emerald-50 dark:bg-slate-700/60 border border-emerald-200 dark:border-slate-600">
                <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-white leading-relaxed">
                  {currentQ.question}
                </h3>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = selectedAnswers[currentIndex] === opt;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(opt)}
                      className={`min-h-[58px] p-4 rounded-2xl font-heading font-extrabold text-lg capitalize transition-all border-2 text-left flex items-center justify-between active:scale-98 ${
                        isSelected
                          ? 'bg-emerald-500 text-white border-emerald-600 shadow-md scale-102 ring-2 ring-emerald-300'
                          : 'bg-slate-50 dark:bg-slate-700/60 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-600 hover:border-emerald-400'
                      }`}
                    >
                      <span>{opt}</span>
                      {isSelected && <CheckCircle2 size={22} className="text-white ml-2 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Navigation and Submit */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`px-5 py-2.5 rounded-2xl font-bold text-sm border ${
                currentIndex === 0
                  ? 'opacity-40 cursor-not-allowed bg-slate-100 dark:bg-slate-700 text-slate-400 border-slate-200'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300'
              }`}
            >
              Oldingisi
            </button>

            {currentIndex < questions.length - 1 ? (
              <button
                onClick={handleNext}
                disabled={!isAnswered}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-extrabold text-base transition-all ${
                  !isAnswered
                    ? 'opacity-40 cursor-not-allowed bg-slate-200 dark:bg-slate-700 text-slate-400'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-md active:scale-95'
                }`}
              >
                <span>{t.test.nextQuestion}</span>
                <ChevronRight size={18} />
              </button>
            ) : (
              <button
                onClick={handleSubmitTest}
                disabled={Object.keys(selectedAnswers).length < questions.length}
                className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-extrabold text-base transition-all ${
                  Object.keys(selectedAnswers).length < questions.length
                    ? 'opacity-40 cursor-not-allowed bg-slate-200 dark:bg-slate-700 text-slate-400'
                    : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg active:scale-95 border-b-4 border-amber-700'
                }`}
              >
                <CheckCircle2 size={20} />
                <span>{t.test.finishTest}</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Results Card */
        <div className="rounded-3xl bg-white dark:bg-slate-800 border-2 border-emerald-300 dark:border-slate-700 p-6 sm:p-10 shadow-sm space-y-8 animate-pop-bounce">
          <div className="text-center space-y-4 max-w-xl mx-auto">
            <MascotBilimdon
              mood={correctCount >= 8 ? 'celebrating' : correctCount >= 5 ? 'happy' : 'thinking'}
              size="lg"
            />

            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white">
              {t.test.scoreTitle} {correctCount} / {questions.length}
            </h2>

            <p className="text-base sm:text-lg font-bold text-slate-700 dark:text-slate-300">
              {correctCount >= 9
                ? t.test.scoreCommentPerfect
                : correctCount >= 6
                ? t.test.scoreCommentGood
                : t.test.scoreCommentTry}
            </p>

            {/* Stars Award */}
            <div className="flex items-center justify-center gap-2 text-3xl">
              <span className={correctCount >= 4 ? 'animate-bounce' : 'opacity-30'}>⭐</span>
              <span className={correctCount >= 7 ? 'animate-bounce' : 'opacity-30'}>⭐</span>
              <span className={correctCount >= 9 ? 'animate-bounce' : 'opacity-30'}>⭐</span>
            </div>

            {/* Certificate and Retry Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={() => setShowCertificate(true)}
                className="inline-flex items-center gap-2 px-6 py-3.5 min-h-[48px] rounded-2xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-extrabold text-base shadow-md border-b-4 border-amber-700"
              >
                <Award size={20} />
                <span>{t.test.certificateBtn}</span>
              </button>

              <button
                onClick={startNewTest}
                className="inline-flex items-center gap-2 px-6 py-3.5 min-h-[48px] rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-bold text-base border border-slate-300 dark:border-slate-600"
              >
                <RotateCcw size={18} />
                <span>{t.test.retryTest}</span>
              </button>
            </div>
          </div>

          {/* Detailed Question Review */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-700 space-y-4">
            <h3 className="font-heading font-extrabold text-xl text-slate-900 dark:text-white">
              {t.test.reviewTitle}
            </h3>

            <div className="space-y-3">
              {questions.map((q, idx) => {
                const userAns = selectedAnswers[idx];
                const isCorrect = userAns === q.correctAnswer;

                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-2xl border-2 ${
                      isCorrect
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800'
                        : 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                          {q.question}
                        </div>
                        <div className="text-xs sm:text-sm font-semibold">
                          <span className="text-slate-500 dark:text-slate-400">Sizning javobingiz: </span>
                          <span className={isCorrect ? 'text-emerald-700 dark:text-emerald-300 font-bold' : 'text-amber-700 dark:text-amber-300 font-bold'}>
                            {userAns || "Javob berilmadi"}
                          </span>
                        </div>
                        {!isCorrect && (
                          <div className="text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                            To'g'ri javob: <strong>{q.correctAnswer}</strong>
                          </div>
                        )}
                        <div className="text-xs text-slate-600 dark:text-slate-300 mt-1 italic">
                          💡 {q.explanation}
                        </div>
                      </div>

                      <div>
                        {isCorrect ? (
                          <CheckCircle2 size={24} className="text-emerald-500 shrink-0" />
                        ) : (
                          <span className="text-xs font-bold px-2 py-1 rounded-full bg-amber-200 text-amber-900 shrink-0">
                            Takrorlash
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* PRINTABLE CERTIFICATE MODAL */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-10 shadow-2xl border-4 border-amber-400 relative space-y-6 certificate-page">
            {/* Action Bar (Hidden when printed) */}
            <div className="no-print flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-700">
              <h2 className="font-heading font-extrabold text-xl text-slate-900 dark:text-white">
                Maxsus ta'limiy guvohnoma
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-sm transition-colors"
                >
                  <Printer size={16} />
                  <span>{t.cert.printBtn}</span>
                </button>
                <button
                  onClick={() => setShowCertificate(false)}
                  className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold"
                >
                  {t.cert.closeBtn}
                </button>
              </div>
            </div>

            {/* Editable student name prompt */}
            <div className="no-print p-3 rounded-xl bg-amber-50 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 font-medium">
              <label className="block font-bold mb-1">{t.cert.enterNamePrompt}</label>
              <input
                type="text"
                value={progress.name}
                onChange={e => setUserName(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-amber-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm font-bold text-slate-900 dark:text-white"
              />
            </div>

            {/* Certificate Decorative Border and Body */}
            <div className="border-8 border-double border-amber-400 p-8 rounded-2xl text-center space-y-6 bg-gradient-to-b from-amber-50/50 via-white to-amber-50/50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-amber-400 flex items-center justify-center text-3xl shadow-sm">
                  🦉
                </div>
              </div>

              <div>
                <h1 className="font-heading font-black text-4xl sm:text-5xl text-amber-900 dark:text-amber-100 tracking-wider">
                  {t.cert.title}
                </h1>
                <p className="text-xs uppercase font-extrabold tracking-widest text-amber-700 dark:text-amber-400 mt-1">
                  Ona tili fani bo'yicha maxsus yutuq
                </p>
              </div>

              <p className="text-slate-600 dark:text-slate-300 font-medium text-sm max-w-md mx-auto">
                {t.cert.certSubtitle}
              </p>

              {/* Awarded Name */}
              <div className="py-2 border-b-2 border-dashed border-amber-400 max-w-sm mx-auto">
                <div className="font-heading font-extrabold text-3xl text-slate-900 dark:text-white">
                  {progress.name}
                </div>
              </div>

              <div className="text-sm font-bold text-slate-700 dark:text-slate-300">
                Natija: <strong className="text-emerald-600 dark:text-emerald-400 text-lg">{correctCount} / {questions.length} ball</strong> (A'lo)
              </div>

              {/* Signatures & Seal */}
              <div className="pt-6 grid grid-cols-2 gap-6 items-center text-center text-xs font-bold text-slate-600 dark:text-slate-400">
                <div>
                  <div className="font-heading font-extrabold text-base text-amber-900 dark:text-amber-200">
                    {new Date().toLocaleDateString()}
                  </div>
                  <div className="border-t border-slate-300 dark:border-slate-600 pt-1 mt-1">
                    {t.cert.dateText}
                  </div>
                </div>

                <div>
                  <div className="font-heading font-extrabold text-base text-amber-900 dark:text-amber-200">
                    {t.cert.teacherSign} ✍️
                  </div>
                  <div className="border-t border-slate-300 dark:border-slate-600 pt-1 mt-1">
                    Mas'ul ustoz
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
