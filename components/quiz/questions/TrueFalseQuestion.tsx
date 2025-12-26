'use client';

import { useState } from 'react';
import { TrueFalseQuestion as TFQType } from '@/types/quiz.types';
import { cn } from '@/lib/utils';
import { Check, X } from 'lucide-react';

interface TrueFalseQuestionProps {
  question: TFQType;
  onAnswer: (answer: boolean) => void;
  initialAnswer?: boolean;
}

export function TrueFalseQuestion({
  question,
  onAnswer,
  initialAnswer,
}: TrueFalseQuestionProps) {
  const [selected, setSelected] = useState<boolean | null>(initialAnswer ?? null);

  const handleSelect = (value: boolean) => {
    setSelected(value);
    onAnswer(value);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{question.question}</h2>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => handleSelect(true)}
          className={cn(
            'flex flex-col items-center justify-center rounded-colb border-2 p-8 transition-all hover:border-accent/50',
            selected === true
              ? 'border-accent bg-accent-light'
              : 'border-border bg-secondary'
          )}
        >
          <Check className={cn('h-12 w-12 mb-2', selected === true ? 'text-accent' : 'text-muted-foreground')} />
          <span className={cn('text-lg font-medium', selected === true && 'text-accent')}>True</span>
        </button>

        <button
          onClick={() => handleSelect(false)}
          className={cn(
            'flex flex-col items-center justify-center rounded-colb border-2 p-8 transition-all hover:border-accent/50',
            selected === false
              ? 'border-accent bg-accent-light'
              : 'border-border bg-secondary'
          )}
        >
          <X className={cn('h-12 w-12 mb-2', selected === false ? 'text-accent' : 'text-muted-foreground')} />
          <span className={cn('text-lg font-medium', selected === false && 'text-accent')}>False</span>
        </button>
      </div>

      <p className="text-sm text-muted-foreground">Points: {question.points}</p>
    </div>
  );
}
