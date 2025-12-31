import { UserProgress, BlockProgress, QuizAttempt } from '@/types/progress.types';

const STORAGE_KEY = 'colb-academy-progress';

export class ProgressManager {
  static initialize(): UserProgress {
    return {
      currentBlockId: 'block-1',
      blocksProgress: new Map(),
      unlockedBlocks: new Set(['block-1']),
      lastUpdated: new Date(),
    };
  }

  static load(): UserProgress {
    if (typeof window === 'undefined') {
      return this.initialize();
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return this.initialize();

      const parsed = JSON.parse(stored);
      return {
        ...parsed,
        blocksProgress: new Map(
          parsed.blocksProgress.map(([key, value]: [string, any]) => [
            key,
            {
              ...value,
              sectionsRead: new Set(value.sectionsRead),
              quizAttempts: value.quizAttempts.map((attempt: any) => ({
                ...attempt,
                completedAt: new Date(attempt.completedAt),
              })),
              unlockedAt: value.unlockedAt ? new Date(value.unlockedAt) : undefined,
            },
          ])
        ),
        unlockedBlocks: new Set(parsed.unlockedBlocks),
        lastUpdated: new Date(parsed.lastUpdated),
      };
    } catch (error) {
      console.error('Error loading progress:', error);
      return this.initialize();
    }
  }

  static save(progress: UserProgress): void {
    if (typeof window === 'undefined') return;

    try {
      const serialized = {
        ...progress,
        blocksProgress: Array.from(progress.blocksProgress.entries()).map(([key, value]) => [
          key,
          {
            ...value,
            sectionsRead: Array.from(value.sectionsRead),
            quizAttempts: value.quizAttempts.map((attempt) => ({
              ...attempt,
              completedAt: attempt.completedAt.toISOString(),
            })),
            unlockedAt: value.unlockedAt?.toISOString(),
          },
        ]),
        unlockedBlocks: Array.from(progress.unlockedBlocks),
        lastUpdated: progress.lastUpdated.toISOString(),
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(serialized));
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  }

  static recordQuizAttempt(
    progress: UserProgress,
    blockId: string,
    attempt: QuizAttempt
  ): UserProgress {
    const blockProgress = progress.blocksProgress.get(blockId) || {
      blockId,
      sectionsRead: new Set<string>(),
      quizAttempts: [],
      bestScore: 0,
      completed: false,
    };

    blockProgress.quizAttempts.push(attempt);
    blockProgress.bestScore = Math.max(blockProgress.bestScore, attempt.score);

    if (attempt.passed) {
      blockProgress.completed = true;
    }

    progress.blocksProgress.set(blockId, blockProgress);
    progress.lastUpdated = new Date();

    this.save(progress);
    return progress;
  }

  static markSectionRead(
    progress: UserProgress,
    blockId: string,
    sectionId: string
  ): UserProgress {
    const blockProgress = progress.blocksProgress.get(blockId) || {
      blockId,
      sectionsRead: new Set<string>(),
      quizAttempts: [],
      bestScore: 0,
      completed: false,
    };

    blockProgress.sectionsRead.add(sectionId);
    progress.blocksProgress.set(blockId, blockProgress);
    progress.lastUpdated = new Date();

    this.save(progress);
    return progress;
  }

  static isBlockUnlocked(progress: UserProgress, blockId: string): boolean {
    return true; // All blocks are always unlocked
  }
}
