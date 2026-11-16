import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { TOPICS } from '../constants/topics';
import { TopicId, DifficultyLevel, LanguageCode } from '../types/challenge';
import { TRANSLATIONS } from '../constants/translations';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Gauge,
  Languages,
} from 'lucide-react';

interface OnboardingScreenProps {
  onComplete: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const { profile, completeOnboarding } = useUser();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [selectedTopic, setSelectedTopic] = useState<TopicId>(profile.selectedTopic || 'variables');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>(
    profile.selectedDifficulty || 'beginner'
  );
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>(
    profile.selectedLanguage || 'en'
  );

  const t = TRANSLATIONS[selectedLanguage];

  const handleNext = () => {
    if (step === 1) setStep(2);
    else if (step === 2) setStep(3);
    else {
      completeOnboarding(selectedTopic, selectedDifficulty, selectedLanguage);
      onComplete();
    }
  };

  const handleBack = () => {
    if (step === 2) setStep(1);
    else if (step === 3) setStep(2);
  };

  const difficulties: { id: DifficultyLevel; name: string; desc: string; icon: string }[] = [
    {
      id: 'beginner',
      name: t.beginner,
      desc: 'New to programming or Python basics. Guided challenges with helpful structure.',
      icon: '🌱',
    },
    {
      id: 'intermediate',
      name: t.intermediate,
      desc: 'Familiar with syntax. Ready for algorithms, data structures, and problem-solving.',
      icon: '⚔️',
    },
    {
      id: 'advanced',
      name: t.advanced,
      desc: 'Mastery tier. Edge case handling, optimization, recursion, and modular architecture.',
      icon: '👑',
    },
  ];

  const languages: { id: LanguageCode; name: string; native: string; desc: string }[] = [
    {
      id: 'en',
      name: 'English',
      native: 'English',
      desc: 'Clean international English explanations and code instructions.',
    },
    {
      id: 'hi',
      name: 'Hindi',
      native: 'हिन्दी',
      desc: 'सरल और स्पष्ट हिंदी में पायथन के सभी कॉन्सेप्ट्स और समस्याएं।',
    },
    {
      id: 'hinglish',
      name: 'Hinglish',
      native: 'Hinglish',
      desc: 'Casual Hindi-English mix, jaise hum daily conversational tech baat karte hain.',
    },
  ];

