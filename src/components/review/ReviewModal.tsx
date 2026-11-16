import React from 'react';
import { CodeReviewReport } from '../../types/pyodide';
import { XPBreakdown } from '../../types/gamification';
import { Button } from '../common/Button';
import {
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Lightbulb,
  Award,
  Zap,
} from 'lucide-react';

interface ReviewModalProps {
  report: CodeReviewReport;
  xpBreakdown: XPBreakdown | null;
  onContinue: () => void;
  onRetry: () => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  report,
  xpBreakdown,
  onContinue,
  onRetry,
}) => {
  const isSuccess = report.isPassed;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div
        className={`relative w-full max-w-lg bg-game-surface border-2 rounded-3xl p-5 sm:p-7 shadow-2xl my-8 animate-level-up ${
          isSuccess ? 'border-emerald-500/80 shadow-glow-green' : 'border-red-500/80 shadow-glow-red'
        }`}
      >
        {/* Top Header Badge */}
        <div className="text-center mb-5">
          <div
            className={`w-16 h-16 mx-auto mb-3 rounded-2xl flex items-center justify-center shadow-lg ${
              isSuccess
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-glow-green'
                : 'bg-red-500/20 text-red-400 border border-red-500/40 shadow-glow-red'
            }`}
          >
            {isSuccess ? (
              <CheckCircle2 className="w-10 h-10" />
            ) : (
              <XCircle className="w-10 h-10" />
            )}
          </div>

          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-1.5 ${
              isSuccess
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'bg-red-500/20 text-red-300 border border-red-500/30'
            }`}
          >
            {isSuccess ? <Sparkles className="w-3.5 h-3.5" /> : <Zap className="w-3.5 h-3.5" />}
            <span>{isSuccess ? 'Quest Completed!' : 'Quest Incomplete'}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white">
            {isSuccess ? 'Exceptional Work, Adventurer!' : 'Let’s Debug This Quest'}
          </h2>
        </div>

        {/* XP Bounty Card (if passed) */}
        {isSuccess && xpBreakdown && (
          <div className="bg-game-card/90 border border-game-border rounded-2xl p-4 mb-5">
            <div className="flex items-center justify-between mb-2 pb-2 border-b border-game-border">
              <span className="text-xs font-bold uppercase tracking-wider text-game-gold flex items-center gap-1">
                <Award className="w-4 h-4" />
                <span>XP Rewards Breakdown</span>
              </span>
              <span className="text-lg font-black text-game-gold font-mono">
                +{xpBreakdown.totalEarned} XP
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex justify-between text-game-textMuted">
                <span>Base Quest:</span>
                <span className="font-mono text-white">+{xpBreakdown.baseXP} XP</span>
              </div>
              <div className="flex justify-between text-game-textMuted">
                <span>Zero Hints Bonus:</span>
                <span className="font-mono text-white">+{xpBreakdown.noHintsBonus} XP</span>
              </div>
              <div className="flex justify-between text-game-textMuted">
                <span>Edge Cases Passed:</span>
                <span className="font-mono text-white">+{xpBreakdown.edgeCasesBonus} XP</span>
              </div>
              <div className="flex justify-between text-game-textMuted">
                <span>Clean Python Code:</span>
                <span className="font-mono text-white">+{xpBreakdown.cleanCodeBonus} XP</span>
              </div>
            </div>
            {!xpBreakdown.isFirstCompletion && (
              <div className="text-[11px] text-game-cyan mt-2 italic text-center">
                (Practice Mode: No duplicate XP awarded)
              </div>
            )}
          </div>
        )}

        {/* Expected vs Actual Diff */}
        <div className="bg-game-bg/90 border border-game-border rounded-2xl p-3.5 mb-4 text-xs font-mono">
          <div className="text-[11px] font-bold text-game-textSubtle uppercase tracking-wider mb-1.5 font-sans">
            Output Evaluation
          </div>
          <div className="space-y-1">
            <div>
              <span className="text-game-textSubtle">Expected: </span>
              <span className="text-game-cyan font-bold">
                {report.expectedVsActual.expected || '(None)'}
              </span>
            </div>
            <div>
              <span className="text-game-textSubtle">Actual:   </span>
              <span className={isSuccess ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                {report.expectedVsActual.actual || '(No output produced)'}
              </span>
            </div>
          </div>
        </div>

        {/* What Went Well */}
        {report.whatWentWell.length > 0 && (
          <div className="mb-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>What You Did Correctly</span>
            </h4>
            <ul className="space-y-1 text-xs text-game-textMuted pl-1">
              {report.whatWentWell.map((w, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-emerald-400">✓</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Mistakes & Issues */}
        {report.mistakes.length > 0 && (
          <div className="mb-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-red-400 mb-2 flex items-center gap-1.5">
              <XCircle className="w-3.5 h-3.5" />
              <span>Mistakes & Corrections</span>
            </h4>
            <ul className="space-y-1 text-xs text-game-textMuted pl-1">
              {report.mistakes.map((m, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-red-400">✕</span>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Cleaner Approach Suggestion */}
        {report.cleanerApproach && (
          <div className="bg-game-card/70 border border-game-border rounded-2xl p-3 mb-5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-game-cyan mb-1">
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Cleaner Pythonic Suggestion</span>
            </div>
            <p className="text-xs text-game-textMuted font-mono">
              {report.cleanerApproach}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          {isSuccess ? (
            <Button
              variant="primary"
              size="lg"
              fullWidth
              glow
              onClick={onContinue}
              icon={<ArrowRight className="w-5 h-5" />}
            >
              Continue to Next Quest
            </Button>
          ) : (
            <>
              <Button
                variant="secondary"
                size="lg"
                fullWidth
                onClick={onRetry}
                icon={<RotateCcw className="w-4 h-4" />}
              >
                Back to Code
              </Button>
              <Button
                variant="outline"
                size="lg"
                fullWidth
                onClick={onRetry}
              >
                Inspect Hints
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
