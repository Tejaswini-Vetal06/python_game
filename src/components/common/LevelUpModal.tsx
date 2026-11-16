import React from 'react';
import { LevelInfo } from '../../types/gamification';
import { Button } from './Button';
import { Award, Sparkles, ChevronRight } from 'lucide-react';

interface LevelUpModalProps {
  oldLevel: LevelInfo;
  newLevel: LevelInfo;
  onClose: () => void;
}

export const LevelUpModal: React.FC<LevelUpModalProps> = ({
  newLevel,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-sm sm:max-w-md bg-game-surface border-2 border-game-purpleLight/80 rounded-3xl p-6 sm:p-8 text-center shadow-glow-purple animate-level-up">
        {/* Glow ambient circle */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-28 h-28 bg-game-purple/30 rounded-full blur-2xl pointer-events-none" />

        {/* Level Emblem */}
        <div className="mx-auto w-24 h-24 mb-4 rounded-3xl bg-gradient-to-tr from-game-purple to-game-cyan p-1 shadow-glow-purple">
          <div className="w-full h-full bg-game-bg rounded-[22px] flex flex-col items-center justify-center">
            <Award className="w-10 h-10 text-game-cyan animate-bounce" />
            <span className="text-xs font-bold uppercase tracking-wider text-game-purpleLight">
              Level {newLevel.levelNumber}
            </span>
          </div>
        </div>

        {/* Title */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-game-purple/20 border border-game-purple/50 text-game-purpleLight text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>LEVEL UP!</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">
          {newLevel.title}
        </h2>
        <p className="text-sm text-game-textMuted mb-5">
          {newLevel.description}
        </p>

        {/* Perk Box */}
        <div className="bg-game-card/80 border border-game-border rounded-2xl p-4 text-left mb-6">
          <div className="text-xs uppercase tracking-wider text-game-cyan font-bold mb-1">
            Unlocked Title Perk
          </div>
          <div className="text-sm font-semibold text-white flex items-center gap-2">
            <span>{newLevel.badgeName}</span>
          </div>
        </div>

        {/* Action */}
        <Button
          variant="primary"
          size="lg"
          fullWidth
          glow
          onClick={onClose}
          icon={<ChevronRight className="w-5 h-5" />}
        >
          Claim Glory & Continue
        </Button>
      </div>
    </div>
  );
};
