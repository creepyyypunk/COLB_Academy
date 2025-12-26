'use client';

import { useState } from 'react';
import { MatchingQuestion as MQType } from '@/types/quiz.types';
import { cn } from '@/lib/utils';

interface MatchingQuestionProps {
  question: MQType;
  onAnswer: (answer: Record<number, number>) => void;
  initialAnswer?: Record<number, number>;
}

export function MatchingQuestion({
  question,
  onAnswer,
  initialAnswer,
}: MatchingQuestionProps) {
  const [matches, setMatches] = useState<Record<number, number>>(initialAnswer ?? {});
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);

  const handleLeftClick = (leftIndex: number) => {
    setSelectedLeft(leftIndex);
  };

  const handleRightClick = (rightIndex: number) => {
    if (selectedLeft !== null) {
      const newMatches = { ...matches, [selectedLeft]: rightIndex };
      setMatches(newMatches);
      onAnswer(newMatches);
      setSelectedLeft(null);
    }
  };

  const removeMatch = (leftIndex: number) => {
    const newMatches = { ...matches };
    delete newMatches[leftIndex];
    setMatches(newMatches);
    onAnswer(newMatches);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">{question.question}</h2>
      <p className="text-sm text-muted-foreground">
        Click an item on the left, then click its match on the right
      </p>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Left Column */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground">Items</h3>
          {question.leftItems.map((item, index) => {
            const isMatched = matches[index] !== undefined;
            const isSelected = selectedLeft === index;
            return (
              <button
                key={index}
                onClick={() => handleLeftClick(index)}
                className={cn(
                  'w-full rounded-colb border-2 p-3 text-left transition-all',
                  isSelected && 'border-accent bg-accent-light',
                  isMatched && !isSelected && 'border-green-500 bg-green-50',
                  !isSelected && !isMatched && 'border-border hover:border-accent/50'
                )}
              >
                <div className="flex items-center justify-between">
                  <span className={isSelected || isMatched ? 'font-medium' : ''}>{item}</span>
                  {isMatched && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeMatch(index);
                      }}
                      className="text-xs text-red-600 hover:text-red-800"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground">Matches</h3>
          {question.rightItems.map((item, index) => {
            const isMatched = Object.values(matches).includes(index);
            return (
              <button
                key={index}
                onClick={() => handleRightClick(index)}
                disabled={!selectedLeft}
                className={cn(
                  'w-full rounded-colb border-2 p-3 text-left transition-all',
                  isMatched && 'border-green-500 bg-green-50',
                  !isMatched && selectedLeft !== null && 'hover:border-accent/50',
                  !isMatched && !selectedLeft && 'opacity-60',
                  !isMatched && 'border-border'
                )}
              >
                <span className={isMatched ? 'font-medium' : ''}>{item}</span>
              </button>
            );
          })}
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        Points: {question.points} | Matches: {Object.keys(matches).length}/{question.leftItems.length}
      </p>
    </div>
  );
}
