import React, { useState } from 'react';
import {
  Award,
  Star,
  Flame,
  CheckCircle,
  AlertCircle,
  RotateCcw,
  Sparkles,
  BookOpen,
  Volume2,
  Trash2,
  Smile
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { INITIAL_BADGES } from '../data/badges';
import { ANTONYM_WORDS } from '../data/words';
import { AudioSpeakerBtn } from './AudioSpeakerBtn';
import { playClickSound, playWrongSound } from '../utils/audio';

export const ProgressSection: React.FC = () => {
  const {
    language,
    muted,
    t,
    progress,
    setUserName,
    setUserAvatar,
    resetAllProgress,
    setActiveTab,
    setSelectedGameId,
    removeDifficultWord
  } = useApp();

  const [resetModalOpen, setResetModalOpen] = useState<boolean>(false);
  const [editingName, setEditingName] = useState<boolean>(false);
  const [tempName, setTempName] = useState<string>(progress.name);

  const avatars = [
    { id: 'owl', emoji: '🦉', label: 'Boyo‘g‘li' },
    { id: 'lion', emoji: '🦁', label: 'Shercha' },
    { id: 'fox', emoji: '🦊', label: 'Tulki' },
    { id: 'rabbit', emoji: '🐰', label: 'Quyoncha' },
    { id: 'astro', emoji: '🚀', label: 'Fazogir' }
  ];

  // Level titles
  const levelTitles: Record<number, string> = {
    1: t.progress.levelTitle1,
    2: t.progress.levelTitle2,
    3: t.progress.levelTitle3,
    4: t.progress.levelTitle4,
    5: t.progress.levelTitle5
  };

  const currentLevelTitle = levelTitles[progress.level] || levelTitles[5];

  // Next level threshold
  const nextThreshold =
    progress.level === 1 ? 100 : progress.level === 2 ? 250 : progress.level === 3 ? 500 : 850;
  const currentBase =
    progress.level === 1 ? 0 : progress.level === 2 ? 100 : progress.level === 3 ? 250 : 500;
  const progressPercent = Math.min(
    100,
    Math.round(((progress.xp - currentBase) / (nextThreshold - currentBase)) * 100)
  );

  const masteredWordsList = ANTONYM_WORDS.filter(w =>
    progress.masteredWordIds.includes(w.id)
  );

  const difficultWordsList = ANTONYM_WORDS.filter(w =>
    progress.difficultWordIds.includes(w.id)
  );

  const handleSaveName = () => {
    playClickSound(muted);
    if (tempName.trim()) {
      setUserName(tempName.trim());
    }
    setEditingName(false);
  };

  const handleConfirmReset = () => {
    playWrongSound(muted);
    resetAllProgress();
    setResetModalOpen(false);
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Student Profile Card */}
      <div className="rounded-3xl bg-white dark:bg-slate-800 border-2 border-amber-300 dark:border-slate-700 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Avatar selector */}
          <div className="relative group">
            <div className="w-24 h-24 rounded-3xl bg-amber-200 dark:bg-amber-900 flex items-center justify-center text-5xl shadow-md border-2 border-amber-400">
              {avatars.find(a => a.id === progress.avatar)?.emoji || '🦉'}
            </div>
            <div className="flex items-center gap-1 mt-2 justify-center">
              {avatars.map(a => (
                <button
                  key={a.id}
                  onClick={() => {
                    playClickSound(muted);
                    setUserAvatar(a.id);
                  }}
                  className={`p-1 text-sm rounded-lg hover:bg-amber-100 ${
                    progress.avatar === a.id ? 'ring-2 ring-amber-500 scale-110' : 'opacity-60'
                  }`}
                  title={a.label}
                >
                  {a.emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Name & Level summary */}
          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              {editingName ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={tempName}
                    onChange={e => setTempName(e.target.value)}
                    className="px-3 py-1 rounded-xl border border-amber-400 dark:border-slate-600 bg-white dark:bg-slate-700 text-lg font-bold"
                  />
                  <button
                    onClick={handleSaveName}
                    className="px-3 py-1 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
                  >
                    Saqlash
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">
                    {progress.name}
                  </h2>
                  <button
                    onClick={() => {
                      setTempName(progress.name);
                      setEditingName(true);
                    }}
                    className="text-xs text-amber-600 dark:text-amber-400 hover:underline font-bold"
                  >
                    (Tahrirlash)
                  </button>
                </div>
              )}
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 text-xs font-extrabold">
              <Award size={14} />
              <span>
                {progress.level}{t.progress.yourLevel}: {currentLevelTitle}
              </span>
            </div>

            {/* XP Progress Bar */}
            <div className="space-y-1 max-w-md pt-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
                <span>{progress.xp} XP</span>
                <span>{nextThreshold} XP gacha ({progressPercent}%)</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Quick Stats Pills */}
          <div className="flex sm:flex-col gap-3">
            <div className="p-3 px-5 rounded-2xl bg-amber-50 dark:bg-slate-700/60 border border-amber-200 dark:border-slate-600 text-center">
              <div className="text-xs text-slate-500 dark:text-slate-400 font-bold">
                {t.progress.totalStars}
              </div>
              <div className="font-heading font-extrabold text-xl text-amber-600 dark:text-amber-400 flex items-center justify-center gap-1">
                <Star size={18} className="fill-amber-500" />
                <span>{progress.stars}</span>
              </div>
            </div>

            <div className="p-3 px-5 rounded-2xl bg-orange-50 dark:bg-slate-700/60 border border-orange-200 dark:border-slate-600 text-center">
              <div className="text-xs text-slate-500 dark:text-slate-400 font-bold">
                {t.progress.streakDays}
              </div>
              <div className="font-heading font-extrabold text-xl text-orange-600 dark:text-orange-400 flex items-center justify-center gap-1">
                <Flame size={18} className="fill-orange-500" />
                <span>{progress.streak} kun</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Badges Collection */}
      <div className="rounded-3xl bg-white dark:bg-slate-800 border-2 border-amber-300 dark:border-slate-700 p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h3 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white">
            {t.progress.badgesTitle} ({progress.badges.length} / {INITIAL_BADGES.length})
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Darslar, sarguzashtlar va o'yinlar orqali maxsus nishonlarni to'plang!
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {INITIAL_BADGES.map(badge => {
            const isUnlocked = progress.badges.includes(badge.id);

            return (
              <div
                key={badge.id}
                className={`p-4 rounded-3xl border-2 text-center flex flex-col items-center justify-between transition-all ${
                  isUnlocked
                    ? 'bg-amber-50 dark:bg-slate-700/60 border-amber-300 dark:border-amber-700/60 shadow-sm scale-102'
                    : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-700 opacity-50 grayscale'
                }`}
              >
                <div>
                  <div className="text-4xl sm:text-5xl mb-2">{badge.icon}</div>
                  <div className="font-heading font-extrabold text-base text-slate-900 dark:text-white mb-1">
                    {language === 'uz' ? badge.titleUz : language === 'ru' ? badge.titleRu : badge.titleEn}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 leading-tight">
                    {language === 'uz' ? badge.descUz : language === 'ru' ? badge.descRu : badge.descEn}
                  </div>
                </div>

                <div className="mt-3">
                  {isUnlocked ? (
                    <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      Ochilgan ✓
                    </span>
                  ) : (
                    <span className="text-[11px] font-bold text-slate-400">
                      Qulflangan 🔒
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mastered Words and Difficult Words */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mastered words */}
        <div className="rounded-3xl bg-white dark:bg-slate-800 border-2 border-emerald-300 dark:border-slate-700 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-extrabold text-xl text-slate-900 dark:text-white">
              {t.progress.masteredTitle} ({masteredWordsList.length})
            </h3>
            <span className="text-emerald-500 font-bold text-sm">✓ O'zlashtirildi</span>
          </div>

          {masteredWordsList.length === 0 ? (
            <div className="p-6 text-center text-sm text-slate-400">
              Flip kartalardagi yurakcha belgisini bosib, o'rgangan so'zlaringizni shu yerga saqlang!
            </div>
          ) : (
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {masteredWordsList.map(item => (
                <div
                  key={item.id}
                  className="p-3 rounded-2xl bg-emerald-50 dark:bg-slate-700/50 border border-emerald-200 dark:border-slate-600 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{item.emoji1}</span>
                    <span className="font-bold text-slate-800 dark:text-slate-100">
                      {item.word1} ↔ {item.word2}
                    </span>
                  </div>
                  <AudioSpeakerBtn text={`${item.word1} va ${item.word2}`} size="sm" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Difficult words to review */}
        <div className="rounded-3xl bg-white dark:bg-slate-800 border-2 border-amber-300 dark:border-slate-700 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-extrabold text-xl text-slate-900 dark:text-white">
              {t.progress.difficultTitle} ({difficultWordsList.length})
            </h3>
            <span className="text-amber-500 font-bold text-sm">Takrorlash</span>
          </div>

          {difficultWordsList.length === 0 ? (
            <div className="p-6 text-center text-sm text-slate-500 dark:text-slate-400">
              {t.progress.noDifficultWords}
            </div>
          ) : (
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {difficultWordsList.map(item => (
                <div
                  key={item.id}
                  className="p-3 rounded-2xl bg-amber-50 dark:bg-slate-700/50 border border-amber-200 dark:border-slate-600 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{item.emoji1}</span>
                    <span className="font-bold text-slate-800 dark:text-slate-100">
                      {item.word1} ↔ {item.word2}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <AudioSpeakerBtn text={`${item.word1} va ${item.word2}`} size="sm" />
                    <button
                      onClick={() => removeDifficultWord(item.id)}
                      className="p-1.5 rounded-full text-slate-400 hover:text-rose-500"
                      title="O'chirish"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {difficultWordsList.length > 0 && (
            <button
              onClick={() => {
                setActiveTab('games');
                setSelectedGameId('oppositeDay');
              }}
              className="w-full py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm hover:bg-amber-400 transition-colors"
            >
              {t.progress.practiseDifficult}
            </button>
          )}
        </div>
      </div>

      {/* Reset Progress Section */}
      <div className="pt-4 text-center">
        <button
          onClick={() => setResetModalOpen(true)}
          className="inline-flex items-center gap-1.5 text-xs text-rose-500 hover:text-rose-700 hover:underline font-bold"
        >
          <RotateCcw size={14} />
          <span>{t.progress.resetProgress}</span>
        </button>
      </div>

      {/* Confirmation Modal */}
      {resetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border-2 border-rose-300 space-y-4 animate-pop-bounce text-center">
            <div className="text-5xl mb-2">⚠️</div>
            <h3 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white">
              {t.progress.resetConfirmTitle}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {t.progress.resetConfirmDesc}
            </p>

            <div className="flex items-center justify-center gap-3 pt-4">
              <button
                onClick={() => setResetModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-sm"
              >
                {t.progress.cancelBtn}
              </button>
              <button
                onClick={handleConfirmReset}
                className="px-5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm"
              >
                {t.progress.confirmResetBtn}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
