export type Language = 'uz' | 'ru' | 'en';

export type PartOfSpeech = 'sifat' | 'ot' | 'fe\'l';

export interface AntonymPair {
  id: string;
  word1: string;
  word2: string;
  partOfSpeech: PartOfSpeech;
  category: 'size' | 'temperature' | 'state' | 'quality' | 'time' | 'action' | 'nature';
  emoji1: string;
  emoji2: string;
  translations: {
    ru: { word1: string; word2: string; example?: string };
    en: { word1: string; word2: string; example?: string };
  };
  exampleUz: string; // e.g. "Fil juda katta, sichqon esa kichik."
}

export interface Badge {
  id: string;
  titleUz: string;
  titleRu: string;
  titleEn: string;
  descUz: string;
  descRu: string;
  descEn: string;
  icon: string;
  unlockedAt: string | null;
}

export interface UserProgress {
  name: string;
  avatar: string;
  xp: number;
  level: number;
  stars: number;
  streak: number;
  lastActiveDate: string;
  badges: string[]; // badge ids
  masteredWordIds: string[];
  difficultWordIds: string[];
  learnedSteps: number[]; // completed learn steps [1, 2, 3...]
  storyKeys: number;
  storyCompleted: boolean;
  gameHighScores: {
    memory: number;
    balloon: number;
    dragMatch: number;
    oppositeDay: number;
    sentenceFill: number;
    mountainClimb: number;
    visualQuiz: number;
  };
  testBestScore: number; // out of 10
}

export interface ProverbsItem {
  id: string;
  text: string;
  antonymPair: [string, string];
  meaningUz: string;
  meaningRu: string;
  meaningEn: string;
}

export interface StoryChapter {
  id: number;
  titleUz: string;
  titleRu: string;
  titleEn: string;
  storyUz: string;
  storyRu: string;
  storyEn: string;
  clueUz: string;
  clueRu: string;
  clueEn: string;
  type: 'mcq' | 'lock_key' | 'fix_sentence' | 'find_pair' | 'suffix_craft';
  taskData: any;
  hintUz: string;
  hintRu: string;
  hintEn: string;
}

export type ActiveTab = 'home' | 'learn' | 'story' | 'games' | 'test' | 'progress';
