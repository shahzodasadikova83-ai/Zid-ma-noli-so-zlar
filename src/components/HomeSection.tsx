import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  Gamepad2,
  CheckCircle2,
  KeyRound,
  ArrowRight,
  Flame,
  Star,
  Award,
  HelpCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MascotBilimdon } from './MascotBilimdon';
import { AudioSpeakerBtn } from './AudioSpeakerBtn';
import { ANTONYM_WORDS, TONGUE_TWISTERS } from '../data/words';
import { playClickSound, playCorrectSound } from '../utils/audio';

export const HomeSection: React.FC = () => {
  const { setActiveTab, setSelectedGameId, progress, language, muted, t, addStars, addXp, triggerConfetti } = useApp();
  const [revealedRiddles, setRevealedRiddles] = useState<Record<string, boolean>>({});
  const [reflectionSelected, setReflectionSelected] = useState<number | null>(null);

  // Daily word: select based on day of month to rotate predictably
  const dayOfMonth = new Date().getDate();
  const wordOfDay = ANTONYM_WORDS[dayOfMonth % ANTONYM_WORDS.length] || ANTONYM_WORDS[0];

  const toggleRiddle = (id: string) => {
    playClickSound(muted);
    setRevealedRiddles(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleReflection = (index: number) => {
    if (reflectionSelected === null) {
      playCorrectSound(muted);
      addStars(1);
      addXp(10);
      triggerConfetti();
    }
    setReflectionSelected(index);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Hero Welcome Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-300 via-amber-200 to-orange-200 dark:from-slate-800 dark:via-amber-950/40 dark:to-slate-800 p-6 sm:p-10 border-2 border-amber-300 dark:border-amber-700/60 shadow-xl">
        {/* Background decorative circles */}
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/30 dark:bg-amber-500/10 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-orange-300/30 dark:bg-orange-500/10 blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left flex-1 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/80 dark:bg-amber-900/60 text-amber-950 dark:text-amber-200 text-xs sm:text-sm font-extrabold uppercase tracking-wider mb-4 border border-amber-500/40">
              <Sparkles size={16} className="text-amber-700 dark:text-amber-300" />
              <span>4-sinf ona tili darsligi</span>
            </div>

            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-amber-950 dark:text-amber-50 leading-tight mb-3">
              {t.home.welcomeTitle}
            </h1>

            <p className="text-base sm:text-lg font-medium text-amber-900/90 dark:text-slate-200 leading-relaxed mb-6">
              {t.home.welcomeText}
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <button
                onClick={() => {
                  playClickSound(muted);
                  setActiveTab('learn');
                }}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 min-h-[50px] rounded-2xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-extrabold text-lg shadow-lg hover:shadow-xl transition-all border-b-4 border-amber-700"
              >
                <span>{t.home.startButton}</span>
                <ArrowRight size={22} />
              </button>

              <button
                onClick={() => {
                  playClickSound(muted);
                  setActiveTab('story');
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[50px] rounded-2xl bg-white/80 hover:bg-white dark:bg-slate-800/90 dark:hover:bg-slate-700 active:scale-95 text-amber-900 dark:text-amber-200 font-bold text-base shadow-md transition-all border border-amber-300 dark:border-slate-700"
              >
                <KeyRound size={20} className="text-amber-500" />
                <span>Sirli sandiq</span>
              </button>
            </div>
          </div>

          {/* Mascot Bilimdon Hero Representation */}
          <div className="flex flex-col items-center">
            <MascotBilimdon
              mood="waving"
              size="xl"
              speech="Salom! Keling, o'rganamiz!"
            />
          </div>
        </div>

        {/* Current status bar inside hero */}
        <div className="mt-8 pt-6 border-t border-amber-300/60 dark:border-slate-700/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="bg-white/60 dark:bg-slate-900/60 p-3 rounded-2xl border border-amber-200 dark:border-slate-700">
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
              <Award size={16} className="text-emerald-500" />
              <span>Daraja</span>
            </div>
            <div className="font-heading font-extrabold text-xl text-emerald-700 dark:text-emerald-400">
              {progress.level}-daraja
            </div>
          </div>

          <div className="bg-white/60 dark:bg-slate-900/60 p-3 rounded-2xl border border-amber-200 dark:border-slate-700">
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
              <Star size={16} className="text-amber-500 fill-amber-500" />
              <span>Yulduzlar</span>
            </div>
            <div className="font-heading font-extrabold text-xl text-amber-600 dark:text-amber-400">
              {progress.stars} ⭐
            </div>
          </div>

          <div className="bg-white/60 dark:bg-slate-900/60 p-3 rounded-2xl border border-amber-200 dark:border-slate-700">
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
              <Flame size={16} className="text-orange-500 fill-orange-500" />
              <span>Ketma-ketlik</span>
            </div>
            <div className="font-heading font-extrabold text-xl text-orange-600 dark:text-orange-400">
              {progress.streak} kun 🔥
            </div>
          </div>

          <div className="bg-white/60 dark:bg-slate-900/60 p-3 rounded-2xl border border-amber-200 dark:border-slate-700">
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
              <KeyRound size={16} className="text-amber-600" />
              <span>Oltin kalitlar</span>
            </div>
            <div className="font-heading font-extrabold text-xl text-amber-700 dark:text-amber-300">
              {progress.storyKeys} / 5 🔑
            </div>
          </div>
        </div>
      </div>

      {/* Word of the Day Card ("Kun so'zi") */}
      <div className="rounded-3xl bg-white dark:bg-slate-800 border-2 border-emerald-300 dark:border-emerald-700/60 p-6 sm:p-8 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold text-lg">
              📅
            </span>
            <div>
              <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-white">
                {t.home.wordOfDayTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                {t.home.wordOfDaySub}
              </p>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
            {wordOfDay.partOfSpeech.toUpperCase()}
          </span>
        </div>

        {/* Word pair comparison board */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          {/* Word 1 */}
          <div className="p-5 rounded-2xl bg-amber-50 dark:bg-slate-700/60 border border-amber-200 dark:border-slate-600 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-4xl" role="img" aria-label={wordOfDay.word1}>
                {wordOfDay.emoji1}
              </span>
              <div>
                <div className="font-heading font-extrabold text-2xl text-slate-900 dark:text-amber-100">
                  {wordOfDay.word1}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-300">
                  {language === 'ru' && `(${wordOfDay.translations.ru.word1})`}
                  {language === 'en' && `(${wordOfDay.translations.en.word1})`}
                  {language === 'uz' && '— asosiy so‘z'}
                </div>
              </div>
            </div>
            <AudioSpeakerBtn text={wordOfDay.word1} label={`${wordOfDay.word1} so'zini eshitish`} />
          </div>

          {/* Word 2 (Antonym) */}
          <div className="p-5 rounded-2xl bg-sky-50 dark:bg-slate-700/60 border border-sky-200 dark:border-slate-600 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-4xl" role="img" aria-label={wordOfDay.word2}>
                {wordOfDay.emoji2}
              </span>
              <div>
                <div className="font-heading font-extrabold text-2xl text-sky-950 dark:text-sky-200">
                  {wordOfDay.word2}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-300">
                  {language === 'ru' && `(${wordOfDay.translations.ru.word2})`}
                  {language === 'en' && `(${wordOfDay.translations.en.word2})`}
                  {language === 'uz' && '— zid ma’nolisi'}
                </div>
              </div>
            </div>
            <AudioSpeakerBtn text={wordOfDay.word2} label={`${wordOfDay.word2} so'zini eshitish`} />
          </div>
        </div>

        {/* Example sentence */}
        <div className="mt-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3">
          <div className="flex-1">
            <div className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wide mb-0.5">
              Misol jumla:
            </div>
            <p className="text-slate-800 dark:text-slate-200 font-semibold text-base sm:text-lg">
              "{wordOfDay.exampleUz}"
            </p>
            {language !== 'uz' && (
              <p className="text-xs text-slate-500 dark:text-slate-400 italic mt-0.5">
                {language === 'ru' && wordOfDay.translations.ru.example}
                {language === 'en' && wordOfDay.translations.en.example}
              </p>
            )}
          </div>
          <AudioSpeakerBtn text={wordOfDay.exampleUz} label="Jumlani tinglash" />
        </div>
      </div>

      {/* 4 Quick Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Learn */}
        <div
          onClick={() => {
            playClickSound(muted);
            setActiveTab('learn');
          }}
          className="group cursor-pointer rounded-3xl bg-gradient-to-b from-blue-50 to-blue-100/60 dark:from-slate-800 dark:to-slate-800/80 border-2 border-blue-200 dark:border-blue-800 p-6 shadow-sm hover:shadow-md hover:border-blue-400 transition-all flex flex-col justify-between"
        >
          <div>
            <div className="w-14 h-14 rounded-2xl bg-blue-500 text-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
              <BookOpen size={28} />
            </div>
            <h3 className="font-heading font-extrabold text-xl text-blue-950 dark:text-blue-200 mb-1">
              {t.home.quickLearn}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">
              {t.home.quickLearnDesc}
            </p>
          </div>
          <div className="mt-5 flex items-center text-sm font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
            <span>Darsni boshlash</span>
            <ArrowRight size={18} className="ml-1" />
          </div>
        </div>

        {/* Card 2: Games */}
        <div
          onClick={() => {
            playClickSound(muted);
            setActiveTab('games');
          }}
          className="group cursor-pointer rounded-3xl bg-gradient-to-b from-purple-50 to-purple-100/60 dark:from-slate-800 dark:to-slate-800/80 border-2 border-purple-200 dark:border-purple-800 p-6 shadow-sm hover:shadow-md hover:border-purple-400 transition-all flex flex-col justify-between"
        >
          <div>
            <div className="w-14 h-14 rounded-2xl bg-purple-500 text-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
              <Gamepad2 size={28} />
            </div>
            <h3 className="font-heading font-extrabold text-xl text-purple-950 dark:text-purple-200 mb-1">
              {t.home.quickGames}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">
              {t.home.quickGamesDesc}
            </p>
          </div>
          <div className="mt-5 flex items-center text-sm font-bold text-purple-600 dark:text-purple-400 group-hover:translate-x-1 transition-transform">
            <span>O‘yinlarni o‘ynash</span>
            <ArrowRight size={18} className="ml-1" />
          </div>
        </div>

        {/* Card 3: Test */}
        <div
          onClick={() => {
            playClickSound(muted);
            setActiveTab('test');
          }}
          className="group cursor-pointer rounded-3xl bg-gradient-to-b from-emerald-50 to-emerald-100/60 dark:from-slate-800 dark:to-slate-800/80 border-2 border-emerald-200 dark:border-emerald-800 p-6 shadow-sm hover:shadow-md hover:border-emerald-400 transition-all flex flex-col justify-between"
        >
          <div>
            <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
              <CheckCircle2 size={28} />
            </div>
            <h3 className="font-heading font-extrabold text-xl text-emerald-950 dark:text-emerald-200 mb-1">
              {t.home.quickTest}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">
              {t.home.quickTestDesc}
            </p>
          </div>
          <div className="mt-5 flex items-center text-sm font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
            <span>Testdan o‘tish</span>
            <ArrowRight size={18} className="ml-1" />
          </div>
        </div>

        {/* Card 4: Story */}
        <div
          onClick={() => {
            playClickSound(muted);
            setActiveTab('story');
          }}
          className="group cursor-pointer rounded-3xl bg-gradient-to-b from-amber-50 to-amber-100/60 dark:from-slate-800 dark:to-slate-800/80 border-2 border-amber-200 dark:border-amber-800 p-6 shadow-sm hover:shadow-md hover:border-amber-400 transition-all flex flex-col justify-between"
        >
          <div>
            <div className="w-14 h-14 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
              <KeyRound size={28} />
            </div>
            <h3 className="font-heading font-extrabold text-xl text-amber-950 dark:text-amber-200 mb-1">
              {t.home.quickStory}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">
              {t.home.quickStoryDesc}
            </p>
          </div>
          <div className="mt-5 flex items-center text-sm font-bold text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform">
            <span>Qulfni ochish ({progress.storyKeys}/5)</span>
            <ArrowRight size={18} className="ml-1" />
          </div>
        </div>
      </div>

      {/* Tongue Twisters and Riddles Corner */}
      <div className="rounded-3xl bg-white dark:bg-slate-800 border-2 border-amber-300 dark:border-slate-700 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-orange-400 text-white flex items-center justify-center text-xl shadow-xs">
            🎭
          </div>
          <div>
            <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-white">
              {t.home.tongueTwisterTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              Zid so'zlar qatnashgan qiziqarli topishmoq va tez aytishlar
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TONGUE_TWISTERS.map((item) => {
            const isRevealed = revealedRiddles[item.id];
            return (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-amber-50/70 dark:bg-slate-700/50 border border-amber-200 dark:border-slate-600 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200">
                      {item.type}
                    </span>
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                      {item.pair}
                    </span>
                  </div>
                  <p className="text-slate-800 dark:text-slate-200 font-bold text-sm sm:text-base mt-2">
                    "{item.textUz}"
                  </p>
                  {language !== 'uz' && item.textRu && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 italic mt-1">
                      {language === 'ru' ? item.textRu : item.textEn}
                    </p>
                  )}
                </div>

                {item.answerUz ? (
                  <div className="mt-4 pt-3 border-t border-amber-200 dark:border-slate-600">
                    {isRevealed ? (
                      <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-900 dark:text-emerald-200 text-xs sm:text-sm font-bold flex items-center justify-between animate-pop-bounce">
                        <span>{item.answerUz}</span>
                        <button
                          onClick={() => toggleRiddle(item.id)}
                          className="text-emerald-700 hover:text-emerald-900 p-1"
                        >
                          <EyeOff size={16} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => toggleRiddle(item.id)}
                        className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white dark:bg-slate-800 border border-amber-300 dark:border-slate-600 text-xs font-bold text-amber-800 dark:text-amber-300 hover:bg-amber-100 transition-colors"
                      >
                        <Eye size={16} />
                        <span>{t.home.showAnswer}</span>
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="mt-4 pt-3 border-t border-amber-200 dark:border-slate-600 flex justify-end">
                    <AudioSpeakerBtn text={item.textUz} size="sm" label="Tez aytishni eshitish" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mini Reflection Section */}
      <div className="rounded-3xl bg-gradient-to-r from-amber-100 via-orange-50 to-amber-100 dark:from-slate-800 dark:via-slate-800 dark:to-slate-800 p-6 sm:p-8 border-2 border-amber-300 dark:border-slate-700 text-center">
        <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-amber-950 dark:text-amber-100 mb-2">
          {t.home.reflectionTitle}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 font-medium">
          Dars haqidagi fikringizni bosing va +1 yulduz ⭐ oling!
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => handleReflection(1)}
            className={`min-h-[50px] px-6 py-3 rounded-2xl font-extrabold text-base transition-all border-2 active:scale-95 ${
              reflectionSelected === 1
                ? 'bg-emerald-500 text-white border-emerald-600 shadow-md scale-105'
                : 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 border-amber-200 dark:border-slate-600 hover:bg-emerald-50'
            }`}
          >
            {t.home.reflection1}
          </button>

          <button
            onClick={() => handleReflection(2)}
            className={`min-h-[50px] px-6 py-3 rounded-2xl font-extrabold text-base transition-all border-2 active:scale-95 ${
              reflectionSelected === 2
                ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-md scale-105'
                : 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 border-amber-200 dark:border-slate-600 hover:bg-amber-50'
            }`}
          >
            {t.home.reflection2}
          </button>

          <button
            onClick={() => handleReflection(3)}
            className={`min-h-[50px] px-6 py-3 rounded-2xl font-extrabold text-base transition-all border-2 active:scale-95 ${
              reflectionSelected === 3
                ? 'bg-sky-500 text-white border-sky-600 shadow-md scale-105'
                : 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 border-amber-200 dark:border-slate-600 hover:bg-sky-50'
            }`}
          >
            {t.home.reflection3}
          </button>
        </div>

        {reflectionSelected !== null && (
          <div className="mt-4 text-sm font-bold text-emerald-700 dark:text-emerald-400 animate-pop-bounce">
            {t.home.reflectionThanks} ⭐ (+1 Yulduz qo'shildi)
          </div>
        )}
      </div>
    </div>
  );
};
