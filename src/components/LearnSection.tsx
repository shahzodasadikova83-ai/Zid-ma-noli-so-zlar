import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  RotateCcw,
  Check,
  Search,
  Wand2,
  BookOpen,
  Award,
  Layers,
  Heart
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MascotBilimdon } from './MascotBilimdon';
import { AudioSpeakerBtn } from './AudioSpeakerBtn';
import {
  ANTONYM_WORDS,
  PARTS_OF_SPEECH_EXAMPLES,
  SUFFIX_PAIRS,
  PROVERBS
} from '../data/words';
import { playClickSound, playCorrectSound, playWinSound } from '../utils/audio';

export const LearnSection: React.FC = () => {
  const {
    language,
    muted,
    t,
    addXp,
    addStars,
    saveLearnedStep,
    progress,
    markWordMastered,
    triggerConfetti
  } = useApp();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 6;

  // Step 1 interactive comparison toggles
  const [step1Compare, setStep1Compare] = useState<'size' | 'daynight'>('size');

  // Step 2 Flip Cards state
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Step 4 Magic Wand state
  const [activeSuffixIndex, setActiveSuffixIndex] = useState<number>(0);
  const [suffixMode, setSuffixMode] = useState<'-li' | '-siz'>('-li');
  const [isWandSparks, setIsWandSparks] = useState<boolean>(false);

  // Step 5 selected proverb
  const [selectedProverbId, setSelectedProverbId] = useState<string>(PROVERBS[0].id);

  // Step 6 Claimed XP state
  const [step6Claimed, setStep6Claimed] = useState<boolean>(
    progress.learnedSteps.includes(6)
  );

  const goToStep = (step: number) => {
    playClickSound(muted);
    setCurrentStep(step);
    saveLearnedStep(step);
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      goToStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      goToStep(currentStep - 1);
    }
  };

  const toggleFlip = (id: string) => {
    playClickSound(muted);
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleMagicWand = () => {
    playCorrectSound(muted);
    setIsWandSparks(true);
    setSuffixMode(prev => (prev === '-li' ? '-siz' : '-li'));
    setTimeout(() => setIsWandSparks(false), 600);
  };

  const handleClaimLessonReward = () => {
    if (!step6Claimed) {
      playWinSound(muted);
      addXp(50);
      addStars(3);
      triggerConfetti();
      setStep6Claimed(true);
      saveLearnedStep(6);
    }
  };

  // Filtered words for Step 2
  const filteredWords = ANTONYM_WORDS.filter(w => {
    const matchesCategory = filterCategory === 'all' || w.category === filterCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      w.word1.toLowerCase().includes(query) ||
      w.word2.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-20">
      {/* Header with Title and Step Dots */}
      <div className="rounded-3xl bg-white dark:bg-slate-800 border-2 border-amber-300 dark:border-slate-700 p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 text-xs font-bold mb-1">
            <BookOpen size={14} />
            <span>4-sinf ona tili kursi</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">
            {t.learn.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold">
            {currentStep}{t.learn.step} ({totalSteps} {t.learn.of})
          </p>
        </div>

        {/* Step dots navigation */}
        <div className="flex items-center gap-2">
          {Array.from({ length: totalSteps }).map((_, idx) => {
            const stepNum = idx + 1;
            const isCurrent = currentStep === stepNum;
            const isCompleted = progress.learnedSteps.includes(stepNum);
            return (
              <button
                key={stepNum}
                onClick={() => goToStep(stepNum)}
                title={`${stepNum}-bosqich`}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-2xl font-extrabold text-sm flex items-center justify-center transition-all ${
                  isCurrent
                    ? 'bg-amber-500 text-slate-950 shadow-md scale-110 ring-4 ring-amber-300 dark:ring-amber-800'
                    : isCompleted
                    ? 'bg-emerald-500 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 hover:bg-amber-100'
                }`}
              >
                {isCompleted && !isCurrent ? <Check size={18} /> : stepNum}
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 1: What are antonyms? Definition & Interactive visual comparison */}
      {currentStep === 1 && (
        <div className="rounded-3xl bg-white dark:bg-slate-800 border-2 border-amber-300 dark:border-slate-700 p-6 sm:p-10 shadow-sm space-y-8 animate-pop-bounce">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1 space-y-4 text-center lg:text-left">
              <span className="px-3.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
                {t.learn.step1Title}
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-amber-950 dark:text-amber-100 leading-snug">
                Zid ma'noli so'zlar nima?
              </h2>

              <div className="p-5 rounded-2xl bg-amber-50 dark:bg-slate-700/60 border-l-8 border-amber-500 text-slate-800 dark:text-slate-100 font-bold text-lg sm:text-xl shadow-xs">
                "{t.learn.step1Def}"
              </div>

              <p className="text-slate-600 dark:text-slate-300 font-medium text-base">
                Tilimizda ko'plab so'zlarning qarama-qarshi jufti bor. Masalan: hajm bo'yicha ulkan narsani kichik narsaga, iliq narsani esa sovuq narsaga taqqoslaymiz.
              </p>
            </div>

            <MascotBilimdon
              mood="happy"
              size="lg"
              speech="Antonimlar bir-birining aksidir!"
            />
          </div>

          {/* Interactive visual comparison widget */}
          <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/60 p-6 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
              <h3 className="font-heading font-bold text-lg text-slate-800 dark:text-slate-200">
                {t.learn.step1ComparePrompt}
              </h3>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setStep1Compare('size')}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-colors ${
                    step1Compare === 'size'
                      ? 'bg-amber-500 text-slate-950 shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  Fil & Sichqon (Hajm)
                </button>
                <button
                  onClick={() => setStep1Compare('daynight')}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-colors ${
                    step1Compare === 'daynight'
                      ? 'bg-amber-500 text-slate-950 shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  Kun & Tun (Vaqt)
                </button>
              </div>
            </div>

            {step1Compare === 'size' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                {/* Elephant */}
                <div className="p-6 rounded-2xl bg-amber-100/70 dark:bg-slate-800 border-2 border-amber-300 dark:border-slate-700 flex flex-col items-center text-center">
                  <span className="text-6xl sm:text-7xl mb-3 animate-bounce">🐘</span>
                  <div className="font-heading font-extrabold text-3xl text-amber-950 dark:text-amber-100">
                    KATTA
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                    (Ulkan fil)
                  </div>
                  <div className="mt-3">
                    <AudioSpeakerBtn text="Katta" size="md" />
                  </div>
                </div>

                {/* Mouse */}
                <div className="p-6 rounded-2xl bg-sky-100/70 dark:bg-slate-800 border-2 border-sky-300 dark:border-slate-700 flex flex-col items-center text-center">
                  <span className="text-4xl sm:text-5xl mb-3">🐭</span>
                  <div className="font-heading font-extrabold text-2xl text-sky-950 dark:text-sky-200">
                    KICHIK
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                    (Mittivoy sichqon)
                  </div>
                  <div className="mt-3">
                    <AudioSpeakerBtn text="Kichik" size="md" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                {/* Day */}
                <div className="p-6 rounded-2xl bg-yellow-100 dark:bg-slate-800 border-2 border-yellow-300 dark:border-slate-700 flex flex-col items-center text-center">
                  <span className="text-6xl mb-3">☀️</span>
                  <div className="font-heading font-extrabold text-3xl text-yellow-950 dark:text-yellow-100">
                    KUN
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                    (Yorug' quyoshli kunduz)
                  </div>
                  <div className="mt-3">
                    <AudioSpeakerBtn text="Kun" size="md" />
                  </div>
                </div>

                {/* Night */}
                <div className="p-6 rounded-2xl bg-indigo-950 text-white border-2 border-indigo-700 flex flex-col items-center text-center">
                  <span className="text-6xl mb-3">🌙</span>
                  <div className="font-heading font-extrabold text-3xl text-indigo-100">
                    TUN
                  </div>
                  <div className="text-xs text-indigo-300 mt-1">
                    (Yulduzli qorong'i oqshom)
                  </div>
                  <div className="mt-3">
                    <AudioSpeakerBtn text="Tun" size="md" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* STEP 2: Flip cards (20 antonym pairs) */}
      {currentStep === 2 && (
        <div className="rounded-3xl bg-white dark:bg-slate-800 border-2 border-amber-300 dark:border-slate-700 p-6 sm:p-8 shadow-sm space-y-6 animate-pop-bounce">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="px-3.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
                {t.learn.step2Title}
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white mt-1">
                20 ta asosiy zid so'z juftligi
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                {t.learn.step2Desc}
              </p>
            </div>

            {/* Search Input */}
            <div className="relative min-w-[220px]">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="So'zni qidirish..."
                className="w-full pl-9 pr-4 py-2 rounded-2xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: t.learn.filterAll },
              { id: 'size', label: t.learn.filterSize },
              { id: 'temperature', label: t.learn.filterTemp },
              { id: 'quality', label: t.learn.filterQuality }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setFilterCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  filterCategory === cat.id
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-amber-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* 3D Flip Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredWords.map((item) => {
              const isFlipped = !!flippedCards[item.id];
              const isMastered = progress.masteredWordIds.includes(item.id);

              return (
                <div
                  key={item.id}
                  onClick={() => toggleFlip(item.id)}
                  className="perspective-1000 h-64 cursor-pointer group"
                >
                  <div
                    className={`relative w-full h-full duration-500 transform-style-preserve-3d transition-transform ${
                      isFlipped ? 'rotate-y-180' : ''
                    }`}
                  >
                    {/* Front of Card */}
                    <div className="absolute inset-0 backface-hidden rounded-3xl bg-gradient-to-b from-amber-50 to-orange-50 dark:from-slate-700 dark:to-slate-800 border-2 border-amber-300 dark:border-slate-600 p-5 flex flex-col justify-between shadow-sm hover:shadow-md">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold px-2 py-0.5 rounded-md bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200 uppercase">
                          {item.partOfSpeech}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              markWordMastered(item.id);
                              playCorrectSound(muted);
                            }}
                            title="Yod oldim!"
                            className={`p-1.5 rounded-full ${
                              isMastered
                                ? 'text-emerald-500 fill-emerald-500'
                                : 'text-slate-300 hover:text-emerald-500'
                            }`}
                          >
                            <Heart size={18} className={isMastered ? 'fill-emerald-500' : ''} />
                          </button>
                          <AudioSpeakerBtn text={item.word1} size="sm" />
                        </div>
                      </div>

                      <div className="text-center">
                        <span className="text-5xl mb-2 block" role="img" aria-label={item.word1}>
                          {item.emoji1}
                        </span>
                        <div className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white capitalize">
                          {item.word1}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {language === 'ru' && item.translations.ru.word1}
                          {language === 'en' && item.translations.en.word1}
                        </div>
                      </div>

                      <div className="text-center text-[11px] font-bold text-amber-700 dark:text-amber-300 flex items-center justify-center gap-1">
                        <RotateCcw size={12} />
                        <span>{t.learn.flipPrompt}</span>
                      </div>
                    </div>

                    {/* Back of Card (Antonym) */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-3xl bg-gradient-to-b from-sky-50 to-blue-50 dark:from-slate-700 dark:to-slate-800 border-2 border-sky-400 dark:border-sky-700 p-5 flex flex-col justify-between shadow-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold px-2 py-0.5 rounded-md bg-sky-200 dark:bg-sky-900 text-sky-900 dark:text-sky-200 uppercase">
                          Zid so'z
                        </span>
                        <AudioSpeakerBtn text={item.word2} size="sm" />
                      </div>

                      <div className="text-center">
                        <span className="text-5xl mb-2 block" role="img" aria-label={item.word2}>
                          {item.emoji2}
                        </span>
                        <div className="font-heading font-extrabold text-2xl text-sky-950 dark:text-sky-200 capitalize">
                          {item.word2}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {language === 'ru' && item.translations.ru.word2}
                          {language === 'en' && item.translations.en.word2}
                        </div>
                      </div>

                      <div className="text-center text-[11px] text-slate-600 dark:text-slate-300 font-semibold bg-white/70 dark:bg-slate-900/60 p-1.5 rounded-xl border border-sky-200 dark:border-slate-600">
                        {item.word1} ↔ {item.word2}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 3: Parts of speech rule (sifat-sifat, ot-ot, fe'l-fe'l) */}
      {currentStep === 3 && (
        <div className="rounded-3xl bg-white dark:bg-slate-800 border-2 border-amber-300 dark:border-slate-700 p-6 sm:p-10 shadow-sm space-y-8 animate-pop-bounce">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1 space-y-4 text-center lg:text-left">
              <span className="px-3.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950/70 text-blue-900 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
                {t.learn.step3Title}
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-slate-900 dark:text-white leading-snug">
                So'z turkumlari qoidasi
              </h2>

              <div className="p-5 rounded-2xl bg-blue-50 dark:bg-slate-700/60 border-l-8 border-blue-500 text-slate-800 dark:text-slate-100 font-bold text-lg sm:text-xl shadow-xs">
                "{t.learn.step3Rule}"
              </div>

              <p className="text-slate-600 dark:text-slate-300 font-medium text-base">
                Ya'ni: Agar so'z "Qanday?" so'rog'iga javob bersa (sifat), uning zidi ham sifat bo'lishi shart! Masalan: "katta" (sifat) so'ziga "tosh" (ot) zid bo'la olmaydi, faqat "kichik" (sifat) zid bo'ladi.
              </p>
            </div>

            <MascotBilimdon
              mood="thinking"
              size="lg"
              speech="Doimo bir turkumdan tanlaymiz!"
            />
          </div>

          {/* Color coded Part of Speech categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PARTS_OF_SPEECH_EXAMPLES.map((group, gIdx) => (
              <div
                key={gIdx}
                className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-700/50 border-2 border-slate-200 dark:border-slate-600 flex flex-col justify-between"
              >
                <div>
                  <div className={`p-2.5 rounded-xl border text-center font-heading font-extrabold text-base mb-4 ${group.badgeColor}`}>
                    {language === 'uz' ? group.typeUz : language === 'ru' ? group.typeRu : group.typeEn}
                  </div>

                  <div className="space-y-3">
                    {group.pairs.map((p, pIdx) => (
                      <div
                        key={pIdx}
                        className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-slate-900 dark:text-white">
                            {p.w1}
                          </span>
                          <span className="text-amber-500 font-black">↔</span>
                          <span className="font-extrabold text-slate-900 dark:text-white">
                            {p.w2}
                          </span>
                        </div>
                        <span className="text-xs px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 font-bold">
                          {p.q}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 text-center text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {gIdx === 0 && "Belgi va xususiyatni bildiradi"}
                  {gIdx === 1 && "Shaxs yoki narsa-hodisani bildiradi"}
                  {gIdx === 2 && "Harakat va holatni bildiradi"}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 4: Magic suffixes (-li / -siz) */}
      {currentStep === 4 && (
        <div className="rounded-3xl bg-white dark:bg-slate-800 border-2 border-amber-300 dark:border-slate-700 p-6 sm:p-10 shadow-sm space-y-8 animate-pop-bounce">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1 space-y-4 text-center lg:text-left">
              <span className="px-3.5 py-1 rounded-full bg-purple-100 dark:bg-purple-950/70 text-purple-900 dark:text-purple-300 text-xs font-bold uppercase tracking-wider">
                {t.learn.step4Title}
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-slate-900 dark:text-white leading-snug">
                Sehrli "-li" va "-siz" laboratoriyasi
              </h2>

              <div className="p-5 rounded-2xl bg-purple-50 dark:bg-slate-700/60 border-l-8 border-purple-500 text-slate-800 dark:text-slate-100 font-bold text-lg sm:text-xl shadow-xs">
                "{t.learn.step4Desc}"
              </div>

              <p className="text-slate-600 dark:text-slate-300 font-medium text-base">
                O'zak so'zga <strong className="text-purple-600 dark:text-purple-400">-li</strong> qo'shilsa unda o'sha narsa borligi, <strong className="text-purple-600 dark:text-purple-400">-siz</strong> qo'shilsa yo'qligi ifodalanadi. Ular bir-biriga zid ma'no hosil qiladi!
              </p>
            </div>

            <MascotBilimdon
              mood="celebrating"
              size="lg"
              speech="Sehrli tayoqchani bosing!"
            />
          </div>

          {/* Interactive Magic Wand transformation board */}
          <div className="rounded-3xl bg-gradient-to-r from-purple-100 via-pink-50 to-purple-100 dark:from-slate-900 dark:via-purple-950/40 dark:to-slate-900 p-6 sm:p-8 border-2 border-purple-300 dark:border-purple-800 text-center relative overflow-hidden">
            {isWandSparks && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
                <span className="text-6xl animate-ping">✨</span>
              </div>
            )}

            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-white dark:bg-slate-800 text-purple-900 dark:text-purple-200 text-xs font-extrabold shadow-xs">
              <Sparkles size={16} className="text-purple-500" />
              <span>{t.learn.magicWandText}</span>
            </div>

            {/* Word selector tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
              {SUFFIX_PAIRS.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    playClickSound(muted);
                    setActiveSuffixIndex(idx);
                  }}
                  className={`px-4 py-2 rounded-2xl font-bold text-sm transition-all ${
                    activeSuffixIndex === idx
                      ? 'bg-purple-600 text-white shadow-md scale-105'
                      : 'bg-white/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span className="mr-1.5">{item.emoji}</span>
                  <span>{item.root}</span>
                </button>
              ))}
            </div>

            {/* Magic Display */}
            {(() => {
              const currentItem = SUFFIX_PAIRS[activeSuffixIndex];
              const isLi = suffixMode === '-li';
              const displayWord = isLi ? currentItem.withLi : currentItem.withSiz;

              return (
                <div className="max-w-md mx-auto p-6 rounded-3xl bg-white dark:bg-slate-800 border-2 border-purple-200 dark:border-purple-800 shadow-lg space-y-4">
                  <div className="text-5xl" role="img">
                    {currentItem.emoji}
                  </div>

                  <div className="flex items-center justify-center gap-3">
                    <span className="font-heading font-extrabold text-3xl sm:text-4xl text-purple-950 dark:text-purple-100">
                      {displayWord}
                    </span>
                    <AudioSpeakerBtn text={displayWord} size="md" />
                  </div>

                  <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold">
                    {language === 'ru' && currentItem.ru}
                    {language === 'en' && currentItem.en}
                    {language === 'uz' && `${currentItem.root} + ${suffixMode}`}
                  </div>

                  {/* Transformation Wand Action Button */}
                  <div className="pt-2">
                    <button
                      onClick={handleMagicWand}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[48px] rounded-2xl bg-purple-600 hover:bg-purple-500 active:scale-95 text-white font-extrabold text-base shadow-md transition-all border-b-4 border-purple-800"
                    >
                      <Wand2 size={20} className="animate-spin" />
                      <span>
                        {isLi ? "Teskarisiga aylantirish (-siz)" : "Teskarisiga aylantirish (-li)"}
                      </span>
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* STEP 5: Antonyms in proverbs and sentences */}
      {currentStep === 5 && (
        <div className="rounded-3xl bg-white dark:bg-slate-800 border-2 border-amber-300 dark:border-slate-700 p-6 sm:p-10 shadow-sm space-y-8 animate-pop-bounce">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1 space-y-4 text-center lg:text-left">
              <span className="px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-900 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
                {t.learn.step5Title}
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-slate-900 dark:text-white leading-snug">
                Xalq maqollarida zid so'zlar
              </h2>

              <p className="text-slate-600 dark:text-slate-300 font-medium text-base">
                {t.learn.step5Desc}
              </p>
            </div>

            <MascotBilimdon
              mood="detective"
              size="lg"
              speech="Maqollardan zid so'zlarni toping!"
            />
          </div>

          {/* Proverbs Interactive List */}
          <div className="space-y-4">
            {PROVERBS.map((prov) => {
              const isSelected = selectedProverbId === prov.id;
              return (
                <div
                  key={prov.id}
                  onClick={() => {
                    playClickSound(muted);
                    setSelectedProverbId(prov.id);
                  }}
                  className={`cursor-pointer p-6 rounded-3xl transition-all border-2 ${
                    isSelected
                      ? 'bg-amber-50 dark:bg-slate-700/80 border-amber-400 dark:border-amber-600 shadow-md scale-101'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-amber-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200">
                          Zid juftlik: {prov.antonymPair[0]} ↔ {prov.antonymPair[1]}
                        </span>
                      </div>

                      <p className="font-heading font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white leading-relaxed">
                        "{prov.text}"
                      </p>

                      <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-amber-200 dark:border-slate-600 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                        <strong>Ma'nosi:</strong> {language === 'uz' ? prov.meaningUz : language === 'ru' ? prov.meaningRu : prov.meaningEn}
                      </div>
                    </div>

                    <AudioSpeakerBtn text={prov.text} size="md" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 6: Eslab qol! (Summary Card) */}
      {currentStep === 6 && (
        <div className="rounded-3xl bg-white dark:bg-slate-800 border-2 border-amber-300 dark:border-slate-700 p-6 sm:p-10 shadow-sm space-y-8 animate-pop-bounce">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="px-4 py-1.5 rounded-full bg-amber-400 dark:bg-amber-900 text-slate-950 dark:text-amber-200 text-xs font-extrabold uppercase tracking-wider">
              {t.learn.step6Title}
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-amber-950 dark:text-amber-100">
              Oltin qoidalar
            </h2>
            <p className="text-slate-600 dark:text-slate-300 font-medium">
              4-sinfda o'rganilgan barcha muhim xulosalarni birgalikda takrorlaymiz:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-amber-50 dark:bg-slate-700/60 border-2 border-amber-300 dark:border-slate-600 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-extrabold text-xl shadow-xs">
                1
              </div>
              <h3 className="font-heading font-extrabold text-lg text-amber-950 dark:text-amber-200">
                Qarama-qarshilik
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 font-semibold leading-relaxed">
                {t.learn.rule1}
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-blue-50 dark:bg-slate-700/60 border-2 border-blue-300 dark:border-slate-600 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-500 text-white flex items-center justify-center font-extrabold text-xl shadow-xs">
                2
              </div>
              <h3 className="font-heading font-extrabold text-lg text-blue-950 dark:text-blue-200">
                Bir xil turkum
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 font-semibold leading-relaxed">
                {t.learn.rule2}
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-purple-50 dark:bg-slate-700/60 border-2 border-purple-300 dark:border-slate-600 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-500 text-white flex items-center justify-center font-extrabold text-xl shadow-xs">
                3
              </div>
              <h3 className="font-heading font-extrabold text-lg text-purple-950 dark:text-purple-200">
                Sehrli qo'shimchalar
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 font-semibold leading-relaxed">
                {t.learn.rule3}
              </p>
            </div>
          </div>

          {/* Reward claim section */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-100 via-teal-50 to-emerald-100 dark:from-slate-800 dark:via-emerald-950/40 dark:to-slate-800 border-2 border-emerald-300 dark:border-emerald-700/60 text-center space-y-4">
            <MascotBilimdon mood="celebrating" size="md" />

            <h3 className="font-heading font-extrabold text-2xl text-emerald-950 dark:text-emerald-100">
              {t.learn.completedCongrat}
            </h3>

            <div>
              {step6Claimed ? (
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 text-white font-extrabold text-base shadow-md">
                  <Check size={20} />
                  <span>Dars mukofoti qabul qilingan (+50 XP, +3 ⭐)</span>
                </div>
              ) : (
                <button
                  onClick={handleClaimLessonReward}
                  className="inline-flex items-center gap-2 px-8 py-3.5 min-h-[48px] rounded-2xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-white font-extrabold text-lg shadow-lg border-b-4 border-emerald-700 transition-all"
                >
                  <Award size={22} />
                  <span>{t.learn.claimXp}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-4 pt-4">
        <button
          onClick={handlePrev}
          disabled={currentStep === 1}
          className={`inline-flex items-center gap-2 px-6 py-3 min-h-[48px] rounded-2xl font-extrabold text-base transition-all border-2 ${
            currentStep === 1
              ? 'opacity-40 cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200'
              : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-amber-300 hover:bg-amber-50 active:scale-95'
          }`}
        >
          <ChevronLeft size={20} />
          <span>{t.learn.prevStep}</span>
        </button>

        {currentStep < totalSteps ? (
          <button
            onClick={handleNext}
            className="inline-flex items-center gap-2 px-7 py-3 min-h-[48px] rounded-2xl font-extrabold text-base bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 shadow-md border-b-4 border-amber-700 transition-all"
          >
            <span>{t.learn.nextStep}</span>
            <ChevronRight size={20} />
          </button>
        ) : (
          <button
            onClick={() => goToStep(1)}
            className="inline-flex items-center gap-2 px-6 py-3 min-h-[48px] rounded-2xl font-extrabold text-base bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-white shadow-md border-b-4 border-emerald-700 transition-all"
          >
            <RotateCcw size={18} />
            <span>Qayta ko'rish</span>
          </button>
        )}
      </div>
    </div>
  );
};
