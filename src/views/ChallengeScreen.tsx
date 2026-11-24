import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useGame } from '../context/GameContext';
import { TRANSLATIONS } from '../constants/translations';
import { TOPICS } from '../constants/topics';
import {
  getChallengesByDifficulty,
  getNextChallenge,
} from '../data/challenges';
import { pythonController } from '../services/pythonController';
import { generateReviewReport } from '../services/reviewEngine';
import { CodeReviewReport, TestResult } from '../types/pyodide';
import { XPBreakdown } from '../types/gamification';
import { storageService } from '../services/storageService';
import { EditorToolbar } from '../components/editor/EditorToolbar';
import { MobileCodeEditor } from '../components/editor/MobileCodeEditor';
import { OutputConsole } from '../components/editor/OutputConsole';
import { HintDrawer } from '../components/editor/HintDrawer';
import { ReviewModal } from '../components/review/ReviewModal';
import { LayoutModeToggle } from '../components/common/LayoutModeToggle';
import { SessionStartBanner } from '../components/session/SessionStartBanner';
import {
  Sparkles,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Video,
  FileCode,
  Terminal,
  Save,
  Layers,
} from 'lucide-react';

interface ChallengeScreenProps {
  onBackToDashboard: () => void;
  onNavigateToTopics: () => void;
  onNavigateToVideos?: () => void;
}

