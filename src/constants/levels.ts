import { LevelInfo } from '../types/gamification';

export const LEVELS: LevelInfo[] = [
  {
    levelNumber: 1,
    title: 'Python Beginner',
    minXP: 0,
    maxXP: 250,
    badgeName: '🌱 Novice Spark',
    description: 'Starting your quest through the Python realm.',
  },
  {
    levelNumber: 2,
    title: 'Python Explorer',
    minXP: 250,
    maxXP: 600,
    badgeName: '🧭 Compass Finder',
    description: 'Venturing deeper into operators and expressions.',
  },
  {
    levelNumber: 3,
    title: 'Logic Builder',
    minXP: 600,
    maxXP: 1200,
    badgeName: '⚡ Decision Core',
    description: 'Constructing robust branching logic and decisions.',
  },
  {
    levelNumber: 4,
    title: 'Loop Master',
    minXP: 1200,
    maxXP: 2000,
    badgeName: '🔄 Infinite Pulse',
    description: 'Taming iterative sequences and nested loops.',
  },
  {
    levelNumber: 5,
    title: 'Function Ninja',
    minXP: 2000,
    maxXP: 3000,
    badgeName: '🗡️ Code Shuriken',
    description: 'Mastering modular functions and reusable returns.',
  },
  {
    levelNumber: 6,
    title: 'Data Structure Wizard',
    minXP: 3000,
    maxXP: 4500,
    badgeName: '🔮 Mystic Vault',
    description: 'Commanding lists, tuples, dictionaries, and sets.',
  },
  {
    levelNumber: 7,
    title: 'Python Developer',
    minXP: 4500,
    maxXP: 6500,
    badgeName: '🛡️ Aegis Architect',
    description: 'Crafting resilient file I/O and exception handlers.',
  },
  {
    levelNumber: 8,
    title: 'Python Master',
    minXP: 6500,
    maxXP: 100000,
    badgeName: '👑 Grand Sovereign',
    description: 'Attained ultimate mastery of the Python language.',
  },
];

export function getLevelForXP(xp: number): LevelInfo {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].minXP) {
      return LEVELS[i];
    }
  }
  return LEVELS[0];
}

export function getNextLevel(currentLevelNumber: number): LevelInfo | null {
  const next = LEVELS.find((l) => l.levelNumber === currentLevelNumber + 1);
  return next || null;
}
