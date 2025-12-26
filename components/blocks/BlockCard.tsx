'use client';

import Link from 'next/link';
import { BlockMetadata } from '@/types/content.types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useProgress } from '@/contexts/ProgressContext';
import { Lock, CheckCircle, PlayCircle } from 'lucide-react';

interface BlockCardProps {
  block: BlockMetadata;
  locale: string;
}

export function BlockCard({ block, locale }: BlockCardProps) {
  const { isBlockUnlocked, getBlockProgress } = useProgress();
  const isUnlocked = isBlockUnlocked(block.id);
  const blockProgress = getBlockProgress(block.id);
  const isCompleted = blockProgress?.completed || false;

  return (
    <Card className={`transition-all hover:shadow-md ${!isUnlocked ? 'opacity-60' : ''}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl">
            {block.order}. {block.title}
          </CardTitle>
          {!isUnlocked && <Lock className="h-5 w-5 text-muted-foreground" />}
          {isCompleted && <CheckCircle className="h-5 w-5 text-green-600" />}
        </div>
        <CardDescription>{block.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {isCompleted && <Badge variant="success">{locale === 'en' ? 'Completed' : 'Завершено'}</Badge>}
          {isUnlocked && !isCompleted && (
            <Badge variant="default">{locale === 'en' ? 'Unlocked' : 'Доступно'}</Badge>
          )}
          {!isUnlocked && <Badge variant="secondary">{locale === 'en' ? 'Locked' : 'Заблокировано'}</Badge>}
        </div>
        {blockProgress && blockProgress.bestScore > 0 && (
          <p className="mt-3 text-sm text-muted-foreground">
            {locale === 'en' ? 'Best Score' : 'Лучший результат'}: {Math.round(blockProgress.bestScore)}%
          </p>
        )}
      </CardContent>
      <CardFooter>
        {isUnlocked && (
          <Link href={`/${locale}/blocks/${block.id}/${block.sections[0]?.id}`} className="w-full">
            <Button className="w-full">
              <PlayCircle className="mr-2 h-4 w-4" />
              {isCompleted
                ? locale === 'en'
                  ? 'Review'
                  : 'Повторить'
                : locale === 'en'
                ? 'Start Learning'
                : 'Начать обучение'}
            </Button>
          </Link>
        )}
        {!isUnlocked && (
          <Button disabled className="w-full">
            <Lock className="mr-2 h-4 w-4" />
            {locale === 'en' ? 'Complete previous block' : 'Пройдите предыдущий блок'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
