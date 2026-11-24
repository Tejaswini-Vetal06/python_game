import React from 'react';
import { LayoutDashboard, BookOpen, Code2, PlayCircle, Award, User } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { TRANSLATIONS } from '../../constants/translations';
import { soundService } from '../../services/soundService';

interface MobileNavProps {
  currentScreen: string;
  onSelectScreen: (screen: string) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  currentScreen,
  onSelectScreen,
}) => {
  const { profile } = useUser();
  const t = TRANSLATIONS[profile.selectedLanguage];

  const navItems = [
    { id: 'dashboard', label: t.dashboard, icon: LayoutDashboard },
    { id: 'topics', label: t.quests, icon: BookOpen },
    { id: 'challenge', label: t.editor, icon: Code2 },
    { id: 'videos', label: 'Academy', icon: PlayCircle },
    { id: 'badges', label: t.achievements, icon: Award },
    { id: 'profile', label: t.profile, icon: User },
  ];

  const handleNav = (id: string) => {
    soundService.playClick();
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(8);
    }
    onSelectScreen(id);
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-game-surface/95 backdrop-blur-lg border-t border-game-border px-2 py-1.5 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`relative flex flex-col items-center justify-center flex-1 py-1.5 px-1 min-h-[48px] rounded-xl transition-all duration-200 select-none ${
                isActive
                  ? 'text-game-cyan'
                  : 'text-game-textMuted hover:text-white'
              }`}
            >
              {isActive && (
                <div className="absolute inset-x-2 -top-1 h-0.5 bg-gradient-to-r from-game-purple via-game-cyan to-game-neonBlue rounded-full shadow-glow-cyan" />
              )}
              <div
                className={`p-1 rounded-xl transition-all ${
                  isActive ? 'bg-game-purple/20 text-game-cyan scale-110 shadow-glow-cyan' : ''
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className={`text-[10px] mt-0.5 font-semibold ${isActive ? 'text-white' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
