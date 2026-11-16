import React from 'react';
import { Button } from '../components/common/Button';
import { useUser } from '../context/UserContext';
import { TRANSLATIONS } from '../constants/translations';
import { Sparkles, Play, Shield, Terminal, Zap, Cpu } from 'lucide-react';

interface SplashScreenProps {
  onStart: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onStart }) => {
  const { profile } = useUser();
  const t = TRANSLATIONS[profile.selectedLanguage];

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 bg-game-bg overflow-hidden text-center">
      {/* Dynamic ambient lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-game-purple/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-game-cyan/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Hero Container */}
      <div className="relative z-10 max-w-lg w-full flex flex-col items-center">
        {/* Animated Badge */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 mb-6 rounded-3xl bg-gradient-to-tr from-game-purple via-game-neonBlue to-game-cyan p-1 shadow-glow-purple animate-float">
          <div className="w-full h-full bg-game-surface rounded-[22px] flex items-center justify-center font-mono font-extrabold text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-game-purpleLight to-game-cyan">
            &gt;_
          </div>
        </div>

        {/* Quest Title */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-game-purple/20 border border-game-purple/40 text-game-purpleLight text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Python Learning Odyssey</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-3">
          {t.appName}
        </h1>

        <p className="text-base sm:text-lg text-game-textMuted mb-8 leading-relaxed max-w-md">
          {t.tagline}
        </p>

        {/* Feature Pills */}
        <div className="grid grid-cols-3 gap-2.5 w-full mb-8 text-xs font-medium text-game-textMuted">
          <div className="bg-game-surface/80 border border-game-border p-3 rounded-2xl flex flex-col items-center gap-1.5 shadow-sm">
            <Cpu className="w-5 h-5 text-game-cyan" />
            <span className="text-white font-semibold">WebAssembly</span>
            <span className="text-[10px] text-game-textSubtle">Real CPython</span>
          </div>
          <div className="bg-game-surface/80 border border-game-border p-3 rounded-2xl flex flex-col items-center gap-1.5 shadow-sm">
            <Zap className="w-5 h-5 text-game-purpleLight" />
            <span className="text-white font-semibold">Gamified</span>
            <span className="text-[10px] text-game-textSubtle">XP & Badges</span>
          </div>
          <div className="bg-game-surface/80 border border-game-border p-3 rounded-2xl flex flex-col items-center gap-1.5 shadow-sm">
            <Shield className="w-5 h-5 text-game-greenLight" />
            <span className="text-white font-semibold">100% Private</span>
            <span className="text-[10px] text-game-textSubtle">Client-Side</span>
          </div>
        </div>

        {/* Start Button */}
        <Button
          variant="primary"
          size="lg"
          fullWidth
          glow
          onClick={onStart}
          icon={<Play className="w-5 h-5 fill-current" />}
        >
          {profile.onboardingCompleted ? t.continueQuest : t.startQuest}
        </Button>

        {/* Subtitle / Version */}
        <div className="mt-6 flex items-center gap-2 text-xs text-game-textSubtle">
          <Terminal className="w-3.5 h-3.5" />
          <span>v1.0.0 • Production PWA</span>
        </div>
      </div>
    </div>
  );
};
