import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useGame } from '../context/GameContext';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { User, Shield, Sparkles, Award, Check, Edit3 } from 'lucide-react';

export const ProfileScreen: React.FC = () => {
  const { profile, updateUsername, updateAvatar } = useUser();
  const { gameState, currentLevel } = useGame();

  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(profile.username);

  const avatars = [
    { id: 'warrior', emoji: '⚔️', title: 'Python Knight' },
    { id: 'wizard', emoji: '🧙‍♂️', title: 'Code Mage' },
    { id: 'ninja', emoji: '🥷', title: 'Syntax Ninja' },
    { id: 'cyborg', emoji: '🤖', title: 'Algorithmic Bot' },
    { id: 'dragon', emoji: '🐉', title: 'PyDragon' },
    { id: 'hacker', emoji: '💻', title: 'Cyber Hacker' },
  ];

  const handleSaveName = () => {
    if (nameInput.trim()) {
      updateUsername(nameInput.trim());
      setIsEditingName(false);
    }
  };

  const completedCount = Object.keys(gameState.completedChallenges).length;
  const currentAvatar = avatars.find((a) => a.id === profile.avatarId) || avatars[0];

  return (
    <div className="space-y-5 pb-20 md:pb-8 max-w-2xl mx-auto animate-fade-in">
      {/* Top Banner */}
      <Card className="text-center p-6 sm:p-8 bg-gradient-to-b from-game-surface via-game-card to-game-surface border-game-purpleLight/40">
        <div className="relative inline-block mx-auto mb-3">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-game-purple to-game-cyan p-1 shadow-glow-purple">
            <div className="w-full h-full bg-game-bg rounded-[22px] flex items-center justify-center text-4xl">
              {currentAvatar.emoji}
            </div>
          </div>
        </div>

        {/* Username with inline edit */}
        <div className="flex items-center justify-center gap-2 mb-1">
          {isEditingName ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                maxLength={20}
                className="bg-game-bg border border-game-cyan text-white text-lg font-bold px-3 py-1 rounded-xl focus:outline-none"
                autoFocus
              />
              <Button size="sm" variant="success" onClick={handleSaveName}>
                <Check className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black text-white">{profile.username}</h2>
              <button
                onClick={() => setIsEditingName(true)}
                className="p-1 text-game-textMuted hover:text-white"
                title="Edit Username"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        <div className="text-xs font-bold text-game-purpleLight uppercase tracking-wider mb-4">
          Level {currentLevel.levelNumber} • {currentLevel.title}
        </div>

        {/* Mini stats */}
        <div className="grid grid-cols-3 gap-2 pt-4 border-t border-game-border/60">
          <div>
            <div className="text-xs text-game-textSubtle font-semibold">Total XP</div>
            <div className="text-base font-black text-game-gold font-mono">
              {gameState.totalXP}
            </div>
          </div>
          <div>
            <div className="text-xs text-game-textSubtle font-semibold">Quests Done</div>
            <div className="text-base font-black text-game-cyan font-mono">
              {completedCount}
            </div>
          </div>
          <div>
            <div className="text-xs text-game-textSubtle font-semibold">Badges</div>
            <div className="text-base font-black text-game-purpleLight font-mono">
              {gameState.unlockedBadgesCount} / 8
            </div>
          </div>
        </div>
      </Card>

      {/* Avatar Picker */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <User className="w-4 h-4 text-game-cyan" />
          <h3 className="text-sm font-bold text-white">Choose Your Avatar</h3>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
          {avatars.map((av) => {
            const isSelected = profile.avatarId === av.id;
            return (
              <button
                key={av.id}
                onClick={() => updateAvatar(av.id)}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  isSelected
                    ? 'border-game-purple bg-game-purple/20 shadow-glow-purple scale-105'
                    : 'border-game-border bg-game-card hover:bg-game-cardHover'
                }`}
              >
                <div className="text-2xl mb-1">{av.emoji}</div>
                <div className="text-[10px] font-semibold text-game-textMuted truncate">
                  {av.title}
                </div>
              </button>
            );
          })}
        </div>
      </Card>
    </div>
  );
};
