import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types/user';
import { TopicId, DifficultyLevel, LanguageCode } from '../types/challenge';
import { storageService, DEFAULT_USER_PROFILE } from '../services/storageService';
import { soundService } from '../services/soundService';

interface UserContextType {
  profile: UserProfile;
  setLanguage: (lang: LanguageCode) => void;
  setTopic: (topic: TopicId) => void;
  setDifficulty: (diff: DifficultyLevel) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setHapticsEnabled: (enabled: boolean) => void;
  setFontSize: (size: number) => void;
  completeOnboarding: (topic: TopicId, diff: DifficultyLevel, lang: LanguageCode) => void;
  updateUsername: (name: string) => void;
  updateAvatar: (avatarId: string) => void;
  resetAll: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>(() => storageService.getUserProfile());

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

  const resetAll = () => {
    storageService.resetAllData();
    setProfile(DEFAULT_USER_PROFILE);
  };

  return (
    <UserContext.Provider
      value={{
        profile,
        setLanguage,
        setTopic,
        setDifficulty,
        setSoundEnabled,
        setHapticsEnabled,
        setFontSize,
        completeOnboarding,
        updateUsername,
        updateAvatar,
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
