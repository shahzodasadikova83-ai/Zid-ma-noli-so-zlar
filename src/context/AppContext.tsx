import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Language, ActiveTab, UserProgress } from '../types';
import { I18N } from '../data/i18n';
import { playUnlockSound, playWinSound } from '../utils/audio';

const STORAGE_KEY_PROGRESS = 'antonyms_app_progress_v1';
const STORAGE_KEY_THEME = 'antonyms_app_theme';
const STORAGE_KEY_LANG = 'antonyms_app_lang';
const STORAGE_KEY_MUTE = 'antonyms_app_mute';

const DEFAULT_PROGRESS: UserProgress = {
  name: "Bilimdon O'quvchi",
  avatar: 'owl',
  xp: 40,
  level: 1,
  stars: 5,
  streak: 3,
  lastActiveDate: new Date().toISOString().split('T')[0],
  badges: ['first_step'],
  masteredWordIds: ['w1', 'w4'],
  difficultWordIds: [],
  learnedSteps: [1],
  storyKeys: 0,
  storyCompleted: false,
  gameHighScores: {
    memory: 0,
    balloon: 0,
    dragMatch: 0,
    oppositeDay: 0,
    sentenceFill: 0,
    mountainClimb: 0,
    visualQuiz: 0
  },
  testBestScore: 0
};

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  muted: boolean;
  toggleMute: () => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedGameId: string | null;
  setSelectedGameId: (id: string | null) => void;
  teacherModeOpen: boolean;
  setTeacherModeOpen: (open: boolean) => void;
  projectorMode: boolean;
  setProjectorMode: (active: boolean) => void;
  progress: UserProgress;
  addXp: (amount: number) => void;
  addStars: (amount: number) => void;
  unlockBadge: (badgeId: string) => void;
  markWordMastered: (id: string) => void;
  markWordDifficult: (id: string) => void;
  removeDifficultWord: (id: string) => void;
  saveLearnedStep: (stepNum: number) => void;
  addStoryKey: () => void;
  resetStory: () => void;
  updateGameScore: (game: keyof UserProgress['gameHighScores'], score: number) => void;
  saveTestScore: (score: number) => void;
  setUserName: (name: string) => void;
  setUserAvatar: (avatar: string) => void;
  resetAllProgress: () => void;
  triggerConfetti: () => void;
  t: typeof I18N['uz'];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Language
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_LANG);
    return (saved === 'uz' || saved === 'ru' || saved === 'en') ? saved : 'uz';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY_LANG, lang);
  };

  // Theme
  const [theme, setThemeState] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_THEME);
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem(STORAGE_KEY_THEME, theme);
  }, [theme]);

  const toggleTheme = () => {
    setThemeState(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Sound Mute
  const [muted, setMuted] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEY_MUTE) === 'true';
  });

  const toggleMute = () => {
    setMuted(prev => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY_MUTE, String(next));
      return next;
    });
  };

  // Active Tab & Selection
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
  const [teacherModeOpen, setTeacherModeOpen] = useState<boolean>(false);
  const [projectorMode, setProjectorMode] = useState<boolean>(false);

  // User Progress
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROGRESS);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Calculate streak
        const today = new Date().toISOString().split('T')[0];
        let streak = parsed.streak || 1;
        if (parsed.lastActiveDate && parsed.lastActiveDate !== today) {
          const lastDate = new Date(parsed.lastActiveDate);
          const currentDate = new Date(today);
          const diffDays = Math.round((currentDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));
          if (diffDays === 1) {
            streak += 1;
          } else if (diffDays > 1) {
            streak = 1;
          }
        }
        return {
          ...DEFAULT_PROGRESS,
          ...parsed,
          streak,
          lastActiveDate: today
        };
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_PROGRESS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(progress));
    } catch (e) {
      console.error(e);
    }
  }, [progress]);

  // Level calculator based on XP
  const calculateLevel = (xp: number) => {
    if (xp < 100) return 1;
    if (xp < 250) return 2;
    if (xp < 500) return 3;
    if (xp < 850) return 4;
    return 5;
  };

  const addXp = (amount: number) => {
    setProgress(prev => {
      const newXp = prev.xp + amount;
      const newLevel = calculateLevel(newXp);
      return {
        ...prev,
        xp: newXp,
        level: newLevel
      };
    });
  };

  const addStars = (amount: number) => {
    setProgress(prev => ({
      ...prev,
      stars: Math.max(0, prev.stars + amount)
    }));
  };

  const unlockBadge = (badgeId: string) => {
    setProgress(prev => {
      if (prev.badges.includes(badgeId)) return prev;
      playUnlockSound(muted);
      return {
        ...prev,
        badges: [...prev.badges, badgeId],
        xp: prev.xp + 30
      };
    });
  };

  const markWordMastered = (id: string) => {
    setProgress(prev => {
      const mastered = prev.masteredWordIds.includes(id)
        ? prev.masteredWordIds
        : [...prev.masteredWordIds, id];
      const diff = prev.difficultWordIds.filter(w => w !== id);
      // Unlock badge if 10 words mastered
      if (mastered.length >= 10 && !prev.badges.includes('word_master')) {
        unlockBadge('word_master');
      }
      return {
        ...prev,
        masteredWordIds: mastered,
        difficultWordIds: diff
      };
    });
  };

  const markWordDifficult = (id: string) => {
    setProgress(prev => {
      if (prev.difficultWordIds.includes(id)) return prev;
      return {
        ...prev,
        difficultWordIds: [...prev.difficultWordIds, id]
      };
    });
  };

  const removeDifficultWord = (id: string) => {
    setProgress(prev => ({
      ...prev,
      difficultWordIds: prev.difficultWordIds.filter(w => w !== id)
    }));
  };

  const saveLearnedStep = (stepNum: number) => {
    setProgress(prev => {
      const steps = prev.learnedSteps.includes(stepNum)
        ? prev.learnedSteps
        : [...prev.learnedSteps, stepNum];
      if (steps.length >= 6 && !prev.badges.includes('scholar')) {
        unlockBadge('scholar');
      }
      return {
        ...prev,
        learnedSteps: steps
      };
    });
  };

  const addStoryKey = () => {
    setProgress(prev => {
      const keys = Math.min(5, prev.storyKeys + 1);
      const completed = keys === 5;
      if (completed && !prev.storyCompleted) {
        unlockBadge('detective');
        playWinSound(muted);
      }
      return {
        ...prev,
        storyKeys: keys,
        storyCompleted: completed || prev.storyCompleted
      };
    });
  };

  const resetStory = () => {
    setProgress(prev => ({
      ...prev,
      storyKeys: 0
    }));
  };

  const updateGameScore = (game: keyof UserProgress['gameHighScores'], score: number) => {
    setProgress(prev => {
      const current = prev.gameHighScores[game] || 0;
      if (score > current) {
        return {
          ...prev,
          gameHighScores: {
            ...prev.gameHighScores,
            [game]: score
          }
        };
      }
      return prev;
    });
  };

  const saveTestScore = (score: number) => {
    setProgress(prev => {
      if (score >= 9) {
        unlockBadge('perfect_test');
      }
      return {
        ...prev,
        testBestScore: Math.max(prev.testBestScore, score)
      };
    });
  };

  const setUserName = (name: string) => {
    setProgress(prev => ({ ...prev, name }));
  };

  const setUserAvatar = (avatar: string) => {
    setProgress(prev => ({ ...prev, avatar }));
  };

  const resetAllProgress = () => {
    const fresh: UserProgress = {
      ...DEFAULT_PROGRESS,
      badges: ['first_step'],
      masteredWordIds: [],
      difficultWordIds: [],
      learnedSteps: [1],
      storyKeys: 0,
      storyCompleted: false,
      stars: 5,
      xp: 0,
      level: 1
    };
    setProgress(fresh);
    localStorage.removeItem(STORAGE_KEY_PROGRESS);
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  const t = I18N[language];

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        theme,
        toggleTheme,
        muted,
        toggleMute,
        activeTab,
        setActiveTab,
        selectedGameId,
        setSelectedGameId,
        teacherModeOpen,
        setTeacherModeOpen,
        projectorMode,
        setProjectorMode,
        progress,
        addXp,
        addStars,
        unlockBadge,
        markWordMastered,
        markWordDifficult,
        removeDifficultWord,
        saveLearnedStep,
        addStoryKey,
        resetStory,
        updateGameScore,
        saveTestScore,
        setUserName,
        setUserAvatar,
        resetAllProgress,
        triggerConfetti,
        t
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
