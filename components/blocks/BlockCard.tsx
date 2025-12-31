'use client';

import Link from 'next/link';
import { BlockMetadata } from '@/types/content.types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useProgress } from '@/contexts/ProgressContext';
import { Lock, CheckCircle, PlayCircle, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BlockCardProps {
  block: BlockMetadata;
  locale: string;
}

export function BlockCard({ block, locale }: BlockCardProps) {
  const { getBlockProgress } = useProgress();
  const isUnlocked = true; // All blocks are always unlocked
  const blockProgress = getBlockProgress(block.id);
  const isCompleted = blockProgress?.completed || false;

  const sectionCount = block.sections.length;

  return (
    <Card
      className={cn(
        'group transition-all hover:shadow-md hover:border-accent',
        !isUnlocked && 'opacity-60',
        'relative overflow-hidden'
      )}
    >
      {/* Decorative left border */}
      <div
        className={cn(
          'absolute left-0 top-0 h-full w-1.5',
          isCompleted && 'bg-green-600',
          isUnlocked && !isCompleted && 'bg-accent',
          !isUnlocked && 'bg-muted-foreground'
        )}
      />

      <div className="flex items-center gap-6 p-6 pl-8">
        {/* Block Number Circle */}
        <div
          className={cn(
            'flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full text-2xl font-bold',
            isCompleted && 'bg-green-100 text-green-700',
            isUnlocked && !isCompleted && 'bg-accent-light text-accent',
            !isUnlocked && 'bg-muted text-muted-foreground'
          )}
        >
          {block.order}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="mb-2 flex items-start gap-3">
            <h3 className="text-xl font-bold">{block.title}</h3>
            {isCompleted && <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-600" />}
            {!isUnlocked && <Lock className="h-5 w-5 flex-shrink-0 text-muted-foreground" />}
          </div>
          <p className="text-sm text-muted-foreground mb-3">{block.description}</p>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={isCompleted ? 'success' : isUnlocked ? 'default' : 'secondary'}>
              {isCompleted
                ? locale === 'en'
                  ? 'Completed'
                  : 'Завершено'
                : isUnlocked
                ? locale === 'en'
                  ? 'Unlocked'
                  : 'Доступно'
                : locale === 'en'
                ? 'Locked'
                : 'Заблокировано'}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {sectionCount} {locale === 'en' ? 'sections' : 'разделов'}
            </span>
            {blockProgress && blockProgress.bestScore > 0 && (
              <span className="text-xs text-muted-foreground">
                • {locale === 'en' ? 'Best' : 'Лучший'}: {Math.round(blockProgress.bestScore)}%
              </span>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex-shrink-0">
          {isUnlocked ? (
            <Link href={`/${locale}/blocks/${block.id}/${block.sections[0]?.id}`}>
              <Button variant={isCompleted ? 'outline' : 'default'}>
                {isCompleted ? (
                  <>
                    {locale === 'en' ? 'Review' : 'Повторить'}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                ) : (
                  <>
                    <PlayCircle className="mr-2 h-4 w-4" />
                    {locale === 'en' ? 'Start' : 'Начать'}
                  </>
                )}
              </Button>
            </Link>
          ) : (
            <Button disabled variant="outline">
              <Lock className="mr-2 h-4 w-4" />
              {locale === 'en' ? 'Locked' : 'Заблокировано'}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
