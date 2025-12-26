'use client';

import { useState } from 'react';
import { MultipleChoiceQuestion as MCQType } from '@/types/quiz.types';
import { cn } from '@/lib/utils';

interface MultipleChoiceQuestionProps {
  question: MCQType;
  onAnswer: (answer: number) => void;
  initialAnswer?: number;
}

export function MultipleChoiceQuestion({
  question,
  onAnswer,
  initialAnswer,
}: MultipleChoiceQuestionProps) {
  const [selected, setSelected] = useState<number | null>(initialAnswer ?? null);

  const handleSelect = (index: number) => {
    setSelected(index);
    onAnswer(index);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{question.question}</h2>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            className={cn(
              'w-full rounded-colb border-2 p-4 text-left transition-all hover:border-accent/50',
              selected === index
                ? 'border-accent bg-accent-light'
                : 'border-border bg-secondary'
            )}
          >
            <div className="flex items-center space-x-3">
              <div
                className={cn(
                  'flex h-5 w-5 items-center justify-center rounded-full border-2',
                  selected === index ? 'border-accent' : 'border-muted-foreground'
                )}
              >
                {selected === index && <div className="h-3 w-3 rounded-full bg-accent" />}
              </div>
              <span className={selected === index ? 'font-medium' : ''}>{option}</span>
            </div>
          </button>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">Points: {question.points}</p>
    </div>
  );
}
