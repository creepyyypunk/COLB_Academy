'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LanguageSwitcher } from './LanguageSwitcher';
import { TrendingUp } from 'lucide-react';

export function Header() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-secondary/95 backdrop-blur supports-[backdrop-filter]:bg-secondary/60">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="flex h-12 w-12 items-center justify-center rounded-colb">
              <Image
                src="/images/colb_black.webp"
                alt="COLB Academy"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <span className="text-2xl font-bold">COLB Academy</span>
          </Link>

          <nav className="flex items-center space-x-6">
            <Link
              href={`/${locale}/progress`}
              className="flex items-center space-x-2 text-sm hover:text-accent transition-colors"
            >
              <TrendingUp className="h-4 w-4" />
              <span>{locale === 'en' ? 'Progress' : 'Прогресс'}</span>
            </Link>
            <LanguageSwitcher />
          </nav>
        </div>
      </div>
    </header>
  );
}
