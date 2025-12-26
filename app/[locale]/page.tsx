import { loadAllBlocks } from '@/lib/content/contentLoader';
import { BlockCard } from '@/components/blocks/BlockCard';
import { BookOpen } from 'lucide-react';

export default async function HomePage({ params }: { params: { locale: string } }) {
  const blocks = await loadAllBlocks(params.locale);

  const title = params.locale === 'en' ? 'COLB Academy' : 'COLB Академия';
  const subtitle =
    params.locale === 'en'
      ? 'Master tokenization through 7 comprehensive educational blocks'
      : 'Освойте токенизацию через 7 всесторонних образовательных блоков';
  const description =
    params.locale === 'en'
      ? 'Learn about COLB tokenization, blockchain technology, and structured products. Complete quizzes to unlock new content.'
      : 'Узнайте о токенизации COLB, технологии блокчейн и структурированных продуктах. Проходите тесты, чтобы разблокировать новый контент.';

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-12 text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-accent text-white shadow-lg">
            <BookOpen className="h-12 w-12" />
          </div>
        </div>
        <h1 className="mb-4 text-5xl font-bold">{title}</h1>
        <p className="mb-2 text-xl text-muted-foreground">{subtitle}</p>
        <p className="mx-auto max-w-2xl text-base text-muted-foreground">{description}</p>
      </div>

      {blocks.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blocks.map((block) => (
            <BlockCard key={block.id} block={block} locale={params.locale} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-border bg-muted p-12 text-center">
          <p className="text-muted-foreground">
            {params.locale === 'en'
              ? 'No blocks available yet. Content will be added soon.'
              : 'Блоки пока недоступны. Контент будет добавлен в ближайшее время.'}
          </p>
        </div>
      )}
    </div>
  );
}
