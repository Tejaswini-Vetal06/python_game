import React, { useState } from 'react';
import { TestResult } from '../../types/pyodide';
import { Terminal, CheckCircle2, XCircle, Clock, Trash2 } from 'lucide-react';

interface OutputConsoleProps {
  stdout: string;
  stderr: string;
  error: string | null;
  testResults: TestResult[];
  executionTimeMs: number;
  isRunning: boolean;
  onClear: () => void;
}

export const OutputConsole: React.FC<OutputConsoleProps> = ({
  stdout,
  stderr,
  error,
  testResults,
  executionTimeMs,
  isRunning,
  onClear,
}) => {
  const [activeTab, setActiveTab] = useState<'console' | 'tests'>('console');

  const hasTests = testResults.length > 0;
  const passedTestsCount = testResults.filter((t) => t.passed).length;

  return (
    <div className="rounded-2xl bg-game-surface border border-game-border overflow-hidden">
      {/* Console Top Header & Tabs */}
      <div className="flex items-center justify-between px-3 py-2 bg-game-card/90 border-b border-game-border">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('console')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
              activeTab === 'console'
                ? 'bg-game-bg text-game-cyan border border-game-cyan/30'
                : 'text-game-textMuted hover:text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Terminal</span>
          </button>

          {hasTests && (
            <button
              onClick={() => setActiveTab('tests')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                activeTab === 'tests'
                  ? 'bg-game-bg text-game-purpleLight border border-game-purple/30'
                  : 'text-game-textMuted hover:text-white'
              }`}
            >
              <span>Test Suite</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  passedTestsCount === testResults.length
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-red-500/20 text-red-400'
                }`}
              >
                {passedTestsCount}/{testResults.length}
              </span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          {executionTimeMs > 0 && (
            <div className="flex items-center gap-1 text-[11px] font-mono text-game-textSubtle">
              <Clock className="w-3 h-3 text-game-cyan" />
              <span>{executionTimeMs}ms</span>
            </div>
          )}
          <button
            onClick={onClear}
            className="text-game-textSubtle hover:text-white text-xs p-1"
            title="Clear Console"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Output Body */}
      <div className="p-3.5 font-mono text-xs min-h-[120px] max-h-56 overflow-y-auto bg-game-bg/95">
        {isRunning ? (
          <div className="flex items-center gap-2 text-game-cyan animate-pulse">
            <span className="w-2 h-2 rounded-full bg-game-cyan animate-ping" />
            <span>Running Python code in WebAssembly sandbox...</span>
          </div>
        ) : activeTab === 'console' ? (
          <div>
            {stdout && (
              <pre className="text-game-text whitespace-pre-wrap leading-relaxed">
                {stdout}
              </pre>
            )}
            {stderr && (
              <pre className="text-amber-400 whitespace-pre-wrap leading-relaxed mt-1">
                {stderr}
              </pre>
            )}
            {error && (
              <pre className="text-red-400 whitespace-pre-wrap leading-relaxed mt-1 bg-red-950/20 border border-red-900/40 p-2 rounded-lg">
                {error}
              </pre>
            )}
            {!stdout && !stderr && !error && (
              <div className="text-game-textSubtle italic">
                Press "Run Code" or "Submit Quest" to see the output here.
              </div>
            )}
          </div>
        ) : (
          /* Test Cases Tab */
          <div className="space-y-2">
            {testResults.map((tc, idx) => (
              <div
                key={tc.testCaseId || idx}
                className={`p-2.5 rounded-xl border ${
                  tc.passed
                    ? 'border-emerald-500/30 bg-emerald-950/15'
                    : 'border-red-500/30 bg-red-950/15'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5 font-bold">
                    {tc.passed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-400" />
                    )}
                    <span className={tc.passed ? 'text-emerald-300' : 'text-red-300'}>
                      Test Case #{idx + 1}
                    </span>
                  </div>
                  <span className="text-[10px] text-game-textSubtle font-mono">
                    {tc.passed ? 'PASSED' : 'FAILED'}
                  </span>
                </div>

                {tc.input && (
                  <div className="text-[11px] text-game-textMuted">
                    <span className="text-game-textSubtle">Input: </span>
                    <span className="text-white">{tc.input}</span>
                  </div>
                )}
                <div className="text-[11px] text-game-textMuted">
                  <span className="text-game-textSubtle">Expected: </span>
                  <span className="text-game-cyan">{tc.expectedOutput}</span>
                </div>
                {!tc.passed && (
                  <div className="text-[11px] text-game-textMuted">
                    <span className="text-game-textSubtle">Actual: </span>
                    <span className="text-red-400">{tc.actualOutput || '(Empty)'}</span>
                  </div>
                )}
                {tc.error && (
                  <div className="text-[11px] text-red-400 mt-1 font-mono">
                    Error: {tc.error}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
