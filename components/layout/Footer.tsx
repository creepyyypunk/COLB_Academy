export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-secondary">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-center text-sm text-muted-foreground md:text-left">
            {currentYear} COLB Academy. All rights reserved.
          </div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <a
              href="https://www.colb.finance"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              Visit COLB
            </a>
            <span>•</span>
            <span>Educational Platform</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
