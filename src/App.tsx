import React, { useState, useEffect } from 'react';
import { useUser } from './context/UserContext';
import { useGame } from './context/GameContext';
import { Header } from './components/navigation/Header';
import { MobileNav } from './components/navigation/MobileNav';
import { DesktopSidebar } from './components/navigation/DesktopSidebar';
import { LevelUpModal } from './components/common/LevelUpModal';
import { pythonController } from './services/pythonController';

// Views
import { SplashScreen } from './views/SplashScreen';
import { OnboardingScreen } from './views/OnboardingScreen';
import { DashboardScreen } from './views/DashboardScreen';
import { TopicSelectScreen } from './views/TopicSelectScreen';
import { DifficultySelectScreen } from './views/DifficultySelectScreen';
import { ChallengeScreen } from './views/ChallengeScreen';
import { AchievementsScreen } from './views/AchievementsScreen';
import { ProgressScreen } from './views/ProgressScreen';
import { ProfileScreen } from './views/ProfileScreen';
import { SettingsScreen } from './views/SettingsScreen';
import { TopicId } from './types/challenge';

export const App: React.FC = () => {
  const { profile, setTopic } = useUser();
  const { levelUpModal, closeLevelUpModal } = useGame();

  // Screen state machine
  const [currentScreen, setCurrentScreen] = useState<string>(() => {
    return profile.onboardingCompleted ? 'dashboard' : 'splash';
  });

  // PWA Install prompt state
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // Pre-warm Pyodide runtime in background
    pythonController.prewarm();

    // Catch PWA beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallPWA = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  const handleStartFromSplash = () => {
    if (profile.onboardingCompleted) {
      setCurrentScreen('dashboard');
    } else {
      setCurrentScreen('onboarding');
    }
  };

  const handleCompleteOnboarding = () => {
    setCurrentScreen('dashboard');
  };

  const handleStartTopic = (topicId: string) => {
    setTopic(topicId as TopicId);
    setCurrentScreen('challenge');
  };

  // Fullscreen standalone views (Splash & Onboarding)
  if (currentScreen === 'splash') {
    return <SplashScreen onStart={handleStartFromSplash} />;
  }

  if (currentScreen === 'onboarding') {
    return <OnboardingScreen onComplete={handleCompleteOnboarding} />;
  }

  return (
    <div className="min-h-screen bg-game-bg text-game-text flex flex-col md:flex-row antialiased selection:bg-game-purple selection:text-white">
      {/* Desktop Sidebar (>= 768px) */}
      <DesktopSidebar
        currentScreen={currentScreen}
        onSelectScreen={setCurrentScreen}
        deferredPrompt={deferredPrompt}
        onInstallPWA={handleInstallPWA}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Top Header */}
        <Header
          onOpenProfile={() => setCurrentScreen('profile')}
          onOpenSettings={() => setCurrentScreen('settings')}
          onSelectScreen={setCurrentScreen}
        />

        {/* Dynamic View Canvas */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {currentScreen === 'dashboard' && (
            <DashboardScreen
              onNavigate={setCurrentScreen}
              onSelectTopic={handleStartTopic}
            />
          )}

          {currentScreen === 'topics' && (
            <TopicSelectScreen onStartTopic={handleStartTopic} />
          )}

          {currentScreen === 'difficulty' && (
            <DifficultySelectScreen
              onBack={() => setCurrentScreen('dashboard')}
            />
          )}

          {currentScreen === 'challenge' && (
            <ChallengeScreen
              onBackToDashboard={() => setCurrentScreen('dashboard')}
              onNavigateToTopics={() => setCurrentScreen('topics')}
            />
          )}

          {currentScreen === 'badges' && <AchievementsScreen />}

          {currentScreen === 'progress' && <ProgressScreen />}

          {currentScreen === 'profile' && <ProfileScreen />}

          {currentScreen === 'settings' && (
            <SettingsScreen
              onNavigateToDifficulty={() => setCurrentScreen('difficulty')}
              deferredPrompt={deferredPrompt}
              onInstallPWA={handleInstallPWA}
            />
          )}
        </main>

        {/* Mobile Floating Bottom Nav (< 768px) */}
        <MobileNav
          currentScreen={currentScreen}
          onSelectScreen={setCurrentScreen}
        />
      </div>

      {/* Level-Up Celebration Modal */}
      {levelUpModal && (
        <LevelUpModal
          oldLevel={levelUpModal.oldLevel}
          newLevel={levelUpModal.newLevel}
          onClose={closeLevelUpModal}
        />
      )}
    </div>
  );
};

export default App;
