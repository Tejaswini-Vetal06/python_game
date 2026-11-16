import React from 'react';
import {
  Terminal,
  Type,
  Bug,
  Repeat,
  Code2,
  ListFilter,
  BookOpen,
  Zap,
  Lock,
  Award,
  Sparkles,
} from 'lucide-react';

interface BadgeIconProps {
  iconName: string;
  isUnlocked: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const BadgeIcon: React.FC<BadgeIconProps> = ({
  iconName,
  isUnlocked,
  size = 'md',
  className = '',
}) => {
  const getIcon = () => {
    switch (iconName) {
      case 'Terminal':
        return <Terminal />;
      case 'Type':
        return <Type />;
      case 'Bug':
        return <Bug />;
      case 'Repeat':
        return <Repeat />;
      case 'Code2':
        return <Code2 />;
      case 'ListFilter':
        return <ListFilter />;
      case 'BookOpen':
        return <BookOpen />;
      case 'Zap':
        return <Zap />;
      default:
        return <Award />;
    }
  };

  const sizeContainer = {
    sm: 'w-10 h-10 text-base',
    md: 'w-14 h-14 text-xl',
    lg: 'w-20 h-20 text-3xl',
  };

  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-7 h-7',
    lg: 'w-10 h-10',
  };

  if (!isUnlocked) {
    return (
      <div
        className={`relative rounded-2xl bg-game-card/50 border border-game-border/60 flex items-center justify-center text-game-textSubtle ${sizeContainer[size]} ${className}`}
      >
        <Lock className={iconSizes[size]} />
      </div>
    );
  }

  return (
    <div
      className={`relative rounded-2xl bg-gradient-to-br from-game-purple/30 via-game-surface to-game-cyan/20 border-2 border-game-purpleLight flex items-center justify-center text-white shadow-glow-purple transition-transform duration-300 hover:scale-105 ${sizeContainer[size]} ${className}`}
    >
      <div className={iconSizes[size]}>{getIcon()}</div>
      <Sparkles className="absolute -top-1 -right-1 w-3.5 h-3.5 text-game-cyan animate-pulse" />
    </div>
  );
};
