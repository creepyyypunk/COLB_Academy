import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'COLB Academy - Learn Tokenization',
  description: 'Educational platform for learning about COLB tokenization and blockchain technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
