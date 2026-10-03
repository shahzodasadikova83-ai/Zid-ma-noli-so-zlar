import React, { useState } from 'react';
import {
  GraduationCap,
  X,
  Tv,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Sparkles,
  BookOpen,
  Volume2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ANTONYM_WORDS } from '../data/words';
import { AudioSpeakerBtn } from './AudioSpeakerBtn';
import { playClickSound } from '../utils/audio';

export const TeacherModeModal: React.FC = () => {
  const {
    teacherModeOpen,
    setTeacherModeOpen,
    projectorMode,
    setProjectorMode,
    muted,
    t,
    language
  } = useApp();

  const [projectorCardIndex, setProjectorCardIndex] = useState<number>(0);
  const [projectorFlipped, setProjectorFlipped] = useState<boolean>(false);

  if (!teacherModeOpen && !projectorMode) return null;

  // Projector mode: Fullscreen presentation
  if (projectorMode) {
    const currentWord = ANTONYM_WORDS[projectorCardIndex];

    const nextCard = () => {
      playClickSound(muted);
      setProjectorFlipped(false);
      setProjectorCardIndex(i => (i + 1) % ANTONYM_WORDS.length);
    };

    const prevCard = () => {
      playClickSound(muted);
      setProjectorFlipped(false);
      setProjectorCardIndex(i => (i - 1 + ANTONYM_WORDS.length) % ANTONYM_WORDS.length);
    };

    const toggleProjectorFlip = () => {
      playClickSound(muted);
      setProjectorFlipped(!projectorFlipped);
    };

    return (
      <div className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col justify-between p-6 sm:p-12 select-none">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xl">
              🦉
            </span>
            <div>
              <div className="font-heading font-extrabold text-xl text-amber-400">
                Sinf doskasi (Proyektor rejimi)
              </div>
              <div className="text-xs text-slate-400">
                Karta {projectorCardIndex + 1} / {ANTONYM_WORDS.length}
              </div>
            </div>
          </div>

          <button
            onClick={() => setProjectorMode(false)}
            className="px-5 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition-colors"
          >
            {t.teacher.exitProjector}
          </button>
        </div>

        {/* Big Interactive Flip Card for Whiteboard */}
        <div className="max-w-3xl w-full mx-auto my-auto">
          <div
            onClick={toggleProjectorFlip}
            className="perspective-1000 h-[380px] sm:h-[450px] cursor-pointer group"
          >
            <div
              className={`relative w-full h-full duration-500 transform-style-preserve-3d transition-transform ${
                projectorFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* Front Card */}
              <div className="absolute inset-0 backface-hidden rounded-3xl bg-slate-900 border-4 border-amber-400 p-8 flex flex-col items-center justify-between text-center shadow-2xl">
                <span className="text-xs font-black uppercase px-3 py-1 rounded-full bg-amber-400 text-slate-950 tracking-wider">
                  {currentWord.partOfSpeech.toUpperCase()}
                </span>

                <div>
                  <span className="text-7xl sm:text-9xl mb-4 block animate-bounce" role="img">
                    {currentWord.emoji1}
                  </span>
                  <div className="font-heading font-black text-5xl sm:text-7xl text-amber-300 capitalize">
                    {currentWord.word1}
                  </div>
                  <div className="text-lg text-slate-400 mt-2">
                    {language === 'ru' && `(${currentWord.translations.ru.word1})`}
                    {language === 'en' && `(${currentWord.translations.en.word1})`}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-amber-400/80 font-bold">
                  <RotateCcw size={16} />
                  <span>Zid ma'nosini ko'rish uchun kartani bosing</span>
                </div>
              </div>

              {/* Back Card (Antonym) */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-3xl bg-slate-900 border-4 border-sky-400 p-8 flex flex-col items-center justify-between text-center shadow-2xl">
                <span className="text-xs font-black uppercase px-3 py-1 rounded-full bg-sky-400 text-slate-950 tracking-wider">
                  ZID MA'NOSI
                </span>

                <div>
                  <span className="text-7xl sm:text-9xl mb-4 block" role="img">
                    {currentWord.emoji2}
                  </span>
                  <div className="font-heading font-black text-5xl sm:text-7xl text-sky-300 capitalize">
                    {currentWord.word2}
                  </div>
                  <div className="text-lg text-slate-400 mt-2">
                    {language === 'ru' && `(${currentWord.translations.ru.word2})`}
                    {language === 'en' && `(${currentWord.translations.en.word2})`}
                  </div>
                </div>

                <div className="text-base font-semibold text-slate-300 bg-slate-800 px-6 py-2 rounded-2xl border border-sky-500">
                  {currentWord.word1} ↔ {currentWord.word2}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation on Projector */}
        <div className="flex items-center justify-between max-w-3xl w-full mx-auto">
          <button
            onClick={prevCard}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-base border border-slate-700"
          >
            <ChevronLeft size={24} />
            <span>Oldingi so'z</span>
          </button>

          <AudioSpeakerBtn
            text={projectorFlipped ? currentWord.word2 : currentWord.word1}
            size="lg"
            className="scale-125"
          />

          <button
            onClick={nextCard}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-base"
          >
            <span>Keyingi so'z</span>
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    );
  }

  // Teacher Methodological Modal
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border-2 border-violet-300 dark:border-violet-800 space-y-6 animate-pop-bounce my-8">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-violet-500 text-white flex items-center justify-center shadow-xs">
              <GraduationCap size={22} />
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-xl text-slate-900 dark:text-white">
                {t.teacher.title}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t.teacher.subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={() => setTeacherModeOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Goal */}
        <div className="p-4 rounded-2xl bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-900 space-y-1">
          <div className="font-bold text-xs uppercase tracking-wider text-violet-800 dark:text-violet-300">
            {t.teacher.goalTitle}
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
            {t.teacher.goalText}
          </p>
        </div>

        {/* 45-Minute Lesson Plan Structure */}
        <div className="space-y-3">
          <h3 className="font-heading font-extrabold text-base text-slate-900 dark:text-white">
            {t.teacher.structureTitle}
          </h3>

          <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              {t.teacher.s1}
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              {t.teacher.s2}
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              {t.teacher.s3}
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              {t.teacher.s4}
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              {t.teacher.s5}
            </div>
          </div>
        </div>

        {/* Classroom Projector Button */}
        <div className="pt-2">
          <button
            onClick={() => {
              setTeacherModeOpen(false);
              setProjectorMode(true);
            }}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-base shadow-md transition-all active:scale-95"
          >
            <Tv size={20} />
            <span>{t.teacher.projectorBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
