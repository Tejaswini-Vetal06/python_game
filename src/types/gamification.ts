import { TopicId, DifficultyLevel } from './challenge';

export interface XPBreakdown {
  baseXP: number;         // 50 XP
  noHintsBonus: number;   // 20 XP (if 0 hints viewed)
  edgeCasesBonus: number; // 15 XP (if all edge cases passed)
  cleanCodeBonus: number; // 15 XP (if PEP8 / clean naming heuristics passed)
  totalEarned: number;
  isFirstCompletion: boolean; // false if practicing previously completed challenge
}

export interface LevelInfo {
  levelNumber: number; // 1 to 8
  title: string;
  minXP: number;
  maxXP: number;
  badgeName: string;
  description: string;
}

export type BadgeId =
  | 'first-program'
  | 'first-string'
  | 'debug-detective'
  | 'loop-master'
  | 'function-ninja'
  | 'list-explorer'
  | 'dict-wizard'
  | 'problem-solver';

export interface Badge {
  id: BadgeId;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string | null; // ISO Date string or null if locked
  category: 'milestone' | 'mastery' | 'skill';
  requirement: string;
}

export interface CompletedChallengeRecord {
  challengeId: string;
  topicId: TopicId;
  difficulty: DifficultyLevel;
  earnedXP: number;
  completedAt: string; // ISO date
  hintsUsedCount: number;
  attemptsCount: number;
  userCode: string;
}

export interface WeeklyActivityDay {
  dayName: string; // 'Mon', 'Tue', ...
  dateStr: string; // YYYY-MM-DD
  count: number;   // number of completed challenges
  isToday: boolean;
}

export interface GameState {
  totalXP: number;
  currentLevelNumber: number;
  completedChallenges: Record<string, CompletedChallengeRecord>; // key is challengeId
  unlockedTopicIndex: number; // 0 to 13 (starts at 0 for Level 1: Variables)
  badges: Record<BadgeId, Badge>;
  unlockedBadgesCount: number;
}
