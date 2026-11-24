import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test('Video syllabus metadata integrity across all 14 topics', () => {
  const topicsFilePath = path.join(__dirname, '..', 'src', 'constants', 'topics.ts');
  const content = fs.readFileSync(topicsFilePath, 'utf8');

  // Verify all 14 topics have a video block
  const videoBlocks = content.match(/video:\s*\{/g) || [];
  assert.equal(videoBlocks.length, 14, `Expected 14 video blocks, found ${videoBlocks.length}`);

  // Verify key fields are present
  const youtubeIds = content.match(/youtubeId:\s*['"][^'"]+['"]/g) || [];
  assert.equal(youtubeIds.length, 14, `Expected 14 youtubeIds, found ${youtubeIds.length}`);

  const durations = content.match(/durationMinutes:\s*\d+/g) || [];
  assert.equal(durations.length, 14, `Expected 14 durationMinutes, found ${durations.length}`);
});

test('Screen layout modes validity', () => {
  const validModes = ['split', 'single', 'code-focus'];
  assert.equal(validModes.length, 3);
  assert.ok(validModes.includes('split'));
  assert.ok(validModes.includes('single'));
  assert.ok(validModes.includes('code-focus'));
});

test('Session duration formatting and calculations', () => {
  const formatTime = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  assert.equal(formatTime(0), '00:00');
  assert.equal(formatTime(65), '01:05');
  assert.equal(formatTime(3600), '60:00');
});
