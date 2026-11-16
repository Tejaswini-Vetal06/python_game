import { TestCase, Challenge } from '../types/challenge';
import { TestResult, CodeReviewReport, HeuristicAnalysis } from '../types/pyodide';

export function analyzeCodeHeuristics(userCode: string, challenge: Challenge): HeuristicAnalysis {
  const lines = userCode.split('\n');
  const namingIssues: string[] = [];
  const readabilityIssues: string[] = [];
  const efficiencyIssues: string[] = [];
  const edgeCaseIssues: string[] = [];
  const suggestions: string[] = [];

  // 1. Variable Naming Checks (snake_case vs camelCase vs single letter)
  const varAssignRegex = /^\s*([a-zA-Z0-9_]+)\s*=/gm;
  let match;
  while ((match = varAssignRegex.exec(userCode)) !== null) {
    const varName = match[1];
    // Ignore internal Python variables or standard counters
    if (['i', 'j', 'k', '_', 'idx', 'val', 'k', 'v'].includes(varName)) continue;

    // Check for camelCase (e.g. myVariable, totalScore)
    if (/[a-z]+[A-Z][a-zA-Z0-9]*/.test(varName)) {
      namingIssues.push(`Variable '${varName}' uses camelCase. Python standard (PEP 8) prefers snake_case.`);
    }

    // Check for single letter non-counter names
    if (varName.length === 1 && !['i', 'j', 'x', 'y', 'n'].includes(varName)) {
      namingIssues.push(`Variable '${varName}' is single-letter. Consider using descriptive names like 'total_sum' or 'user_name'.`);
    }
  }

  // 2. Readability & Formatting Checks
  let hasLongLines = false;
  let usesTabs = false;
  for (const line of lines) {
    if (line.length > 88) hasLongLines = true;
    if (line.startsWith('\t')) usesTabs = true;
  }
  if (hasLongLines) {
    readabilityIssues.push('Some lines exceed PEP 8 standard length (79-88 characters).');
  }
  if (usesTabs) {
    readabilityIssues.push('Code uses tab indentation. PEP 8 strongly recommends 4 spaces per indentation level.');
  }

  const hasComments = lines.some((l) => l.trim().startsWith('#'));
  if (lines.length > 6 && !hasComments) {
    suggestions.push('Adding comments (#) explaining complex algorithmic steps improves code readability.');
  }

  // 3. Efficiency & Idiomatic Python Checks
  if (/range\s*\(\s*len\s*\(/.test(userCode)) {
    efficiencyIssues.push('Anti-pattern detected: `range(len(...))`. In Python, iterate directly over the collection or use `enumerate()`.');
  }
  if (/==\s*True|==\s*False/.test(userCode)) {
    efficiencyIssues.push('Comparison with boolean literals (`== True` / `== False`). Use `if condition:` or `if not condition:` instead.');
  }
  if (/\+\s*str\(|\+\s*["']\s*\+/.test(userCode)) {
    suggestions.push('Use Python 3 f-strings (e.g. `f"Hello {name}"`) instead of string concatenation with `+`.');
  }

  // 4. Edge Cases Handled Check
  if (userCode.includes('//') && !userCode.includes('ZeroDivisionError') && !userCode.includes('!= 0') && !userCode.includes('> 0')) {
    if (challenge.id.includes('division') || challenge.id.includes('operators')) {
      edgeCaseIssues.push('Ensure division by zero is safely guarded.');
    }
  }

  const namingScore = Math.max(0, 100 - namingIssues.length * 25);
  const readabilityScore = Math.max(0, 100 - readabilityIssues.length * 30);
  const efficiencyScore = Math.max(0, 100 - efficiencyIssues.length * 25);
  const isPep8Compliant = namingIssues.length === 0 && readabilityIssues.length === 0;
  const edgeCasesHandled = edgeCaseIssues.length === 0;

  return {
    isPep8Compliant,
    namingScore,
    namingIssues,
    readabilityScore,
    readabilityIssues,
    efficiencyScore,
    efficiencyIssues,
    edgeCasesHandled,
    edgeCaseIssues,
    suggestions,
  };
}

export function generateReviewReport(
  userCode: string,
  testResults: TestResult[],
  stdout: string,
  stderr: string,
  executionError: string | null,
  challenge: Challenge
): CodeReviewReport {
  const heuristics = analyzeCodeHeuristics(userCode, challenge);
  const totalTests = testResults.length;
  const passedTests = testResults.filter((t) => t.passed).length;
  const isPassed = totalTests > 0 && passedTests === totalTests && !executionError;

  const whatWentWell: string[] = [];
  const mistakes: string[] = [];

  if (isPassed) {
    whatWentWell.push('All required test cases produced exact expected outputs.');
    whatWentWell.push('Code executed successfully without runtime exceptions.');
  } else {
    if (passedTests > 0) {
      whatWentWell.push(`Passed ${passedTests} of ${totalTests} test cases successfully.`);
    }
    if (executionError) {
      mistakes.push(`Runtime/Execution error encountered: ${executionError}`);
    } else {
      const firstFailed = testResults.find((t) => !t.passed);
      if (firstFailed) {
        mistakes.push(
          `Test case output mismatch: Expected "${firstFailed.expectedOutput}" but got "${firstFailed.actualOutput || '(Empty)'}".`
        );
      }
    }
  }

  if (heuristics.namingIssues.length === 0) {
    whatWentWell.push('Follows Python snake_case variable naming conventions.');
  } else {
    mistakes.push(...heuristics.namingIssues);
  }

  if (heuristics.efficiencyIssues.length > 0) {
    mistakes.push(...heuristics.efficiencyIssues);
  }

  let expectedSample = '';
  let actualSample = '';
  const failedCase = testResults.find((t) => !t.passed);
  if (failedCase) {
    expectedSample = failedCase.expectedOutput;
    actualSample = failedCase.actualOutput;
  } else if (testResults.length > 0) {
    expectedSample = testResults[0].expectedOutput;
    actualSample = testResults[0].actualOutput;
  }

  // Calculate composite score (0-100)
  const correctnessWeight = 0.6;
  const heuristicsWeight = 0.4;
  const correctnessScore = totalTests > 0 ? (passedTests / totalTests) * 100 : isPassed ? 100 : 0;
  const heuristicScoreAverage =
    (heuristics.namingScore + heuristics.readabilityScore + heuristics.efficiencyScore) / 3;
  const totalScore = Math.round(correctnessScore * correctnessWeight + heuristicScoreAverage * heuristicsWeight);

  return {
    isPassed,
    score: totalScore,
    stdout,
    stderr,
    testResults,
    whatWentWell,
    mistakes,
    expectedVsActual: {
      expected: expectedSample,
      actual: actualSample,
    },
    heuristics,
    cleanerApproach: heuristics.suggestions.length > 0 ? heuristics.suggestions.join('\n') : undefined,
  };
}
