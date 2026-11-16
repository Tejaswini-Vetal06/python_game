import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { BadgeIcon } from '../components/common/BadgeIcon';
import { Card } from '../components/common/Card';
import { Award, Sparkles, CheckCircle2, Lock, Filter } from 'lucide-react';

export const AchievementsScreen: React.FC = () => {
  const { gameState } = useGame();
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');

  const badgesList = Object.values(gameState.badges);
  const unlockedCount = badgesList.filter((b) => b.unlockedAt !== null).length;

  const filteredBadges = badgesList.filter((b) => {
    if (filter === 'unlocked') return b.unlockedAt !== null;
    if (filter === 'locked') return b.unlockedAt === null;
    return true;
  });

  return (
    <div className="space-y-5 pb-20 md:pb-8 max-w-4xl mx-auto animate-fade-in">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-game-surface via-game-card to-game-surface border border-game-border p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-game-gold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Hall of Artifacts</span>
              </div>
              <h1 className="text-2xl font-black text-white">
                Achievement Badges
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-game-card/80 border border-game-border px-4 py-2 rounded-2xl">
            <span className="text-xs font-semibold text-game-textMuted">Unlocked:</span>
            <span className="text-lg font-black text-game-cyan font-mono">
              {unlockedCount} / {badgesList.length}
            </span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-game-border pb-3">
        <Filter className="w-4 h-4 text-game-textSubtle mr-1" />
        {(['all', 'unlocked', 'locked'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
              filter === tab
                ? 'bg-game-purple text-white shadow-glow-purple'
                : 'bg-game-card hover:bg-game-cardHover text-game-textMuted'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredBadges.map((badge) => {
          const isUnlocked = badge.unlockedAt !== null;

          return (
            <Card
              key={badge.id}
              className={`border-2 transition-all ${
                isUnlocked
                  ? 'border-game-purpleLight/50 bg-gradient-to-br from-game-surface to-game-purple/10 shadow-glow-purple'
                  : 'border-game-border bg-game-surface/60 opacity-75'
              }`}
            >
              <div className="flex items-start gap-4">
                <BadgeIcon
                  iconName={badge.icon}
                  isUnlocked={isUnlocked}
                  size="md"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-base font-extrabold text-white truncate">
                      {badge.name}
                    </h3>
                    {isUnlocked ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-game-green bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full shrink-0">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Unlocked</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-game-textSubtle bg-game-card border border-game-border px-2 py-0.5 rounded-full shrink-0">
                        <Lock className="w-3 h-3" />
                        <span>Locked</span>
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-game-textMuted mt-1">
                    {badge.description}
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-game-border/60 flex items-center justify-between text-[11px]">
                    <span className="text-game-textSubtle">
                      Requirement: <span className="text-white font-medium">{badge.requirement}</span>
                    </span>
                    {badge.unlockedAt && (
                      <span className="text-game-cyan font-mono text-[10px]">
                        {new Date(badge.unlockedAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
