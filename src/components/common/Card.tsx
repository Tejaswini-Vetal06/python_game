import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glow?: 'purple' | 'blue' | 'cyan' | 'green' | 'red' | 'none';
  hoverable?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  glow = 'none',
  hoverable = false,
  onClick,
}) => {
  const glowStyles = {
    none: '',
    purple: 'shadow-glow-purple border-game-purple/40',
    blue: 'shadow-glow-blue border-game-neonBlue/40',
    cyan: 'shadow-glow-cyan border-game-cyan/40',
    green: 'shadow-glow-green border-game-green/40',
    red: 'shadow-glow-red border-game-red/40',
  };

  const hoverStyle = hoverable
    ? 'cursor-pointer hover:border-game-purple/60 hover:shadow-glow-purple hover:-translate-y-0.5 transition-all duration-200'
    : '';

  return (
    <div
      onClick={onClick}
      className={`bg-game-surface/90 backdrop-blur-md border border-game-border rounded-2xl p-4 sm:p-5 text-game-text shadow-lg ${glowStyles[glow]} ${hoverStyle} ${className}`}
    >
      {children}
    </div>
  );
};
