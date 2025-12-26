'use client';

import { useProgress } from '@/contexts/ProgressContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { TrendingUp, CheckCircle, Trophy, Target } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { usePathname } from 'next/navigation';

export default function ProgressPage() {
  const { progress, getBlockProgress } = useProgress();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';

  const completedBlocks = Array.from(progress.blocksProgress.values()).filter(
    (bp) => bp.completed
  ).length;
  const totalBlocks = 7;

  const allQuizAttempts = Array.from(progress.blocksProgress.values()).flatMap(
    (bp) => bp.quizAttempts
  );

  const averageScore =
    allQuizAttempts.length > 0
      ? allQuizAttempts.reduce((sum, attempt) => sum + attempt.score, 0) / allQuizAttempts.length
      : 0;

  const overallProgress = (completedBlocks / totalBlocks) * 100;

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold">
          {locale === 'en' ? 'Your Progress' : 'Ваш прогресс'}
        </h1>
        <p className="text-muted-foreground">
          {locale === 'en'
            ? 'Track your learning journey through COLB Academy'
            : 'Отслеживайте свой путь обучения в COLB Академии'}
        </p>
      </div>

      {/* Stats Overview */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {locale === 'en' ? 'Overall Progress' : 'Общий прогресс'}
                </p>
                <p className="text-3xl font-bold">{Math.round(overallProgress)}%</p>
              </div>
              <TrendingUp className="h-12 w-12 text-accent" />
            </div>
            <ProgressBar value={completedBlocks} max={totalBlocks} className="mt-4" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {locale === 'en' ? 'Blocks Completed' : 'Блоков завершено'}
                </p>
                <p className="text-3xl font-bold">
                  {completedBlocks}/{totalBlocks}
                </p>
              </div>
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {locale === 'en' ? 'Average Score' : 'Средний балл'}
                </p>
                <p className="text-3xl font-bold">{Math.round(averageScore)}%</p>
              </div>
              <Trophy className="h-12 w-12 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Blocks Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-6 w-6" />
            {locale === 'en' ? 'Blocks Progress' : 'Прогресс по блокам'}
          </CardTitle>
          <CardDescription>
            {locale === 'en'
              ? 'Your performance on each educational block'
              : 'Ваша успеваемость по каждому образовательному блоку'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 7 }, (_, i) => {
              const blockId = `block-${i + 1}`;
              const blockProg = getBlockProgress(blockId);
              const isUnlocked = progress.unlockedBlocks.has(blockId);

              return (
                <div
                  key={blockId}
                  className="flex items-center justify-between rounded-colb border border-border p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted font-bold">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold">
                        {locale === 'en' ? `Block ${i + 1}` : `Блок ${i + 1}`}
                      </h3>
                      <div className="flex gap-2">
                        {!isUnlocked && (
                          <Badge variant="secondary">
                            {locale === 'en' ? 'Locked' : 'Заблокировано'}
                          </Badge>
                        )}
                        {isUnlocked && !blockProg?.completed && (
                          <Badge variant="warning">
                            {locale === 'en' ? 'In Progress' : 'В процессе'}
                          </Badge>
                        )}
                        {blockProg?.completed && (
                          <Badge variant="success">
                            {locale === 'en' ? 'Completed' : 'Завершено'}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    {blockProg && blockProg.quizAttempts.length > 0 ? (
                      <>
                        <p className="text-lg font-bold">{Math.round(blockProg.bestScore)}%</p>
                        <p className="text-xs text-muted-foreground">
                          {blockProg.quizAttempts.length}{' '}
                          {locale === 'en'
                            ? blockProg.quizAttempts.length === 1
                              ? 'attempt'
                              : 'attempts'
                            : blockProg.quizAttempts.length === 1
                            ? 'попытка'
                            : 'попыток'}
                        </p>
                      </>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        {locale === 'en' ? 'Not started' : 'Не начато'}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Back to Home */}
      <div className="mt-8 text-center">
        <Link href={`/${locale}`}>
          <Button size="lg">
            {locale === 'en' ? 'Back to Blocks' : 'Вернуться к блокам'}
          </Button>
        </Link>
      </div>
    </div>
  );
}
