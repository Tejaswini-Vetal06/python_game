import React from 'react';
import { useUser } from '../../context/UserContext';
import { useGame } from '../../context/GameContext';
import { TRANSLATIONS } from '../../constants/translations';
import { Flame, Sparkles, Globe, Volume2, VolumeX, Shield, Video, History } from 'lucide-react';
import { LanguageCode } from '../../types/challenge';

interface HeaderProps {
  onOpenSettings?: () => void;
  onOpenProfile?: () => void;
  onSelectScreen?: (screen: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenProfile,
  onSelectScreen,
}) => {
  const { profile, setLanguage, setSoundEnabled } = useUser();
  const { gameState, currentLevel, streak } = useGame();
  const t = TRANSLATIONS[profile.selectedLanguage];

  const handleLanguageCycle = () => {
    const langs: LanguageCode[] = ['en', 'hi', 'hinglish'];
    const nextIdx = (langs.indexOf(profile.selectedLanguage) + 1) % langs.length;
    setLanguage(langs[nextIdx]);
  };

  const getLanguageLabel = (lang: LanguageCode) => {
    switch (lang) {
      case 'en':
        return 'EN';
      case 'hi':
        return 'हिन्दी';
      case 'hinglish':
        return 'Hinglish';
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-game-bg/85 backdrop-blur-md border-b border-game-border px-4 py-2.5 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Brand Logo & Name */}
        <div
          onClick={() => onSelectScreen?.('dashboard')}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-game-purple via-game-neonBlue to-game-cyan p-0.5 shadow-glow-purple group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-game-bg rounded-[10px] flex items-center justify-center font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-game-purpleLight to-game-cyan">
              &gt;_
            </div>
          </div>
          <div>
            <div className="text-sm sm:text-base font-extrabold tracking-tight text-white flex items-center gap-1.5">
              <span>{t.appName}</span>
              <span className="hidden sm:inline-block px-1.5 py-0.2 bg-game-purple/20 border border-game-purple/40 rounded text-[10px] text-game-purpleLight font-mono">
                PWA
              </span>
            </div>
            <div className="hidden xs:block text-[11px] text-game-textMuted -mt-0.5 font-medium">
              {currentLevel.title}
            </div>
          </div>
        </div>

        {/* Stats & Actions Toolbar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Level Badge */}
          <div
            onClick={() => onSelectScreen?.('progress')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-game-surface border border-game-border rounded-xl cursor-pointer hover:border-game-purple transition-colors"
          >
            <Shield className="w-4 h-4 text-game-purple" />
            <span className="text-xs font-bold text-white">Lvl {currentLevel.levelNumber}</span>
          </div>

          {/* XP Pill */}
          <div
            onClick={() => onSelectScreen?.('progress')}
            className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 bg-game-card border border-game-border rounded-xl cursor-pointer hover:border-game-gold transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-game-gold" />
            <span className="text-xs sm:text-sm font-bold text-game-goldLight font-mono">
              {gameState.totalXP} <span className="text-[10px] text-game-textMuted font-sans">XP</span>
            </span>
          </div>

          {/* Streak Flame */}
          <div
            title={`${streak.currentStreak} day streak`}
            className="flex items-center gap-1 px-2.5 py-1 sm:px-3 bg-game-card border border-amber-900/40 rounded-xl"
          >
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
            <span className="text-xs sm:text-sm font-extrabold text-amber-400 font-mono">
              {streak.currentStreak}
            </span>
          </div>

          {/* Videos Shortcut */}
          <button
            onClick={() => onSelectScreen?.('videos')}
            title="Video Masterclasses"
            className="p-1.5 text-game-purpleLight hover:text-white rounded-xl bg-game-surface hover:bg-game-card border border-game-border transition-colors hidden sm:flex items-center gap-1 text-xs font-semibold"
          >
            <Video className="w-4 h-4 text-game-purpleLight" />
            <span className="hidden lg:inline">Videos</span>
          </button>

          {/* Login & Security Log Shortcut */}
          <button
            onClick={() => onSelectScreen?.('login-history')}
            title="Login & Security History"
            className="p-1.5 text-game-cyan hover:text-white rounded-xl bg-game-surface hover:bg-game-card border border-game-border transition-colors hidden md:flex items-center gap-1 text-xs font-semibold"
          >
            <History className="w-4 h-4 text-game-cyan" />
            <span className="hidden lg:inline">Logins</span>
          </button>

          {/* Language Selector Button */}
          <button
            onClick={handleLanguageCycle}
            title="Switch Language (English / Hindi / Hinglish)"
            className="flex items-center gap-1 px-2.5 py-1 bg-game-surface hover:bg-game-cardHover border border-game-border rounded-xl text-xs font-semibold text-game-cyan transition-colors"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{getLanguageLabel(profile.selectedLanguage)}</span>
          </button>

          {/* Audio Mute/Unmute Quick Toggle */}
          <button
            onClick={() => setSoundEnabled(!profile.soundEnabled)}
            className="p-1.5 text-game-textMuted hover:text-white rounded-xl bg-game-surface hover:bg-game-cardHover border border-game-border transition-colors"
            title={profile.soundEnabled ? 'Mute Sounds' : 'Unmute Sounds'}
          >
            {profile.soundEnabled ? (
              <Volume2 className="w-4 h-4 text-game-purpleLight" />
            ) : (
              <VolumeX className="w-4 h-4 text-game-textSubtle" />
            )}
          </button>

          {/* User Profile Avatar Link */}
          <button
            onClick={onOpenProfile}
            className="w-8 h-8 rounded-xl bg-gradient-to-tr from-game-purple to-game-cyan p-0.5 hover:scale-105 transition-transform"
            title="User Profile"
          >
            <div className="w-full h-full bg-game-surface rounded-[10px] flex items-center justify-center text-xs font-bold text-white uppercase">
              {profile.username.slice(0, 2)}
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
