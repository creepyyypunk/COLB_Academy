'use client';

import { useState } from 'react';
import { SequenceQuestion as SQType } from '@/types/quiz.types';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SequenceQuestionProps {
  question: SQType;
  onAnswer: (answer: number[]) => void;
  initialAnswer?: number[];
}

export function SequenceQuestion({
  question,
  onAnswer,
  initialAnswer,
}: SequenceQuestionProps) {
  const [sequence, setSequence] = useState<number[]>(
    initialAnswer ?? question.items.map((_, i) => i)
  );

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newSequence = [...sequence];
    [newSequence[index], newSequence[index - 1]] = [newSequence[index - 1], newSequence[index]];
    setSequence(newSequence);
    onAnswer(newSequence);
  };

  const moveDown = (index: number) => {
    if (index === sequence.length - 1) return;
    const newSequence = [...sequence];
    [newSequence[index], newSequence[index + 1]] = [newSequence[index + 1], newSequence[index]];
    setSequence(newSequence);
    onAnswer(newSequence);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{question.question}</h2>
      <p className="text-sm text-muted-foreground">
        Use the arrows to arrange items in the correct order
      </p>

      <div className="space-y-2">
        {sequence.map((itemIndex, position) => (
          <div
            key={itemIndex}
            className="flex items-center gap-2 rounded-colb border border-border bg-secondary p-3"
          >
            <div className="flex flex-col gap-1">
              <button
                onClick={() => moveUp(position)}
                disabled={position === 0}
                className={cn(
                  'rounded p-1 transition-colors',
                  position === 0
                    ? 'cursor-not-allowed opacity-30'
                    : 'hover:bg-accent-light'
                )}
                aria-label="Move up"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
              <button
                onClick={() => moveDown(position)}
                disabled={position === sequence.length - 1}
                className={cn(
                  'rounded p-1 transition-colors',
                  position === sequence.length - 1
                    ? 'cursor-not-allowed opacity-30'
                    : 'hover:bg-accent-light'
                )}
                aria-label="Move down"
              >
                <ArrowDown className="h-4 w-4" />
              </button>
            </div>

            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-semibold text-white">
              {position + 1}
            </div>

            <div className="flex-1">
              <p className="text-sm font-medium">{question.items[itemIndex]}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">Points: {question.points}</p>
    </div>
  );
}
