import React from 'react';
import {
  Home,
  BookOpen,
  KeyRound,
  Gamepad2,
  CheckCircle2,
  Award,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Flame,
  Star,
  GraduationCap
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ActiveTab, Language } from '../types';

export const Navbar: React.FC = () => {
  const {
    language,
    setLanguage,
    theme,
    toggleTheme,
    muted,
    toggleMute,
    activeTab,
    setActiveTab,
    teacherModeOpen,
    setTeacherModeOpen,
    progress,
    t
  } = useApp();

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'home', label: t.nav.home, icon: <Home size={20} /> },
    { id: 'learn', label: t.nav.learn, icon: <BookOpen size={20} /> },
    { id: 'story', label: t.nav.story, icon: <KeyRound size={20} />, badge: progress.storyCompleted ? '✓' : `${progress.storyKeys}/5` },
    { id: 'games', label: t.nav.games, icon: <Gamepad2 size={20} /> },
    { id: 'test', label: t.nav.test, icon: <CheckCircle2 size={20} /> },
    { id: 'progress', label: t.nav.progress, icon: <Award size={20} /> }
  ];

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'uz', label: "O'zbek", flag: '🇺🇿' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
    { code: 'en', label: 'English', flag: '🇬🇧' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-amber-200/70 dark:border-slate-800 shadow-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Title */}
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2 sm:gap-3 text-left focus:outline-none group"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-amber-400 dark:bg-amber-500 flex items-center justify-center shadow-md transform group-hover:scale-105 transition-transform">
              <span className="text-2xl" role="img" aria-label="Bilimdon">🦉</span>
            </div>
            <div>
              <span className="font-heading font-extrabold text-xl sm:text-2xl text-amber-950 dark:text-amber-100 tracking-tight leading-none block">
                Zid So'zlar
              </span>
              <span className="text-xs font-bold text-amber-700 dark:text-amber-400">
                4-sinf ona tili
              </span>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl font-bold text-sm transition-all relative ${
                    isActive
                      ? 'bg-amber-400 text-amber-950 shadow-sm scale-102 dark:bg-amber-500 dark:text-slate-950'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-amber-100/60 dark:hover:bg-slate-800'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-1 px-1.5 py-0.5 text-[11px] font-extrabold rounded-full bg-amber-600 text-white dark:bg-amber-900 dark:text-amber-200">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Header Stats & Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Streak */}
            <div
              title={`${progress.streak} ${t.header.streak}`}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-orange-100 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-400 rounded-xl font-bold text-xs sm:text-sm shadow-xs"
            >
              <Flame size={16} className="text-orange-500 fill-orange-500 animate-bounce" />
              <span>{progress.streak}</span>
            </div>

            {/* Stars */}
            <div
              title={`${progress.stars} ${t.header.stars}`}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-amber-100 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 rounded-xl font-bold text-xs sm:text-sm shadow-xs"
            >
              <Star size={16} className="text-amber-500 fill-amber-500" />
              <span>{progress.stars}</span>
            </div>

            {/* Level & XP pill */}
            <div
              onClick={() => setActiveTab('progress')}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 rounded-xl font-bold text-xs cursor-pointer hover:bg-emerald-200/80 transition-colors"
            >
              <span>{progress.level}{t.header.level}</span>
              <span className="text-[11px] opacity-75">({progress.xp} XP)</span>
            </div>

            {/* Language Switcher */}
            <div className="relative group">
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl p-1 border border-slate-200 dark:border-slate-700">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLanguage(l.code)}
                    className={`px-2 py-1 rounded-lg text-xs font-bold transition-colors ${
                      language === l.code
                        ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
                    }`}
                    title={l.label}
                  >
                    <span className="mr-0.5">{l.flag}</span>
                    <span className="hidden sm:inline uppercase">{l.code}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={toggleMute}
              title={muted ? t.header.soundOff : t.header.soundOn}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-amber-100 dark:hover:bg-slate-700 transition-colors"
              aria-label="Ovoz sozlamasi"
            >
              {muted ? <VolumeX size={18} className="text-rose-500" /> : <Volume2 size={18} />}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              title={theme === 'dark' ? t.header.lightMode : t.header.darkMode}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-amber-100 dark:hover:bg-slate-700 transition-colors"
              aria-label="Mavzu sozlamasi"
            >
              {theme === 'dark' ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
            </button>

            {/* Teacher Mode Button */}
            <button
              onClick={() => setTeacherModeOpen(!teacherModeOpen)}
              title={t.header.teacherMode}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-100 hover:bg-violet-200 dark:bg-violet-950/70 dark:hover:bg-violet-900 text-violet-800 dark:text-violet-300 border border-violet-200 dark:border-violet-800 text-xs font-bold transition-colors"
            >
              <GraduationCap size={16} />
              <span>{t.header.teacherMode}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-amber-200 dark:border-slate-800 px-2 py-1.5 flex justify-around items-center shadow-lg">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center p-2 rounded-xl font-bold transition-all relative ${
                isActive
                  ? 'text-amber-600 dark:text-amber-400 scale-105'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              {item.icon}
              <span className="text-[10px] mt-0.5">{item.label}</span>
              {item.badge && (
                <span className="absolute top-1 right-2 w-4 h-4 text-[9px] font-bold rounded-full bg-amber-500 text-white flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </header>
  );
};
