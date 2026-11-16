import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useGame } from '../context/GameContext';
import { TRANSLATIONS } from '../constants/translations';
import { LanguageCode } from '../types/challenge';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import {
  Settings,
  Volume2,
  VolumeX,
  Vibrate,
  Type,
  Globe,
  Trash2,
  Download,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';

interface SettingsScreenProps {
  onNavigateToDifficulty: () => void;
  deferredPrompt?: unknown;
  onInstallPWA?: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  onNavigateToDifficulty,
  deferredPrompt,
  onInstallPWA,
}) => {
  const {
    profile,
    setLanguage,
    setSoundEnabled,
    setHapticsEnabled,
    setFontSize,
    resetAll,
  } = useUser();
  const { resetGameData } = useGame();
  const t = TRANSLATIONS[profile.selectedLanguage];

  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleReset = () => {
    resetAll();
    resetGameData();
    setShowResetConfirm(false);
  };

  const languages: { id: LanguageCode; name: string }[] = [
    { id: 'en', name: 'English' },
    { id: 'hi', name: 'हिन्दी (Hindi)' },
    { id: 'hinglish', name: 'Hinglish' },
  ];

  return (
    <div className="space-y-5 pb-20 md:pb-8 max-w-2xl mx-auto animate-fade-in">
      {/* Header Banner */}
      <div className="flex items-center gap-3 bg-game-surface border border-game-border rounded-2xl p-4 sm:p-5">
        <div className="w-12 h-12 rounded-2xl bg-game-purple/20 border border-game-purple/40 flex items-center justify-center text-game-purpleLight shrink-0">
          <Settings className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white">
            {t.settings}
          </h1>
          <p className="text-xs text-game-textMuted">
            Configure sound, typography, difficulty, language, and storage.
          </p>
        </div>
      </div>

      {/* Language Section */}
      <Card>
        <div className="flex items-center gap-2 mb-3">
          <Globe className="w-4 h-4 text-game-cyan" />
          <h3 className="text-sm font-bold text-white">{t.languageSelect}</h3>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {languages.map((l) => (
            <button
              key={l.id}
              onClick={() => setLanguage(l.id)}
              className={`p-3 rounded-xl border text-center font-bold text-xs transition-all ${
                profile.selectedLanguage === l.id
                  ? 'border-game-cyan bg-game-cyan/20 text-game-cyan shadow-glow-cyan'
                  : 'border-game-border bg-game-card text-game-textMuted hover:bg-game-cardHover hover:text-white'
              }`}
            >
              {l.name}
            </button>
          ))}
        </div>
      </Card>

      {/* Difficulty Section */}
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white">{t.difficultySelect}</h3>
            <p className="text-xs text-game-textMuted mt-0.5">
              Current: <span className="text-game-cyan font-bold uppercase">{profile.selectedDifficulty}</span>
            </p>
          </div>
          <Button
            size="sm"
            variant="secondary"
            onClick={onNavigateToDifficulty}
          >
            Change
          </Button>
        </div>
      </Card>

      {/* Audio & Haptics */}
      <Card className="space-y-4">
        {/* Sound toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {profile.soundEnabled ? (
              <Volume2 className="w-5 h-5 text-game-purpleLight" />
            ) : (
              <VolumeX className="w-5 h-5 text-game-textSubtle" />
            )}
            <div>
              <div className="text-sm font-bold text-white">{t.soundEffects}</div>
              <div className="text-xs text-game-textSubtle">Web Audio synth audio feedback</div>
            </div>
          </div>
          <input
            type="checkbox"
            checked={profile.soundEnabled}
            onChange={(e) => setSoundEnabled(e.target.checked)}
            className="w-5 h-5 accent-game-purple cursor-pointer rounded"
          />
        </div>

        {/* Haptics toggle */}
        <div className="flex items-center justify-between pt-3 border-t border-game-border/60">
          <div className="flex items-center gap-3">
            <Vibrate className="w-5 h-5 text-game-cyan" />
            <div>
              <div className="text-sm font-bold text-white">{t.hapticFeedback}</div>
              <div className="text-xs text-game-textSubtle">Tactile mobile vibration on tap</div>
            </div>
          </div>
          <input
            type="checkbox"
            checked={profile.hapticsEnabled}
            onChange={(e) => setHapticsEnabled(e.target.checked)}
            className="w-5 h-5 accent-game-cyan cursor-pointer rounded"
          />
        </div>
      </Card>

      {/* Font Size Slider */}
      <Card>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Type className="w-4 h-4 text-game-cyan" />
            <span className="text-sm font-bold text-white">{t.fontSize}</span>
          </div>
          <span className="text-xs font-mono font-bold text-game-cyan">
            {profile.fontSize}px
          </span>
        </div>
        <input
          type="range"
          min={12}
          max={20}
          step={1}
          value={profile.fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
          className="w-full accent-game-cyan cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-game-textSubtle font-mono mt-1">
          <span>12px Compact</span>
          <span>14px Standard</span>
          <span>20px Large</span>
        </div>
      </Card>

      {/* PWA Install Button */}
      {deferredPrompt ? (
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">{t.installApp}</h3>
              <p className="text-xs text-game-textMuted mt-0.5">
                Install as a standalone PWA on your home screen or desktop.
              </p>
            </div>
            <Button
              size="sm"
              variant="primary"
              glow
              onClick={onInstallPWA}
              icon={<Download className="w-4 h-4" />}
            >
              Install
            </Button>
          </div>
        </Card>
      ) : (
        <Card className="flex items-center justify-between text-xs text-game-textSubtle">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-game-green" />
            <span>App is installed or running in standalone mode</span>
          </div>
        </Card>
      )}

      {/* Danger Zone: Reset Progress */}
      <Card className="border-red-900/40 bg-red-950/10">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-red-400">{t.resetProgress}</h3>
            <p className="text-xs text-game-textMuted mt-0.5">
              Permanently wipe all completed challenges, streaks, and XP.
            </p>
          </div>
          <Button
            size="sm"
            variant="danger"
            onClick={() => setShowResetConfirm(true)}
            icon={<Trash2 className="w-4 h-4" />}
          >
            Reset
          </Button>
        </div>
      </Card>

      {/* Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-game-surface border-2 border-red-500/60 rounded-3xl p-6 max-w-sm w-full text-center shadow-glow-red">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-3" />
            <h3 className="text-lg font-black text-white mb-2">
              Confirm Data Wipe
            </h3>
            <p className="text-xs text-game-textMuted mb-6">
              {t.resetConfirm}
            </p>
            <div className="flex gap-3">
              <Button
                variant="secondary"
                fullWidth
                onClick={() => setShowResetConfirm(false)}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                fullWidth
                onClick={handleReset}
              >
                Yes, Reset All
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
