import React, { useState } from 'react';
import {
  KeyRound,
  Lock,
  Unlock,
  Sparkles,
  HelpCircle,
  RotateCcw,
  CheckCircle2,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MascotBilimdon } from './MascotBilimdon';
import { AudioSpeakerBtn } from './AudioSpeakerBtn';
import { STORY_CHAPTERS } from '../data/story';
import { playClickSound, playCorrectSound, playWrongSound, playWinSound, playUnlockSound } from '../utils/audio';

export const StorySection: React.FC = () => {
  const {
    language,
    muted,
    t,
    progress,
    addStoryKey,
    resetStory,
    addXp,
    addStars,
    triggerConfetti,
    unlockBadge
  } = useApp();

  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(() => {
    return Math.min(progress.storyKeys, 4);
  });

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [selectedPairWords, setSelectedPairWords] = useState<string[]>([]);
  const [feedbackState, setFeedbackState] = useState<{
    status: 'idle' | 'correct' | 'wrong';
    message: string;
  }>({ status: 'idle', message: '' });

  const [hintOpen, setHintOpen] = useState<boolean>(false);

  const currentChapter = STORY_CHAPTERS[activeChapterIndex];
  const isChestUnlocked = progress.storyKeys >= 5;

  const handleSelectOption = (opt: string) => {
    playClickSound(muted);
    setSelectedAnswer(opt);
    setFeedbackState({ status: 'idle', message: '' });
  };

  const handleTogglePairWord = (word: string) => {
    playClickSound(muted);
    setSelectedPairWords(prev => {
      if (prev.includes(word)) {
        return prev.filter(w => w !== word);
      }
      if (prev.length < 2) {
        return [...prev, word];
      }
      return [prev[1], word];
    });
    setFeedbackState({ status: 'idle', message: '' });
  };

  const handleCheckChapter = () => {
    if (!currentChapter) return;

    let isSuccess = false;

    if (currentChapter.type === 'mcq' || currentChapter.type === 'lock_key' || currentChapter.type === 'fix_sentence' || currentChapter.type === 'suffix_craft') {
      if (selectedAnswer === currentChapter.taskData.correctAnswer || selectedAnswer === currentChapter.taskData.correctKey) {
        isSuccess = true;
      }
    } else if (currentChapter.type === 'find_pair') {
      const targetPair = currentChapter.taskData.pair.map((s: string) => s.toLowerCase());
      const chosen = selectedPairWords.map(s => s.toLowerCase());
      if (chosen.length === 2 && targetPair.every((item: string) => chosen.includes(item))) {
        isSuccess = true;
      }
    }

    if (isSuccess) {
      playUnlockSound(muted);
      triggerConfetti();
      addStoryKey();
      addXp(25);
      addStars(1);
      setFeedbackState({
        status: 'correct',
        message: currentChapter.taskData.explanationUz || "Barakalla! Qulf ochildi! Oltin kalit sizniki! 🔑"
      });

      // If finished all 5
      if (activeChapterIndex === 4 || progress.storyKeys + 1 >= 5) {
        setTimeout(() => {
          playWinSound(muted);
          unlockBadge('detective');
          addXp(75);
          triggerConfetti();
        }, 1200);
      }
    } else {
      playWrongSound(muted);
      setFeedbackState({
        status: 'wrong',
        message: "Deyarli to'g'ri! Yana bir bor sinab ko'ring! Maslahat tugmasidan foydalanishingiz mumkin."
      });
    }
  };

  const handleNextChapter = () => {
    playClickSound(muted);
    setSelectedAnswer(null);
    setSelectedPairWords([]);
    setFeedbackState({ status: 'idle', message: '' });
    setHintOpen(false);
    if (activeChapterIndex < STORY_CHAPTERS.length - 1) {
      setActiveChapterIndex(activeChapterIndex + 1);
    }
  };

  const handleUseHint = () => {
    playClickSound(muted);
    if (!hintOpen) {
      if (progress.stars > 0) {
        addStars(-1);
      }
      setHintOpen(true);
    } else {
      setHintOpen(false);
    }
  };

  const handleRestartStory = () => {
    playClickSound(muted);
    resetStory();
    setActiveChapterIndex(0);
    setSelectedAnswer(null);
    setSelectedPairWords([]);
    setFeedbackState({ status: 'idle', message: '' });
    setHintOpen(false);
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Story Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 text-slate-950 p-6 sm:p-10 shadow-lg border-2 border-amber-300 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-900/20 text-slate-950 font-bold text-xs uppercase mb-3">
              <Sparkles size={16} />
              <span>Sarguzashtli detektiv darsi</span>
            </div>
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-950 mb-2">
              {t.story.title}
            </h1>
            <p className="font-medium text-slate-900 text-base sm:text-lg">
              {t.story.subtitle}
            </p>
          </div>

          {/* Golden Keys Tracker */}
          <div className="bg-white/90 dark:bg-slate-900/90 rounded-2xl p-4 border border-amber-300 dark:border-amber-700/60 shadow-md text-center min-w-[200px]">
            <div className="text-xs font-extrabold uppercase text-amber-800 dark:text-amber-300 mb-2">
              {t.story.keysCount}: {progress.storyKeys} / 5
            </div>
            <div className="flex items-center justify-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-lg transition-transform ${
                    i < progress.storyKeys
                      ? 'bg-amber-400 text-slate-950 shadow-sm scale-110'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                  }`}
                >
                  {i < progress.storyKeys ? '🔑' : '🔒'}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 5 Locks Navigation Bar */}
      <div className="grid grid-cols-5 gap-2 sm:gap-4">
        {STORY_CHAPTERS.map((ch, idx) => {
          const isUnlocked = idx < progress.storyKeys;
          const isCurrent = idx === activeChapterIndex;

          return (
            <button
              key={ch.id}
              onClick={() => {
                playClickSound(muted);
                setActiveChapterIndex(idx);
                setSelectedAnswer(null);
                setSelectedPairWords([]);
                setFeedbackState({ status: 'idle', message: '' });
                setHintOpen(false);
              }}
              className={`p-3 rounded-2xl border-2 text-center transition-all ${
                isCurrent
                  ? 'border-amber-500 bg-amber-100 dark:bg-amber-950/80 shadow-md scale-102 ring-2 ring-amber-300'
                  : isUnlocked
                  ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-400'
              }`}
            >
              <div className="text-2xl mb-1 flex justify-center">
                {isUnlocked ? (
                  <Unlock size={22} className="text-emerald-500" />
                ) : (
                  <Lock size={22} className={isCurrent ? "text-amber-500" : "text-slate-400"} />
                )}
              </div>
              <div className="text-xs font-extrabold truncate">
                {idx + 1}-Qulf
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Chapter Content or Victory Chest */}
      {isChestUnlocked ? (
        /* Victory Chest Celebration Card */
        <div className="rounded-3xl bg-white dark:bg-slate-800 border-4 border-amber-400 dark:border-amber-600 p-8 sm:p-12 text-center shadow-xl space-y-6 animate-pop-bounce">
          <div className="text-7xl sm:text-8xl animate-bounce">
            🎁✨💎
          </div>

          <div className="max-w-xl mx-auto space-y-3">
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-amber-950 dark:text-amber-100">
              {t.story.congratsTitle}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 font-medium text-lg leading-relaxed">
              {t.story.congratsDesc}
            </p>
          </div>

          {/* Detective Badge Award Banner */}
          <div className="inline-flex items-center gap-3 p-4 px-6 rounded-2xl bg-amber-100 dark:bg-amber-950/80 border-2 border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-200">
            <span className="text-3xl">🔍</span>
            <div className="text-left">
              <div className="font-extrabold text-sm uppercase">Maxsus nishon berildi:</div>
              <div className="font-heading font-extrabold text-lg">"Zukko Detektiv"</div>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handleRestartStory}
              className="inline-flex items-center gap-2 px-6 py-3 min-h-[48px] rounded-2xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-extrabold text-base shadow-md transition-all border-b-4 border-amber-700"
            >
              <RotateCcw size={18} />
              <span>{t.story.replayBtn}</span>
            </button>
          </div>
        </div>
      ) : (
        /* Active Chapter Detective Scene */
        <div className="rounded-3xl bg-white dark:bg-slate-800 border-2 border-amber-300 dark:border-slate-700 p-6 sm:p-10 shadow-sm space-y-8 animate-pop-bounce">
          {/* Header of chapter */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-700">
            <div>
              <span className="px-3.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-300 text-xs font-extrabold uppercase">
                {activeChapterIndex + 1}-Sehrli Qulf
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white mt-1">
                {language === 'uz' ? currentChapter.titleUz : language === 'ru' ? currentChapter.titleRu : currentChapter.titleEn}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleUseHint}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-amber-900 dark:text-amber-200 font-bold text-xs transition-colors border border-amber-300 dark:border-slate-600"
              >
                <HelpCircle size={16} className="text-amber-600" />
                <span>{t.story.hintBtn} (-1 ⭐)</span>
              </button>
            </div>
          </div>

          {/* Story Narrative Box with Bilimdon */}
          <div className="flex flex-col md:flex-row items-center gap-6 p-6 rounded-3xl bg-amber-50 dark:bg-slate-700/60 border border-amber-200 dark:border-slate-600">
            <MascotBilimdon
              mood="detective"
              size="md"
              speech="Diqqat bilan o'qing!"
            />
            <div className="flex-1 space-y-2 text-center md:text-left">
              <p className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 leading-relaxed">
                "{language === 'uz' ? currentChapter.storyUz : language === 'ru' ? currentChapter.storyRu : currentChapter.storyEn}"
              </p>
              <div className="text-xs font-bold text-amber-800 dark:text-amber-300">
                Topshiriq: {language === 'uz' ? currentChapter.clueUz : language === 'ru' ? currentChapter.clueRu : currentChapter.clueEn}
              </div>
            </div>
          </div>

          {/* Hint Dropdown if open */}
          {hintOpen && (
            <div className="p-4 rounded-2xl bg-yellow-50 dark:bg-yellow-950/60 border border-yellow-300 dark:border-yellow-700/60 text-xs sm:text-sm text-yellow-900 dark:text-yellow-200 font-bold animate-pop-bounce flex items-center justify-between">
              <div>
                💡 <strong>Maslahat:</strong> {language === 'uz' ? currentChapter.hintUz : language === 'ru' ? currentChapter.hintRu : currentChapter.hintEn}
              </div>
            </div>
          )}

          {/* Interactive Task Container */}
          <div className="space-y-6">
            {/* Task Type 1 & 2: Multiple Choice or Lock Key Selection */}
            {(currentChapter.type === 'mcq' || currentChapter.type === 'lock_key') && (
              <div>
                <div className="text-center font-heading font-extrabold text-xl text-slate-800 dark:text-slate-200 mb-4">
                  "{currentChapter.taskData.targetWord}" so'ziga mos zid kalitni tanlang:
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {(currentChapter.taskData.options || currentChapter.taskData.keys).map((item: string) => {
                    const isSelected = selectedAnswer === item;
                    return (
                      <button
                        key={item}
                        onClick={() => handleSelectOption(item)}
                        className={`min-h-[58px] p-4 rounded-2xl font-heading font-extrabold text-xl capitalize transition-all border-2 active:scale-95 flex items-center justify-center gap-2 ${
                          isSelected
                            ? 'bg-amber-400 text-slate-950 border-amber-600 shadow-md scale-105'
                            : 'bg-slate-50 dark:bg-slate-700/60 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-600 hover:border-amber-400'
                        }`}
                      >
                        <span>🔑</span>
                        <span>{item}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Task Type 3: Fix Sentence */}
            {currentChapter.type === 'fix_sentence' && (
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-center font-bold text-lg text-slate-800 dark:text-slate-200">
                  "Qishda qor yog'adi va havo juda <span className="underline decoration-wavy decoration-rose-500 font-black text-rose-600 dark:text-rose-400">ISSIQ</span> bo'ladi."
                </div>
                <div className="text-center text-sm font-bold text-slate-600 dark:text-slate-300">
                  Ostiga chizilgan noto'g'ri so'z o'rniga qaysi zid so'zni qo'yish kerak?
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {currentChapter.taskData.choices.map((ch: string) => {
                    const isSelected = selectedAnswer === ch;
                    return (
                      <button
                        key={ch}
                        onClick={() => handleSelectOption(ch)}
                        className={`min-h-[54px] p-3 rounded-2xl font-heading font-extrabold text-lg capitalize transition-all border-2 active:scale-95 ${
                          isSelected
                            ? 'bg-amber-400 text-slate-950 border-amber-600 shadow-md scale-105'
                            : 'bg-slate-50 dark:bg-slate-700/60 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-600 hover:border-amber-400'
                        }`}
                      >
                        {ch}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Task Type 4: Find Pair in Proverb */}
            {currentChapter.type === 'find_pair' && (
              <div className="space-y-4">
                <div className="text-center text-sm font-bold text-slate-600 dark:text-slate-300">
                  Maqoldagi bir-biriga zid ikkita so'zni bosing: ({selectedPairWords.length}/2 tanlandi)
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {currentChapter.taskData.words.map((w: string, idx: number) => {
                    const isSelected = selectedPairWords.includes(w);
                    return (
                      <button
                        key={idx}
                        onClick={() => handleTogglePairWord(w)}
                        className={`min-h-[50px] px-5 py-2.5 rounded-2xl font-heading font-extrabold text-lg transition-all border-2 active:scale-95 ${
                          isSelected
                            ? 'bg-amber-400 text-slate-950 border-amber-600 shadow-md scale-105'
                            : 'bg-slate-50 dark:bg-slate-700/60 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-600 hover:border-amber-400'
                        }`}
                      >
                        {w}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Task Type 5: Suffix Craft */}
            {currentChapter.type === 'suffix_craft' && (
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-center">
                  <span className="font-heading font-extrabold text-2xl text-purple-950 dark:text-purple-200">
                    "Kuch" + "-siz" = ?
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {currentChapter.taskData.choices.map((c: string) => {
                    const isSelected = selectedAnswer === c;
                    return (
                      <button
                        key={c}
                        onClick={() => handleSelectOption(c)}
                        className={`min-h-[54px] p-3 rounded-2xl font-heading font-extrabold text-lg capitalize transition-all border-2 active:scale-95 ${
                          isSelected
                            ? 'bg-amber-400 text-slate-950 border-amber-600 shadow-md scale-105'
                            : 'bg-slate-50 dark:bg-slate-700/60 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-600 hover:border-amber-400'
                        }`}
                      >
                        {c}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Feedback Message */}
            {feedbackState.status !== 'idle' && (
              <div
                className={`p-4 rounded-2xl font-extrabold text-center text-sm sm:text-base border-2 ${
                  feedbackState.status === 'correct'
                    ? 'bg-emerald-100 border-emerald-400 text-emerald-900 dark:bg-emerald-950/80 dark:text-emerald-200 animate-pop-bounce'
                    : 'bg-orange-100 border-orange-400 text-orange-900 dark:bg-orange-950/80 dark:text-orange-200 animate-soft-shake'
                }`}
              >
                {feedbackState.message}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4">
              {feedbackState.status === 'correct' ? (
                <button
                  onClick={handleNextChapter}
                  className="inline-flex items-center gap-2 px-8 py-3.5 min-h-[50px] rounded-2xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-white font-extrabold text-base shadow-lg border-b-4 border-emerald-700 transition-all"
                >
                  <span>{t.story.nextChapter}</span>
                  <ArrowRight size={20} />
                </button>
              ) : (
                <button
                  onClick={handleCheckChapter}
                  disabled={!selectedAnswer && selectedPairWords.length === 0}
                  className={`inline-flex items-center gap-2 px-8 py-3.5 min-h-[50px] rounded-2xl font-extrabold text-base shadow-lg border-b-4 transition-all ${
                    !selectedAnswer && selectedPairWords.length === 0
                      ? 'opacity-40 cursor-not-allowed bg-slate-200 dark:bg-slate-700 text-slate-500 border-slate-400'
                      : 'bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 border-amber-700'
                  }`}
                >
                  <KeyRound size={20} />
                  <span>{t.story.checkBtn}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
