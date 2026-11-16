import test from 'node:test';
import assert from 'node:assert/strict';

// Test 1: Level Progression Logic
const LEVELS = [
  { levelNumber: 1, minXP: 0 },
  { levelNumber: 2, minXP: 250 },
  { levelNumber: 3, minXP: 600 },
  { levelNumber: 4, minXP: 1200 },
  { levelNumber: 5, minXP: 2000 },
  { levelNumber: 6, minXP: 3000 },
  { levelNumber: 7, minXP: 4500 },
  { levelNumber: 8, minXP: 6500 },
];

function getLevelForXP(xp) {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].minXP) return LEVELS[i];
  }
  return LEVELS[0];
}

test('Level for XP thresholds', () => {
  assert.equal(getLevelForXP(0).levelNumber, 1);
  assert.equal(getLevelForXP(150).levelNumber, 1);
  assert.equal(getLevelForXP(250).levelNumber, 2);
  assert.equal(getLevelForXP(599).levelNumber, 2);
  assert.equal(getLevelForXP(600).levelNumber, 3);
  assert.equal(getLevelForXP(1500).levelNumber, 4);
  assert.equal(getLevelForXP(3200).levelNumber, 6);
  assert.equal(getLevelForXP(7000).levelNumber, 8);
});

// Test 2: XP Calculation & Anti-Duplication
function calculateXP(isAlreadyCompleted, hintsUsed, passedEdgeCases, isCleanCode) {
  const baseXP = 50;
  const noHintsBonus = hintsUsed === 0 ? 20 : 0;
  const edgeCasesBonus = passedEdgeCases ? 15 : 0;
  const cleanCodeBonus = isCleanCode ? 15 : 0;
  const earned = baseXP + noHintsBonus + edgeCasesBonus + cleanCodeBonus;
  return isAlreadyCompleted ? 0 : earned;
}

test('XP calculation logic', () => {
  // Max possible XP on perfect zero-hint submission: 50 + 20 + 15 + 15 = 100
  assert.equal(calculateXP(false, 0, true, true), 100);

  // Submission with 1 hint used: loses 20 bonus -> 80 XP
  assert.equal(calculateXP(false, 1, true, true), 80);

  // Submission with failed edge case: loses 15 bonus -> 85 XP
  assert.equal(calculateXP(false, 0, false, true), 85);

  // Duplicate completion (practice mode): 0 XP
  assert.equal(calculateXP(true, 0, true, true), 0);
});

// Test 3: Streak calculation
function calculateNewStreak(currentStreak, longestStreak, lastActiveDate, today, yesterday) {
  if (!lastActiveDate) {
    return { newCurrentStreak: 1, newLongestStreak: Math.max(longestStreak, 1) };
  }
  if (lastActiveDate === today) {
    return { newCurrentStreak: currentStreak, newLongestStreak: longestStreak };
  }
  if (lastActiveDate === yesterday) {
    const next = currentStreak + 1;
    return { newCurrentStreak: next, newLongestStreak: Math.max(longestStreak, next) };
  }
  return { newCurrentStreak: 1, newLongestStreak: longestStreak };
}

test('Daily streak calculation', () => {
  const today = '2026-11-16';
  const yesterday = '2026-11-15';
  const threeDaysAgo = '2026-11-13';

  // First day
  const res1 = calculateNewStreak(0, 0, null, today, yesterday);
  assert.equal(res1.newCurrentStreak, 1);

  // Active again same day -> no double count
  const res2 = calculateNewStreak(1, 1, today, today, yesterday);
  assert.equal(res2.newCurrentStreak, 1);

  // Consecutive day -> increments
  const res3 = calculateNewStreak(1, 1, yesterday, today, yesterday);
  assert.equal(res3.newCurrentStreak, 2);
  assert.equal(res3.newLongestStreak, 2);

  // Streak broken after inactivity
  const res4 = calculateNewStreak(5, 5, threeDaysAgo, today, yesterday);
  assert.equal(res4.newCurrentStreak, 1);
  assert.equal(res4.newLongestStreak, 5); // longest streak preserved!
});

// Test 4: Static Review Heuristics
function detectCamelCase(code) {
  const varAssignRegex = /^\s*([a-zA-Z0-9_]+)\s*=/gm;
  let match;
  const issues = [];
  while ((match = varAssignRegex.exec(code)) !== null) {
    const varName = match[1];
    if (/[a-z]+[A-Z][a-zA-Z0-9]*/.test(varName)) {
      issues.push(`Variable '${varName}' uses camelCase.`);
    }
  }
  return issues;
}

test('Static heuristics: camelCase vs snake_case', () => {
  const badCode = `myScore = 100\nplayerHp = 50`;
  const issues = detectCamelCase(badCode);
  assert.equal(issues.length, 2);
  assert.match(issues[0], /myScore/);

  const goodCode = `my_score = 100\nplayer_hp = 50`;
  assert.equal(detectCamelCase(goodCode).length, 0);
});

test('Static heuristics: anti-pattern detection', () => {
  const antiPattern = `for i in range(len(items)): print(items[i])`;
  assert.equal(/range\s*\(\s*len\s*\(/.test(antiPattern), true);

  const cleanPattern = `for item in items: print(item)`;
  assert.equal(/range\s*\(\s*len\s*\(/.test(cleanPattern), false);
});
