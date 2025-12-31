import { getSectionById } from '@/config/sections.config';
import { loadAllBlocks } from '@/lib/content/contentLoader';
import { BlockCard } from '@/components/blocks/BlockCard';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, BookOpen } from 'lucide-react';

export default async function SectionPage({
  params,
}: {
  params: { locale: string; sectionId: string };
}) {
  const section = getSectionById(params.sectionId);

  if (!section) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-12 text-center">
        <h1 className="text-2xl font-bold">
          {params.locale === 'en' ? 'Section not found' : 'Раздел не найден'}
        </h1>
        <Link href={`/${params.locale}`} className="mt-4 inline-block">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {params.locale === 'en' ? 'Back to Home' : 'На главную'}
          </Button>
        </Link>
      </div>
    );
  }

  // Load all blocks and filter by section
  const allBlocks = await loadAllBlocks(params.locale);
  const sectionBlocks = allBlocks.filter((block) => section.blockIds.includes(block.id));

  const title = params.locale === 'en' ? section.title.en : section.title.ru;
  const description = params.locale === 'en' ? section.description.en : section.description.ru;

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      {/* Breadcrumb */}
      <div className="mb-8">
        <Link
          href={`/${params.locale}`}
          className="text-sm text-muted-foreground hover:text-accent transition-colors inline-flex items-center gap-1"
        >
          <ArrowLeft className="h-3 w-3" />
          {params.locale === 'en' ? 'Back to sections' : 'Вернуться к разделам'}
        </Link>
      </div>

      {/* Section Header */}
      <div className="mb-12">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent text-white">
            <BookOpen className="h-6 w-6" />
          </div>
          <h1 className="text-4xl font-bold">{title}</h1>
        </div>
        <p className="text-lg text-muted-foreground">{description}</p>
      </div>

      {/* Blocks List */}
      {sectionBlocks.length > 0 ? (
        <div className="space-y-4">
          {sectionBlocks.map((block) => (
            <BlockCard key={block.id} block={block} locale={params.locale} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-border bg-muted p-12 text-center">
          <p className="text-muted-foreground">
            {params.locale === 'en'
              ? 'No blocks available in this section yet. Content will be added soon.'
              : 'В этом разделе пока нет блоков. Контент будет добавлен в ближайшее время.'}
          </p>
        </div>
      )}
    </div>
  );
}
