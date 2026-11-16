import { Challenge, TopicId, DifficultyLevel, TestCase } from '../../types/challenge';

export interface ChallengeDef {
  num: number;
  id: string;
  topicId: TopicId;
  difficulty: DifficultyLevel;
  starterCode: string;
  en: {
    title: string;
    objective: string;
    problem: string;
    clue: string;
    logic: string;
    pseudocode: string;
    solution: string;
  };
  hi: {
    title: string;
    objective: string;
    problem: string;
    clue: string;
    logic: string;
    pseudocode: string;
    solution: string;
  };
  hinglish: {
    title: string;
    objective: string;
    problem: string;
    clue: string;
    logic: string;
    pseudocode: string;
    solution: string;
  };
  testCases: TestCase[];
}

export function buildChallenge(def: ChallengeDef): Challenge {
  return {
    id: def.id,
    topicId: def.topicId,
    difficulty: def.difficulty,
    order: def.num,
    starterCode: def.starterCode,
    translations: {
      en: {
        title: def.en.title,
        objective: def.en.objective,
        problemStatement: def.en.problem,
        sampleOutput: def.testCases[0]?.expectedOutput || '',
        hints: {
          clue: def.en.clue,
          logic: def.en.logic,
          pseudocode: def.en.pseudocode,
          solution: def.en.solution,
        },
      },
      hi: {
        title: def.hi.title,
        objective: def.hi.objective,
        problemStatement: def.hi.problem,
        sampleOutput: def.testCases[0]?.expectedOutput || '',
        hints: {
          clue: def.hi.clue,
          logic: def.hi.logic,
          pseudocode: def.hi.pseudocode,
          solution: def.hi.solution,
        },
      },
      hinglish: {
        title: def.hinglish.title,
        objective: def.hinglish.objective,
        problemStatement: def.hinglish.problem,
        sampleOutput: def.testCases[0]?.expectedOutput || '',
        hints: {
          clue: def.hinglish.clue,
          logic: def.hinglish.logic,
          pseudocode: def.hinglish.pseudocode,
          solution: def.hinglish.solution,
        },
      },
    },
    testCases: def.testCases,
  };
}
