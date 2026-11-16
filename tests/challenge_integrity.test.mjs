import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const topicsDir = path.join(__dirname, '..', 'src', 'data', 'challenges');

const EXPECTED_TOPIC_FILES = [
  'topic01_variables.ts',
  'topic02_operators.ts',
  'topic03_user_input.ts',
  'topic04_strings.ts',
  'topic05_conditionals.ts',
  'topic06_loops.ts',
  'topic07_functions.ts',
  'topic08_lists.ts',
  'topic09_tuples.ts',
  'topic10_dictionaries.ts',
  'topic11_sets.ts',
  'topic12_file_handling.ts',
  'topic13_exceptions.ts',
  'topic14_modules.ts',
];

test('Verify all 14 topic challenge files exist', () => {
  EXPECTED_TOPIC_FILES.forEach((file) => {
    const fullPath = path.join(topicsDir, file);
    assert.equal(fs.existsSync(fullPath), true, `File missing: ${file}`);
  });
});

test('Verify each topic has exactly 10 beginner, 10 intermediate, 10 advanced challenges', () => {
  EXPECTED_TOPIC_FILES.forEach((file) => {
    const content = fs.readFileSync(path.join(topicsDir, file), 'utf8');

    // Count occurrences of difficulties
    const begMatches = content.match(/difficulty:\s*['"]beginner['"]/g) || [];
    const intMatches = content.match(/difficulty:\s*['"]intermediate['"]/g) || [];
    const advMatches = content.match(/difficulty:\s*['"]advanced['"]/g) || [];

    assert.equal(begMatches.length, 10, `${file} should have 10 beginner challenges, found ${begMatches.length}`);
    assert.equal(intMatches.length, 10, `${file} should have 10 intermediate challenges, found ${intMatches.length}`);
    assert.equal(advMatches.length, 10, `${file} should have 10 advanced challenges, found ${advMatches.length}`);
  });
});

test('Verify total curriculum count equals 420 challenges', () => {
  let totalChallenges = 0;
  EXPECTED_TOPIC_FILES.forEach((file) => {
    const content = fs.readFileSync(path.join(topicsDir, file), 'utf8');
    const matches = content.match(/starterCode:/g) || [];
    totalChallenges += matches.length;
  });
  assert.equal(totalChallenges, 420, `Total challenges must be 420 (14 topics * 30), got ${totalChallenges}`);
});
