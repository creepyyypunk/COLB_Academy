import { loadBlockContent } from '@/lib/content/contentLoader';
import { MarkdownRenderer } from '@/components/blocks/MarkdownRenderer';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, ArrowRight, CheckSquare } from 'lucide-react';

export default async function SectionPage({
  params,
}: {
  params: { locale: string; blockId: string; sectionId: string };
}) {
  try {
    const { metadata, sections } = await loadBlockContent(params.locale, params.blockId);

    const content = sections.get(params.sectionId);
    const section = metadata.sections.find((s) => s.id === params.sectionId);

    if (!content || !section) {
      return (
        <div className="mx-auto max-w-4xl px-6 py-12 text-center">
          <h1 className="text-2xl font-bold">
            {params.locale === 'en' ? 'Section not found' : 'Раздел не найден'}
          </h1>
        </div>
      );
    }

    const currentIndex = metadata.sections.findIndex((s) => s.id === params.sectionId);
    const prevSection = currentIndex > 0 ? metadata.sections[currentIndex - 1] : null;
    const nextSection =
      currentIndex < metadata.sections.length - 1 ? metadata.sections[currentIndex + 1] : null;

    const isLastSection = !nextSection;

    return (
      <div className="mx-auto max-w-4xl px-6 py-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            href={`/${params.locale}`}
            className="text-sm text-muted-foreground hover:text-accent transition-colors"
          >
            {params.locale === 'en' ? 'Home' : 'Главная'} /
          </Link>
          <span className="ml-1 text-sm font-medium">
            {metadata.title} / {section.title}
          </span>
        </div>

        {/* Content */}
        <div className="mb-8">
          <div className="mb-6">
            <h1 className="mb-2 text-4xl font-bold">{section.title}</h1>
            <p className="text-muted-foreground">
              {metadata.title} - {params.locale === 'en' ? 'Section' : 'Раздел'} {section.order} of{' '}
              {metadata.sections.length}
            </p>
          </div>

          <MarkdownRenderer content={content} />
        </div>

        {/* Navigation */}
        <div className="mt-12 flex items-center justify-between border-t border-border pt-6">
          <div>
            {prevSection ? (
              <Link href={`/${params.locale}/blocks/${params.blockId}/${prevSection.id}`}>
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {params.locale === 'en' ? 'Previous' : 'Назад'}
                </Button>
              </Link>
            ) : (
              <Link href={`/${params.locale}`}>
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {params.locale === 'en' ? 'Back to Home' : 'На главную'}
                </Button>
              </Link>
            )}
          </div>

          <div>
            {nextSection ? (
              <Link href={`/${params.locale}/blocks/${params.blockId}/${nextSection.id}`}>
                <Button>
                  {params.locale === 'en' ? 'Next' : 'Далее'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            ) : isLastSection ? (
              <Link href={`/${params.locale}/quiz/${params.blockId}`}>
                <Button>
                  <CheckSquare className="mr-2 h-4 w-4" />
                  {params.locale === 'en' ? 'Take Quiz' : 'Пройти тест'}
                </Button>
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading section:', error);
    return (
      <div className="mx-auto max-w-4xl px-6 py-12 text-center">
        <h1 className="text-2xl font-bold">
          {params.locale === 'en' ? 'Error loading content' : 'Ошибка загрузки контента'}
        </h1>
      </div>
    );
  }
}
