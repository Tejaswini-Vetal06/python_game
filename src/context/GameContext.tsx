import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { GameState, CompletedChallengeRecord, XPBreakdown, LevelInfo } from '../types/gamification';
import { DailyStreak, UserSessionState } from '../types/user';
import { TopicId, DifficultyLevel } from '../types/challenge';
import { storageService, DEFAULT_GAME_STATE, DEFAULT_STREAK } from '../services/storageService';
import { getLevelForXP, LEVELS } from '../constants/levels';
import { calculateNewStreak, getTodayDateString } from '../utils/dateUtils';
import { soundService } from '../services/soundService';
import { TOPICS } from '../constants/topics';
import confetti from 'canvas-confetti';

interface LevelUpEvent {
  oldLevel: LevelInfo;
  newLevel: LevelInfo;
}

interface GameContextType {
  gameState: GameState;
  streak: DailyStreak;
  currentLevel: LevelInfo;
  nextLevel: LevelInfo | null;
  levelUpModal: LevelUpEvent | null;
  sessionState: UserSessionState;
  sessionRecapModal: UserSessionState | null;
  closeLevelUpModal: () => void;
  startSession: () => void;
  endSession: () => void;
  closeSessionRecapModal: () => void;
  recordChallengeCompletion: (
    challengeId: string,
    topicId: TopicId,
    difficulty: DifficultyLevel,
    hintsUsedCount: number,
    attemptsCount: number,
    passedEdgeCases: boolean,
    isCleanCode: boolean,
    userCode: string
  ) => XPBreakdown;
  awardVideoBonusXP: (topicId: TopicId) => number;
  isChallengeCompleted: (challengeId: string) => boolean;
  getTopicCompletionPercent: (topicId: TopicId) => number;
  isTopicUnlocked: (topicIndex: number) => boolean;
  resetGameData: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>(() => storageService.getGameState());
  const [streak, setStreak] = useState<DailyStreak>(() => storageService.getDailyStreak());
  const [levelUpModal, setLevelUpModal] = useState<LevelUpEvent | null>(null);
  const [sessionRecapModal, setSessionRecapModal] = useState<UserSessionState | null>(null);

  // Active Quest Session state
  const [sessionState, setSessionState] = useState<UserSessionState>(() => {
    const saved = storageService.getActiveSession();
    if (saved && saved.isActive) return saved;
    return {
      sessionId: 'sess-' + Date.now(),
      startedAt: new Date().toISOString(),
      elapsedSeconds: 0,
      sessionXpEarned: 0,
      sessionQuestsCompleted: 0,
      sessionHintsUsed: 0,
      isActive: true,
    };
  });

