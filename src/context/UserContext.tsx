import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  LoginHistoryRecord,
  ScreenLayoutMode,
  WatchedVideoRecord,
} from '../types/user';
import { TopicId, DifficultyLevel, LanguageCode } from '../types/challenge';
import { storageService, DEFAULT_USER_PROFILE } from '../services/storageService';
import { soundService } from '../services/soundService';

interface UserContextType {
  profile: UserProfile;
  loginHistory: LoginHistoryRecord[];
  setLanguage: (lang: LanguageCode) => void;
  setTopic: (topic: TopicId) => void;
  setDifficulty: (diff: DifficultyLevel) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setHapticsEnabled: (enabled: boolean) => void;
  setFontSize: (size: number) => void;
  setLayoutMode: (mode: ScreenLayoutMode) => void;
  completeOnboarding: (topic: TopicId, diff: DifficultyLevel, lang: LanguageCode) => void;
  updateUsername: (name: string) => void;
  updateAvatar: (avatarId: string) => void;
  loginUser: (username: string, email?: string) => void;
  logoutUser: () => void;
  recordSessionLogin: (durationSeconds: number, xpEarned: number, questsCount: number) => void;
  saveDraftCode: (challengeId: string, code: string) => void;
  saveVideoWatched: (record: WatchedVideoRecord) => void;
  resetAll: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>(() => storageService.getUserProfile());
  const [loginHistory, setLoginHistory] = useState<LoginHistoryRecord[]>(() =>
    storageService.getLoginHistory()
  );

  useEffect(() => {
    storageService.saveUserProfile(profile);
    soundService.enabled = profile.soundEnabled;
  }, [profile]);

  const setLanguage = (selectedLanguage: LanguageCode) => {
    setProfile((prev) => ({ ...prev, selectedLanguage }));
  };

  const setTopic = (selectedTopic: TopicId) => {
    setProfile((prev) => ({ ...prev, selectedTopic }));
  };

  const setDifficulty = (selectedDifficulty: DifficultyLevel) => {
    setProfile((prev) => ({ ...prev, selectedDifficulty }));
  };

  const setSoundEnabled = (soundEnabled: boolean) => {
    soundService.enabled = soundEnabled;
    setProfile((prev) => ({ ...prev, soundEnabled }));
  };

  const setHapticsEnabled = (hapticsEnabled: boolean) => {
    setProfile((prev) => ({ ...prev, hapticsEnabled }));
  };

  const setFontSize = (fontSize: number) => {
    setProfile((prev) => ({ ...prev, fontSize }));
  };

  const setLayoutMode = (layoutMode: ScreenLayoutMode) => {
    setProfile((prev) => ({ ...prev, layoutMode }));
  };

  const completeOnboarding = (
    selectedTopic: TopicId,
    selectedDifficulty: DifficultyLevel,
    selectedLanguage: LanguageCode
  ) => {
    setProfile((prev) => ({
      ...prev,
      selectedTopic,
      selectedDifficulty,
      selectedLanguage,
      onboardingCompleted: true,
    }));
  };

  const updateUsername = (username: string) => {
    setProfile((prev) => ({ ...prev, username }));
  };

  const updateAvatar = (avatarId: string) => {
    setProfile((prev) => ({ ...prev, avatarId }));
  };

  const loginUser = (username: string, email?: string) => {
    const updatedProfile: UserProfile = {
      ...profile,
      username,
      email: email || `${username.toLowerCase()}@pythonquest.dev`,
      isLoggedIn: true,
    };
    setProfile(updatedProfile);

    // Record login entry in history
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const isTablet = typeof window !== 'undefined' && window.innerWidth >= 768 && window.innerWidth < 1024;
    const deviceType = isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop';

    const newRecord: LoginHistoryRecord = {
      id: 'log-' + Date.now(),
      userId: profile.id,
      username,
      timestamp: new Date().toISOString(),
      deviceType,
      platform: typeof navigator !== 'undefined' ? `${navigator.userAgent.includes('Mobile') ? 'Mobile' : 'Desktop'} Browser (PWA)` : 'Web',
      ipOrLocation: 'Client Verified Session',
      durationSeconds: 0,
      xpEarnedDuringSession: 0,
      challengesCompleted: 0,
    };

    storageService.addLoginHistoryRecord(newRecord);
    setLoginHistory(storageService.getLoginHistory());
  };

  const logoutUser = () => {
    setProfile((prev) => ({
      ...prev,
      isLoggedIn: false,
    }));
  };

  const recordSessionLogin = (durationSeconds: number, xpEarned: number, questsCount: number) => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const isTablet = typeof window !== 'undefined' && window.innerWidth >= 768 && window.innerWidth < 1024;
    const deviceType = isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop';

    const record: LoginHistoryRecord = {
      id: 'log-' + Date.now(),
      userId: profile.id,
      username: profile.username,
      timestamp: new Date().toISOString(),
      deviceType,
      platform: typeof navigator !== 'undefined' ? `${navigator.userAgent.includes('Mobile') ? 'Mobile PWA' : 'Desktop Web'}` : 'Web',
      ipOrLocation: 'Local Client Sandbox',
      durationSeconds,
      xpEarnedDuringSession: xpEarned,
      challengesCompleted: questsCount,
    };

    storageService.addLoginHistoryRecord(record);
    setLoginHistory(storageService.getLoginHistory());
  };

  const saveDraftCode = (challengeId: string, code: string) => {
    storageService.saveDraftCode(challengeId, code);
    setProfile((prev) => ({
      ...prev,
      draftCodes: {
        ...(prev.draftCodes || {}),
        [challengeId]: code,
      },
      activeResumeQuestId: challengeId,
    }));
  };

  const saveVideoWatched = (record: WatchedVideoRecord) => {
    storageService.saveVideoProgress(record);
    setProfile((prev) => ({
      ...prev,
      watchedVideos: {
        ...(prev.watchedVideos || {}),
        [record.topicId]: record,
      },
    }));
  };

  const resetAll = () => {
    storageService.resetAllData();
    setProfile(DEFAULT_USER_PROFILE);
    setLoginHistory(storageService.getLoginHistory());
  };

  return (
    <UserContext.Provider
      value={{
        profile,
        loginHistory,
        setLanguage,
        setTopic,
        setDifficulty,
        setSoundEnabled,
        setHapticsEnabled,
        setFontSize,
        setLayoutMode,
        completeOnboarding,
        updateUsername,
        updateAvatar,
        loginUser,
        logoutUser,
        recordSessionLogin,
        saveDraftCode,
        saveVideoWatched,
        resetAll,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
