import React, { useState, useEffect } from 'react';
import {
  Gamepad2,
  Trophy,
  RotateCcw,
  Sparkles,
  ArrowLeft,
  Timer,
  Star,
  Flame,
  CheckCircle2,
  ChevronRight,
  Zap,
  Mountain
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MascotBilimdon } from './MascotBilimdon';
import { AudioSpeakerBtn } from './AudioSpeakerBtn';
import { ANTONYM_WORDS } from '../data/words';
import {
  playClickSound,
  playCorrectSound,
  playWrongSound,
  playWinSound,
  playPopSound
} from '../utils/audio';

type GameMode =
  | 'menu'
  | 'memory'
  | 'balloon'
  | 'dragMatch'
  | 'oppositeDay'
  | 'sentenceFill'
  | 'mountainClimb'
  | 'visualQuiz';

export const GamesSection: React.FC = () => {
  const {
    muted,
    t,
    progress,
    addXp,
    addStars,
    updateGameScore,
    triggerConfetti,
    unlockBadge,
    selectedGameId,
    setSelectedGameId
  } = useApp();

  const [activeGame, setActiveGame] = useState<GameMode>(() => {
    if (selectedGameId && selectedGameId !== 'menu') {
      return selectedGameId as GameMode;
    }
    return 'menu';
  });

  useEffect(() => {
    if (selectedGameId && selectedGameId !== 'menu') {
      setActiveGame(selectedGameId as GameMode);
    }
  }, [selectedGameId]);

  const selectGame = (mode: GameMode) => {
    playClickSound(muted);
    setActiveGame(mode);
    setSelectedGameId(mode);
  };

  const backToMenu = () => {
    playClickSound(muted);
    setActiveGame('menu');
    setSelectedGameId(null);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Game Header */}
      {activeGame !== 'menu' && (
        <div className="flex items-center justify-between pb-2">
          <button
            onClick={backToMenu}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold text-sm text-slate-700 dark:text-slate-200 hover:bg-amber-100 transition-colors"
          >
            <ArrowLeft size={18} />
            <span>{t.games.backToGames}</span>
          </button>
        </div>
      )}

      {/* GAME MENU */}
      {activeGame === 'menu' && (
        <div className="space-y-8 animate-pop-bounce">
          <div className="rounded-3xl bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-600 text-white p-6 sm:p-10 shadow-lg border-2 border-purple-400 relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="max-w-xl text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white font-bold text-xs uppercase mb-3">
                  <Gamepad2 size={16} />
                  <span>7 xil qiziqarli o'yin</span>
                </div>
                <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-white mb-2">
                  {t.games.title}
                </h1>
                <p className="font-medium text-purple-100 text-base sm:text-lg">
                  {t.games.subtitle}
                </p>
              </div>

              <MascotBilimdon
                mood="celebrating"
                size="lg"
                speech="O'yinni tanlang va yulduz to'plang!"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Game 1: Memory */}
            <div
              onClick={() => selectGame('memory')}
              className="cursor-pointer group rounded-3xl bg-white dark:bg-slate-800 border-2 border-amber-300 dark:border-slate-700 p-6 shadow-sm hover:shadow-md hover:border-amber-500 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center text-3xl mb-4 shadow-sm group-hover:scale-110 transition-transform">
                  🃏
                </div>
                <h3 className="font-heading font-extrabold text-xl text-slate-900 dark:text-white mb-1">
                  {t.games.game1Name}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                  {t.games.game1Desc}
                </p>
              </div>
              <div className="mt-5 flex items-center justify-between text-xs font-bold text-amber-600 dark:text-amber-400">
                <span>Rekord: {progress.gameHighScores.memory} ball</span>
                <ChevronRight size={18} />
              </div>
            </div>

            {/* Game 2: Balloons */}
            <div
              onClick={() => selectGame('balloon')}
              className="cursor-pointer group rounded-3xl bg-white dark:bg-slate-800 border-2 border-rose-300 dark:border-slate-700 p-6 shadow-sm hover:shadow-md hover:border-rose-500 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-rose-400 text-white flex items-center justify-center text-3xl mb-4 shadow-sm group-hover:scale-110 transition-transform">
                  🎈
                </div>
                <h3 className="font-heading font-extrabold text-xl text-slate-900 dark:text-white mb-1">
                  {t.games.game2Name}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                  {t.games.game2Desc}
                </p>
              </div>
              <div className="mt-5 flex items-center justify-between text-xs font-bold text-rose-600 dark:text-rose-400">
                <span>Rekord: {progress.gameHighScores.balloon} ball</span>
                <ChevronRight size={18} />
              </div>
            </div>

            {/* Game 3: Drag & Match */}
            <div
              onClick={() => selectGame('dragMatch')}
              className="cursor-pointer group rounded-3xl bg-white dark:bg-slate-800 border-2 border-blue-300 dark:border-slate-700 p-6 shadow-sm hover:shadow-md hover:border-blue-500 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-blue-500 text-white flex items-center justify-center text-3xl mb-4 shadow-sm group-hover:scale-110 transition-transform">
                  🔗
                </div>
                <h3 className="font-heading font-extrabold text-xl text-slate-900 dark:text-white mb-1">
                  {t.games.game3Name}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                  {t.games.game3Desc}
                </p>
              </div>
              <div className="mt-5 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400">
                <span>Rekord: {progress.gameHighScores.dragMatch} ball</span>
                <ChevronRight size={18} />
              </div>
            </div>

            {/* Game 4: Opposite Day (60s) */}
            <div
              onClick={() => selectGame('oppositeDay')}
              className="cursor-pointer group rounded-3xl bg-white dark:bg-slate-800 border-2 border-emerald-300 dark:border-slate-700 p-6 shadow-sm hover:shadow-md hover:border-emerald-500 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-white flex items-center justify-center text-3xl mb-4 shadow-sm group-hover:scale-110 transition-transform">
                  ⚡
                </div>
                <h3 className="font-heading font-extrabold text-xl text-slate-900 dark:text-white mb-1">
                  {t.games.game4Name}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                  {t.games.game4Desc}
                </p>
              </div>
              <div className="mt-5 flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <span>Rekord: {progress.gameHighScores.oppositeDay} ball</span>
                <ChevronRight size={18} />
              </div>
            </div>

            {/* Game 5: Fill Blank */}
            <div
              onClick={() => selectGame('sentenceFill')}
              className="cursor-pointer group rounded-3xl bg-white dark:bg-slate-800 border-2 border-violet-300 dark:border-slate-700 p-6 shadow-sm hover:shadow-md hover:border-violet-500 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-violet-500 text-white flex items-center justify-center text-3xl mb-4 shadow-sm group-hover:scale-110 transition-transform">
                  ✏️
                </div>
                <h3 className="font-heading font-extrabold text-xl text-slate-900 dark:text-white mb-1">
                  {t.games.game5Name}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                  {t.games.game5Desc}
                </p>
              </div>
              <div className="mt-5 flex items-center justify-between text-xs font-bold text-violet-600 dark:text-violet-400">
                <span>Rekord: {progress.gameHighScores.sentenceFill} ball</span>
                <ChevronRight size={18} />
              </div>
            </div>

            {/* Game 6: Word Mountain Climb */}
            <div
              onClick={() => selectGame('mountainClimb')}
              className="cursor-pointer group rounded-3xl bg-white dark:bg-slate-800 border-2 border-teal-300 dark:border-slate-700 p-6 shadow-sm hover:shadow-md hover:border-teal-500 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-teal-500 text-white flex items-center justify-center text-3xl mb-4 shadow-sm group-hover:scale-110 transition-transform">
                  🏔️
                </div>
                <h3 className="font-heading font-extrabold text-xl text-slate-900 dark:text-white mb-1">
                  {t.games.game6Name}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                  {t.games.game6Desc}
                </p>
              </div>
              <div className="mt-5 flex items-center justify-between text-xs font-bold text-teal-600 dark:text-teal-400">
                <span>Rekord: {progress.gameHighScores.mountainClimb} ball</span>
                <ChevronRight size={18} />
              </div>
            </div>

            {/* Game 7: Visual Opposites */}
            <div
              onClick={() => selectGame('visualQuiz')}
              className="cursor-pointer group rounded-3xl bg-white dark:bg-slate-800 border-2 border-orange-300 dark:border-slate-700 p-6 shadow-sm hover:shadow-md hover:border-orange-500 transition-all flex flex-col justify-between sm:col-span-2 lg:col-span-1"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-orange-500 text-white flex items-center justify-center text-3xl mb-4 shadow-sm group-hover:scale-110 transition-transform">
                  🎨
                </div>
                <h3 className="font-heading font-extrabold text-xl text-slate-900 dark:text-white mb-1">
                  {t.games.game7Name}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                  {t.games.game7Desc}
                </p>
              </div>
              <div className="mt-5 flex items-center justify-between text-xs font-bold text-orange-600 dark:text-orange-400">
                <span>Rekord: {progress.gameHighScores.visualQuiz} ball</span>
                <ChevronRight size={18} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* GAME 1: MEMORY CARDS */}
      {activeGame === 'memory' && <MemoryGame onFinish={updateGameScore} onBack={backToMenu} />}

      {/* GAME 2: BALLOONS */}
      {activeGame === 'balloon' && <BalloonGame onFinish={updateGameScore} onBack={backToMenu} />}

      {/* GAME 3: DRAG & MATCH */}
      {activeGame === 'dragMatch' && <DragMatchGame onFinish={updateGameScore} onBack={backToMenu} />}

      {/* GAME 4: OPPOSITE DAY (60S) */}
      {activeGame === 'oppositeDay' && <OppositeDayGame onFinish={updateGameScore} onBack={backToMenu} />}

      {/* GAME 5: FILL THE BLANK */}
      {activeGame === 'sentenceFill' && <SentenceFillGame onFinish={updateGameScore} onBack={backToMenu} />}

      {/* GAME 6: WORD MOUNTAIN CLIMB */}
      {activeGame === 'mountainClimb' && <MountainClimbGame onFinish={updateGameScore} onBack={backToMenu} />}

      {/* GAME 7: VISUAL OPPOSITES */}
      {activeGame === 'visualQuiz' && <VisualQuizGame onFinish={updateGameScore} onBack={backToMenu} />}
    </div>
  );
};

