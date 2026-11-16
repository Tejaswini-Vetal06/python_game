import React from 'react';
import { useUser } from '../context/UserContext';
import { useGame } from '../context/GameContext';
import { TOPICS } from '../constants/topics';
import { TopicId } from '../types/challenge';
import { TRANSLATIONS } from '../constants/translations';
import { Card } from '../components/common/Card';
import { ProgressBar } from '../components/common/ProgressBar';
import { Lock, CheckCircle2, Play, BookOpen, Sparkles } from 'lucide-react';

interface TopicSelectScreenProps {
  onStartTopic: (topicId: TopicId) => void;
}

export const TopicSelectScreen: React.FC<TopicSelectScreenProps> = ({
  onStartTopic,
}) => {
  const { profile, setTopic } = useUser();
  const { isTopicUnlocked, getTopicCompletionPercent } = useGame();
  const t = TRANSLATIONS[profile.selectedLanguage];

  const handleSelectTopic = (topicId: TopicId, index: number) => {
    if (!isTopicUnlocked(index)) return;
    setTopic(topicId);
    onStartTopic(topicId);
  };

  return (
    <div className="space-y-5 pb-20 md:pb-8 max-w-4xl mx-auto animate-fade-in">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-game-surface border border-game-border rounded-2xl p-4 sm:p-5">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-game-purpleLight uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Python Curriculum Road</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white">
            14 Chapters of Python Mastery
          </h1>
          <p className="text-xs sm:text-sm text-game-textMuted mt-0.5">
            Progress sequentially to unlock each chapter. Revisit completed chapters anytime in Practice Mode.
          </p>
        </div>
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {TOPICS.map((topic, index) => {
          const unlocked = isTopicUnlocked(index);
          const isCurrent = profile.selectedTopic === topic.id;
          const percent = getTopicCompletionPercent(topic.id);
          const isCompleted = percent >= 100;

          return (
            <Card
              key={topic.id}
              onClick={() => handleSelectTopic(topic.id, index)}
              hoverable={unlocked}
              className={`relative border-2 transition-all ${
                !unlocked
                  ? 'opacity-60 bg-game-surface/50 border-game-border cursor-not-allowed'
                  : isCurrent
                  ? 'border-game-purple bg-gradient-to-br from-game-surface via-game-card to-game-purple/10 shadow-glow-purple'
                  : 'border-game-border hover:border-game-borderGlow'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-sm ${
                      !unlocked
                        ? 'bg-game-border/50 text-game-textSubtle'
                        : isCurrent
                        ? 'bg-game-purple text-white shadow-glow-purple'
                        : 'bg-game-card text-game-cyan border border-game-border'
                    }`}
                  >
                    {topic.order}
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-game-purpleLight">
                      Level {topic.levelRequired}
                    </div>
                    <h3 className="text-sm sm:text-base font-extrabold text-white">
                      {topic.titles[profile.selectedLanguage]}
                    </h3>
                  </div>
                </div>

                {/* State Tag */}
                {!unlocked ? (
                  <div className="flex items-center gap-1 px-2.5 py-1 bg-game-border/40 text-game-textSubtle rounded-lg text-xs font-semibold shrink-0">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Locked</span>
                  </div>
                ) : isCompleted ? (
                  <div className="flex items-center gap-1 px-2.5 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-semibold shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Mastered</span>
                  </div>
                ) : isCurrent ? (
                  <div className="flex items-center gap-1 px-2.5 py-1 bg-game-cyan/20 text-game-cyan border border-game-cyan/40 rounded-lg text-xs font-bold shrink-0 animate-pulse">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Active</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 px-2.5 py-1 bg-game-card text-game-textMuted border border-game-border rounded-lg text-xs font-semibold shrink-0">
                    <Play className="w-3 h-3" />
                    <span>Practice</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-xs text-game-textMuted mb-3 line-clamp-2">
                {topic.descriptions[profile.selectedLanguage]}
              </p>

              {/* Progress bar */}
              {unlocked && (
                <div className="pt-2 border-t border-game-border/50">
                  <ProgressBar
                    value={percent}
                    max={100}
                    label="Chapter Mastery"
                    color={isCompleted ? 'green' : isCurrent ? 'purple' : 'cyan'}
                    size="sm"
                  />
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};
