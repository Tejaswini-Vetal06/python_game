import React from 'react';
import {
  LayoutDashboard,
  BookOpen,
  Code2,
  Award,
  BarChart3,
  Settings,
  User,
  Shield,
  Download,
  PlayCircle,
  History,
} from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { useGame } from '../../context/GameContext';
import { TRANSLATIONS } from '../../constants/translations';
import { ProgressBar } from '../common/ProgressBar';
import { soundService } from '../../services/soundService';

interface DesktopSidebarProps {
  currentScreen: string;
  onSelectScreen: (screen: string) => void;
  deferredPrompt?: any;
  onInstallPWA?: () => void;
}

export const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  currentScreen,
  onSelectScreen,
  deferredPrompt,
  onInstallPWA,
}) => {
  const { profile } = useUser();
  const { gameState, currentLevel, nextLevel } = useGame();
  const t = TRANSLATIONS[profile.selectedLanguage];

  const xpProgress = nextLevel
    ? gameState.totalXP - currentLevel.minXP
    : 100;
  const xpTarget = nextLevel ? nextLevel.minXP - currentLevel.minXP : 100;

  const links = [
    { id: 'dashboard', label: t.dashboard, icon: LayoutDashboard },
    { id: 'topics', label: t.quests, icon: BookOpen },
    { id: 'challenge', label: t.editor, icon: Code2 },
    { id: 'videos', label: 'Video Academy', icon: PlayCircle },
    { id: 'badges', label: t.achievements, icon: Award },
    { id: 'progress', label: 'Progress & Stats', icon: BarChart3 },
    { id: 'login-history', label: 'Login & Security', icon: History },
    { id: 'profile', label: t.profile, icon: User },
    { id: 'settings', label: t.settings, icon: Settings },
  ];

  const handleNav = (id: string) => {
    soundService.playClick();
    onSelectScreen(id);
  };

  return (
    <aside className="hidden md:flex flex-col w-64 lg:w-72 shrink-0 bg-game-surface border-r border-game-border min-h-screen p-4 sticky top-0 h-screen overflow-y-auto">
      {/* Brand logo */}
      <div
        onClick={() => handleNav('dashboard')}
        className="flex items-center gap-3 px-2 py-3 mb-6 cursor-pointer group"
      >
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-game-purple via-game-neonBlue to-game-cyan p-0.5 shadow-glow-purple group-hover:scale-105 transition-transform">
          <div className="w-full h-full bg-game-bg rounded-[14px] flex items-center justify-center font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-game-purpleLight to-game-cyan text-lg">
            &gt;_
          </div>
        </div>
        <div>
          <h1 className="text-lg font-black text-white tracking-tight flex items-center gap-1.5">
            {t.appName}
          </h1>
          <p className="text-xs text-game-cyan font-mono font-medium">
            Python Mastery PWA
          </p>
        </div>
      </div>

      {/* User Progress Mini Card */}
      <div className="bg-game-card/80 border border-game-border rounded-2xl p-4 mb-6 shadow-md">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-game-purpleLight" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Level {currentLevel.levelNumber}
            </span>
          </div>
          <span className="text-xs text-game-gold font-mono font-bold">
            {gameState.totalXP} XP
          </span>
        </div>
        <div className="text-sm font-bold text-white mb-2">{currentLevel.title}</div>
        <ProgressBar
          value={xpProgress}
          max={xpTarget}
          subLabel={nextLevel ? `Next: Lvl ${nextLevel.levelNumber}` : 'Max Level'}
          color="purple"
          size="sm"
        />
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1.5">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = currentScreen === link.id;

          return (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 select-none text-left ${
                isActive
                  ? 'bg-gradient-to-r from-game-purple/25 to-game-cyan/15 text-white border border-game-purple/50 shadow-glow-purple'
                  : 'text-game-textMuted hover:bg-game-card hover:text-white border border-transparent'
              }`}
            >
              <Icon
                className={`w-5 h-5 shrink-0 transition-colors ${
                  isActive ? 'text-game-cyan' : 'text-game-textSubtle'
                }`}
              />
              <span>{link.label}</span>
            </button>
          );
        })}
      </nav>

      {/* PWA Install CTA if available */}
      {Boolean(deferredPrompt) && (
        <div className="mt-4 pt-4 border-t border-game-border">
          <button
            onClick={onInstallPWA}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 bg-game-card hover:bg-game-cardHover border border-game-cyan/40 text-game-cyan rounded-xl text-xs font-bold transition-all shadow-glow-cyan"
          >
            <Download className="w-4 h-4" />
            <span>Install Desktop App</span>
          </button>
        </div>
      )}

      {/* Footer Info */}
      <div className="mt-4 pt-4 border-t border-game-border/60 text-center">
        <p className="text-[11px] text-game-textSubtle">
          100% In-Browser CPython Runtime
        </p>
      </div>
    </aside>
  );
};
