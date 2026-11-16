import React from 'react';
import { useUser } from '../context/UserContext';
import { DifficultyLevel } from '../types/challenge';
import { TRANSLATIONS } from '../constants/translations';
import { Card } from '../components/common/Card';
import { Gauge, CheckCircle2, ShieldAlert, Sparkles, ArrowLeft } from 'lucide-react';
import { Button } from '../components/common/Button';

interface DifficultySelectScreenProps {
  onBack: () => void;
}

export const DifficultySelectScreen: React.FC<DifficultySelectScreenProps> = ({
  onBack,
}) => {
  const { profile, setDifficulty } = useUser();
  const t = TRANSLATIONS[profile.selectedLanguage];

  const tiers: { id: DifficultyLevel; name: string; stars: string; desc: string; details: string[] }[] = [
    {
      id: 'beginner',
      name: t.beginner,
      stars: '★☆☆',
      desc: 'Foundation builders. Guided problem statements with starter templates and beginner-friendly test cases.',
      details: [
        'Clear syntax guidelines',
        'Direct problem statements',
        '4-level progressive hints available',
        '+50 XP Base Bounty',
      ],
    },
    {
      id: 'intermediate',
      name: t.intermediate,
      stars: '★★☆',
      desc: 'Algorithm architects. Complex conditional logic, nested loops, data structure methods, and string parsing.',
      details: [
        'Algorithmic problem solving',
        'Data structure manipulation',
        'Hidden edge test cases',
        '+50 XP Base + Edge Case Bonus',
      ],
    },
    {
      id: 'advanced',
      name: t.advanced,
      stars: '★★★',
      desc: 'Python champions. Complex edge cases, recursion, exception boundaries, file streaming, and high performance.',
      details: [
        'Corner and edge case rigor',
        'Strict PEP 8 code quality analysis',
        'Efficiency optimization checks',
        'Maximum XP bounties',
      ],
    },
  ];

  return (
    <div className="space-y-5 pb-20 md:pb-8 max-w-2xl mx-auto animate-fade-in">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-2 rounded-xl bg-game-surface border border-game-border hover:bg-game-card text-game-textMuted hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <div className="text-xs font-bold text-game-neonBlue uppercase tracking-wider flex items-center gap-1">
            <Gauge className="w-3.5 h-3.5" />
            <span>Difficulty Calibration</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white">
            Choose Your Quest Tier
          </h1>
        </div>
      </div>

      <div className="space-y-4">
        {tiers.map((tier) => {
          const isSelected = profile.selectedDifficulty === tier.id;

          return (
            <Card
              key={tier.id}
              onClick={() => setDifficulty(tier.id)}
              hoverable
              className={`border-2 transition-all cursor-pointer ${
                isSelected
                  ? 'border-game-neonBlue bg-game-surface shadow-glow-blue'
                  : 'border-game-border bg-game-surface/80'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base sm:text-lg font-black text-white">
                      {tier.name}
                    </span>
                    <span className="text-xs font-mono text-game-gold">
                      {tier.stars}
                    </span>
                  </div>
                  <p className="text-xs text-game-textMuted mt-1">
                    {tier.desc}
                  </p>
                </div>
                {isSelected ? (
                  <div className="p-1 rounded-full bg-game-cyan/20 text-game-cyan">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full border border-game-border" />
                )}
              </div>

              <div className="mt-3 pt-3 border-t border-game-border/60 grid grid-cols-2 gap-1.5 text-[11px] text-game-textSubtle">
                {tier.details.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-game-cyan shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>

      <div className="pt-2">
        <Button variant="primary" size="lg" fullWidth onClick={onBack}>
          Save & Return to Dashboard
        </Button>
      </div>
    </div>
  );
};
