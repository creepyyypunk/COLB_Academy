export type QuestionType =
  | 'multiple-choice'
  | 'multiple-select'
  | 'true-false'
  | 'matching'
  | 'scheme-builder'
  | 'sequence';

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  question: string;
  points: number;
  explanation?: string;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple-choice';
  options: string[];
  correctAnswer: number;
}

export interface MultipleSelectQuestion extends BaseQuestion {
  type: 'multiple-select';
  options: string[];
  correctAnswers: number[];
}

export interface TrueFalseQuestion extends BaseQuestion {
  type: 'true-false';
  correctAnswer: boolean;
}

export interface MatchingQuestion extends BaseQuestion {
  type: 'matching';
  leftItems: string[];
  rightItems: string[];
  correctMatches: Record<number, number>;
}

export interface SchemeBuilderQuestion extends BaseQuestion {
  type: 'scheme-builder';
  components: SchemeComponent[];
  correctScheme: SchemeConnection[];
}

export interface SchemeComponent {
  id: string;
  label: string;
  type: 'box' | 'circle' | 'diamond';
}

export interface SchemeConnection {
  from: string;
  to: string;
  label?: string;
}

export interface SequenceQuestion extends BaseQuestion {
  type: 'sequence';
  items: string[];
  correctOrder: number[];
}

export type Question =
  | MultipleChoiceQuestion
  | MultipleSelectQuestion
  | TrueFalseQuestion
  | MatchingQuestion
  | SchemeBuilderQuestion
  | SequenceQuestion;

export interface Quiz {
  blockId: string;
  title: string;
  passingScore: number;
  questions: Question[];
}

export interface QuizAttempt {
  quizId: string;
  answers: Record<string, any>;
  score: number;
  passed: boolean;
  completedAt: Date;
}
