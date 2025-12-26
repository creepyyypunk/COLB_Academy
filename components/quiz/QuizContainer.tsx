'use client';

import { useState } from 'react';
import { Quiz } from '@/types/quiz.types';
import { QuizEngine } from '@/lib/quiz/quizEngine';
import { QuizQuestion } from './QuizQuestion';
import { QuizResult } from './QuizResult';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useProgress } from '@/contexts/ProgressContext';
import { ArrowLeft, ArrowRight, CheckSquare } from 'lucide-react';

interface QuizContainerProps {
  quiz: Quiz;
  locale: string;
}

export function QuizContainer({ quiz, locale }: QuizContainerProps) {
  const [engine] = useState(() => new QuizEngine(quiz.questions));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { recordQuizAttempt } = useProgress();

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

  const handleAnswer = (answer: any) => {
    engine.submitAnswer(currentQuestion.id, answer);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      const quizResult = engine.calculateScore();
      setResult(quizResult);
      setIsComplete(true);

      recordQuizAttempt(quiz.blockId, {
        quizId: quiz.blockId,
        answers: engine.getAllAnswers(),
        score: quizResult.score,
        passed: quizResult.passed,
        completedAt: new Date(),
      });
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex((prev) => Math.max(0, prev - 1));
  };

  const handleRetry = () => {
    setIsComplete(false);
    setResult(null);
    setCurrentQuestionIndex(0);
    // Create new engine instance for fresh start
    window.location.reload();
  };

  if (isComplete && result) {
    return <QuizResult result={result} quiz={quiz} engine={engine} locale={locale} onRetry={handleRetry} />;
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold">{quiz.title}</h1>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              {locale === 'en' ? 'Question' : 'Вопрос'} {currentQuestionIndex + 1}{' '}
              {locale === 'en' ? 'of' : 'из'} {quiz.questions.length}
            </span>
            <span>
              {locale === 'en' ? 'Passing Score' : 'Проходной балл'}: {quiz.passingScore}%
            </span>
          </div>
          <ProgressBar
            value={currentQuestionIndex + 1}
            max={quiz.questions.length}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-8 rounded-lg border border-border bg-secondary p-6">
        <QuizQuestion question={currentQuestion} onAnswer={handleAnswer} />
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button onClick={handlePrevious} disabled={currentQuestionIndex === 0} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {locale === 'en' ? 'Previous' : 'Назад'}
        </Button>

        <Button onClick={handleNext}>
          {isLastQuestion ? (
            <>
              <CheckSquare className="mr-2 h-4 w-4" />
              {locale === 'en' ? 'Submit Quiz' : 'Отправить тест'}
            </>
          ) : (
            <>
              {locale === 'en' ? 'Next' : 'Далее'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
