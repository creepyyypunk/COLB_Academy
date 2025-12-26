'use client';

import { Question } from '@/types/quiz.types';
import { MultipleChoiceQuestion } from './questions/MultipleChoiceQuestion';
import { TrueFalseQuestion } from './questions/TrueFalseQuestion';
import { MultipleSelectQuestion } from './questions/MultipleSelectQuestion';

interface QuizQuestionProps {
  question: Question;
  onAnswer: (answer: any) => void;
  initialAnswer?: any;
}

export function QuizQuestion({ question, onAnswer, initialAnswer }: QuizQuestionProps) {
  switch (question.type) {
    case 'multiple-choice':
      return (
        <MultipleChoiceQuestion
          question={question}
          onAnswer={onAnswer}
          initialAnswer={initialAnswer}
        />
      );
    case 'true-false':
      return (
        <TrueFalseQuestion
          question={question}
          onAnswer={onAnswer}
          initialAnswer={initialAnswer}
        />
      );
    case 'multiple-select':
      return (
        <MultipleSelectQuestion
          question={question}
          onAnswer={onAnswer}
          initialAnswer={initialAnswer}
        />
      );
    default:
      return (
        <div className="rounded-lg border border-border bg-muted p-6 text-center">
          <p className="text-muted-foreground">
            Question type "{question.type}" is not yet implemented.
          </p>
        </div>
      );
  }
}
