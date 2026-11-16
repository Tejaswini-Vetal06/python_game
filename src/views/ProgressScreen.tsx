import React from 'react';
import { useUser } from '../context/UserContext';
import { useGame } from '../context/GameContext';
import { TOPICS } from '../constants/topics';
import { Card } from '../components/common/Card';
import { ProgressBar } from '../components/common/ProgressBar';
import { BarChart3, Shield, Sparkles, Flame, CheckCircle2, Award } from 'lucide-react';

export const ProgressScreen: React.FC = () => {
  const { profile } = useUser();
  const { gameState, currentLevel, nextLevel, streak, getTopicCompletionPercent } = useGame();

  const completedList = Object.values(gameState.completedChallenges);
  const totalCompleted = completedList.length;

  const totalLinesOfCode = completedList.reduce(
    (sum, c) => sum + (c.userCode ? c.userCode.split('\n').length : 1),
    0
  );

  const perfectCompletions = completedList.filter((c) => c.hintsUsedCount === 0).length;
  const accuracyRate =
    totalCompleted > 0 ? Math.round((perfectCompletions / totalCompleted) * 100) : 100;

  const xpProgress = nextLevel
    ? gameState.totalXP - currentLevel.minXP
    : 100;
  const xpTarget = nextLevel ? nextLevel.minXP - currentLevel.minXP : 100;

  return (
    <div className="space-y-5 pb-20 md:pb-8 max-w-4xl mx-auto animate-fade-in">
      {/* Header Banner */}
      <div className="flex items-center gap-3.5 bg-game-surface border border-game-border rounded-2xl p-4 sm:p-5">
        <div className="w-12 h-12 rounded-2xl bg-game-cyan/20 border border-game-cyan/40 flex items-center justify-center text-game-cyan shrink-0">
          <BarChart3 className="w-6 h-6" />
        </div>
        <div>
          <div className="text-xs font-bold text-game-cyan uppercase tracking-wider">
            Player Analytics
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white">
            Progress & Skill Mastery
          </h1>
        </div>
      </div>

      {/* Top 4 Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="text-center p-4">
          <div className="w-10 h-10 mx-auto rounded-xl bg-game-purple/20 border border-game-purple/40 flex items-center justify-center text-game-purpleLight mb-2">
            <Shield className="w-5 h-5" />
          </div>
          <div className="text-[11px] text-game-textSubtle font-bold uppercase">
            Rank Tier
          </div>
          <div className="text-sm sm:text-base font-extrabold text-white truncate">
            {currentLevel.title}
          </div>
        </Card>

        <Card className="text-center p-4">
          <div className="w-10 h-10 mx-auto rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-2">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="text-[11px] text-game-textSubtle font-bold uppercase">
            Total XP
          </div>
          <div className="text-sm sm:text-base font-black text-white font-mono">
            {gameState.totalXP}
          </div>
        </Card>

        <Card className="text-center p-4">
          <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-2">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="text-[11px] text-game-textSubtle font-bold uppercase">
            Zero-Hint Quests
          </div>
          <div className="text-sm sm:text-base font-black text-white font-mono">
            {perfectCompletions} <span className="text-xs font-normal text-game-textMuted">({accuracyRate}%)</span>
          </div>
        </Card>

        <Card className="text-center p-4">
          <div className="w-10 h-10 mx-auto rounded-xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 mb-2">
            <Flame className="w-5 h-5" />
          </div>
          <div className="text-[11px] text-game-textSubtle font-bold uppercase">
            Longest Streak
          </div>
          <div className="text-sm sm:text-base font-black text-white font-mono">
            {streak.longestStreak} <span className="text-xs font-normal text-game-textMuted">Days</span>
          </div>
        </Card>
      </div>

      {/* Level Milestone Full Card */}
      <Card>
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-bold uppercase tracking-wider text-game-purpleLight flex items-center gap-1.5">
            <Award className="w-4 h-4" />
            <span>Rank Progression: Level {currentLevel.levelNumber}</span>
          </div>
          <span className="text-xs font-mono text-game-gold font-bold">
            {xpProgress} / {xpTarget} XP
          </span>
        </div>
        <ProgressBar
          value={xpProgress}
          max={xpTarget}
          label={currentLevel.title}
          subLabel={nextLevel ? `Next Milestone: ${nextLevel.title} (${nextLevel.minXP} XP)` : 'Max Level Reached'}
          color="purple"
          size="lg"
        />
      </Card>

      {/* Curriculum Mastery Grid */}
      <Card>
        <h3 className="text-base font-black text-white mb-4">
          Topic-by-Topic Mastery
        </h3>
        <div className="space-y-3.5">
          {TOPICS.map((topic) => {
            const percent = getTopicCompletionPercent(topic.id);
            return (
              <div key={topic.id} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white">
                    {topic.order}. {topic.titles[profile.selectedLanguage]}
                  </span>
                  <span className="font-mono text-game-cyan">{percent}%</span>
                </div>
                <ProgressBar
                  value={percent}
                  max={100}
                  color={percent >= 100 ? 'green' : 'cyan'}
                  size="sm"
                  showPercentage={false}
                />
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};
