'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = pathname.split('/')[1] || 'en';
  const isEnglish = currentLocale === 'en';

  const switchLocale = () => {
    const newLocale = isEnglish ? 'ru' : 'en';
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <button
      onClick={switchLocale}
      className="flex items-center space-x-2 text-sm hover:text-accent transition-colors"
      aria-label="Switch language"
    >
      <Globe className="h-4 w-4" />
      <span className="font-medium">{isEnglish ? 'RU' : 'EN'}</span>
    </button>
  );
}
