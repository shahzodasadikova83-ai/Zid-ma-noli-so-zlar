/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HomeSection } from './components/HomeSection';
import { LearnSection } from './components/LearnSection';
import { StorySection } from './components/StorySection';
import { GamesSection } from './components/GamesSection';
import { TestSection } from './components/TestSection';
import { ProgressSection } from './components/ProgressSection';
import { TeacherModeModal } from './components/TeacherModeModal';

function MainLayout() {
  const { activeTab, projectormode } = useApp() as any;

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/40 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {activeTab === 'home' && <HomeSection />}
        {activeTab === 'learn' && <LearnSection />}
        {activeTab === 'story' && <StorySection />}
        {activeTab === 'games' && <GamesSection />}
        {activeTab === 'test' && <TestSection />}
        {activeTab === 'progress' && <ProgressSection />}
      </main>

      <footer className="no-print mt-auto py-6 border-t border-amber-200/60 dark:border-slate-800 bg-white/60 dark:bg-slate-950/60 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span role="img" aria-label="Owl">🦉</span>
            <span className="font-bold text-amber-900 dark:text-amber-200">
              Zid ma'noli so'zlar (Antonimlar)
            </span>
            <span>— 4-sinf ona tili ta'limiy platformasi</span>
          </div>
          <div>
            <span>Donishmand boyo'g'li Bilimdon bilan birga o'rganing! 🌟</span>
          </div>
        </div>
      </footer>

      <TeacherModeModal />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
