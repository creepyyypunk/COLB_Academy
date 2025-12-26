import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProgressProvider } from '@/contexts/ProgressContext';

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ru' }];
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <ProgressProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </ProgressProvider>
  );
}
