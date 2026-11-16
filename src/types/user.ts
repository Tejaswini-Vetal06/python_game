import { TopicId, DifficultyLevel, LanguageCode } from './challenge';

export interface UserPreferences {
  selectedTopic: TopicId;
  selectedDifficulty: DifficultyLevel;
  selectedLanguage: LanguageCode;
  soundEnabled: boolean;
  hapticsEnabled: boolean;
  fontSize: number; // in pixels, default 14 or 16
  theme: 'neon-dark';
}

export interface UserProfile extends UserPreferences {
  id: string;
  username: string;
  avatarId: string;
  onboardingCompleted: boolean;
  createdAt: string; // ISO date
  lastActiveDate: string; // YYYY-MM-DD
}

export interface DailyStreak {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string; // YYYY-MM-DD
  history: string[]; // array of YYYY-MM-DD dates with completed challenges
}
