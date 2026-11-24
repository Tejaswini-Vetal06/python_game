import React from 'react';
import { useUser } from '../../context/UserContext';
import { ScreenLayoutMode } from '../../types/user';
import { Columns, Square, Maximize2 } from 'lucide-react';

export const LayoutModeToggle: React.FC = () => {
  const { profile, setLayoutMode } = useUser();

  const modes: { id: ScreenLayoutMode; label: string; icon: React.ReactNode; desc: string }[] = [
    {
      id: 'split',
      label: 'Split Screen',
      icon: <Columns className="w-3.5 h-3.5" />,
      desc: 'Dual-pane view: Mission on left, Code on right',
    },
    {
      id: 'single',
      label: 'Single Flow',
      icon: <Square className="w-3.5 h-3.5" />,
      desc: 'Clean stacked view with navigation tabs',
    },
    {
      id: 'code-focus',
      label: 'Code Focus',
      icon: <Maximize2 className="w-3.5 h-3.5" />,
      desc: 'Maximized editor canvas for deep coding',
    },
  ];

  return (
    <div className="flex items-center gap-1 bg-game-card/80 border border-game-border p-1 rounded-xl">
      {modes.map((m) => {
        const isActive = profile.layoutMode === m.id;
        return (
          <button
            key={m.id}
            onClick={() => setLayoutMode(m.id)}
            title={m.desc}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all select-none ${
              isActive
                ? 'bg-game-purple text-white shadow-glow-purple'
                : 'text-game-textMuted hover:text-white hover:bg-game-surface'
            }`}
          >
            <span>{m.icon}</span>
            <span className="hidden sm:inline">{m.label}</span>
          </button>
        );
      })}
    </div>
  );
};
