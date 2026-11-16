import React, { useState } from 'react';
import { ChallengeHints } from '../../types/challenge';
import { Button } from '../common/Button';
import { HelpCircle, ChevronDown, ChevronUp, Lock, Lightbulb, Code, BookOpen, AlertCircle } from 'lucide-react';

interface HintDrawerProps {
  hints: ChallengeHints;
  hintsRevealedCount: number;
  onRevealNextHint: () => void;
}

export const HintDrawer: React.FC<HintDrawerProps> = ({
  hints,
  hintsRevealedCount,
  onRevealNextHint,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const hintTiers = [
    {
      level: 1,
      title: 'Hint 1: Small Clue',
      content: hints.clue,
      icon: Lightbulb,
      color: 'text-yellow-400',
    },
    {
      level: 2,
      title: 'Hint 2: Algorithmic Logic',
      content: hints.logic,
      icon: BookOpen,
      color: 'text-game-cyan',
    },
    {
      level: 3,
      title: 'Hint 3: Pseudocode Structure',
      content: hints.pseudocode,
      icon: Code,
      color: 'text-game-purpleLight',
    },
    {
      level: 4,
      title: 'Final Hint: Complete Solution & Explanation',
      content: hints.solution,
      icon: HelpCircle,
      color: 'text-emerald-400',
    },
  ];

  const canRevealMore = hintsRevealedCount < 4;

  return (
    <div className="rounded-2xl bg-game-surface border border-game-border overflow-hidden">
      {/* Header bar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3.5 bg-game-card/80 hover:bg-game-card text-left transition-colors select-none"
      >
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-game-gold" />
          <span className="text-xs sm:text-sm font-bold text-white">
            Progressive Hints System
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-game-surface border border-game-border text-game-gold">
            {hintsRevealedCount} / 4 Revealed
          </span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-game-textMuted" />
        ) : (
          <ChevronDown className="w-4 h-4 text-game-textMuted" />
        )}
      </button>

      {/* Collapsible Content */}
      {isOpen && (
        <div className="p-4 space-y-3 bg-game-surface/50 border-t border-game-border">
          {/* Hint warning */}
          {hintsRevealedCount === 0 && (
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>
                Tip: Solving this quest with 0 hints earns a <strong>+20 XP Bonus</strong>!
              </span>
            </div>
          )}

          {/* Render hint tiers */}
          <div className="space-y-2.5">
            {hintTiers.map((tier) => {
              const isRevealed = hintsRevealedCount >= tier.level;
              const Icon = tier.icon;

              return (
                <div
                  key={tier.level}
                  className={`p-3 rounded-xl border transition-all ${
                    isRevealed
                      ? 'border-game-border bg-game-bg'
                      : 'border-game-border/40 bg-game-card/40 opacity-70'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${tier.color}`} />
                      <span className="text-xs font-bold text-white">
                        {tier.title}
                      </span>
                    </div>
                    {!isRevealed && (
                      <span className="flex items-center gap-1 text-[10px] text-game-textSubtle font-semibold">
                        <Lock className="w-3 h-3" />
                        <span>Locked</span>
                      </span>
                    )}
                  </div>

                  {isRevealed ? (
                    <div className="text-xs text-game-textMuted leading-relaxed whitespace-pre-wrap mt-2 pt-2 border-t border-game-border/50 font-mono">
                      {tier.content}
                    </div>
                  ) : (
                    <div className="text-[11px] text-game-textSubtle italic">
                      Click below to unlock this progressive clue.
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Reveal Next Hint Button */}
          {canRevealMore && (
            <div className="pt-2">
              <Button
                variant="outline"
                size="sm"
                fullWidth
                onClick={onRevealNextHint}
                icon={<Lightbulb className="w-4 h-4" />}
              >
                Reveal Hint {hintsRevealedCount + 1}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