  const sessionTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    storageService.saveGameState(gameState);
  }, [gameState]);

  useEffect(() => {
    storageService.saveDailyStreak(streak);
  }, [streak]);

  // Session tick timer
  useEffect(() => {
    if (sessionState.isActive) {
      sessionTimerRef.current = setInterval(() => {
        setSessionState((prev) => {
          const next = { ...prev, elapsedSeconds: prev.elapsedSeconds + 1 };
          storageService.saveActiveSession(next);
          return next;
        });
      }, 1000);
    }
    return () => {
      if (sessionTimerRef.current) clearInterval(sessionTimerRef.current);
    };
  }, [sessionState.isActive]);

  const currentLevel = getLevelForXP(gameState.totalXP);
  const nextLevel = LEVELS.find((l) => l.levelNumber === currentLevel.levelNumber + 1) || null;

  const isChallengeCompleted = (challengeId: string): boolean => {
    return Boolean(gameState.completedChallenges[challengeId]);
  };

  const isTopicUnlocked = (topicIndex: number): boolean => {
    return topicIndex <= gameState.unlockedTopicIndex;
  };

  const getTopicCompletionPercent = (topicId: TopicId): number => {
    const completedInTopic = Object.values(gameState.completedChallenges).filter(
      (c) => c.topicId === topicId
    ).length;
    const totalBenchmark = 10;
    return Math.min(100, Math.round((completedInTopic / totalBenchmark) * 100));
  };

  const closeLevelUpModal = () => {
    setLevelUpModal(null);
  };

  const closeSessionRecapModal = () => {
    setSessionRecapModal(null);
  };

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#8b5cf6', '#3b82f6', '#06b6d4', '#10b981', '#fbbf24'],
      });
    } catch {
      // Confetti fallback
    }
  };

  const startSession = () => {
    const newSession: UserSessionState = {
      sessionId: 'sess-' + Date.now(),
      startedAt: new Date().toISOString(),
      elapsedSeconds: 0,
      sessionXpEarned: 0,
      sessionQuestsCompleted: 0,
      sessionHintsUsed: 0,
      isActive: true,
    };
    setSessionState(newSession);
    storageService.saveActiveSession(newSession);
    soundService.playSuccess();
  };

  const endSession = () => {
    const finalSession = { ...sessionState, isActive: false };
    setSessionState(finalSession);
    storageService.saveActiveSession(null);
    setSessionRecapModal(finalSession);
    soundService.playLevelUp();
    triggerCelebration();

    // Reset next session ready
    setTimeout(() => {
      setSessionState({
        sessionId: 'sess-' + Date.now(),
        startedAt: new Date().toISOString(),
        elapsedSeconds: 0,
        sessionXpEarned: 0,
        sessionQuestsCompleted: 0,
        sessionHintsUsed: 0,
        isActive: false,
      });
    }, 500);
  };

  const awardVideoBonusXP = (topicId: TopicId): number => {
    const bonus = 30;
    setGameState((prev) => ({
      ...prev,
      totalXP: prev.totalXP + bonus,
    }));
    setSessionState((prev) => ({
      ...prev,
      sessionXpEarned: prev.sessionXpEarned + bonus,
    }));
    soundService.playSuccess();
    triggerCelebration();
    return bonus;
  };

  const recordChallengeCompletion = (
    challengeId: string,
    topicId: TopicId,
    difficulty: DifficultyLevel,
    hintsUsedCount: number,
    attemptsCount: number,
    passedEdgeCases: boolean,
    isCleanCode: boolean,
    userCode: string
  ): XPBreakdown => {
    const alreadyCompleted = isChallengeCompleted(challengeId);

    const baseXP = 50;
    const noHintsBonus = hintsUsedCount === 0 ? 20 : 0;
    const edgeCasesBonus = passedEdgeCases ? 15 : 0;
    const cleanCodeBonus = isCleanCode ? 15 : 0;
    const earnedThisRun = baseXP + noHintsBonus + edgeCasesBonus + cleanCodeBonus;
    const actualXPToAdd = alreadyCompleted ? 0 : earnedThisRun;

    const breakdown: XPBreakdown = {
      baseXP: alreadyCompleted ? 0 : baseXP,
      noHintsBonus: alreadyCompleted ? 0 : noHintsBonus,
      edgeCasesBonus: alreadyCompleted ? 0 : edgeCasesBonus,
      cleanCodeBonus: alreadyCompleted ? 0 : cleanCodeBonus,
      totalEarned: actualXPToAdd,
      isFirstCompletion: !alreadyCompleted,
    };

    // Update active session metrics
    setSessionState((prev) => ({
      ...prev,
      sessionXpEarned: prev.sessionXpEarned + actualXPToAdd,
      sessionQuestsCompleted: prev.sessionQuestsCompleted + (alreadyCompleted ? 0 : 1),
      sessionHintsUsed: prev.sessionHintsUsed + hintsUsedCount,
    }));

    // Update streak
    const today = getTodayDateString();
    const streakResult = calculateNewStreak(
      streak.currentStreak,
      streak.longestStreak,
      streak.lastActiveDate || null
    );
    const updatedHistory = streak.history.includes(today)
      ? [...streak.history]
      : [...streak.history, today];

    setStreak({
      currentStreak: streakResult.newCurrentStreak,
      longestStreak: streakResult.newLongestStreak,
      lastActiveDate: today,
      history: updatedHistory,
    });

    // Update Game State
    setGameState((prev) => {
      const newTotalXP = prev.totalXP + actualXPToAdd;
      const oldLevelInfo = getLevelForXP(prev.totalXP);
      const newLevelInfo = getLevelForXP(newTotalXP);

      if (newLevelInfo.levelNumber > oldLevelInfo.levelNumber) {
        soundService.playLevelUp();
        setLevelUpModal({
          oldLevel: oldLevelInfo,
          newLevel: newLevelInfo,
        });
        triggerCelebration();
      } else {
        soundService.playSuccess();
      }

      const newRecord: CompletedChallengeRecord = {
        challengeId,
        topicId,
        difficulty,
        earnedXP: actualXPToAdd,
        completedAt: new Date().toISOString(),
        hintsUsedCount,
        attemptsCount,
        userCode,
      };

      const updatedCompleted = {
        ...prev.completedChallenges,
        [challengeId]: newRecord,
      };

      const currentTopicIdx = TOPICS.findIndex((t) => t.id === topicId);
      const completedInCurrentTopic = Object.values(updatedCompleted).filter(
        (c) => c.topicId === topicId
      ).length;

      let newUnlockedIdx = prev.unlockedTopicIndex;
      if (currentTopicIdx === prev.unlockedTopicIndex && completedInCurrentTopic >= 3) {
        newUnlockedIdx = Math.min(TOPICS.length - 1, prev.unlockedTopicIndex + 1);
      }

      const updatedBadges = { ...prev.badges };
      const nowIso = new Date().toISOString();
      const allCompletedList = Object.values(updatedCompleted);

      if (!updatedBadges['first-program'].unlockedAt && allCompletedList.length >= 1) {
        updatedBadges['first-program'].unlockedAt = nowIso;
      }
      if (!updatedBadges['first-string'].unlockedAt && topicId === 'strings') {
        updatedBadges['first-string'].unlockedAt = nowIso;
      }
      if (!updatedBadges['debug-detective'].unlockedAt && attemptsCount > 1) {
        updatedBadges['debug-detective'].unlockedAt = nowIso;
      }
      const loopsDone = allCompletedList.filter((c) => c.topicId === 'loops').length;
      if (!updatedBadges['loop-master'].unlockedAt && loopsDone >= 5) {
        updatedBadges['loop-master'].unlockedAt = nowIso;
      }
      const functionsDone = allCompletedList.filter((c) => c.topicId === 'functions').length;
      if (!updatedBadges['function-ninja'].unlockedAt && functionsDone >= 5) {
        updatedBadges['function-ninja'].unlockedAt = nowIso;
      }
      const listsDone = allCompletedList.filter((c) => c.topicId === 'lists').length;
      if (!updatedBadges['list-explorer'].unlockedAt && listsDone >= 5) {
        updatedBadges['list-explorer'].unlockedAt = nowIso;
      }
      const dictsDone = allCompletedList.filter((c) => c.topicId === 'dictionaries').length;
      if (!updatedBadges['dict-wizard'].unlockedAt && dictsDone >= 5) {
        updatedBadges['dict-wizard'].unlockedAt = nowIso;
      }
      const noHintDone = allCompletedList.filter((c) => c.hintsUsedCount === 0).length;
      if (!updatedBadges['problem-solver'].unlockedAt && noHintDone >= 5) {
        updatedBadges['problem-solver'].unlockedAt = nowIso;
      }

      const unlockedCount = Object.values(updatedBadges).filter((b) => b.unlockedAt !== null).length;

      return {
        ...prev,
        totalXP: newTotalXP,
        currentLevelNumber: newLevelInfo.levelNumber,
        completedChallenges: updatedCompleted,
        unlockedTopicIndex: newUnlockedIdx,
        badges: updatedBadges,
        unlockedBadgesCount: unlockedCount,
      };
    });

    return breakdown;
  };

  const resetGameData = () => {
    storageService.resetAllData();
    setGameState(DEFAULT_GAME_STATE);
    setStreak(DEFAULT_STREAK);
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        streak,
        currentLevel,
        nextLevel,
        levelUpModal,
        sessionState,
        sessionRecapModal,
        closeLevelUpModal,
        startSession,
        endSession,
        closeSessionRecapModal,
        recordChallengeCompletion,
        awardVideoBonusXP,
        isChallengeCompleted,
        getTopicCompletionPercent,
        isTopicUnlocked,
        resetGameData,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
