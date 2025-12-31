import { Question } from '@/types/quiz.types';

export function scoreQuestion(question: Question, answer: any): number {
  switch (question.type) {
    case 'multiple-choice':
      return answer === question.correctAnswer ? question.points : 0;

    case 'multiple-select': {
      const userAnswers = new Set<number>(answer || []);
      const correctAnswers = new Set<number>(question.correctAnswers);

      if (userAnswers.size !== correctAnswers.size) return 0;

      for (const ans of userAnswers) {
        if (!correctAnswers.has(ans)) return 0;
      }
      return question.points;
    }

    case 'true-false':
      return answer === question.correctAnswer ? question.points : 0;

    case 'matching': {
      const matches = answer as Record<number, number>;
      let correctMatches = 0;
      const totalMatches = Object.keys(question.correctMatches).length;

      for (const [leftIdx, rightIdx] of Object.entries(question.correctMatches)) {
        if (matches[Number(leftIdx)] === rightIdx) {
          correctMatches++;
        }
      }

      return (correctMatches / totalMatches) * question.points;
    }

    case 'sequence': {
      const userOrder = answer as number[];
      if (!userOrder || userOrder.length !== question.correctOrder.length) return 0;

      for (let i = 0; i < userOrder.length; i++) {
        if (userOrder[i] !== question.correctOrder[i]) return 0;
      }
      return question.points;
    }

    case 'scheme-builder': {
      const userScheme = answer as Array<{ from: string; to: string; label?: string }>;
      if (!userScheme || userScheme.length !== question.correctScheme.length) return 0;

      let correctConnections = 0;
      for (const correctConn of question.correctScheme) {
        const found = userScheme.find(
          (conn) =>
            conn.from === correctConn.from &&
            conn.to === correctConn.to &&
            (!correctConn.label || conn.label === correctConn.label)
        );
        if (found) correctConnections++;
      }

      return (correctConnections / question.correctScheme.length) * question.points;
    }

    default:
      return 0;
  }
}
