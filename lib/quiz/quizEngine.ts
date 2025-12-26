import { Question, QuizAttempt } from '@/types/quiz.types';
import { scoreQuestion } from './scoringLogic';

export class QuizEngine {
  private questions: Question[];
  private answers: Record<string, any> = {};

  constructor(questions: Question[]) {
    this.questions = questions;
  }

  submitAnswer(questionId: string, answer: any): void {
    this.answers[questionId] = answer;
  }

  calculateScore(): { score: number; maxScore: number; passed: boolean } {
    let earnedPoints = 0;
    const maxScore = this.questions.reduce((sum, q) => sum + q.points, 0);

    for (const question of this.questions) {
      const answer = this.answers[question.id];
      if (answer !== undefined) {
        earnedPoints += scoreQuestion(question, answer);
      }
    }

    const scorePercentage = maxScore > 0 ? (earnedPoints / maxScore) * 100 : 0;

    return {
      score: scorePercentage,
      maxScore: 100,
      passed: scorePercentage >= 70,
    };
  }

  getQuestionResult(questionId: string): {
    correct: boolean;
    earnedPoints: number;
    maxPoints: number;
  } {
    const question = this.questions.find((q) => q.id === questionId);
    if (!question) throw new Error(`Question ${questionId} not found`);

    const answer = this.answers[questionId];
    const earnedPoints = scoreQuestion(question, answer);

    return {
      correct: earnedPoints === question.points,
      earnedPoints,
      maxPoints: question.points,
    };
  }

  getAllAnswers(): Record<string, any> {
    return { ...this.answers };
  }
}
