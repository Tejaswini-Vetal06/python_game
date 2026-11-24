import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useGame } from '../context/GameContext';
import { TOPICS } from '../constants/topics';
import { TopicId } from '../types/challenge';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import {
  Video,
  Play,
  CheckCircle2,
  Clock,
  Sparkles,
  BookOpen,
  Code2,
  ExternalLink,
  ChevronRight,
  ListVideo,
} from 'lucide-react';

interface VideoAcademyScreenProps {
  onPracticeTopic: (topicId: TopicId) => void;
}

export const VideoAcademyScreen: React.FC<VideoAcademyScreenProps> = ({
  onPracticeTopic,
}) => {
  const { profile, setTopic, saveVideoWatched } = useUser();
  const { awardVideoBonusXP, isTopicUnlocked } = useGame();

  const [activeTopicId, setActiveTopicId] = useState<TopicId>(profile.selectedTopic);

  const activeTopic = TOPICS.find((t) => t.id === activeTopicId) || TOPICS[0];
  const videoMeta = activeTopic.video;

  const watchedRecord = profile.watchedVideos?.[activeTopicId];
  const isWatched = watchedRecord?.isCompleted || false;

  const handleSelectTopic = (id: TopicId) => {
    setActiveTopicId(id);
    setTopic(id);
  };

  const handleClaimBonus = () => {
    if (!isWatched && videoMeta) {
      saveVideoWatched({
        topicId: activeTopicId,
        watchedDurationSec: videoMeta.durationMinutes * 60,
        totalDurationSec: videoMeta.durationMinutes * 60,
        isCompleted: true,
        lastWatchedAt: new Date().toISOString(),
      });
      awardVideoBonusXP(activeTopicId);
    }
  };

  const handlePracticeNow = () => {
    setTopic(activeTopicId);
    onPracticeTopic(activeTopicId);
  };

  return (
    <div className="space-y-5 pb-24 md:pb-8 max-w-6xl mx-auto animate-fade-in">
      {/* Academy Header */}
      <div className="bg-gradient-to-r from-game-surface via-game-card to-game-surface border border-game-border rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-game-purple/20 border border-game-purple/40 flex items-center justify-center text-game-purpleLight shrink-0">
            <Video className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-game-purpleLight flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-game-gold" />
              <span>Python Quest Academy</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">
              Video Masterclasses & Concept Guides
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-game-textMuted bg-game-card/80 px-3 py-1.5 rounded-xl border border-game-border">
          <ListVideo className="w-4 h-4 text-game-cyan" />
          <span>14 Chapters • Visual Walkthroughs</span>
        </div>
      </div>

      {/* Main Grid: Video Player + Notes on Left, Chapter Playlist on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left Column: Player & Interactive Notes (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          {/* Responsive Video Container */}
          <div className="relative w-full rounded-2xl overflow-hidden bg-black border border-game-border shadow-2xl aspect-video">
            {videoMeta?.youtubeId ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${videoMeta.youtubeId}?rel=0&modestbranding=1`}
                title={activeTopic.titles[profile.selectedLanguage]}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-game-textMuted">
                <Video className="w-12 h-12 mb-2 text-game-cyan" />
                <p className="text-sm">Video tutorial loading...</p>
              </div>
            )}
          </div>

          {/* Video Metadata & Actions Bar */}
          <div className="bg-game-surface border border-game-border rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-game-card border border-game-border text-game-cyan font-bold">
                  Chapter {activeTopic.order}
                </span>
                <span className="text-xs text-game-textMuted flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5 text-game-cyan" />
                  {videoMeta?.durationMinutes || 12} mins
                </span>
                <span className="text-xs text-game-textSubtle">• {videoMeta?.instructor}</span>
              </div>
              <h2 className="text-lg font-black text-white">
                {activeTopic.titles[profile.selectedLanguage]}
              </h2>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {isWatched ? (
                <div className="flex items-center gap-1.5 px-3 py-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Mastered (+30 XP Claimed)</span>
                </div>
              ) : (
                <Button
                  size="sm"
                  variant="primary"
                  glow
                  onClick={handleClaimBonus}
                  icon={<Sparkles className="w-3.5 h-3.5 text-game-gold" />}
                >
                  Mark Watched (+30 XP)
                </Button>
              )}

              <Button
                size="sm"
                variant="outline"
                onClick={handlePracticeNow}
                icon={<Code2 className="w-3.5 h-3.5" />}
              >
                Code Quests
              </Button>
            </div>
          </div>

          {/* Key Bookmarks & Timestamps */}
          {videoMeta?.keyTimestamps && videoMeta.keyTimestamps.length > 0 && (
            <Card>
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-game-cyan" />
                <h3 className="text-sm font-bold text-white">Lecture Bookmarks</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {videoMeta.keyTimestamps.map((ts, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-game-card/70 border border-game-border text-xs"
                  >
                    <span className="font-medium text-white">{ts.title}</span>
                    <span className="text-game-cyan font-mono font-bold bg-game-bg px-2 py-0.5 rounded border border-game-border">
                      {Math.floor(ts.timeSec / 60)}:{String(ts.timeSec % 60).padStart(2, '0')}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Key Takeaways & Cheat Sheet */}
          {videoMeta?.summaryNotes && (
            <Card>
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-4 h-4 text-game-purpleLight" />
                <h3 className="text-sm font-bold text-white">Key Takeaways & Syntax Sheet</h3>
              </div>
              <ul className="space-y-2 text-xs text-game-textMuted">
                {videoMeta.summaryNotes.map((note, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-game-card/50 p-2.5 rounded-xl border border-game-border/60">
                    <span className="text-game-cyan font-bold mt-0.5">▸</span>
                    <span className="leading-relaxed text-game-text">{note}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>

        {/* Right Column: 14 Chapter Playlist */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-game-purpleLight">
              Course Syllabus
            </span>
            <span className="text-xs font-mono text-game-cyan">14 Video Modules</span>
          </div>

          <div className="space-y-2 max-h-[720px] overflow-y-auto pr-1">
            {TOPICS.map((topic, index) => {
              const isActive = topic.id === activeTopicId;
              const isUnlocked = isTopicUnlocked(index);
              const watched = profile.watchedVideos?.[topic.id]?.isCompleted || false;

              return (
                <div
                  key={topic.id}
                  onClick={() => handleSelectTopic(topic.id)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isActive
                      ? 'border-game-purple bg-gradient-to-r from-game-purple/20 to-game-surface shadow-glow-purple'
                      : 'border-game-border bg-game-surface hover:bg-game-card'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                        isActive
                          ? 'bg-game-purple text-white shadow-glow-purple'
                          : 'bg-game-card text-game-textMuted border border-game-border'
                      }`}
                    >
                      {topic.order}
                    </div>

                    <div className="truncate">
                      <div className="text-xs font-bold text-white truncate">
                        {topic.titles[profile.selectedLanguage]}
                      </div>
                      <div className="text-[10px] text-game-textSubtle flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3 text-game-cyan" />
                        <span>{topic.video?.durationMinutes || 12}m</span>
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0">
                    {watched ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : isActive ? (
                      <Play className="w-4 h-4 text-game-cyan fill-current animate-pulse" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-game-textSubtle" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
