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
import { EditorToolbar } from '../components/editor/EditorToolbar';
import { MobileCodeEditor } from '../components/editor/MobileCodeEditor';
import { OutputConsole } from '../components/editor/OutputConsole';
import { HintDrawer } from '../components/editor/HintDrawer';
import { ReviewModal } from '../components/review/ReviewModal';
import {
  Sparkles,
  BookOpen,
  Award,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';

interface ChallengeScreenProps {
  onBackToDashboard: () => void;
  onNavigateToTopics: () => void;
}

export const ChallengeScreen: React.FC<ChallengeScreenProps> = ({
  onNavigateToTopics,
}) => {
  const { profile } = useUser();
  const {
    gameState,
    recordChallengeCompletion,
    isChallengeCompleted,
  } = useGame();
  const t = TRANSLATIONS[profile.selectedLanguage];

  const currentTopic =
    TOPICS.find((top) => top.id === profile.selectedTopic) || TOPICS[0];
  const challengesList = getChallengesByDifficulty(
    profile.selectedTopic,
    profile.selectedDifficulty
  );

  // Active challenge state
  const [challengeIndex, setChallengeIndex] = useState(0);
  const activeChallenge = challengesList[challengeIndex] || challengesList[0];

  // Editor and runtime state
  const [userCode, setUserCode] = useState(activeChallenge?.starterCode || '');
  const [stdout, setStdout] = useState('');
  const [stderr, setStderr] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [executionTimeMs, setExecutionTimeMs] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Hints and review state
  const [hintsRevealed, setHintsRevealed] = useState(0);
  const [attemptsCount, setAttemptsCount] = useState(0);
  const [reviewReport, setReviewReport] = useState<CodeReviewReport | null>(null);
  const [xpBreakdown, setXpBreakdown] = useState<XPBreakdown | null>(null);

  // Reset editor and state when active challenge changes
  useEffect(() => {
    if (activeChallenge) {
      setUserCode(activeChallenge.starterCode);
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

  if (!activeChallenge) {
    return (
      <div className="p-8 text-center text-game-textMuted">
        No challenges available for this topic and difficulty.
      </div>
    );
  }

  const localized = activeChallenge.translations[profile.selectedLanguage];
  const isCompleted = isChallengeCompleted(activeChallenge.id);

  // Run Code (manual testing without submission)
  const handleRunCode = async () => {
    setIsRunning(true);
    setStdout('');
    setStderr('');
    setError(null);

    const result = await pythonController.runCode(userCode);
    setStdout(result.stdout);
    setStderr(result.stderr);
    setError(result.error);
    setExecutionTimeMs(result.executionTimeMs);
    setIsRunning(false);
  };

  // Submit Quest (evaluates against test cases and heuristics)
  const handleSubmitQuest = async () => {
    setIsRunning(true);
    setStdout('');
    setStderr('');
    setError(null);
    setAttemptsCount((prev) => prev + 1);

    const result = await pythonController.runTests(
      userCode,
      activeChallenge.testCases
    );
    setTestResults(result.testResults);
    setExecutionTimeMs(result.executionTimeMs);
    setIsRunning(false);

    // Generate comprehensive code review
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
      // Completed all in this difficulty tier!
      onNavigateToTopics();
    }
  };

  return (
    <div className="space-y-4 pb-24 md:pb-8 max-w-5xl mx-auto animate-fade-in">
      {/* 1. Quest Header & Quest Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-game-surface border border-game-border rounded-2xl p-3.5 sm:p-4">
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
            </div>
            <h1 className="text-base sm:text-lg font-black text-white">
              {localized.title}
            </h1>
          </div>
        </div>

        {/* Quest pagination buttons */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={() => setChallengeIndex((i) => Math.max(0, i - 1))}
            disabled={challengeIndex === 0}
            className="p-2 rounded-xl bg-game-card border border-game-border text-game-textMuted hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
            title="Previous Quest"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono text-game-textMuted font-bold px-2">
            {challengeIndex + 1} / {challengesList.length}
          </span>
          <button
            onClick={() =>
              setChallengeIndex((i) => Math.min(challengesList.length - 1, i + 1))
            }
            disabled={challengeIndex === challengesList.length - 1}
            className="p-2 rounded-xl bg-game-card border border-game-border text-game-textMuted hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
            title="Next Quest"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Problem Statement & Objective Card */}
      <div className="rounded-2xl bg-game-card/70 border border-game-border p-4 space-y-2">
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

        {/* Sample Output */}
        {localized.sampleOutput && (
          <div className="mt-2 pt-2 border-t border-game-border/60 flex items-center gap-2 text-xs font-mono">
            <span className="text-game-textSubtle">Expected Output:</span>
            <span className="px-2 py-0.5 rounded bg-game-bg border border-game-border text-game-cyan">
              {localized.sampleOutput}
            </span>
          </div>
        )}
      </div>

      {/* 3. Progressive Hints Drawer */}
      <HintDrawer
        hints={localized.hints}
        hintsRevealedCount={hintsRevealed}
        onRevealNextHint={handleRevealNextHint}
      />

      {/* 4. Code Editor & Toolbar */}
      <div className="space-y-2">
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

      {/* 5. Execution Terminal & Test Results */}
      <OutputConsole
        stdout={stdout}
        stderr={stderr}
        error={error}
        testResults={testResults}
        executionTimeMs={executionTimeMs}
        isRunning={isRunning}
        onClear={handleClearOutput}
      />

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
