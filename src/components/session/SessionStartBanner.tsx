import React from 'react';
import { useGame } from '../../context/GameContext';
import { useUser } from '../../context/UserContext';
import { Clock, Sparkles, Award, Flag, Play } from 'lucide-react';

export const SessionStartBanner: React.FC = () => {
  const { sessionState, startSession, endSession } = useGame();
  const { recordSessionLogin } = useUser();

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleEndSession = () => {
    recordSessionLogin(
      sessionState.elapsedSeconds,
      sessionState.sessionXpEarned,
      sessionState.sessionQuestsCompleted
    );
    endSession();
  };

  return (
    <div className="bg-game-surface/90 border border-game-border rounded-2xl p-3 sm:p-4 backdrop-blur-md shadow-md mb-4 flex flex-col sm:flex-row items-center justify-between gap-3">
      {/* Left: Active session indicators */}
      <div className="flex items-center gap-3 sm:gap-5 w-full sm:w-auto justify-between sm:justify-start">
        {sessionState.isActive ? (
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
              Mission Active
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-game-textSubtle inline-block" />
            <span className="text-xs font-bold uppercase tracking-wider text-game-textMuted font-mono">
              Session Paused
            </span>
          </div>
        )}

        <div className="flex items-center gap-1.5 text-xs text-game-cyan font-mono font-bold bg-game-card px-2.5 py-1 rounded-xl border border-game-border">
          <Clock className="w-3.5 h-3.5" />
          <span>{formatTime(sessionState.elapsedSeconds)}</span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-game-gold font-mono font-bold bg-game-card px-2.5 py-1 rounded-xl border border-game-border">
          <Sparkles className="w-3.5 h-3.5" />
          <span>+{sessionState.sessionXpEarned} XP</span>
        </div>

        <div className="hidden xs:flex items-center gap-1.5 text-xs text-game-purpleLight font-mono font-bold bg-game-card px-2.5 py-1 rounded-xl border border-game-border">
          <Award className="w-3.5 h-3.5" />
          <span>{sessionState.sessionQuestsCompleted} Solved</span>
        </div>
      </div>

      {/* Right: Action button */}
      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
        {sessionState.isActive ? (
          <button
            onClick={handleEndSession}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3 py-1.5 bg-game-card hover:bg-game-cardHover border border-game-red/40 text-game-red rounded-xl text-xs font-bold transition-all hover:shadow-glow-red active:scale-95"
          >
            <Flag className="w-3.5 h-3.5" />
            <span>End Session & Debrief</span>
          </button>
        ) : (
          <button
            onClick={startSession}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-game-purple to-game-cyan text-white rounded-xl text-xs font-bold transition-all shadow-glow-purple active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Start Learning Session</span>
          </button>
        )}
      </div>
    </div>
  );
};
