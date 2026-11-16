import { LanguageCode } from '../types/challenge';

export interface UIStrings {
  appName: string;
  tagline: string;
  startQuest: string;
  continueQuest: string;
  dashboard: string;
  quests: string;
  editor: string;
  achievements: string;
  profile: string;
  settings: string;
  level: string;
  xp: string;
  streak: string;
  dailyStreak: string;
  nextLevel: string;
  weeklyActivity: string;
  completedQuests: string;
  topicProgress: string;
  currentTopic: string;
  nextChallenge: string;
  beginner: string;
  intermediate: string;
  advanced: string;
  runCode: string;
  submitChallenge: string;
  resetCode: string;
  clearConsole: string;
  hints: string;
  needAHint: string;
  hintWarning: string;
  revealHint: string;
  outputConsole: string;
  evaluatingCode: string;
  challengeSuccess: string;
  challengeError: string;
  expectedOutput: string;
  actualOutput: string;
  whatWentWell: string;
  needsImprovement: string;
  cleanerApproach: string;
  continueToNext: string;
  retryChallenge: string;
  lockedTopic: string;
  practiceMode: string;
  soundEffects: string;
  hapticFeedback: string;
  fontSize: string;
  resetProgress: string;
  resetConfirm: string;
  installApp: string;
  installed: string;
  languageSelect: string;
  difficultySelect: string;
}

