'use client';

import { useState } from 'react';
import { MultipleSelectQuestion as MSQType } from '@/types/quiz.types';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface MultipleSelectQuestionProps {
  question: MSQType;
  onAnswer: (answer: number[]) => void;
  initialAnswer?: number[];
}

export function MultipleSelectQuestion({
  question,
  onAnswer,
  initialAnswer,
}: MultipleSelectQuestionProps) {
  const [selected, setSelected] = useState<Set<number>>(
    new Set(initialAnswer ?? [])
  );

  const toggleSelect = (index: number) => {
    const newSelected = new Set(selected);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelected(newSelected);
    onAnswer(Array.from(newSelected));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{question.question}</h2>
      <p className="text-sm text-muted-foreground">Select all that apply</p>

      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selected.has(index);
          return (
            <button
              key={index}
              onClick={() => toggleSelect(index)}
              className={cn(
                'w-full rounded-colb border-2 p-4 text-left transition-all hover:border-accent/50',
                isSelected
                  ? 'border-accent bg-accent-light'
                  : 'border-border bg-secondary'
              )}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={cn(
                    'flex h-5 w-5 items-center justify-center rounded border-2',
                    isSelected ? 'border-accent bg-accent' : 'border-muted-foreground'
                  )}
                >
                  {isSelected && <Check className="h-3 w-3 text-white" />}
                </div>
                <span className={isSelected ? 'font-medium' : ''}>{option}</span>
              </div>
            </button>
          );
        })}
      </div>

      <p className="text-sm text-muted-foreground">
        Points: {question.points} | Selected: {selected.size}
      </p>
    </div>
  );
}
