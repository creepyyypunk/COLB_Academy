'use client';

import { Quiz } from '@/types/quiz.types';
import { QuizEngine } from '@/lib/quiz/quizEngine';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';
import { CheckCircle, XCircle, RotateCcw, ArrowRight } from 'lucide-react';

interface QuizResultProps {
  result: { score: number; maxScore: number; passed: boolean };
  quiz: Quiz;
  engine: QuizEngine;
  locale: string;
  onRetry: () => void;
}

export function QuizResult({ result, quiz, engine, locale, onRetry }: QuizResultProps) {
  const blockNum = parseInt(quiz.blockId.split('-')[1]);
  const nextBlockId = blockNum < 7 ? `block-${blockNum + 1}` : null;

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <Card>
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            {result.passed ? (
              <CheckCircle className="h-16 w-16 text-green-600" />
            ) : (
              <XCircle className="h-16 w-16 text-red-600" />
            )}
          </div>
          <CardTitle className="text-3xl">
            {result.passed
              ? locale === 'en'
                ? 'Congratulations!'
                : 'Поздравляем!'
              : locale === 'en'
              ? 'Keep Trying!'
              : 'Продолжайте попытки!'}
          </CardTitle>
          <CardDescription className="text-lg">
            {result.passed
              ? locale === 'en'
                ? 'You passed the quiz!'
                : 'Вы прошли тест!'
              : locale === 'en'
              ? 'You need at least 70% to pass'
              : 'Для прохождения требуется минимум 70%'}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Score Display */}
          <div className="text-center">
            <div className="mb-2 text-5xl font-bold text-accent">{Math.round(result.score)}%</div>
            <ProgressBar value={result.score} max={100} className="mx-auto max-w-md" />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-colb border border-border p-4 text-center">
              <div className="text-2xl font-bold">{Math.round(result.score)}%</div>
              <div className="text-sm text-muted-foreground">
                {locale === 'en' ? 'Your Score' : 'Ваш результат'}
              </div>
            </div>
            <div className="rounded-colb border border-border p-4 text-center">
              <div className="text-2xl font-bold">{quiz.passingScore}%</div>
              <div className="text-sm text-muted-foreground">
                {locale === 'en' ? 'Passing Score' : 'Проходной балл'}
              </div>
            </div>
          </div>

          {/* Question Results */}
          <div className="space-y-3">
            <h3 className="font-semibold">
              {locale === 'en' ? 'Question Results:' : 'Результаты по вопросам:'}
            </h3>
            {quiz.questions.map((question, index) => {
              const questionResult = engine.getQuestionResult(question.id);
              return (
                <div
                  key={question.id}
                  className="flex items-center justify-between rounded-colb border border-border p-3"
                >
                  <div className="flex items-center gap-3">
                    {questionResult.correct ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                    <span className="text-sm">
                      {locale === 'en' ? 'Question' : 'Вопрос'} {index + 1}
                    </span>
                  </div>
                  <Badge variant={questionResult.correct ? 'success' : 'warning'}>
                    {questionResult.earnedPoints}/{questionResult.maxPoints}{' '}
                    {locale === 'en' ? 'pts' : 'баллов'}
                  </Badge>
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button onClick={onRetry} variant="outline" className="flex-1">
              <RotateCcw className="mr-2 h-4 w-4" />
              {locale === 'en' ? 'Retake Quiz' : 'Пересдать тест'}
            </Button>
            {result.passed && nextBlockId && (
              <Link href={`/${locale}/blocks/${nextBlockId}`} className="flex-1">
                <Button className="w-full">
                  {locale === 'en' ? 'Next Block' : 'Следующий блок'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}
            {result.passed && !nextBlockId && (
              <Link href={`/${locale}`} className="flex-1">
                <Button className="w-full">
                  {locale === 'en' ? 'Back to Home' : 'На главную'}
                </Button>
              </Link>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
