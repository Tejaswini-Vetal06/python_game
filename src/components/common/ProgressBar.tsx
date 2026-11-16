import React from 'react';

interface ProgressBarProps {
  value: number; // current value
  max: number;   // max value
  label?: string;
  subLabel?: string;
  color?: 'purple' | 'cyan' | 'green' | 'gold';
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
  label,
  subLabel,
  color = 'purple',
  showPercentage = true,
  size = 'md',
}) => {
  const percent = Math.min(100, Math.max(0, max > 0 ? Math.round((value / max) * 100) : 0));

  const heightStyles = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  const gradientStyles = {
    purple: 'bg-gradient-to-r from-game-purple to-game-neonBlue',
    cyan: 'bg-gradient-to-r from-game-cyan to-blue-500',
    green: 'bg-gradient-to-r from-emerald-500 to-teal-400',
    gold: 'bg-gradient-to-r from-amber-500 to-yellow-300',
  };

  const glowStyles = {
    purple: 'shadow-[0_0_12px_rgba(139,92,246,0.6)]',
    cyan: 'shadow-[0_0_12px_rgba(6,182,212,0.6)]',
    green: 'shadow-[0_0_12px_rgba(16,185,129,0.6)]',
    gold: 'shadow-[0_0_12px_rgba(245,158,11,0.6)]',
  };

  return (
    <div className="w-full">
      {(label || showPercentage || subLabel) && (
        <div className="flex justify-between items-center text-xs font-medium mb-1.5 text-game-textMuted">
          <div className="flex items-center gap-2">
            {label && <span className="text-white font-semibold">{label}</span>}
            {subLabel && <span className="text-game-textSubtle">{subLabel}</span>}
          </div>
          {showPercentage && <span className="text-game-cyan font-mono">{percent}%</span>}
        </div>
      )}
      <div className={`w-full bg-game-card rounded-full overflow-hidden border border-game-border ${heightStyles[size]}`}>
        <div
          className={`${heightStyles[size]} ${gradientStyles[color]} ${glowStyles[color]} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};
