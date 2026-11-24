import React from 'react';
import { UserSessionState } from '../../types/user';
import { useGame } from '../../context/GameContext';
import { useUser } from '../../context/UserContext';
import { Button } from '../common/Button';
import {
  Award,
  Clock,
  Sparkles,
  Flame,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

interface SessionEndModalProps {
  session: UserSessionState;
  onClose: () => void;
}

export const SessionEndModal: React.FC<SessionEndModalProps> = ({ session, onClose }) => {
  const { currentLevel, streak, startSession } = useGame();
  const { profile } = useUser();

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}m ${secs}s`;
  };

  const handleStartAgain = () => {
    onClose();
    startSession();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-game-surface border-2 border-game-cyan/60 rounded-3xl p-6 sm:p-7 shadow-glow-cyan text-center animate-level-up">
        {/* Glow backdrop */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-game-cyan/20 rounded-full blur-2xl pointer-events-none" />

        {/* Emblem */}
        <div className="mx-auto w-20 h-20 mb-3 rounded-2xl bg-gradient-to-tr from-game-purple via-game-neonBlue to-game-cyan p-0.5 shadow-glow-purple">
          <div className="w-full h-full bg-game-bg rounded-[14px] flex items-center justify-center">
            <Award className="w-9 h-9 text-game-cyan animate-pulse" />
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-game-cyan/20 border border-game-cyan/40 text-game-cyan text-xs font-bold uppercase tracking-wider mb-1">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Mission Debriefing</span>
        </div>

        <h2 className="text-2xl font-black text-white mb-1">
          Outstanding Session, {profile.username}!
        </h2>
        <p className="text-xs text-game-textMuted mb-5">
          Your Python skills have grown. Here is your combat report:
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2.5 mb-5 text-left">
          <div className="bg-game-card/80 border border-game-border p-3 rounded-xl">
            <div className="flex items-center gap-1.5 text-[10px] text-game-textSubtle uppercase font-bold mb-0.5">
              <Clock className="w-3.5 h-3.5 text-game-cyan" />
              <span>Time Trained</span>
            </div>
            <div className="text-base font-extrabold text-white font-mono">
              {formatTime(session.elapsedSeconds)}
            </div>
          </div>

          <div className="bg-game-card/80 border border-game-border p-3 rounded-xl">
            <div className="flex items-center gap-1.5 text-[10px] text-game-textSubtle uppercase font-bold mb-0.5">
              <Sparkles className="w-3.5 h-3.5 text-game-gold" />
              <span>XP Harvested</span>
            </div>
            <div className="text-base font-extrabold text-game-gold font-mono">
              +{session.sessionXpEarned} XP
            </div>
          </div>

          <div className="bg-game-card/80 border border-game-border p-3 rounded-xl">
            <div className="flex items-center gap-1.5 text-[10px] text-game-textSubtle uppercase font-bold mb-0.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Quests Mastered</span>
            </div>
            <div className="text-base font-extrabold text-emerald-400 font-mono">
              {session.sessionQuestsCompleted} Solved
            </div>
          </div>

          <div className="bg-game-card/80 border border-game-border p-3 rounded-xl">
            <div className="flex items-center gap-1.5 text-[10px] text-game-textSubtle uppercase font-bold mb-0.5">
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span>Streak Sustained</span>
            </div>
            <div className="text-base font-extrabold text-orange-400 font-mono">
              {streak.currentStreak} Days
            </div>
          </div>
        </div>

        {/* Current Rank Reminder */}
        <div className="bg-game-card/60 border border-game-border rounded-xl p-2.5 text-xs text-game-textMuted flex items-center justify-between mb-5">
          <span>Current Rank:</span>
          <span className="font-bold text-white">
            Level {currentLevel.levelNumber} • {currentLevel.title}
          </span>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-2.5">
          <Button
            variant="secondary"
            size="md"
            fullWidth
            onClick={onClose}
          >
            Dashboard
          </Button>
          <Button
            variant="primary"
            size="md"
            fullWidth
            glow
            onClick={handleStartAgain}
            icon={<ChevronRight className="w-4 h-4" />}
          >
            Start New Run
          </Button>
        </div>
      </div>
    </div>
  );
};
