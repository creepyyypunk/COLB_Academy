import { getAllSections } from '@/config/sections.config';
import { SectionCard } from '@/components/sections/SectionCard';
import { BookOpen } from 'lucide-react';

export default function HomePage({ params }: { params: { locale: string } }) {
  const sections = getAllSections();

  const title = params.locale === 'en' ? 'COLB Academy' : 'COLB Академия';
  const subtitle =
    params.locale === 'en'
      ? 'Explore comprehensive documentation on COLB ecosystem'
      : 'Изучите полную документацию по экосистеме COLB';
  const description =
    params.locale === 'en'
      ? 'Learn about COLB tokenization, blockchain technology, and structured products through our detailed whitepapers.'
      : 'Узнайте о токенизации COLB, технологии блокчейн и структурированных продуктах через наши детальные whitepapers.';

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
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

      <div className="space-y-4">
        {sections.map((section) => (
          <SectionCard key={section.id} section={section} locale={params.locale} />
        ))}
      </div>
    </div>
  );
}
