import { Challenge, TopicId, DifficultyLevel } from '../../types/challenge';
import { topic01Challenges } from './topic01_variables';
import { operatorsChallenges } from './topic02_operators';
import { user_inputChallenges } from './topic03_user_input';
import { stringsChallenges } from './topic04_strings';
import { conditionalsChallenges } from './topic05_conditionals';
import { loopsChallenges } from './topic06_loops';
import { functionsChallenges } from './topic07_functions';
import { listsChallenges } from './topic08_lists';
import { tuplesChallenges } from './topic09_tuples';
import { dictionariesChallenges } from './topic10_dictionaries';
import { setsChallenges } from './topic11_sets';
import { file_handlingChallenges } from './topic12_file_handling';
import { exceptionsChallenges } from './topic13_exceptions';
import { modulesChallenges } from './topic14_modules';

export const ALL_CHALLENGES: Challenge[] = [
  ...topic01Challenges,
  ...operatorsChallenges,
  ...user_inputChallenges,
  ...stringsChallenges,
  ...conditionalsChallenges,
  ...loopsChallenges,
  ...functionsChallenges,
  ...listsChallenges,
  ...tuplesChallenges,
  ...dictionariesChallenges,
  ...setsChallenges,
  ...file_handlingChallenges,
  ...exceptionsChallenges,
  ...modulesChallenges,
];

export function getChallengesForTopic(topicId: TopicId): Challenge[] {
  return ALL_CHALLENGES.filter((c) => c.topicId === topicId);
}

export function getChallengesByDifficulty(
  topicId: TopicId,
  difficulty: DifficultyLevel
): Challenge[] {
  return ALL_CHALLENGES.filter(
    (c) => c.topicId === topicId && c.difficulty === difficulty
  );
}

export function getChallengeById(challengeId: string): Challenge | undefined {
  return ALL_CHALLENGES.find((c) => c.id === challengeId);
}

export function getNextChallenge(
  currentChallengeId: string,
  topicId: TopicId,
  difficulty: DifficultyLevel
): Challenge | null {
  const list = getChallengesByDifficulty(topicId, difficulty);
  const currentIdx = list.findIndex((c) => c.id === currentChallengeId);
  if (currentIdx !== -1 && currentIdx + 1 < list.length) {
    return list[currentIdx + 1];
  }
  return null;
}
