import { TestCase } from './challenge';

export type PyodideStatus = 'idle' | 'loading' | 'ready' | 'running' | 'error';

export interface PyodideWorkerRequest {
  type: 'INIT' | 'RUN_CODE' | 'RUN_TESTS';
  id: string;
  code?: string;
  testCases?: TestCase[];
  timeoutMs?: number;
}

export interface PyodideWorkerResponse {
  type: 'INIT_SUCCESS' | 'INIT_ERROR' | 'RUN_COMPLETE' | 'TESTS_COMPLETE' | 'ERROR' | 'TIMEOUT';
  id: string;
  stdout?: string;
  stderr?: string;
  error?: string;
  testResults?: TestResult[];
  executionTimeMs?: number;
}

export interface TestResult {
  testCaseId: string;
  passed: boolean;
  input?: string;
  expectedOutput: string;
  actualOutput: string;
  error?: string;
  executionTimeMs: number;
}

export interface HeuristicAnalysis {
  isPep8Compliant: boolean;
  namingScore: number; // 0 to 100
  namingIssues: string[];
  readabilityScore: number; // 0 to 100
  readabilityIssues: string[];
  efficiencyScore: number; // 0 to 100
  efficiencyIssues: string[];
  edgeCasesHandled: boolean;
  edgeCaseIssues: string[];
  suggestions: string[];
  cleanerApproachSnippet?: string;
}

export interface CodeReviewReport {
  isPassed: boolean;
  score: number; // 0 to 100
  stdout: string;
  stderr: string;
  testResults: TestResult[];
  whatWentWell: string[];
  mistakes: string[];
  expectedVsActual: {
    expected: string;
    actual: string;
  };
  heuristics: HeuristicAnalysis;
  cleanerApproach?: string;
}
