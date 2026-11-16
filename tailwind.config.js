/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        game: {
          bg: '#0a0e1a',
          surface: '#121829',
          card: '#161e33',
          cardHover: '#1c2642',
          border: '#253252',
          borderGlow: '#3a4d7c',
          text: '#f8fafc',
          textMuted: '#94a3b8',
          textSubtle: '#64748b',
          purple: '#8b5cf6',
          purpleLight: '#a855f7',
          purpleDark: '#6d28d9',
          neonBlue: '#3b82f6',
          neonBlueLight: '#60a5fa',
          cyan: '#06b6d4',
          cyanGlow: '#22d3ee',
          green: '#10b981',
          greenLight: '#34d399',
          red: '#ef4444',
          redLight: '#f87171',
          gold: '#f59e0b',
          goldLight: '#fbbf24',
        }
      },
      boxShadow: {
        'glow-purple': '0 0 20px rgba(139, 92, 246, 0.45)',
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.45)',
        'glow-cyan': '0 0 20px rgba(6, 182, 212, 0.5)',
        'glow-green': '0 0 20px rgba(16, 185, 129, 0.45)',
        'glow-gold': '0 0 20px rgba(245, 158, 11, 0.45)',
        'glow-red': '0 0 20px rgba(239, 68, 68, 0.45)',
      },
      fontFamily: {
        mono: ['Fira Code', 'JetBrains Mono', 'Consolas', 'Courier New', 'monospace'],
        game: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.5s infinite ease-in-out',
        'float': 'float 3s ease-in-out infinite',
        'level-up': 'levelUp 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'xp-pop': 'xpPop 0.8s ease-out forwards',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(139, 92, 246, 0.3)' },
          '50%': { boxShadow: '0 0 25px rgba(6, 182, 212, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        levelUp: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '70%': { transform: 'scale(1.08)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        xpPop: {
          '0%': { transform: 'translateY(0) scale(0.9)', opacity: '0' },
          '30%': { transform: 'translateY(-12px) scale(1.15)', opacity: '1' },
          '100%': { transform: 'translateY(-24px) scale(1)', opacity: '0' },
        }
      }
    },
  },
  plugins: [],
}
