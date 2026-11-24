import React from 'react';
import { useUser } from '../context/UserContext';
import { useGame } from '../context/GameContext';
import { TRANSLATIONS } from '../constants/translations';
import { TOPICS } from '../constants/topics';
import { getWeeklyActivity } from '../utils/dateUtils';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { ProgressBar } from '../components/common/ProgressBar';
import { BadgeIcon } from '../components/common/BadgeIcon';
import { SessionStartBanner } from '../components/session/SessionStartBanner';
import {
  Sparkles,
  Play,
  Flame,
  Award,
  Calendar,
  ChevronRight,
  TrendingUp,
  Video,
  History,
  RotateCcw,
} from 'lucide-react';

interface DashboardScreenProps {
  onNavigate: (screen: string) => void;
  onSelectTopic: (topicId: string) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  onNavigate,
}) => {
  const { profile } = useUser();
  const { gameState, currentLevel, nextLevel, streak, getTopicCompletionPercent } = useGame();
  const t = TRANSLATIONS[profile.selectedLanguage];

  const currentTopic =
    TOPICS.find((top) => top.id === profile.selectedTopic) || TOPICS[0];
  const completionPercent = getTopicCompletionPercent(currentTopic.id);

  const xpProgress = nextLevel
    ? gameState.totalXP - currentLevel.minXP
    : 100;
  const xpTarget = nextLevel ? nextLevel.minXP - currentLevel.minXP : 100;

  const weeklyActivity = getWeeklyActivity(streak.history);
  const earnedBadgesList = Object.values(gameState.badges).filter((b) => b.unlockedAt !== null);
  const completedCount = Object.keys(gameState.completedChallenges).length;

  return (
    <div className="space-y-5 pb-24 md:pb-8 max-w-5xl mx-auto animate-fade-in">
      {/* Active Session Start / End HUD Banner */}
      <SessionStartBanner />

      {/* 1. Hero Welcome & Smart Resume Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-game-purpleDark/80 via-game-surface to-game-card border border-game-purpleLight/40 p-5 sm:p-7 shadow-glow-purple">
        <div className="absolute top-0 right-0 w-64 h-64 bg-game-cyan/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-game-purple/30 border border-game-purpleLight/50 text-game-purpleLight text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-game-gold" />
              <span>Welcome Back, {profile.username}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Ready for your next Quest?
            </h1>
            <p className="text-sm text-game-textMuted mt-1 max-w-md">
              Current Chapter: <span className="text-game-cyan font-bold">{currentTopic.titles[profile.selectedLanguage]}</span> ({profile.selectedDifficulty.toUpperCase()})
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
            <Button
              variant="primary"
              size="lg"
              glow
              onClick={() => onNavigate('challenge')}
              icon={completedCount > 0 ? <RotateCcw className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
            >
              {completedCount > 0 ? t.continueQuest : t.startQuest}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => onNavigate('videos')}
              icon={<Video className="w-5 h-5" />}
            >
              Videos
            </Button>
          </div>
        </div>
      </div>

      {/* 2. Key Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Level Card */}
        <Card className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-game-purple/20 border border-game-purple/40 flex items-center justify-center text-game-purpleLight shrink-0">
            <span className="font-mono font-bold text-lg">L{currentLevel.levelNumber}</span>
          </div>
          <div>
            <div className="text-[11px] text-game-textSubtle uppercase tracking-wider font-bold">
              Rank
            </div>
            <div className="text-sm font-extrabold text-white truncate max-w-[120px]">
              {currentLevel.title}
            </div>
          </div>
        </Card>

        {/* Total XP Card */}
        <Card className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[11px] text-game-textSubtle uppercase tracking-wider font-bold">
              Total XP
            </div>
            <div className="text-base sm:text-lg font-black text-white font-mono">
              {gameState.totalXP}
            </div>
          </div>
        </Card>

        {/* Daily Streak Card */}
        <Card className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 shrink-0">
            <Flame className="w-6 h-6 fill-current animate-pulse" />
          </div>
          <div>
            <div className="text-[11px] text-game-textSubtle uppercase tracking-wider font-bold">
              Streak
            </div>
            <div className="text-base sm:text-lg font-black text-white font-mono">
              {streak.currentStreak} <span className="text-xs text-game-textMuted font-sans">Days</span>
            </div>
          </div>
        </Card>

        {/* Completed Challenges Card */}
        <Card className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[11px] text-game-textSubtle uppercase tracking-wider font-bold">
              Completed
            </div>
            <div className="text-base sm:text-lg font-black text-white font-mono">
              {completedCount} <span className="text-xs text-game-textMuted font-sans">Quests</span>
            </div>
          </div>
        </Card>
      </div>

      {/* 3. Level Progression & Chapter Mastery */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Next Level Progress */}
        <Card>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-game-purpleLight">
              Level Progression
            </span>
            <span className="text-xs font-mono text-game-textMuted">
              {xpProgress} / {xpTarget} XP
            </span>
          </div>
          <ProgressBar
            value={xpProgress}
            max={xpTarget}
            label={currentLevel.title}
            subLabel={nextLevel ? `Next: ${nextLevel.title}` : 'Max Milestone'}
            color="purple"
            size="md"
          />
        </Card>

        {/* Topic Completion */}
        <Card>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-game-cyan">
              {currentTopic.titles[profile.selectedLanguage]}
            </span>
            <button
              onClick={() => onNavigate('topics')}
              className="text-xs font-bold text-game-cyan hover:underline flex items-center gap-0.5"
            >
              <span>All Topics</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <ProgressBar
            value={completionPercent}
            max={100}
            label="Mastery Status"
            color="cyan"
            size="md"
          />
        </Card>
      </div>

      {/* 4. Quick Action Banners: Video Academy + Login History */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card
          hoverable
          onClick={() => onNavigate('videos')}
          className="border-game-purple/40 bg-gradient-to-br from-game-surface to-game-purple/10 cursor-pointer"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-game-purple/20 border border-game-purple/40 flex items-center justify-center text-game-purpleLight shrink-0">
                <Video className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span>Video Academy</span>
                  <span className="text-[10px] bg-game-purple/20 text-game-purpleLight px-1.5 py-0.2 rounded font-mono">
                    NEW
                  </span>
                </h3>
                <p className="text-xs text-game-textMuted mt-0.5">
                  Watch visual concept lectures with cheat sheets & bookmarks.
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-game-textSubtle mt-1 shrink-0" />
          </div>
        </Card>

        <Card
          hoverable
          onClick={() => onNavigate('login-history')}
          className="border-game-cyan/40 bg-gradient-to-br from-game-surface to-game-cyan/10 cursor-pointer"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-game-cyan/20 border border-game-cyan/40 flex items-center justify-center text-game-cyan shrink-0">
                <History className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span>Login & Session Log</span>
                  <span className="text-[10px] bg-game-cyan/20 text-game-cyan px-1.5 py-0.2 rounded font-mono">
                    SECURITY
                  </span>
                </h3>
                <p className="text-xs text-game-textMuted mt-0.5">
                  Track devices, session durations, and account credentials.
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-game-textSubtle mt-1 shrink-0" />
          </div>
        </Card>
      </div>

      {/* 5. Weekly Learning Activity Heatmap */}
      <Card>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-game-cyan" />
            <h3 className="text-sm font-bold text-white">
              {t.weeklyActivity}
            </h3>
          </div>
          <div className="text-xs text-game-textSubtle flex items-center gap-1 font-mono">
            <TrendingUp className="w-3.5 h-3.5 text-game-green" />
            <span>Consistency Builds Mastery</span>
          </div>
        </div>

        {/* 7 Days Grid */}
        <div className="grid grid-cols-7 gap-2">
          {weeklyActivity.map((day) => {
            const hasActivity = day.count > 0;
            return (
              <div
                key={day.dateStr}
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all ${
                  day.isToday
                    ? 'border-game-cyan bg-game-cyan/10 shadow-glow-cyan'
                    : hasActivity
                    ? 'border-game-purple/50 bg-game-purple/20'
                    : 'border-game-border bg-game-card/50'
                }`}
              >
                <span className="text-[10px] uppercase font-bold text-game-textMuted mb-1">
                  {day.dayName}
                </span>
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-extrabold ${
                    hasActivity
                      ? 'bg-gradient-to-tr from-game-purple to-game-cyan text-white'
                      : 'bg-game-border/60 text-game-textSubtle'
                  }`}
                >
                  {day.count}
                </div>
                {day.isToday && (
                  <span className="text-[9px] font-bold text-game-cyan mt-1">Today</span>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* 6. Recent Badges Showcase */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-game-gold" />
            <h3 className="text-sm font-bold text-white">
              Earned Badges ({earnedBadgesList.length}/8)
            </h3>
          </div>
          <button
            onClick={() => onNavigate('badges')}
            className="text-xs font-bold text-game-gold hover:underline flex items-center gap-0.5"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {earnedBadgesList.length === 0 ? (
          <div className="text-center py-6 border border-dashed border-game-border rounded-2xl bg-game-card/30">
            <p className="text-xs text-game-textMuted mb-2">
              No badges unlocked yet. Solve your first quest to unlock the "First Program" badge!
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('challenge')}
              icon={<Play className="w-3.5 h-3.5" />}
            >
              Start First Quest
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {earnedBadgesList.slice(0, 4).map((badge) => (
              <div
                key={badge.id}
                className="flex items-center gap-3 p-3 bg-game-card/80 border border-game-border rounded-xl"
              >
                <BadgeIcon iconName={badge.icon} isUnlocked={true} size="sm" />
                <div className="overflow-hidden">
                  <div className="text-xs font-bold text-white truncate">
                    {badge.name}
                  </div>
                  <div className="text-[10px] text-game-cyan font-mono truncate">
                    Unlocked
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};