export const ChallengeScreen: React.FC<ChallengeScreenProps> = ({
  onNavigateToTopics,
  onNavigateToVideos,
}) => {
  const { profile, saveDraftCode } = useUser();
  const { recordChallengeCompletion, isChallengeCompleted } = useGame();
  const t = TRANSLATIONS[profile.selectedLanguage];

  const currentTopic =
    TOPICS.find((top) => top.id === profile.selectedTopic) || TOPICS[0];
  const challengesList = getChallengesByDifficulty(
    profile.selectedTopic,
    profile.selectedDifficulty
  );

  // Active challenge state
  const [challengeIndex, setChallengeIndex] = useState(() => {
    if (profile.activeResumeQuestId) {
      const foundIdx = challengesList.findIndex((c) => c.id === profile.activeResumeQuestId);
      if (foundIdx !== -1) return foundIdx;
    }
    return 0;
  });

  const activeChallenge = challengesList[challengeIndex] || challengesList[0];

  // Editor and runtime state
  const [userCode, setUserCode] = useState(() => {
    if (activeChallenge) {
      const savedDraft = storageService.getDraftCode(activeChallenge.id);
      return savedDraft || activeChallenge.starterCode;
    }
    return '';
  });

  const [stdout, setStdout] = useState('');
  const [stderr, setStderr] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [executionTimeMs, setExecutionTimeMs] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isDraftSaved, setIsDraftSaved] = useState(false);

  // Mobile Single-Flow Tab state
  const [mobileTab, setMobileTab] = useState<'mission' | 'code' | 'terminal' | 'video'>('code');

  // Hints and review state
  const [hintsRevealed, setHintsRevealed] = useState(0);
  const [attemptsCount, setAttemptsCount] = useState(0);
  const [reviewReport, setReviewReport] = useState<CodeReviewReport | null>(null);
  const [xpBreakdown, setXpBreakdown] = useState<XPBreakdown | null>(null);

  // Update editor when active challenge changes
  useEffect(() => {
    if (activeChallenge) {
      const savedDraft = storageService.getDraftCode(activeChallenge.id);
      setUserCode(savedDraft || activeChallenge.starterCode);
      setStdout('');
      setStderr('');
      setError(null);
      setTestResults([]);
      setExecutionTimeMs(0);
      setHintsRevealed(0);
      setAttemptsCount(0);
      setReviewReport(null);
      setXpBreakdown(null);
    }
  }, [activeChallenge?.id]);

  // Debounced auto-save draft code
  useEffect(() => {
    if (activeChallenge && userCode !== activeChallenge.starterCode) {
      const timeout = setTimeout(() => {
        saveDraftCode(activeChallenge.id, userCode);
        setIsDraftSaved(true);
        setTimeout(() => setIsDraftSaved(false), 2000);
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [userCode, activeChallenge?.id]);

  if (!activeChallenge) {
    return (
      <div className="p-8 text-center text-game-textMuted">
        No challenges available for this topic and difficulty.
      </div>
    );
  }

  const localized = activeChallenge.translations[profile.selectedLanguage];
  const isCompleted = isChallengeCompleted(activeChallenge.id);
  const layout = profile.layoutMode || 'split';

  // Run Code
  const handleRunCode = async () => {
    setIsRunning(true);
    setStdout('');
    setStderr('');
    setError(null);
    if (layout === 'single') setMobileTab('terminal');

    const result = await pythonController.runCode(userCode);
    setStdout(result.stdout);
    setStderr(result.stderr);
    setError(result.error);
    setExecutionTimeMs(result.executionTimeMs);
    setIsRunning(false);
  };

  // Submit Quest
  const handleSubmitQuest = async () => {
    setIsRunning(true);
    setStdout('');
    setStderr('');
    setError(null);
    setAttemptsCount((prev) => prev + 1);
    if (layout === 'single') setMobileTab('terminal');

    const result = await pythonController.runTests(
      userCode,
      activeChallenge.testCases
    );
    setTestResults(result.testResults);
    setExecutionTimeMs(result.executionTimeMs);
    setIsRunning(false);

    const report = generateReviewReport(
      userCode,
      result.testResults,
      '',
      '',
      result.error,
      activeChallenge
    );
    setReviewReport(report);

    if (report.isPassed) {
      const breakdown = recordChallengeCompletion(
        activeChallenge.id,
        activeChallenge.topicId,
        activeChallenge.difficulty,
        hintsRevealed,
        attemptsCount + 1,
        report.heuristics.edgeCasesHandled,
        report.heuristics.isPep8Compliant,
        userCode
      );
      setXpBreakdown(breakdown);
    }
  };

  const handleResetCode = () => {
    setUserCode(activeChallenge.starterCode);
    saveDraftCode(activeChallenge.id, activeChallenge.starterCode);
  };

  const handleClearOutput = () => {
    setStdout('');
    setStderr('');
    setError(null);
    setTestResults([]);
    setExecutionTimeMs(0);
  };

  const handleInsertText = (text: string) => {
    setUserCode((prev) => prev + text);
  };

  const handleRevealNextHint = () => {
    setHintsRevealed((prev) => Math.min(4, prev + 1));
  };

  const handleNextChallenge = () => {
    setReviewReport(null);
    setXpBreakdown(null);
    const next = getNextChallenge(
      activeChallenge.id,
      profile.selectedTopic,
      profile.selectedDifficulty
    );
    if (next) {
      const nextIdx = challengesList.findIndex((c) => c.id === next.id);
      if (nextIdx !== -1) setChallengeIndex(nextIdx);
    } else {
      onNavigateToTopics();
    }
  };

  return (
    <div className="space-y-4 pb-24 md:pb-8 max-w-7xl mx-auto animate-fade-in">
      {/* Session HUD Tracker */}
      <SessionStartBanner />

      {/* Quest Header & Multi-screen Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-game-surface border border-game-border rounded-2xl p-3.5 sm:p-4 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-game-purple/20 border border-game-purple/40 flex items-center justify-center text-game-purpleLight font-mono font-bold shrink-0">
            #{activeChallenge.order}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-game-purpleLight uppercase tracking-wider">
                {currentTopic.titles[profile.selectedLanguage]}
              </span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.2 rounded bg-game-card border border-game-border text-game-cyan">
                {activeChallenge.difficulty}
              </span>
              {isCompleted && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-game-green bg-emerald-500/15 border border-emerald-500/30 px-1.5 py-0.2 rounded">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Solved</span>
                </span>
              )}
              {isDraftSaved && (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 animate-pulse">
                  <Save className="w-3 h-3" />
                  <span>Draft Saved</span>
                </span>
              )}
            </div>
            <h1 className="text-base sm:text-lg font-black text-white">
              {localized.title}
            </h1>
          </div>
        </div>

        {/* Layout Mode Selector & Quest Pagination */}
        <div className="flex flex-wrap items-center gap-2.5 self-end md:self-auto">
          {/* Multi-screen Layout Toggle */}
          <LayoutModeToggle />

          {/* Video Lesson Shortcut */}
          {onNavigateToVideos && (
            <button
              onClick={onNavigateToVideos}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-game-card hover:bg-game-cardHover border border-game-border rounded-xl text-xs font-bold text-game-cyan hover:text-white transition-colors"
              title="Watch Chapter Video Lesson"
            >
              <Video className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Watch Lesson</span>
            </button>
          )}

          {/* Pagination */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setChallengeIndex((i) => Math.max(0, i - 1))}
              disabled={challengeIndex === 0}
              className="p-1.5 sm:p-2 rounded-xl bg-game-card border border-game-border text-game-textMuted hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
              title="Previous Quest"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-game-textMuted font-bold px-1.5">
              {challengeIndex + 1}/{challengesList.length}
            </span>
            <button
              onClick={() =>
                setChallengeIndex((i) => Math.min(challengesList.length - 1, i + 1))
              }
              disabled={challengeIndex === challengesList.length - 1}
              className="p-1.5 sm:p-2 rounded-xl bg-game-card border border-game-border text-game-textMuted hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
              title="Next Quest"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Flow Tab Switcher (when layout is single or on mobile) */}
      {layout === 'single' && (
        <div className="flex items-center gap-1 bg-game-card border border-game-border p-1 rounded-xl">
          <button
            onClick={() => setMobileTab('mission')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              mobileTab === 'mission'
                ? 'bg-game-surface text-game-cyan border border-game-cyan/30 shadow-glow-cyan'
                : 'text-game-textMuted hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Mission</span>
          </button>
          <button
            onClick={() => setMobileTab('code')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              mobileTab === 'code'
                ? 'bg-game-surface text-game-purpleLight border border-game-purple/30 shadow-glow-purple'
                : 'text-game-textMuted hover:text-white'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Code Lab</span>
          </button>
          <button
            onClick={() => setMobileTab('terminal')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              mobileTab === 'terminal'
                ? 'bg-game-surface text-emerald-400 border border-emerald-500/30 shadow-glow-green'
                : 'text-game-textMuted hover:text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Terminal</span>
          </button>
          <button
            onClick={() => setMobileTab('video')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              mobileTab === 'video'
                ? 'bg-game-surface text-game-gold border border-game-gold/30 shadow-glow-gold'
                : 'text-game-textMuted hover:text-white'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Video</span>
          </button>
        </div>
      )}

      {/* LAYOUT RENDERING: SPLIT VIEW vs SINGLE TABBED VIEW vs CODE FOCUS */}
      {layout === 'split' ? (
        /* DUAL-PANE MULTI-SCREEN LAYOUT */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left Column: Mission, Objective, Hints & Video (5 cols) */}
          <div className="lg:col-span-5 space-y-3.5">
            {/* Mission Objective Card */}
            <div className="rounded-2xl bg-game-card/80 border border-game-border p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-game-cyan">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Mission Objective</span>
              </div>
              <p className="text-sm font-semibold text-white">
                {localized.objective}
              </p>
              <p className="text-xs text-game-textMuted leading-relaxed pt-1">
                {localized.problemStatement}
              </p>

              {localized.sampleOutput && (
                <div className="mt-2 pt-2 border-t border-game-border/60 flex items-center gap-2 text-xs font-mono">
                  <span className="text-game-textSubtle">Expected Output:</span>
                  <span className="px-2 py-0.5 rounded bg-game-bg border border-game-border text-game-cyan">
                    {localized.sampleOutput}
                  </span>
                </div>
              )}
            </div>

            {/* Progressive Hints */}
            <HintDrawer
              hints={localized.hints}
              hintsRevealedCount={hintsRevealed}
              onRevealNextHint={handleRevealNextHint}
            />

            {/* Mini Video Embed if available */}
            {currentTopic.video && (
              <div className="bg-game-surface border border-game-border rounded-2xl p-3.5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-game-gold">
                    <Video className="w-3.5 h-3.5" />
                    <span>Topic Walkthrough Video</span>
                  </div>
                  <span className="text-[10px] text-game-textSubtle font-mono">
                    {currentTopic.video.durationMinutes} mins
                  </span>
                </div>
                <div className="aspect-video w-full rounded-xl overflow-hidden bg-black border border-game-border">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${currentTopic.video.youtubeId}?rel=0&modestbranding=1`}
                    title={currentTopic.titles[profile.selectedLanguage]}
                    className="w-full h-full border-0"
                    allowFullScreen
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Code Editor & Execution Terminal (7 cols) */}
          <div className="lg:col-span-7 space-y-3.5">
            <EditorToolbar
              onRun={handleRunCode}
              onSubmit={handleSubmitQuest}
              onReset={handleResetCode}
              onClear={handleClearOutput}
              onInsertText={handleInsertText}
              isRunning={isRunning}
              canSubmit={true}
            />

            <MobileCodeEditor
              value={userCode}
              onChange={setUserCode}
              onRunShortcut={handleRunCode}
            />

            <OutputConsole
              stdout={stdout}
              stderr={stderr}
              error={error}
              testResults={testResults}
              executionTimeMs={executionTimeMs}
              isRunning={isRunning}
              onClear={handleClearOutput}
            />
          </div>
        </div>
      ) : layout === 'single' ? (
        /* SINGLE TABBED FLOW (Ideal for compact mobile phones) */
        <div className="space-y-3.5">
          {mobileTab === 'mission' && (
            <div className="space-y-3 animate-fade-in">
              <div className="rounded-2xl bg-game-card/80 border border-game-border p-4 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-game-cyan">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Mission Objective</span>
                </div>
                <p className="text-sm font-semibold text-white">
                  {localized.objective}
                </p>
                <p className="text-xs text-game-textMuted leading-relaxed pt-1">
                  {localized.problemStatement}
                </p>

                {localized.sampleOutput && (
                  <div className="mt-2 pt-2 border-t border-game-border/60 flex items-center gap-2 text-xs font-mono">
                    <span className="text-game-textSubtle">Expected Output:</span>
                    <span className="px-2 py-0.5 rounded bg-game-bg border border-game-border text-game-cyan">
                      {localized.sampleOutput}
                    </span>
                  </div>
                )}
              </div>

              <HintDrawer
                hints={localized.hints}
                hintsRevealedCount={hintsRevealed}
                onRevealNextHint={handleRevealNextHint}
              />
            </div>
          )}

          {mobileTab === 'code' && (
            <div className="space-y-2 animate-fade-in">
              <EditorToolbar
                onRun={handleRunCode}
                onSubmit={handleSubmitQuest}
                onReset={handleResetCode}
                onClear={handleClearOutput}
                onInsertText={handleInsertText}
                isRunning={isRunning}
                canSubmit={true}
              />
              <MobileCodeEditor
                value={userCode}
                onChange={setUserCode}
                onRunShortcut={handleRunCode}
              />
            </div>
          )}

          {mobileTab === 'terminal' && (
            <div className="space-y-2 animate-fade-in">
              <OutputConsole
                stdout={stdout}
                stderr={stderr}
                error={error}
                testResults={testResults}
                executionTimeMs={executionTimeMs}
                isRunning={isRunning}
                onClear={handleClearOutput}
              />
            </div>
          )}

          {mobileTab === 'video' && currentTopic.video && (
            <div className="space-y-3 animate-fade-in">
              <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black border border-game-border shadow-xl">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${currentTopic.video.youtubeId}?rel=0&modestbranding=1`}
                  title={currentTopic.titles[profile.selectedLanguage]}
                  className="w-full h-full border-0"
                  allowFullScreen
                />
              </div>
              <div className="bg-game-surface border border-game-border rounded-xl p-3 text-xs text-game-textMuted">
                <span className="font-bold text-white">Lesson: </span>
                {currentTopic.titles[profile.selectedLanguage]} by {currentTopic.video.instructor}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* CODE FOCUS MODE */
        <div className="space-y-3">
          <div className="bg-game-card/60 border border-game-border rounded-xl p-2.5 text-xs text-game-textMuted flex items-center justify-between">
            <span className="font-bold text-white truncate max-w-sm">
              Objective: {localized.objective}
            </span>
            <span className="text-game-cyan font-mono text-[10px]">Expected: {localized.sampleOutput}</span>
          </div>

          <EditorToolbar
            onRun={handleRunCode}
            onSubmit={handleSubmitQuest}
            onReset={handleResetCode}
            onClear={handleClearOutput}
            onInsertText={handleInsertText}
            isRunning={isRunning}
            canSubmit={true}
          />

          <MobileCodeEditor
            value={userCode}
            onChange={setUserCode}
            onRunShortcut={handleRunCode}
          />

          <OutputConsole
            stdout={stdout}
            stderr={stderr}
            error={error}
            testResults={testResults}
            executionTimeMs={executionTimeMs}
            isRunning={isRunning}
            onClear={handleClearOutput}
          />
        </div>
      )}

      {/* 6. Code Review Modal Overlay */}
      {reviewReport && (
        <ReviewModal
          report={reviewReport}
          xpBreakdown={xpBreakdown}
          onContinue={handleNextChallenge}
          onRetry={() => setReviewReport(null)}
        />
      )}
    </div>
  );
};
