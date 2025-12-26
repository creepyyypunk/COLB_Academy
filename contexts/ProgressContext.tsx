'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProgress, QuizAttempt, BlockProgress } from '@/types/progress.types';
import { ProgressManager } from '@/lib/progress/progressManager';

interface ProgressContextType {
  progress: UserProgress;
  recordQuizAttempt: (blockId: string, attempt: QuizAttempt) => void;
  markSectionRead: (blockId: string, sectionId: string) => void;
  isBlockUnlocked: (blockId: string) => boolean;
  getBlockProgress: (blockId: string) => BlockProgress | undefined;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>(() => ProgressManager.initialize());

  useEffect(() => {
    setProgress(ProgressManager.load());
  }, []);

  const recordQuizAttempt = (blockId: string, attempt: QuizAttempt) => {
    setProgress((prev) => ProgressManager.recordQuizAttempt(prev, blockId, attempt));
  };

  const markSectionRead = (blockId: string, sectionId: string) => {
    setProgress((prev) => ProgressManager.markSectionRead(prev, blockId, sectionId));
  };

  const isBlockUnlocked = (blockId: string) => {
    return ProgressManager.isBlockUnlocked(progress, blockId);
  };

  const getBlockProgress = (blockId: string) => {
    return progress.blocksProgress.get(blockId);
  };

  return (
    <ProgressContext.Provider
      value={{
        progress,
        recordQuizAttempt,
        markSectionRead,
        isBlockUnlocked,
        getBlockProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within ProgressProvider');
  }
  return context;
}