/* =========================================================================
   SUB-GAME 1: MEMORY PAIRS MATCHING GAME
   ========================================================================= */
interface MemoryCardItem {
  id: string;
  word: string;
  pairId: string;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryGame: React.FC<{
  onFinish: (game: any, score: number) => void;
  onBack: () => void;
}> = ({ onFinish, onBack }) => {
  const { muted, t, addXp, addStars, triggerConfetti } = useApp();
  const [difficulty, setDifficulty] = useState<6 | 8 | 12>(6);
  const [cards, setCards] = useState<MemoryCardItem[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  const startNewGame = (count: 6 | 8 | 12 = difficulty) => {
    const pairCount = count / 2;
    // Shuffle words and pick pairCount
    const shuffledPairs = [...ANTONYM_WORDS].sort(() => 0.5 - Math.random()).slice(0, pairCount);
    const cardDeck: MemoryCardItem[] = [];

    shuffledPairs.forEach(pair => {
      cardDeck.push({
        id: `${pair.id}_1`,
        word: pair.word1,
        pairId: pair.id,
        emoji: pair.emoji1,
        isFlipped: false,
        isMatched: false
      });
      cardDeck.push({
        id: `${pair.id}_2`,
        word: pair.word2,
        pairId: pair.id,
        emoji: pair.emoji2,
        isFlipped: false,
        isMatched: false
      });
    });

    setCards(cardDeck.sort(() => 0.5 - Math.random()));
    setFlippedIndices([]);
    setMoves(0);
    setIsGameOver(false);
  };

  useEffect(() => {
    startNewGame(difficulty);
  }, [difficulty]);

  const handleCardClick = (index: number) => {
    if (flippedIndices.length === 2 || cards[index].isFlipped || cards[index].isMatched) return;

    playClickSound(muted);
    const updated = [...cards];
    updated[index].isFlipped = true;
    setCards(updated);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [idx1, idx2] = newFlipped;
      if (cards[idx1].pairId === cards[idx2].pairId) {
        // Match found!
        playCorrectSound(muted);
        setTimeout(() => {
          setCards(prev => {
            const next = [...prev];
            next[idx1].isMatched = true;
            next[idx2].isMatched = true;
            // Check victory
            if (next.every(c => c.isMatched)) {
              setIsGameOver(true);
              playWinSound(muted);
              triggerConfetti();
              const score = Math.max(10, 100 - moves * 5);
              onFinish('memory', score);
              addXp(30);
              addStars(2);
            }
            return next;
          });
          setFlippedIndices([]);
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          playWrongSound(muted);
          setCards(prev => {
            const next = [...prev];
            next[idx1].isFlipped = false;
            next[idx2].isFlipped = false;
            return next;
          });
          setFlippedIndices([]);
        }, 900);
      }
    }
  };

  return (
    <div className="rounded-3xl bg-white dark:bg-slate-800 border-2 border-amber-300 dark:border-slate-700 p-6 sm:p-8 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white">
            {t.games.game1Name}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            {t.games.game1Desc}
          </p>
        </div>

        {/* Difficulty Selector */}
        <div className="flex items-center gap-2">
          {([6, 8, 12] as const).map(d => (
            <button
              key={d}
              onClick={() => {
                setDifficulty(d);
                startNewGame(d);
              }}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-colors ${
                difficulty === d
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              {d} karta
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between text-sm font-bold text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-700/50 p-3 rounded-2xl">
        <span>Urinishlar: {moves}</span>
        <button
          onClick={() => startNewGame()}
          className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 hover:underline"
        >
          <RotateCcw size={16} />
          <span>Qayta boshlash</span>
        </button>
      </div>

      {isGameOver ? (
        <div className="p-8 text-center space-y-4 animate-pop-bounce">
          <div className="text-6xl animate-bounce">🎉</div>
          <h3 className="font-heading font-extrabold text-3xl text-emerald-600 dark:text-emerald-400">
            {t.games.wellDone}
          </h3>
          <p className="text-slate-600 dark:text-slate-300 font-bold">
            Siz barcha zid so'z juftliklarini {moves} urinishda topdingiz! (+30 XP, +2 ⭐)
          </p>
          <button
            onClick={() => startNewGame()}
            className="px-6 py-3 rounded-2xl bg-amber-500 text-slate-950 font-extrabold text-base shadow-md hover:bg-amber-400 active:scale-95"
          >
            {t.games.replay}
          </button>
        </div>
      ) : (
        <div
          className={`grid gap-4 ${
            difficulty === 6
              ? 'grid-cols-2 sm:grid-cols-3'
              : difficulty === 8
              ? 'grid-cols-2 sm:grid-cols-4'
              : 'grid-cols-3 sm:grid-cols-4 lg:grid-cols-6'
          }`}
        >
          {cards.map((card, idx) => {
            const isShown = card.isFlipped || card.isMatched;
            return (
              <div
                key={card.id}
                onClick={() => handleCardClick(idx)}
                className={`h-28 sm:h-32 rounded-2xl cursor-pointer select-none transition-all duration-300 transform active:scale-95 flex flex-col items-center justify-center p-3 border-2 ${
                  card.isMatched
                    ? 'bg-emerald-100 dark:bg-emerald-950/60 border-emerald-400 text-emerald-900 dark:text-emerald-200'
                    : isShown
                    ? 'bg-amber-100 dark:bg-amber-950/80 border-amber-400 text-amber-950 dark:text-amber-100 shadow-md scale-102'
                    : 'bg-amber-400 hover:bg-amber-300 dark:bg-slate-700 dark:hover:bg-slate-600 border-amber-500 text-white shadow-sm'
                }`}
              >
                {isShown ? (
                  <>
                    <span className="text-3xl mb-1">{card.emoji}</span>
                    <span className="font-heading font-extrabold text-base capitalize text-center">
                      {card.word}
                    </span>
                  </>
                ) : (
                  <span className="text-3xl text-amber-900/60 dark:text-amber-400/60 font-black">
                    ❓
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   SUB-GAME 2: BALLOON POPPING
   ========================================================================= */
const BalloonGame: React.FC<{
  onFinish: (game: any, score: number) => void;
  onBack: () => void;
}> = ({ onFinish, onBack }) => {
  const { muted, t, addXp, addStars, triggerConfetti, unlockBadge } = useApp();
  const [currentRound, setCurrentRound] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [poppedIds, setPoppedIds] = useState<string[]>([]);
  const totalRounds = 6;

  const pairsForGame = [...ANTONYM_WORDS].sort(() => 0.5 - Math.random()).slice(0, totalRounds);
  const activePair = pairsForGame[currentRound] || pairsForGame[0];

  // Options: 1 correct antonym + 3 random wrong words
  const [balloonOptions, setBalloonOptions] = useState<{ word: string; isCorrect: boolean; color: string }[]>([]);

  const balloonColors = [
    'bg-rose-400 border-rose-500 text-white',
    'bg-sky-400 border-sky-500 text-white',
    'bg-amber-400 border-amber-500 text-slate-950',
    'bg-purple-400 border-purple-500 text-white'
  ];

  const setupRound = (roundIdx: number) => {
    const pair = pairsForGame[roundIdx];
    if (!pair) return;

    const wrongWords = ANTONYM_WORDS
      .filter(w => w.id !== pair.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map(w => w.word2);

    const pool = [
      { word: pair.word2, isCorrect: true, color: '' },
      ...wrongWords.map(w => ({ word: w, isCorrect: false, color: '' }))
    ].sort(() => 0.5 - Math.random());

    const withColors = pool.map((item, idx) => ({
      ...item,
      color: balloonColors[idx % balloonColors.length]
    }));

    setBalloonOptions(withColors);
    setPoppedIds([]);
  };

  useEffect(() => {
    setupRound(currentRound);
  }, [currentRound]);

  const handlePop = (opt: { word: string; isCorrect: boolean }) => {
    playPopSound(muted);
    setPoppedIds(prev => [...prev, opt.word]);

    if (opt.isCorrect) {
      playCorrectSound(muted);
      const newScore = score + 20;
      setScore(newScore);

      if (currentRound + 1 >= totalRounds) {
        // Victory
        playWinSound(muted);
        triggerConfetti();
        unlockBadge('balloon_hunter');
        onFinish('balloon', newScore);
        addXp(40);
        addStars(3);
        setCurrentRound(totalRounds);
      } else {
        setTimeout(() => {
          setCurrentRound(r => r + 1);
        }, 600);
      }
    } else {
      playWrongSound(muted);
    }
  };

  const isCompleted = currentRound >= totalRounds;

  return (
    <div className="rounded-3xl bg-white dark:bg-slate-800 border-2 border-rose-300 dark:border-slate-700 p-6 sm:p-8 shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white">
            {t.games.game2Name}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            {t.games.game2Desc}
          </p>
        </div>
        <div className="flex items-center gap-3 font-extrabold text-sm">
          <span className="text-rose-600 dark:text-rose-400">Ball: {score}</span>
          <span className="text-slate-400">Raund: {Math.min(currentRound + 1, totalRounds)} / {totalRounds}</span>
        </div>
      </div>

      {isCompleted ? (
        <div className="p-8 text-center space-y-4 animate-pop-bounce">
          <div className="text-6xl animate-bounce">🎈🏆</div>
          <h3 className="font-heading font-extrabold text-3xl text-rose-600 dark:text-rose-400">
            Ofarin! Mergan shar ovchisi!
          </h3>
          <p className="text-slate-600 dark:text-slate-300 font-bold">
            Siz barcha to'g'ri sharlarni yordingiz! Ball: {score} (+40 XP, +3 ⭐)
          </p>
          <button
            onClick={() => {
              setScore(0);
              setCurrentRound(0);
            }}
            className="px-6 py-3 rounded-2xl bg-rose-500 text-white font-extrabold text-base shadow-md hover:bg-rose-400 active:scale-95"
          >
            {t.games.replay}
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Target board */}
          <div className="p-6 rounded-3xl bg-amber-50 dark:bg-slate-700/60 border-2 border-amber-300 dark:border-slate-600 text-center">
            <span className="text-xs font-extrabold uppercase px-3 py-1 rounded-full bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200 mb-2 inline-block">
              Ushbu so'zning zid ma'noli sharini toping:
            </span>
            <div className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white capitalize">
              {activePair?.word1} {activePair?.emoji1}
            </div>
          </div>

          {/* Floating Balloons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-4">
            {balloonOptions.map((opt, idx) => {
              const isPopped = poppedIds.includes(opt.word);
              return (
                <div key={idx} className="flex flex-col items-center">
                  <button
                    onClick={() => !isPopped && handlePop(opt)}
                    disabled={isPopped}
                    className={`relative w-28 h-36 sm:w-32 sm:h-40 rounded-[50%] flex items-center justify-center p-3 text-center border-2 shadow-lg transition-transform duration-200 active:scale-90 ${
                      opt.color
                    } ${isPopped ? 'opacity-0 scale-0 pointer-events-none' : 'hover:scale-105 animate-float-slow'}`}
                  >
                    {/* Balloon knot and string */}
                    <div className="absolute -bottom-2 w-3 h-3 bg-inherit rotate-45" />
                    <div className="absolute -bottom-7 w-0.5 h-6 bg-slate-400" />
                    <span className="font-heading font-extrabold text-xl capitalize leading-tight">
                      {opt.word}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   SUB-GAME 3: DRAG & MATCH / TAP TO CONNECT
   ========================================================================= */
const DragMatchGame: React.FC<{
  onFinish: (game: any, score: number) => void;
  onBack: () => void;
}> = ({ onFinish, onBack }) => {
  const { muted, t, addXp, addStars, triggerConfetti } = useApp();
  const [pairs] = useState(() => [...ANTONYM_WORDS].sort(() => 0.5 - Math.random()).slice(0, 5));
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]); // pair ids
  const [score, setScore] = useState<number>(0);

  // Left words in normal order, right words shuffled
  const leftItems = pairs.map(p => ({ id: p.id, word: p.word1, emoji: p.emoji1 }));
  const [rightItems] = useState(() =>
    pairs
      .map(p => ({ id: p.id, word: p.word2, emoji: p.emoji2 }))
      .sort(() => 0.5 - Math.random())
  );

  const handleLeftClick = (id: string) => {
    if (matchedPairs.includes(id)) return;
    playClickSound(muted);
    setSelectedLeft(id);
  };

  const handleRightClick = (id: string) => {
    if (matchedPairs.includes(id) || !selectedLeft) return;

    if (selectedLeft === id) {
      // Correct match!
      playCorrectSound(muted);
      const newMatched = [...matchedPairs, id];
      setMatchedPairs(newMatched);
      setSelectedLeft(null);
      setScore(s => s + 20);

      if (newMatched.length === pairs.length) {
        playWinSound(muted);
        triggerConfetti();
        onFinish('dragMatch', 100);
        addXp(35);
        addStars(2);
      }
    } else {
      // Mismatch
      playWrongSound(muted);
      setSelectedLeft(null);
    }
  };

  const isCompleted = matchedPairs.length === pairs.length;

  return (
    <div className="rounded-3xl bg-white dark:bg-slate-800 border-2 border-blue-300 dark:border-slate-700 p-6 sm:p-8 shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white">
            {t.games.game3Name}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Chap ustundagi so'zni bosing, so'ngra unga mos zid so'zni o'ng tomondan tanlang!
          </p>
        </div>
        <div className="text-sm font-bold text-blue-600 dark:text-blue-400">
          Ulandilar: {matchedPairs.length} / {pairs.length}
        </div>
      </div>

      {isCompleted ? (
        <div className="p-8 text-center space-y-4 animate-pop-bounce">
          <div className="text-6xl animate-bounce">🌟👏</div>
          <h3 className="font-heading font-extrabold text-3xl text-blue-600 dark:text-blue-400">
            Ajoyib! Barcha juftliklar muvaffaqiyatli ulandi!
          </h3>
          <p className="text-slate-600 dark:text-slate-300 font-bold">
            Ball: {score} (+35 XP, +2 ⭐)
          </p>
          <button
            onClick={() => {
              setMatchedPairs([]);
              setSelectedLeft(null);
              setScore(0);
            }}
            className="px-6 py-3 rounded-2xl bg-blue-500 text-white font-extrabold text-base shadow-md hover:bg-blue-400 active:scale-95"
          >
            {t.games.replay}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6 sm:gap-12 py-4">
          {/* Left Column */}
          <div className="space-y-3">
            <div className="text-xs font-extrabold uppercase text-slate-400 tracking-wider text-center">
              Asosiy so'z
            </div>
            {leftItems.map(item => {
              const isMatched = matchedPairs.includes(item.id);
              const isSelected = selectedLeft === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleLeftClick(item.id)}
                  disabled={isMatched}
                  className={`w-full min-h-[54px] p-3 rounded-2xl font-heading font-extrabold text-lg flex items-center justify-between border-2 transition-all ${
                    isMatched
                      ? 'bg-emerald-100 dark:bg-emerald-950/60 border-emerald-400 text-emerald-800 dark:text-emerald-300 opacity-60'
                      : isSelected
                      ? 'bg-amber-400 text-slate-950 border-amber-600 shadow-md scale-102 ring-2 ring-amber-300'
                      : 'bg-slate-50 dark:bg-slate-700/60 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-600 hover:border-amber-400'
                  }`}
                >
                  <span className="text-2xl">{item.emoji}</span>
                  <span className="capitalize">{item.word}</span>
                  <span>{isMatched ? '✓' : '👉'}</span>
                </button>
              );
            })}
          </div>

          {/* Right Column */}
          <div className="space-y-3">
            <div className="text-xs font-extrabold uppercase text-slate-400 tracking-wider text-center">
              Zid ma'nolisi
            </div>
            {rightItems.map(item => {
              const isMatched = matchedPairs.includes(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => handleRightClick(item.id)}
                  disabled={isMatched}
                  className={`w-full min-h-[54px] p-3 rounded-2xl font-heading font-extrabold text-lg flex items-center justify-between border-2 transition-all ${
                    isMatched
                      ? 'bg-emerald-100 dark:bg-emerald-950/60 border-emerald-400 text-emerald-800 dark:text-emerald-300 opacity-60'
                      : 'bg-slate-50 dark:bg-slate-700/60 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-600 hover:border-blue-400 active:scale-95'
                  }`}
                >
                  <span>{isMatched ? '✓' : '👈'}</span>
                  <span className="capitalize">{item.word}</span>
                  <span className="text-2xl">{item.emoji}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   SUB-GAME 4: OPPOSITE DAY (60S SPEED RUN)
   ========================================================================= */
const OppositeDayGame: React.FC<{
  onFinish: (game: any, score: number) => void;
  onBack: () => void;
}> = ({ onFinish, onBack }) => {
  const { muted, t, addXp, addStars, triggerConfetti, unlockBadge } = useApp();
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [currentWordIdx, setCurrentWordIdx] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const [shuffledWordPool] = useState(() => [...ANTONYM_WORDS].sort(() => 0.5 - Math.random()));
  const currentPair = shuffledWordPool[currentWordIdx % shuffledWordPool.length];

  // 3 choices (1 correct + 2 wrong)
  const [choices, setChoices] = useState<string[]>([]);

  const generateChoices = (pairIndex: number) => {
    const pair = shuffledWordPool[pairIndex % shuffledWordPool.length];
    const wrong = ANTONYM_WORDS
      .filter(w => w.id !== pair.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 2)
      .map(w => w.word2);

    setChoices([pair.word2, ...wrong].sort(() => 0.5 - Math.random()));
  };

  const startGame = () => {
    playClickSound(muted);
    setTimeLeft(60);
    setScore(0);
    setStreak(0);
    setCurrentWordIdx(0);
    setIsFinished(false);
    setIsPlaying(true);
    generateChoices(0);
  };

  useEffect(() => {
    let timer: any;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (isPlaying && timeLeft === 0) {
      setIsPlaying(false);
      setIsFinished(true);
      playWinSound(muted);
      triggerConfetti();
      onFinish('oppositeDay', score);
      addXp(Math.round(score / 2));
      addStars(3);
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  const handleChoice = (word: string) => {
    if (!isPlaying) return;

    if (word === currentPair.word2) {
      playCorrectSound(muted);
      const newStreak = streak + 1;
      setStreak(newStreak);
      const multiplier = newStreak >= 5 ? 3 : newStreak >= 3 ? 2 : 1;
      setScore(s => s + 10 * multiplier);

      if (newStreak >= 5) {
        unlockBadge('lightning');
      }
    } else {
      playWrongSound(muted);
      setStreak(0);
    }

    const nextIdx = currentWordIdx + 1;
    setCurrentWordIdx(nextIdx);
    generateChoices(nextIdx);
  };

  return (
    <div className="rounded-3xl bg-white dark:bg-slate-800 border-2 border-emerald-300 dark:border-slate-700 p-6 sm:p-8 shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white">
            {t.games.game4Name}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            {t.games.game4Desc}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-100 text-orange-700 font-extrabold text-sm">
            <Timer size={18} />
            <span>{timeLeft}s</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-700 font-extrabold text-sm">
            <Zap size={18} />
            <span>{score} ball</span>
          </div>
        </div>
      </div>

      {!isPlaying && !isFinished && (
        <div className="p-8 text-center space-y-4">
          <div className="text-6xl">⏱️⚡</div>
          <h3 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white">
            60 soniyada imkon qadar ko'p zid so'zni toping!
          </h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Ketma-ket to'g'ri topsangiz, ko'paytiruvchi bonus ballar beriladi (x2, x3)!
          </p>
          <button
            onClick={startGame}
            className="px-8 py-3.5 rounded-2xl bg-emerald-500 text-white font-extrabold text-lg shadow-md hover:bg-emerald-400 active:scale-95"
          >
            Boshlash!
          </button>
        </div>
      )}

      {isFinished && (
        <div className="p-8 text-center space-y-4 animate-pop-bounce">
          <div className="text-6xl animate-bounce">⚡👑</div>
          <h3 className="font-heading font-extrabold text-3xl text-emerald-600 dark:text-emerald-400">
            Vaqt tugadi! Qoyilmaqom tezlik!
          </h3>
          <p className="text-slate-600 dark:text-slate-300 font-bold text-lg">
            Sizning natijangiz: {score} ball! (+{Math.round(score / 2)} XP, +3 ⭐)
          </p>
          <button
            onClick={startGame}
            className="px-6 py-3 rounded-2xl bg-emerald-500 text-white font-extrabold text-base shadow-md hover:bg-emerald-400 active:scale-95"
          >
            {t.games.replay}
          </button>
        </div>
      )}

      {isPlaying && (
        <div className="space-y-6">
          {/* Multiplier Streak Banner */}
          {streak >= 3 && (
            <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 text-xs font-black text-center flex items-center justify-center gap-1.5 animate-pulse">
              <Flame size={16} className="text-amber-500 fill-amber-500" />
              <span>{streak}x KETMA-KET! {streak >= 5 ? 'x3 BONUS' : 'x2 BONUS'}!</span>
            </div>
          )}

          {/* Word prompt */}
          <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-700/60 border-2 border-slate-200 dark:border-slate-600 text-center">
            <span className="text-5xl block mb-2">{currentPair.emoji1}</span>
            <div className="font-heading font-extrabold text-4xl text-slate-900 dark:text-white capitalize">
              {currentPair.word1}
            </div>
          </div>

          {/* 3 Choices */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {choices.map((c, i) => (
              <button
                key={i}
                onClick={() => handleChoice(c)}
                className="min-h-[58px] p-4 rounded-2xl bg-white dark:bg-slate-700 border-2 border-emerald-300 dark:border-slate-600 text-slate-900 dark:text-white font-heading font-extrabold text-xl capitalize shadow-sm hover:bg-emerald-50 dark:hover:bg-slate-600 active:scale-95 transition-all"
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   SUB-GAME 5: SENTENCE FILL IN THE BLANK
   ========================================================================= */
const SentenceFillGame: React.FC<{
  onFinish: (game: any, score: number) => void;
  onBack: () => void;
}> = ({ onFinish, onBack }) => {
  const { muted, t, addXp, addStars, triggerConfetti } = useApp();
  const sentences = [
    { s: "Fil juda katta, sichqon esa ... .", w1: "katta", correct: "kichik", choices: ["kichik", "og'ir", "baland"] },
    { s: "Qishda havo sovuq, yozda esa ... .", w1: "sovuq", correct: "issiq", choices: ["issiq", "iliq", "muzdek"] },
    { s: "Qoplon tez yuguradi, toshbaqa esa ... yuradi.", w1: "tez", correct: "sekin", choices: ["sekin", "uzoq", "qisqa"] },
    { s: "Kunduzi oftob charaqlaydi, ... esa oy chiqadi.", w1: "kunduzi", correct: "tunda", choices: ["tunda", "yozda", "qishda"] },
    { s: "Daftar varag'i oq, siyoh esa ... .", w1: "oq", correct: "qora", choices: ["qora", "ko'k", "sariq"] }
  ];

  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const currentSentence = sentences[currentIdx];

  const handleChoice = (word: string) => {
    if (word === currentSentence.correct) {
      playCorrectSound(muted);
      const newScore = score + 20;
      setScore(newScore);

      if (currentIdx + 1 >= sentences.length) {
        playWinSound(muted);
        triggerConfetti();
        setIsCompleted(true);
        onFinish('sentenceFill', newScore);
        addXp(35);
        addStars(2);
      } else {
        setCurrentIdx(i => i + 1);
      }
    } else {
      playWrongSound(muted);
    }
  };

  return (
    <div className="rounded-3xl bg-white dark:bg-slate-800 border-2 border-violet-300 dark:border-slate-700 p-6 sm:p-8 shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white">
            {t.games.game5Name}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            {t.games.game5Desc}
          </p>
        </div>
        <div className="font-extrabold text-sm text-violet-600 dark:text-violet-400">
          Savol: {Math.min(currentIdx + 1, sentences.length)} / {sentences.length}
        </div>
      </div>

      {isCompleted ? (
        <div className="p-8 text-center space-y-4 animate-pop-bounce">
          <div className="text-6xl animate-bounce">📝⭐</div>
          <h3 className="font-heading font-extrabold text-3xl text-violet-600 dark:text-violet-400">
            Ofarin! Barcha jumlalarni to'g'ri to'ldirdingiz!
          </h3>
          <p className="text-slate-600 dark:text-slate-300 font-bold">
            Ball: {score} (+35 XP, +2 ⭐)
          </p>
          <button
            onClick={() => {
              setCurrentIdx(0);
              setScore(0);
              setIsCompleted(false);
            }}
            className="px-6 py-3 rounded-2xl bg-violet-500 text-white font-extrabold text-base shadow-md hover:bg-violet-400 active:scale-95"
          >
            {t.games.replay}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-violet-50 dark:bg-slate-700/60 border-2 border-violet-200 dark:border-slate-600 text-center">
            <p className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white leading-relaxed">
              "{currentSentence.s}"
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {currentSentence.choices.map((c, idx) => (
              <button
                key={idx}
                onClick={() => handleChoice(c)}
                className="min-h-[58px] p-4 rounded-2xl bg-white dark:bg-slate-700 border-2 border-violet-300 dark:border-slate-600 text-slate-900 dark:text-white font-heading font-extrabold text-xl capitalize shadow-sm hover:bg-violet-50 dark:hover:bg-slate-600 active:scale-95 transition-all"
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   SUB-GAME 6: WORD MOUNTAIN CLIMBER
   ========================================================================= */
const MountainClimbGame: React.FC<{
  onFinish: (game: any, score: number) => void;
  onBack: () => void;
}> = ({ onFinish, onBack }) => {
  const { muted, t, addXp, addStars, triggerConfetti } = useApp();
  const [step, setStep] = useState<number>(0); // 0 to 5 (summit is 5)
  const mountainPairs = [...ANTONYM_WORDS].slice(0, 5);

  const currentPair = mountainPairs[step] || mountainPairs[0];

  const [choices, setChoices] = useState<string[]>([]);

  const setupStepChoices = (s: number) => {
    const p = mountainPairs[s];
    if (!p) return;
    const wrongs = ANTONYM_WORDS.filter(w => w.id !== p.id).slice(0, 2).map(w => w.word2);
    setChoices([p.word2, ...wrongs].sort(() => 0.5 - Math.random()));
  };

  useEffect(() => {
    if (step < 5) {
      setupStepChoices(step);
    }
  }, [step]);

  const handleStepAnswer = (word: string) => {
    if (word === currentPair.word2) {
      playCorrectSound(muted);
      const nextStep = step + 1;
      setStep(nextStep);

      if (nextStep >= 5) {
        playWinSound(muted);
        triggerConfetti();
        onFinish('mountainClimb', 100);
        addXp(40);
        addStars(3);
      }
    } else {
      playWrongSound(muted);
    }
  };

  return (
    <div className="rounded-3xl bg-white dark:bg-slate-800 border-2 border-teal-300 dark:border-slate-700 p-6 sm:p-8 shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white">
            {t.games.game6Name}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Har bir to'g'ri javob bilan tog' cho'qqisiga bir pog'ona ko'tariling!
          </p>
        </div>
        <div className="font-extrabold text-sm text-teal-600 dark:text-teal-400">
          Pog'ona: {step} / 5 🏔️
        </div>
      </div>

      {/* Mountain Progress Visual */}
      <div className="p-4 rounded-3xl bg-gradient-to-t from-teal-100 to-sky-100 dark:from-slate-800 dark:to-slate-900 border-2 border-teal-200 dark:border-slate-700 flex items-end justify-around h-40 relative overflow-hidden">
        {[1, 2, 3, 4, 5].map(lvl => {
          const reached = step >= lvl;
          const isCurrent = step === lvl - 1;
          const height = `${lvl * 18 + 10}%`;

          return (
            <div
              key={lvl}
              style={{ height }}
              className={`w-14 sm:w-16 rounded-t-2xl flex flex-col items-center justify-between p-2 border-t-2 border-x-2 transition-all ${
                reached
                  ? 'bg-teal-500 border-teal-600 text-white'
                  : 'bg-white/80 dark:bg-slate-700 border-slate-300 text-slate-400'
              }`}
            >
              <div className="text-xs font-black">{lvl}</div>
              {isCurrent && (
                <span className="text-2xl animate-bounce" role="img" aria-label="Bilimdon">
                  🦉
                </span>
              )}
              {lvl === 5 && reached && <span className="text-xl">🚩</span>}
            </div>
          );
        })}
      </div>

      {step >= 5 ? (
        <div className="p-8 text-center space-y-4 animate-pop-bounce">
          <div className="text-6xl animate-bounce">🏔️🚩✨</div>
          <h3 className="font-heading font-extrabold text-3xl text-teal-600 dark:text-teal-400">
            G'alaba! Cho'qqi zabt etildi!
          </h3>
          <p className="text-slate-600 dark:text-slate-300 font-bold">
            Bilimdon siz bilan faxrlanadi! (+40 XP, +3 ⭐)
          </p>
          <button
            onClick={() => setStep(0)}
            className="px-6 py-3 rounded-2xl bg-teal-500 text-white font-extrabold text-base shadow-md hover:bg-teal-400 active:scale-95"
          >
            {t.games.replay}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 text-center">
            <span className="text-4xl block mb-2">{currentPair.emoji1}</span>
            <div className="font-heading font-extrabold text-3xl text-slate-900 dark:text-white capitalize">
              {currentPair.word1}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {choices.map((c, i) => (
              <button
                key={i}
                onClick={() => handleStepAnswer(c)}
                className="min-h-[58px] p-4 rounded-2xl bg-white dark:bg-slate-700 border-2 border-teal-300 dark:border-slate-600 text-slate-900 dark:text-white font-heading font-extrabold text-xl capitalize shadow-sm hover:bg-teal-50 dark:hover:bg-slate-600 active:scale-95 transition-all"
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   SUB-GAME 7: VISUAL OPPOSITES (EMOJI / ARTWORK DUEL)
   ========================================================================= */
const VisualQuizGame: React.FC<{
  onFinish: (game: any, score: number) => void;
  onBack: () => void;
}> = ({ onFinish, onBack }) => {
  const { muted, t, addXp, addStars, triggerConfetti } = useApp();
  const visualPairs = [
    { p: ANTONYM_WORDS[0], label: "Fil & Sichqon", target: "kichik" }, // katta-kichik
    { p: ANTONYM_WORDS[3], label: "Quyosh & Qor parchasi", target: "sovuq" }, // issiq-sovuq
    { p: ANTONYM_WORDS[6], label: "Qoplon & Toshbaqa", target: "sekin" }, // tez-sekin
    { p: ANTONYM_WORDS[7], label: "Kunduz & Tun", target: "tun" }, // kun-tun
    { p: ANTONYM_WORDS[10], label: "Asal & Qalampir", target: "achchiq" } // shirin-achchiq
  ];

  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const currentItem = visualPairs[currentIdx];

  const [choices, setChoices] = useState<string[]>([]);

  useEffect(() => {
    if (currentItem) {
      const wrongs = ANTONYM_WORDS.filter(w => w.id !== currentItem.p.id).slice(0, 2).map(w => w.word2);
      setChoices([currentItem.target, ...wrongs].sort(() => 0.5 - Math.random()));
    }
  }, [currentIdx]);

  const handleSelect = (word: string) => {
    if (word === currentItem.target) {
      playCorrectSound(muted);
      const newScore = score + 20;
      setScore(newScore);

      if (currentIdx + 1 >= visualPairs.length) {
        playWinSound(muted);
        triggerConfetti();
        setIsCompleted(true);
        onFinish('visualQuiz', newScore);
        addXp(35);
        addStars(2);
      } else {
        setCurrentIdx(i => i + 1);
      }
    } else {
      playWrongSound(muted);
    }
  };

  return (
    <div className="rounded-3xl bg-white dark:bg-slate-800 border-2 border-orange-300 dark:border-slate-700 p-6 sm:p-8 shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white">
            {t.games.game7Name}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            {t.games.game7Desc}
          </p>
        </div>
        <div className="font-extrabold text-sm text-orange-600 dark:text-orange-400">
          {Math.min(currentIdx + 1, visualPairs.length)} / {visualPairs.length}
        </div>
      </div>

      {isCompleted ? (
        <div className="p-8 text-center space-y-4 animate-pop-bounce">
          <div className="text-6xl animate-bounce">🎨🌟</div>
          <h3 className="font-heading font-extrabold text-3xl text-orange-600 dark:text-orange-400">
            Tasvirlar bo'yicha ajoyib natija!
          </h3>
          <p className="text-slate-600 dark:text-slate-300 font-bold">
            Ball: {score} (+35 XP, +2 ⭐)
          </p>
          <button
            onClick={() => {
              setCurrentIdx(0);
              setScore(0);
              setIsCompleted(false);
            }}
            className="px-6 py-3 rounded-2xl bg-orange-500 text-white font-extrabold text-base shadow-md hover:bg-orange-400 active:scale-95"
          >
            {t.games.replay}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
            <div className="p-6 rounded-3xl bg-amber-50 dark:bg-slate-700/60 border-2 border-amber-300 dark:border-slate-600 text-center">
              <span className="text-6xl mb-2 block">{currentItem.p.emoji1}</span>
              <div className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white capitalize">
                {currentItem.p.word1}
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-orange-50 dark:bg-slate-700/60 border-2 border-orange-300 dark:border-slate-600 text-center flex flex-col items-center justify-center">
              <span className="text-6xl mb-2 block">{currentItem.p.emoji2}</span>
              <span className="font-heading font-extrabold text-2xl text-orange-600 dark:text-orange-400">
                ❓ (?)
              </span>
            </div>
          </div>

          <div className="text-center font-bold text-slate-600 dark:text-slate-300">
            Ikkinchi rasmga mos keladigan zid so'zni tanlang:
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {choices.map((c, i) => (
              <button
                key={i}
                onClick={() => handleSelect(c)}
                className="min-h-[58px] p-4 rounded-2xl bg-white dark:bg-slate-700 border-2 border-orange-300 dark:border-slate-600 text-slate-900 dark:text-white font-heading font-extrabold text-xl capitalize shadow-sm hover:bg-orange-50 dark:hover:bg-slate-600 active:scale-95 transition-all"
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
