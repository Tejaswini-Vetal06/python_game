export type TopicId =
  | 'variables'
  | 'operators'
  | 'user-input'
  | 'strings'
  | 'conditionals'
  | 'loops'
  | 'functions'
  | 'lists'
  | 'tuples'
  | 'dictionaries'
  | 'sets'
  | 'file-handling'
  | 'exceptions'
  | 'modules';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export type LanguageCode = 'en' | 'hi' | 'hinglish';

export interface TestCase {
  id: string;
  input?: string;          // stdin input or mock input
  expectedOutput: string;  // expected stdout or returned value
  isSecret?: boolean;      // hidden test case for edge testing
  description?: string;
}

export interface ChallengeHints {
  clue: string;            // Hint 1: Small nudge
  logic: string;           // Hint 2: Logical explanation
  pseudocode: string;      // Hint 3: Step-by-step pseudocode
  solution: string;        // Final Hint: Full solution & explanation
}

export interface LocalizedContent {
  title: string;
  objective: string;
  problemStatement: string;
  sampleInput?: string;
  sampleOutput?: string;
  hints: ChallengeHints;
}

export interface ChallengeStaticRules {
  requiredConstructs?: string[];   // e.g. ["for", "in"]
  forbiddenConstructs?: string[];  // e.g. ["eval", "exec"]
  maxLines?: number;
  expectedVariables?: string[];
}

export interface Challenge {
  id: string;
  topicId: TopicId;
  difficulty: DifficultyLevel;
  order: number;
  starterCode: string;
  translations: {
    en: LocalizedContent;
    hi: LocalizedContent;
    hinglish: LocalizedContent;
  };
  testCases: TestCase[];
  staticRules?: ChallengeStaticRules;
  edgeCasesDescription?: string;
}

export interface TopicVideoMeta {
  youtubeId: string;
  durationMinutes: number;
  instructor: string;
  keyTimestamps: { title: string; timeSec: number }[];
  summaryNotes: string[];
}

export interface TopicMeta {
  id: TopicId;
  order: number;
  levelRequired: number; // 1 to 14
  icon: string;
  titles: {
    en: string;
    hi: string;
    hinglish: string;
  };
  descriptions: {
    en: string;
    hi: string;
    hinglish: string;
  };
  video?: TopicVideoMeta;
}
