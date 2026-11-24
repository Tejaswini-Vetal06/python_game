import { TopicId, DifficultyLevel, LanguageCode } from './challenge';

export type ScreenLayoutMode = 'split' | 'single' | 'code-focus';

export interface UserPreferences {
  selectedTopic: TopicId;
  selectedDifficulty: DifficultyLevel;
  selectedLanguage: LanguageCode;
  soundEnabled: boolean;
  hapticsEnabled: boolean;
  fontSize: number; // in pixels, default 14 or 16
  theme: 'neon-dark';
  layoutMode: ScreenLayoutMode; // Multi-screen / single screen mode
}

export interface LoginHistoryRecord {
  id: string;
  userId: string;
  username: string;
  timestamp: string; // ISO String
  deviceType: 'mobile' | 'tablet' | 'desktop';
  platform: string; // e.g. "Android / Chrome" or "Windows / Edge"
  ipOrLocation: string; // e.g. "Local Session (PWA)"
  durationSeconds: number;
  xpEarnedDuringSession: number;
  challengesCompleted: number;
}

export interface WatchedVideoRecord {
  topicId: TopicId;
  watchedDurationSec: number;
  totalDurationSec: number;
  isCompleted: boolean;
  lastWatchedAt: string;
}

export interface UserSessionState {
  sessionId: string;
  startedAt: string; // ISO date
  elapsedSeconds: number;
  sessionXpEarned: number;
  sessionQuestsCompleted: number;
  sessionHintsUsed: number;
  isActive: boolean;
}

export interface UserProfile extends UserPreferences {
  id: string;
  username: string;
  email?: string;
  isLoggedIn: boolean;
  avatarId: string;
  onboardingCompleted: boolean;
  createdAt: string; // ISO date
  lastActiveDate: string; // YYYY-MM-DD
  activeResumeQuestId?: string; // id of the challenge to resume
  draftCodes?: Record<string, string>; // saved code drafts per challenge id
  watchedVideos?: Record<string, WatchedVideoRecord>;
}

export interface DailyStreak {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string; // YYYY-MM-DD
  history: string[]; // array of YYYY-MM-DD dates with completed challenges
}
