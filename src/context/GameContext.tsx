import React, { createContext, useContext, useState, useEffect } from 'react';
import { GameState, CompletedChallengeRecord, XPBreakdown, BadgeId, LevelInfo } from '../types/gamification';
import { DailyStreak } from '../types/user';
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
  closeLevelUpModal: () => void;
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

  useEffect(() => {
    storageService.saveGameState(gameState);
  }, [gameState]);

  useEffect(() => {
    storageService.saveDailyStreak(streak);
  }, [streak]);

  const currentLevel = getLevelForXP(gameState.totalXP);
  const nextLevel = LEVELS.find((l) => l.levelNumber === currentLevel.levelNumber + 1) || null;

  const isChallengeCompleted = (challengeId: string): boolean => {
    return Boolean(gameState.completedChallenges[challengeId]);
  };

  const isTopicUnlocked = (topicIndex: number): boolean => {
    // Topic 0 (Variables) is always unlocked
    // A topic is unlocked if the topicIndex <= gameState.unlockedTopicIndex
    return topicIndex <= gameState.unlockedTopicIndex;
  };

  const getTopicCompletionPercent = (topicId: TopicId): number => {
    // Count completed challenges for this topic
    const completedInTopic = Object.values(gameState.completedChallenges).filter(
      (c) => c.topicId === topicId
    ).length;
    // Assume 30 challenges per topic (10 beginner, 10 intermediate, 10 advanced)
    // Or normalized to at least 10 challenges for mastery calculation
    const totalBenchmark = 10;
    return Math.min(100, Math.round((completedInTopic / totalBenchmark) * 100));
  };

  const closeLevelUpModal = () => {
    setLevelUpModal(null);
  };

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8b5cf6', '#3b82f6', '#06b6d4', '#10b981', '#fbbf24'],
      });
    } catch {
      // Confetti fallback
    }
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

    // Calculate XP breakdown
    const baseXP = 50;
    const noHintsBonus = hintsUsedCount === 0 ? 20 : 0;
    const edgeCasesBonus = passedEdgeCases ? 15 : 0;
    const cleanCodeBonus = isCleanCode ? 15 : 0;
    const earnedThisRun = baseXP + noHintsBonus + edgeCasesBonus + cleanCodeBonus;

    // Prevent duplicate XP rewards for already completed challenge
    const actualXPToAdd = alreadyCompleted ? 0 : earnedThisRun;

    const breakdown: XPBreakdown = {
      baseXP: alreadyCompleted ? 0 : baseXP,
      noHintsBonus: alreadyCompleted ? 0 : noHintsBonus,
      edgeCasesBonus: alreadyCompleted ? 0 : edgeCasesBonus,
      cleanCodeBonus: alreadyCompleted ? 0 : cleanCodeBonus,
      totalEarned: actualXPToAdd,
      isFirstCompletion: !alreadyCompleted,
    };

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

      // Calculate Topic progression
      const currentTopicIdx = TOPICS.findIndex((t) => t.id === topicId);
      const completedInCurrentTopic = Object.values(updatedCompleted).filter(
        (c) => c.topicId === topicId
      ).length;

      // Unlock next topic if user completes at least 3 challenges in current topic
      let newUnlockedIdx = prev.unlockedTopicIndex;
      if (currentTopicIdx === prev.unlockedTopicIndex && completedInCurrentTopic >= 3) {
        newUnlockedIdx = Math.min(TOPICS.length - 1, prev.unlockedTopicIndex + 1);
      }

      // Check Badges
      const updatedBadges = { ...prev.badges };
      const nowIso = new Date().toISOString();
      const allCompletedList = Object.values(updatedCompleted);

      // 1. First Program
      if (!updatedBadges['first-program'].unlockedAt && allCompletedList.length >= 1) {
        updatedBadges['first-program'].unlockedAt = nowIso;
      }
      // 2. First String Creator
      if (!updatedBadges['first-string'].unlockedAt && topicId === 'strings') {
        updatedBadges['first-string'].unlockedAt = nowIso;
      }
      // 3. Debug Detective (succeeded after >1 attempt)
      if (!updatedBadges['debug-detective'].unlockedAt && attemptsCount > 1) {
        updatedBadges['debug-detective'].unlockedAt = nowIso;
      }
      // 4. Loop Master (5 loop challenges)
      const loopsDone = allCompletedList.filter((c) => c.topicId === 'loops').length;
      if (!updatedBadges['loop-master'].unlockedAt && loopsDone >= 5) {
        updatedBadges['loop-master'].unlockedAt = nowIso;
      }
      // 5. Function Ninja (5 function challenges)
      const functionsDone = allCompletedList.filter((c) => c.topicId === 'functions').length;
      if (!updatedBadges['function-ninja'].unlockedAt && functionsDone >= 5) {
        updatedBadges['function-ninja'].unlockedAt = nowIso;
      }
      // 6. List Explorer (5 list challenges)
      const listsDone = allCompletedList.filter((c) => c.topicId === 'lists').length;
      if (!updatedBadges['list-explorer'].unlockedAt && listsDone >= 5) {
        updatedBadges['list-explorer'].unlockedAt = nowIso;
      }
      // 7. Dictionary Wizard (5 dictionary challenges)
      const dictsDone = allCompletedList.filter((c) => c.topicId === 'dictionaries').length;
      if (!updatedBadges['dict-wizard'].unlockedAt && dictsDone >= 5) {
        updatedBadges['dict-wizard'].unlockedAt = nowIso;
      }
      // 8. Problem Solver (5 challenges with 0 hints)
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
        closeLevelUpModal,
        recordChallengeCompletion,
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
