import React, { useRef, useEffect } from 'react';
import { useUser } from '../../context/UserContext';

interface MobileCodeEditorProps {
  value: string;
  onChange: (newValue: string) => void;
  onRunShortcut?: () => void;
  editorRef?: React.RefObject<HTMLTextAreaElement | null>;
}

export const MobileCodeEditor: React.FC<MobileCodeEditorProps> = ({
  value,
  onChange,
  onRunShortcut,
  editorRef: externalRef,
}) => {
  const { profile } = useUser();
  const internalRef = useRef<HTMLTextAreaElement>(null);
  const textareaRef = externalRef || internalRef;
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  const lines = value.split('\n');
  const lineCount = Math.max(lines.length, 1);

  // Sync scroll between textarea and line numbers gutter
  const handleScroll = () => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Ctrl+Enter or Cmd+Enter to Run
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      onRunShortcut?.();
      return;
    }

    // Intercept Tab to insert 4 spaces
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;

      const newValue = value.substring(0, start) + '    ' + value.substring(end);
      onChange(newValue);

      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 4;
      }, 0);
      return;
    }

    // Auto-indent on Enter if previous line ends with ':'
    if (e.key === 'Enter') {
      const target = e.currentTarget;
      const start = target.selectionStart;
      const currentLine = value.substring(0, start).split('\n').pop() || '';
      const matchIndent = currentLine.match(/^\s*/);
      const currentIndent = matchIndent ? matchIndent[0] : '';
      const extraIndent = currentLine.trim().endsWith(':') ? '    ' : '';

      if (currentIndent || extraIndent) {
        e.preventDefault();
        const indentToAdd = '\n' + currentIndent + extraIndent;
        const newValue = value.substring(0, start) + indentToAdd + value.substring(start);
        onChange(newValue);

        setTimeout(() => {
          target.selectionStart = target.selectionEnd = start + indentToAdd.length;
        }, 0);
      }
    }
  };

  return (
    <div className="relative flex w-full h-64 sm:h-80 md:h-96 rounded-2xl bg-game-bg border border-game-border focus-within:border-game-purple focus-within:shadow-glow-purple overflow-hidden transition-all">
      {/* Line Numbers Gutter */}
      <div
        ref={lineNumbersRef}
        aria-hidden="true"
        className="w-10 sm:w-12 shrink-0 py-3 bg-game-surface/70 border-r border-game-border text-game-textSubtle font-mono text-right pr-2 sm:pr-3 select-none overflow-hidden"
        style={{ fontSize: `${profile.fontSize}px`, lineHeight: '1.5rem' }}
      >
        {Array.from({ length: lineCount }).map((_, i) => (
          <div key={i} className="leading-6">
            {i + 1}
          </div>
        ))}
      </div>

      {/* Code Textarea */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onScroll={handleScroll}
        spellCheck={false}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect="off"
        className="flex-1 w-full h-full p-3 bg-transparent text-game-text font-mono resize-none focus:outline-none overflow-y-auto leading-6 selection:bg-game-purple/50"
        style={{
          fontSize: `${profile.fontSize}px`,
          lineHeight: '1.5rem',
          tabSize: 4,
        }}
        placeholder="# Write your Python code here...&#10;print('Hello, Python Quest!')"
      />
    </div>
  );
};
