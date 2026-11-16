import React from 'react';
import { Button } from '../common/Button';
import { Play, RotateCcw, Trash2, Loader2, Sparkles } from 'lucide-react';

interface EditorToolbarProps {
  onRun: () => void;
  onSubmit: () => void;
  onReset: () => void;
  onClear: () => void;
  onInsertText: (text: string) => void;
  isRunning: boolean;
  canSubmit?: boolean;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
  onRun,
  onSubmit,
  onReset,
  onClear,
  onInsertText,
  isRunning,
  canSubmit = true,
}) => {
  const quickKeys = [
    { label: 'Tab', value: '    ' },
    { label: ':', value: ':' },
    { label: '()', value: '()' },
    { label: '""', value: '""' },
    { label: "''", value: "''" },
    { label: '[]', value: '[]' },
    { label: '{}', value: '{}' },
    { label: '#', value: '# ' },
    { label: '=', value: ' = ' },
    { label: '_', value: '_' },
    { label: 'print()', value: 'print()' },
  ];

  return (
    <div className="space-y-2">
      {/* Mobile Quick Keys Scrollbar */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-1 px-1 bg-game-card/60 border border-game-border rounded-xl scrollbar-none select-none">
        <span className="text-[10px] text-game-textSubtle uppercase font-mono px-1.5 shrink-0">
          Keys:
        </span>
        {quickKeys.map((k) => (
          <button
            key={k.label}
            onClick={() => onInsertText(k.value)}
            className="px-2.5 py-1 bg-game-surface hover:bg-game-cardHover border border-game-border rounded-lg text-xs font-mono font-semibold text-game-cyan hover:text-white shrink-0 active:scale-95 transition-all"
          >
            {k.label}
          </button>
        ))}
      </div>

      {/* Primary Action Buttons */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {/* Run Code */}
          <Button
            variant="outline"
            size="sm"
            onClick={onRun}
            disabled={isRunning}
            icon={
              isRunning ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Play className="w-4 h-4 fill-current" />
              )
            }
          >
            {isRunning ? 'Running...' : 'Run Code'}
          </Button>

          {/* Submit Quest */}
          {canSubmit && (
            <Button
              variant="primary"
              size="sm"
              glow
              onClick={onSubmit}
              disabled={isRunning}
              icon={<Sparkles className="w-4 h-4" />}
            >
              Submit Quest
            </Button>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          {/* Reset Code */}
          <button
            onClick={onReset}
            title="Reset to Starter Code"
            className="p-2 text-game-textMuted hover:text-white rounded-xl bg-game-card hover:bg-game-cardHover border border-game-border transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Clear Console */}
          <button
            onClick={onClear}
            title="Clear Output Console"
            className="p-2 text-game-textMuted hover:text-white rounded-xl bg-game-card hover:bg-game-cardHover border border-game-border transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