  return (
    <div className="min-h-screen bg-game-bg flex flex-col justify-between p-4 sm:p-6 max-w-2xl mx-auto">
      {/* Top Header & Step Progress */}
      <div>
        <div className="flex items-center justify-between mb-4">
          {step > 1 ? (
            <button
              onClick={handleBack}
              className="flex items-center gap-1.5 text-xs font-semibold text-game-textMuted hover:text-white"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div className="text-xs text-game-purpleLight font-bold uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Welcome Adventurer</span>
            </div>
          )}
          <div className="text-xs font-mono text-game-cyan font-bold">
            Step {step} of 3
          </div>
        </div>

        {/* 3 Step Pill Bars */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          <div
            className={`h-1.5 rounded-full transition-colors ${
              step >= 1 ? 'bg-game-purple shadow-glow-purple' : 'bg-game-border'
            }`}
          />
          <div
            className={`h-1.5 rounded-full transition-colors ${
              step >= 2 ? 'bg-game-neonBlue shadow-glow-blue' : 'bg-game-border'
            }`}
          />
          <div
            className={`h-1.5 rounded-full transition-colors ${
              step >= 3 ? 'bg-game-cyan shadow-glow-cyan' : 'bg-game-border'
            }`}
          />
        </div>
      </div>

      {/* Main Step Content */}
      <div className="flex-1 overflow-y-auto pr-1">
        {/* STEP 1: TOPIC SELECTION */}
        {step === 1 && (
          <div className="animate-fade-in">
            <div className="flex items-center gap-2 mb-1">
              <BookOpen className="w-5 h-5 text-game-purpleLight" />
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Choose Your Starting Topic
              </h2>
            </div>
            <p className="text-sm text-game-textMuted mb-4">
              Select where you'd like to start. You can change or practice any unlocked topic anytime.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[50vh] overflow-y-auto pr-1">
              {TOPICS.map((topic) => {
                const isSelected = selectedTopic === topic.id;
                return (
                  <div
                    key={topic.id}
                    onClick={() => setSelectedTopic(topic.id)}
                    className={`cursor-pointer p-3.5 rounded-2xl border transition-all duration-200 select-none flex items-center justify-between ${
                      isSelected
                        ? 'bg-gradient-to-r from-game-purple/30 to-game-neonBlue/20 border-game-purpleLight shadow-glow-purple'
                        : 'bg-game-surface border-game-border hover:border-game-borderGlow hover:bg-game-card'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-game-purpleLight uppercase tracking-wider mb-0.5">
                        Chapter {topic.order}
                      </div>
                      <div className="text-sm font-bold text-white">
                        {topic.titles[selectedLanguage]}
                      </div>
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-game-cyan shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: DIFFICULTY SELECTION */}
        {step === 2 && (
          <div className="animate-fade-in">
            <div className="flex items-center gap-2 mb-1">
              <Gauge className="w-5 h-5 text-game-neonBlueLight" />
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Select Quest Difficulty
              </h2>
            </div>
            <p className="text-sm text-game-textMuted mb-6">
              Our challenge engine will calibrate starter code, hints, and test case complexity.
            </p>

            <div className="space-y-3.5">
              {difficulties.map((d) => {
                const isSelected = selectedDifficulty === d.id;
                return (
                  <Card
                    key={d.id}
                    onClick={() => setSelectedDifficulty(d.id)}
                    hoverable
                    className={`border-2 transition-all ${
                      isSelected
                        ? 'border-game-neonBlue bg-game-neonBlue/15 shadow-glow-blue'
                        : 'border-game-border'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{d.icon}</span>
                        <div>
                          <div className="text-base font-bold text-white flex items-center gap-2">
                            <span>{d.name}</span>
                          </div>
                          <div className="text-xs text-game-textMuted mt-1">
                            {d.desc}
                          </div>
                        </div>
                      </div>
                      {isSelected && (
                        <CheckCircle2 className="w-5 h-5 text-game-cyan shrink-0 mt-1" />
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: LANGUAGE SELECTION */}
        {step === 3 && (
          <div className="animate-fade-in">
            <div className="flex items-center gap-2 mb-1">
              <Languages className="w-5 h-5 text-game-cyan" />
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Preferred Learning Language
              </h2>
            </div>
            <p className="text-sm text-game-textMuted mb-6">
              All problem statements, hints, and explanations will be translated into your selected tongue.
            </p>

            <div className="space-y-3.5">
              {languages.map((l) => {
                const isSelected = selectedLanguage === l.id;
                return (
                  <Card
                    key={l.id}
                    onClick={() => setSelectedLanguage(l.id)}
                    hoverable
                    className={`border-2 transition-all ${
                      isSelected
                        ? 'border-game-cyan bg-game-cyan/15 shadow-glow-cyan'
                        : 'border-game-border'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-base font-bold text-white flex items-center gap-2">
                          <span>{l.native}</span>
                          <span className="text-xs text-game-textSubtle font-mono">
                            ({l.name})
                          </span>
                        </div>
                        <div className="text-xs text-game-textMuted mt-1">
                          {l.desc}
                        </div>
                      </div>
                      {isSelected && (
                        <CheckCircle2 className="w-5 h-5 text-game-cyan shrink-0 mt-1" />
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Button Actions */}
      <div className="pt-6">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          glow
          onClick={handleNext}
          icon={<ArrowRight className="w-5 h-5" />}
        >
          {step === 3 ? 'Launch Python Quest' : 'Continue'}
        </Button>
      </div>
    </div>
  );
};
