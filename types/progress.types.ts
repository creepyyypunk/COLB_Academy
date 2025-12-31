import { QuizAttempt } from './quiz.types';

export type { QuizAttempt };

export interface BlockProgress {
  blockId: string;
  sectionsRead: Set<string>;
  quizAttempts: QuizAttempt[];
  bestScore: number;
  completed: boolean;
  unlockedAt?: Date;
}

export interface UserProgress {
  currentBlockId: string;
  blocksProgress: Map<string, BlockProgress>;
  unlockedBlocks: Set<string>;
  lastUpdated: Date;
}
