import Link from 'next/link';
import { Section } from '@/config/sections.config';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { ArrowRight, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionCardProps {
  section: Section;
  locale: string;
}

export function SectionCard({ section, locale }: SectionCardProps) {
  const title = locale === 'en' ? section.title.en : section.title.ru;
  const description = locale === 'en' ? section.description.en : section.description.ru;
  const blockCount = section.blockIds.length;

  return (
    <Link href={`/${locale}/sections/${section.id}`}>
      <Card
        className={cn(
          'group cursor-pointer transition-all hover:shadow-lg hover:border-accent',
          'relative overflow-hidden'
        )}
      >
        {/* Decorative gradient bar on the left */}
        <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-accent to-accent-hover" />

        <CardHeader className="pl-8">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="mb-2 flex items-center gap-3 text-2xl">
                <FileText className="h-6 w-6 text-accent" />
                {title}
              </CardTitle>
              <CardDescription className="text-base">{description}</CardDescription>
            </div>
            <ArrowRight className="h-6 w-6 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-accent" />
          </div>

          <div className="mt-4 flex items-center gap-2">
            <div className="rounded-full bg-accent-light px-3 py-1 text-sm font-medium text-accent">
              {blockCount} {locale === 'en' ? 'blocks' : 'блоков'}
            </div>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}
