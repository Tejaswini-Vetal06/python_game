import {
  UserProfile,
  LoginHistoryRecord,
  UserSessionState,
  DailyStreak,
  WatchedVideoRecord,
} from '../types/user';
import { GameState } from '../types/gamification';
import { INITIAL_BADGES } from '../constants/badges';
import { getTodayDateString } from '../utils/dateUtils';

const STORAGE_KEYS = {
  USER: 'pythonquest_user_v2',
  GAME: 'pythonquest_game_v2',
  STREAK: 'pythonquest_streak_v2',
  LOGIN_HISTORY: 'pythonquest_logins_v2',
  SESSION: 'pythonquest_session_v2',
};

export const DEFAULT_USER_PROFILE: UserProfile = {
  id: 'adventurer-1',
  username: 'PyKnight',
  email: 'pyknight@pythonquest.dev',
  isLoggedIn: true,
  avatarId: 'warrior',
  selectedTopic: 'variables',
  selectedDifficulty: 'beginner',
  selectedLanguage: 'en',
  soundEnabled: true,
  hapticsEnabled: true,
  fontSize: 14,
  theme: 'neon-dark',
  layoutMode: 'split',
  onboardingCompleted: false,
  createdAt: new Date().toISOString(),
  lastActiveDate: getTodayDateString(),
  draftCodes: {},
  watchedVideos: {},
};

export const DEFAULT_GAME_STATE: GameState = {
  totalXP: 0,
  currentLevelNumber: 1,
  completedChallenges: {},
  unlockedTopicIndex: 0,
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

  getLoginHistory(): LoginHistoryRecord[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.LOGIN_HISTORY);
      if (!data) {
        // Seed default initial login
        const initialRecord: LoginHistoryRecord = {
          id: 'log-init-1',
          userId: 'adventurer-1',
          username: 'PyKnight',
          timestamp: new Date().toISOString(),
          deviceType: typeof window !== 'undefined' && window.innerWidth < 768 ? 'mobile' : 'desktop',
          platform: typeof navigator !== 'undefined' ? `${navigator.platform || 'Browser'} / PWA` : 'Web',
          ipOrLocation: 'Local Client Sandbox',
          durationSeconds: 180,
          xpEarnedDuringSession: 50,
          challengesCompleted: 1,
        };
        return [initialRecord];
      }
      return JSON.parse(data);
    } catch (e) {
      console.warn('Corrupted login history, resetting.', e);
      return [];
    }
  }

  saveLoginHistory(history: LoginHistoryRecord[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.LOGIN_HISTORY, JSON.stringify(history));
    } catch (e) {
      console.error('Failed to save login history', e);
    }
  }

  addLoginHistoryRecord(record: LoginHistoryRecord): void {
    const list = this.getLoginHistory();
    list.unshift(record);
    // Keep last 50 logins
    this.saveLoginHistory(list.slice(0, 50));
  }

  getActiveSession(): UserSessionState | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SESSION);
      if (!data) return null;
      return JSON.parse(data);
    } catch {
      return null;
    }
  }

  saveActiveSession(session: UserSessionState | null): void {
    try {
      if (session) {
        localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
      } else {
        localStorage.removeItem(STORAGE_KEYS.SESSION);
      }
    } catch (e) {
      console.error('Failed to update active session', e);
    }
  }

  saveDraftCode(challengeId: string, code: string): void {
    const profile = this.getUserProfile();
    const drafts = profile.draftCodes || {};
    drafts[challengeId] = code;
    this.saveUserProfile({ ...profile, draftCodes: drafts, activeResumeQuestId: challengeId });
  }

  getDraftCode(challengeId: string): string | null {
    const profile = this.getUserProfile();
    return profile.draftCodes?.[challengeId] || null;
  }

  saveVideoProgress(record: WatchedVideoRecord): void {
    const profile = this.getUserProfile();
    const videos = profile.watchedVideos || {};
    videos[record.topicId] = record;
    this.saveUserProfile({ ...profile, watchedVideos: videos });
  }

  resetAllData(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.USER);
      localStorage.removeItem(STORAGE_KEYS.GAME);
      localStorage.removeItem(STORAGE_KEYS.STREAK);
      localStorage.removeItem(STORAGE_KEYS.LOGIN_HISTORY);
      localStorage.removeItem(STORAGE_KEYS.SESSION);
    } catch (e) {
      console.error('Failed to reset storage data', e);
    }
  }
}

export const storageService = new StorageService();
