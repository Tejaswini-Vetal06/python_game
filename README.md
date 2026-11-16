# python_mobile_game
# 🐍 Python Quest — Gamified Python Learning PWA

> **Master Python programming through interactive gaming quests, in-browser WebAssembly execution, and gamification.**

Python Quest is a production-ready, mobile-first Progressive Web App (PWA) engineered with React 19, TypeScript, Vite, and Tailwind CSS. It runs real CPython WebAssembly code directly in the client's browser using Pyodide inside dedicated Web Workers with a watchdog supervisor.

---

## 🎮 Key Features

- **In-Browser CPython Execution**: Powered by Pyodide (WebAssembly). Zero server dependencies, 100% private, and completely free to run.
- **Infinite Loop Watchdog Protection**: Dedicated Web Worker with a 10-second timeout automatically terminates and recycles workers if an infinite loop (`while True`) is encountered, keeping the UI at 60 FPS.
- **14 Sequential Curriculum Chapters**:
  1. Variables & Data Types
  2. Operators
  3. User Input
  4. Strings
  5. Conditional Statements
  6. Loops
  7. Functions
  8. Lists
  9. Tuples
  10. Dictionaries
  11. Sets
  12. File Handling (Virtual file system)
  13. Exception Handling
  14. Modules
- **420 Crafted Challenges**: 10 Beginner, 10 Intermediate, and 10 Advanced challenges per chapter.
- **Multi-Language Support**: Complete explanations, problem statements, and progressive hints in **English**, **Hindi (हिन्दी)**, and **Hinglish**.
- **Progressive Hint Engine**: 4-Tier hints (Clue $\rightarrow$ Logic $\rightarrow$ Pseudocode $\rightarrow$ Full Solution & Explanation) with bonus XP incentives for zero-hint solutions.
- **Deterministic Code Review Engine**: Evaluates correctness against public and hidden edge test cases, checks variable naming conventions (`snake_case`), inspects PEP 8 readability, flags anti-patterns, and provides idiomatic Python recommendations.
- **Gaming Economy & Gamification**:
  - **XP Breakdown**: `+50 XP` Base, `+20 XP` No Hints Bonus, `+15 XP` Edge Cases Bonus, `+15 XP` Clean Code Bonus.
  - **8 Progressive Ranks**: Python Beginner to Python Master.
  - **8 Earnable Badges**: First Program, First String Creator, Debug Detective, Loop Master, Function Ninja, List Explorer, Dictionary Wizard, Problem Solver.
  - **Daily Streaks**: Automatic tracking of consecutive practice days.
  - **Anti-Duplication**: Prevents duplicate XP exploits while supporting unlimited Practice Mode on completed challenges.
- **Mobile-First Arcade UI**:
  - Dark Navy (`#0a0e1a`), Electric Purple (`#8b5cf6`), Neon Blue (`#3b82f6`), and Cyan Glow (`#06b6d4`).
  - Mobile bottom navigation bar + Desktop gaming sidebar.
  - Mobile code editor with line numbers, indentation toolbar (`Tab`, `:`, `()`, `""`, `[]`, `{}`), and real-time terminal output.
  - Web Audio API synthesized tactile blips, victory fanfares, and level-up chimes.
- **Progressive Web App (PWA)**: Installable on Android, iOS, Windows, macOS, and Linux with offline app shell caching via Service Worker.

---

## 🚀 1. Running Locally on Your Computer

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation & Launch
```bash
# Navigate to the project directory
cd d:/project_aiml/AI/python_game

# Install dependencies (already installed)
npm install

# Start Vite development server
npm run dev
```

Open your browser to `http://localhost:5173`.

---

## 📱 2. Testing in a Mobile Browser

### Option A: Chrome DevTools Device Mode (Desktop)
1. Open `http://localhost:5173` in Google Chrome.
2. Press `F12` or `Ctrl + Shift + I` (`Cmd + Option + I` on Mac).
3. Click the **Toggle Device Toolbar** icon (or press `Ctrl + Shift + M`).
4. Select **Pixel 7**, **Samsung Galaxy S20**, or **iPhone 14** from the top device dropdown.

### Option B: On a Real Android Device on Local Wi-Fi
1. Start the Vite server exposed to the local network:
   ```bash
   npm run dev -- --host
   ```
2. Terminal will display your Network IP (e.g., `http://192.168.1.15:5173`).
3. Open that URL on your phone's Chrome browser connected to the same Wi-Fi.

---

## 📲 3. Installing on Your Android Phone

1. Open the app URL in **Google Chrome** on your Android phone.
2. Tap the **Install App** button on the Dashboard or Settings screen (or tap Chrome's three-dot menu $\rightarrow$ **Install app** / **Add to Home screen**).
3. Tap **Install**.
4. The **Python Quest** icon will appear on your phone's home screen and app drawer.
5. Launches in full-screen **standalone** mode without the browser address bar, exactly like a native app.
6. The Service Worker caches the application shell for offline access.

---

## 🧪 4. Running Automated Tests

Run the comprehensive test suite verifying level progression, XP calculations, streak logic, review heuristics, and curriculum integrity:
```bash
npm test
```

To run a production build:
```bash
npm run build
```

---

## 🐙 5. Pushing to GitHub

```bash
# 1. Initialize git repository (if not already initialized)
git init

# 2. Add all files
git add .

# 3. Commit your changes
git commit -m "Initial commit: Python Quest Gamified Learning PWA"

# 4. Set main branch
git branch -M main

# 5. Add your GitHub remote repository (replace with your repo URL)
git remote add origin https://github.com/<your-username>/python-quest.git

# 6. Push to GitHub
git push -u origin main
```

---

## ☁️ 6. Deploying Publicly on Vercel

### Deploy with Vercel CLI
```bash
# Install Vercel CLI globally (if needed)
npm install -g vercel

# Deploy directly
vercel
```

### Deploy via Vercel Web Dashboard (Recommended)
1. Push your code to GitHub (see Section 5 above).
2. Go to [vercel.com](https://vercel.com) and log in.
3. Click **Add New...** $\rightarrow$ **Project**.
4. Import your `python-quest` repository.
5. Framework Preset will automatically detect **Vite**.
6. Click **Deploy**.
7. In ~30 seconds, your Python Quest PWA will be live with a free SSL certificate (e.g., `https://python-quest.vercel.app`).

---

## 🛡️ License

MIT License. Designed and built with Google Antigravity.
