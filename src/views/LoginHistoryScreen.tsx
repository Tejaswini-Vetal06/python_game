import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useGame } from '../context/GameContext';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import {
  History,
  Shield,
  Smartphone,
  Tablet,
  Monitor,
  UserCheck,
  Calendar,
  Clock,
  Sparkles,
  Award,
  Trash2,
  LogIn,
  KeyRound,
  CheckCircle2,
} from 'lucide-react';

export const LoginHistoryScreen: React.FC = () => {
  const { profile, loginHistory, loginUser, logoutUser, resetAll } = useUser();
  const { gameState, currentLevel } = useGame();

  const [isSwitchingUser, setIsSwitchingUser] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const handleSwitchAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (newUsername.trim()) {
      loginUser(newUsername.trim(), newEmail.trim());
      setIsSwitchingUser(false);
      setNewUsername('');
      setNewEmail('');
    }
  };

  const getDeviceIcon = (deviceType: 'mobile' | 'tablet' | 'desktop') => {
    switch (deviceType) {
      case 'mobile':
        return <Smartphone className="w-4 h-4 text-game-cyan" />;
      case 'tablet':
        return <Tablet className="w-4 h-4 text-game-purpleLight" />;
      case 'desktop':
        return <Monitor className="w-4 h-4 text-emerald-400" />;
    }
  };

  const formatDuration = (sec: number) => {
    if (!sec || sec < 60) return `${sec || 0}s`;
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div className="space-y-5 pb-24 md:pb-8 max-w-4xl mx-auto animate-fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-game-surface via-game-card to-game-surface border border-game-border rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-game-cyan/20 border border-game-cyan/40 flex items-center justify-center text-game-cyan shrink-0">
            <History className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-game-cyan flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              <span>Authentication & Security Log</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">
              Login & Session History
            </h1>
          </div>
        </div>

        <Button
          size="sm"
          variant="outline"
          onClick={() => setIsSwitchingUser(true)}
          icon={<LogIn className="w-4 h-4" />}
        >
          Switch / New Login
        </Button>
      </div>

      {/* Current Active Account Card */}
      <Card className="border-game-purple/50 bg-gradient-to-br from-game-surface via-game-card to-game-purple/10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-game-purple p-0.5 shadow-glow-purple flex items-center justify-center text-2xl">
              ⚔️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-black text-white">
                  {profile.username}
                </span>
                <span className="px-2 py-0.5 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Authenticated</span>
                </span>
              </div>
              <div className="text-xs text-game-textMuted font-mono mt-0.5">
                {profile.email || `${profile.username.toLowerCase()}@pythonquest.dev`}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full sm:w-auto text-xs">
            <div className="bg-game-bg/80 border border-game-border p-2.5 rounded-xl text-center">
              <div className="text-game-textSubtle text-[10px] uppercase font-bold">Rank</div>
              <div className="text-white font-bold font-mono">Level {currentLevel.levelNumber}</div>
            </div>
            <div className="bg-game-bg/80 border border-game-border p-2.5 rounded-xl text-center">
              <div className="text-game-textSubtle text-[10px] uppercase font-bold">Total XP</div>
              <div className="text-game-gold font-bold font-mono">{gameState.totalXP}</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Switch / Login Modal */}
      {isSwitchingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-game-surface border-2 border-game-purple/60 rounded-3xl p-6 max-w-sm w-full shadow-glow-purple animate-level-up">
            <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-game-purple/20 border border-game-purple/40 flex items-center justify-center text-game-purpleLight">
              <KeyRound className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-white text-center mb-1">
              Player Authentication
            </h3>
            <p className="text-xs text-game-textMuted text-center mb-4">
              Enter your player credentials to switch profiles or create a new adventurer account.
            </p>

            <form onSubmit={handleSwitchAccount} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-game-textSubtle block mb-1">
                  Adventurer Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CyberNinja"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="w-full bg-game-bg border border-game-border focus:border-game-purple text-white text-sm px-3.5 py-2.5 rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-game-textSubtle block mb-1">
                  Email / Handle (Optional)
                </label>
                <input
                  type="email"
                  placeholder="ninja@pythonquest.dev"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full bg-game-bg border border-game-border focus:border-game-purple text-white text-sm px-3.5 py-2.5 rounded-xl focus:outline-none"
                />
              </div>

              <div className="flex gap-2.5 pt-2">
                <Button
                  type="button"
                  variant="secondary"
                  fullWidth
                  onClick={() => setIsSwitchingUser(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  glow
                >
                  Confirm Login
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* History Log Table / Timeline */}
      <Card>
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-game-border">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-game-cyan" />
            <h3 className="text-sm font-bold text-white">
              Recorded Login Sessions ({loginHistory.length})
            </h3>
          </div>
          <span className="text-xs text-game-textSubtle font-mono">
            Encrypted Client Ledger
          </span>
        </div>

        {loginHistory.length === 0 ? (
          <div className="text-center py-8 text-game-textMuted text-xs italic">
            No previous logins recorded yet.
          </div>
        ) : (
          <div className="space-y-2.5">
            {loginHistory.map((entry) => {
              const dateObj = new Date(entry.timestamp);
              const dateFormatted = dateObj.toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              });
              const timeFormatted = dateObj.toLocaleTimeString(undefined, {
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <div
                  key={entry.id}
                  className="bg-game-card/70 border border-game-border rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:border-game-borderGlow transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-game-surface border border-game-border flex items-center justify-center shrink-0">
                      {getDeviceIcon(entry.deviceType)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">
                          {entry.username}
                        </span>
                        <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-game-surface border border-game-border text-game-cyan">
                          {entry.deviceType}
                        </span>
                      </div>
                      <div className="text-[11px] text-game-textMuted flex items-center gap-1.5 mt-0.5">
                        <Calendar className="w-3 h-3 text-game-textSubtle" />
                        <span>{dateFormatted} at {timeFormatted}</span>
                        <span className="text-game-textSubtle">• {entry.platform}</span>
                      </div>
                    </div>
                  </div>

                  {/* Session stats */}
                  <div className="flex items-center gap-3 text-xs font-mono self-end sm:self-auto">
                    <div className="flex items-center gap-1 text-game-textMuted">
                      <Clock className="w-3.5 h-3.5 text-game-cyan" />
                      <span>{formatDuration(entry.durationSeconds)}</span>
                    </div>

                    <div className="flex items-center gap-1 text-game-gold">
                      <Sparkles className="w-3.5 h-3.5 text-game-gold" />
                      <span>+{entry.xpEarnedDuringSession} XP</span>
                    </div>

                    <div className="flex items-center gap-1 text-emerald-400">
                      <Award className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{entry.challengesCompleted} Solved</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
};
