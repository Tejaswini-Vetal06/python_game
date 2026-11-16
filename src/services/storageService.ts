import { UserProfile } from '../types/user';
import { GameState } from '../types/gamification';
import { DailyStreak } from '../types/user';
import { INITIAL_BADGES } from '../constants/badges';
import { getTodayDateString } from '../utils/dateUtils';

const STORAGE_KEYS = {
  USER: 'pythonquest_user_v1',
  GAME: 'pythonquest_game_v1',
  STREAK: 'pythonquest_streak_v1',
};

export const DEFAULT_USER_PROFILE: UserProfile = {
  id: 'adventurer-1',
  username: 'PyKnight',
  avatarId: 'warrior',
  selectedTopic: 'variables',
  selectedDifficulty: 'beginner',
  selectedLanguage: 'en',
  soundEnabled: true,
  hapticsEnabled: true,
  fontSize: 14,
  theme: 'neon-dark',
  onboardingCompleted: false,
  createdAt: new Date().toISOString(),
  lastActiveDate: getTodayDateString(),
};

export const DEFAULT_GAME_STATE: GameState = {
  totalXP: 0,
  currentLevelNumber: 1,
  completedChallenges: {},
  unlockedTopicIndex: 0, // 0 corresponds to first topic: 'variables'
  badges: { ...INITIAL_BADGES },
  unlockedBadgesCount: 0,
};

export const DEFAULT_STREAK: DailyStreak = {
  currentStreak: 0,
  longestStreak: 0,
  lastActiveDate: '',
  history: [],
};

class StorageService {
  getUserProfile(): UserProfile {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER);
      if (!data) return DEFAULT_USER_PROFILE;
      const parsed = JSON.parse(data);
      return { ...DEFAULT_USER_PROFILE, ...parsed };
    } catch (e) {
      console.warn('Corrupted user profile in storage, restoring default.', e);
      return DEFAULT_USER_PROFILE;
    }
  }

  saveUserProfile(profile: UserProfile): void {
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(profile));
    } catch (e) {
      console.error('Failed to save user profile to localStorage', e);
    }
  }

  getGameState(): GameState {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.GAME);
      if (!data) return DEFAULT_GAME_STATE;
      const parsed = JSON.parse(data);
      return {
        ...DEFAULT_GAME_STATE,
        ...parsed,
        badges: { ...INITIAL_BADGES, ...(parsed.badges || {}) },
      };
    } catch (e) {
      console.warn('Corrupted game state in storage, restoring default.', e);
      return DEFAULT_GAME_STATE;
    }
  }

  saveGameState(state: GameState): void {
    try {
      localStorage.setItem(STORAGE_KEYS.GAME, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save game state to localStorage', e);
    }
  }

  getDailyStreak(): DailyStreak {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.STREAK);
      if (!data) return DEFAULT_STREAK;
      const parsed = JSON.parse(data);
      return { ...DEFAULT_STREAK, ...parsed };
    } catch (e) {
      console.warn('Corrupted streak in storage, restoring default.', e);
      return DEFAULT_STREAK;
    }
  }

  saveDailyStreak(streak: DailyStreak): void {
    try {
      localStorage.setItem(STORAGE_KEYS.STREAK, JSON.stringify(streak));
    } catch (e) {
      console.error('Failed to save streak to localStorage', e);
    }
  }

  resetAllData(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.USER);
      localStorage.removeItem(STORAGE_KEYS.GAME);
      localStorage.removeItem(STORAGE_KEYS.STREAK);
    } catch (e) {
      console.error('Failed to reset storage data', e);
    }
  }
}

export const storageService = new StorageService();