export const TRANSLATIONS: Record<LanguageCode, UIStrings> = {
  en: {
    appName: 'Python Quest',
    tagline: 'Master Python through interactive gaming quests',
    startQuest: 'Begin Your Quest',
    continueQuest: 'Resume Quest',
    dashboard: 'Dashboard',
    quests: 'Topics',
    editor: 'Code Lab',
    achievements: 'Badges',
    profile: 'Profile',
    settings: 'Settings',
    level: 'Level',
    xp: 'XP',
    streak: 'Day Streak',
    dailyStreak: 'Daily Streak',
    nextLevel: 'Next Milestone',
    weeklyActivity: 'Weekly Activity',
    completedQuests: 'Quests Completed',
    topicProgress: 'Topic Progress',
    currentTopic: 'Current Chapter',
    nextChallenge: 'Next Challenge',
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
    runCode: 'Run Code',
    submitChallenge: 'Submit Quest',
    resetCode: 'Reset Code',
    clearConsole: 'Clear Output',
    hints: 'Progressive Hints',
    needAHint: 'Need a hint?',
    hintWarning: 'Using hints reduces your bonus XP for this quest.',
    revealHint: 'Reveal Hint',
    outputConsole: 'Execution Terminal',
    evaluatingCode: 'Executing Python Code...',
    challengeSuccess: 'Quest Completed!',
    challengeError: 'Quest Incomplete',
    expectedOutput: 'Expected Output',
    actualOutput: 'Your Output',
    whatWentWell: 'What Went Well',
    needsImprovement: 'Mistakes & Suggestions',
    cleanerApproach: 'Cleaner Python Approach',
    continueToNext: 'Next Quest',
    retryChallenge: 'Try Again',
    lockedTopic: 'Locked Topic',
    practiceMode: 'Practice Mode',
    soundEffects: 'Sound Effects',
    hapticFeedback: 'Haptic Feedback',
    fontSize: 'Editor Font Size',
    resetProgress: 'Reset All Progress',
    resetConfirm: 'Are you sure you want to reset all your progress and XP? This cannot be undone.',
    installApp: 'Install Python Quest PWA',
    installed: 'App Installed',
    languageSelect: 'Choose Language',
    difficultySelect: 'Choose Difficulty',
  },
  hi: {
    appName: 'पायथन क्वेस्ट',
    tagline: 'गेमिंग क्वेस्ट के साथ पायथन को आसानी से सीखें',
    startQuest: 'क्वेस्ट शुरू करें',
    continueQuest: 'आगे बढ़ें',
    dashboard: 'डैशबोर्ड',
    quests: 'विषय',
    editor: 'कोड लैब',
    achievements: 'बैज',
    profile: 'प्रोफ़ाइल',
    settings: 'सेटिंग्स',
    level: 'लेवल',
    xp: 'XP',
    streak: 'दैनिक स्ट्रीक',
    dailyStreak: 'दैनिक स्ट्रीक',
    nextLevel: 'अगला स्तर',
    weeklyActivity: 'साप्ताहिक गतिविधि',
    completedQuests: 'पूर्ण की गई चुनौतियाँ',
    topicProgress: 'अध्याय प्रगति',
    currentTopic: 'वर्तमान अध्याय',
    nextChallenge: 'अगली चुनौती',
    beginner: 'शुरुआती (Beginner)',
    intermediate: 'मध्यम (Intermediate)',
    advanced: 'उन्नत (Advanced)',
    runCode: 'कोड चलाएं',
    submitChallenge: 'जमा करें',
    resetCode: 'रीसेट करें',
    clearConsole: 'कंसोल साफ़ करें',
    hints: 'प्रगतिशील संकेत (Hints)',
    needAHint: 'मदद चाहिए?',
    hintWarning: 'संकेत देखने पर बोनस XP कम हो सकता है।',
    revealHint: 'संकेत देखें',
    outputConsole: 'आउटपुट टर्मिनल',
    evaluatingCode: 'पायथन कोड चल रहा है...',
    challengeSuccess: 'शानदार! क्वेस्ट पूरा हुआ!',
    challengeError: 'परिणाम मेल नहीं खाया',
    expectedOutput: 'अपेक्षित आउटपुट',
    actualOutput: 'आपका आउटपुट',
    whatWentWell: 'आपने क्या सही किया',
    needsImprovement: 'सुझाव और सुधार',
    cleanerApproach: 'बेहतर पायथन तरीका',
    continueToNext: 'अगला क्वेस्ट',
    retryChallenge: 'पुनः प्रयास करें',
    lockedTopic: 'यह विषय लॉक है',
    practiceMode: 'अभ्यास मोड',
    soundEffects: 'ध्वनि प्रभाव',
    hapticFeedback: 'हैप्टिक कंपन',
    fontSize: 'फ़ॉन्ट आकार',
    resetProgress: 'सारा डेटा रीसेट करें',
    resetConfirm: 'क्या आप वाकई अपना सारा XP और प्रगति मिटाना चाहते हैं? यह वापस नहीं लाया जा सकता।',
    installApp: 'ऐप इंस्टॉल करें',
    installed: 'इंस्टॉल हो चुका है',
    languageSelect: 'भाषा चुनें',
    difficultySelect: 'कठिनाई चुनें',
  },
  hinglish: {
    appName: 'Python Quest',
    tagline: 'Interactive gaming quests se Python master karo',
    startQuest: 'Quest Start Karo',
    continueQuest: 'Quest Resume Karo',
    dashboard: 'Dashboard',
    quests: 'Topics',
    editor: 'Code Lab',
    achievements: 'Badges',
    profile: 'Profile',
    settings: 'Settings',
    level: 'Level',
    xp: 'XP',
    streak: 'Day Streak',
    dailyStreak: 'Daily Streak',
    nextLevel: 'Next Milestone',
    weeklyActivity: 'Weekly Learning Activity',
    completedQuests: 'Completed Challenges',
    topicProgress: 'Topic Progress',
    currentTopic: 'Current Topic',
    nextChallenge: 'Next Challenge',
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
    runCode: 'Run Code',
    submitChallenge: 'Submit Code',
    resetCode: 'Reset Code',
    clearConsole: 'Clear Console',
    hints: 'Progressive Hints',
    needAHint: 'Hint chahiye?',
    hintWarning: 'Hint dekhne se bonus XP kam ho jayega.',
    revealHint: 'Hint Unlock Karo',
    outputConsole: 'Execution Terminal',
    evaluatingCode: 'Code execute ho raha hai...',
    challengeSuccess: 'Badhiya! Quest Complete!',
    challengeError: 'Output match nahi hua',
    expectedOutput: 'Expected Output',
    actualOutput: 'Aapka Output',
    whatWentWell: 'Aapne kya sahi kiya',
    needsImprovement: 'Mistakes & Improvements',
    cleanerApproach: 'Cleaner Pythonic Way',
    continueToNext: 'Next Quest Pe Chalo',
    retryChallenge: 'Dobara Try Karo',
    lockedTopic: 'Locked Topic',
    practiceMode: 'Practice Mode',
    soundEffects: 'Sound Effects',
    hapticFeedback: 'Haptics Vibrate',
    fontSize: 'Editor Font Size',
    resetProgress: 'Reset All Progress',
    resetConfirm: 'Kya aap sure ho? Sara XP aur completed challenges delete ho jayenge.',
    installApp: 'Python Quest App Install Karo',
    installed: 'App Installed Hai',
    languageSelect: 'Language Select Karo',
    difficultySelect: 'Difficulty Select Karo',
  },
};
