'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <article
      className="prose prose-lg max-w-none
      prose-headings:font-bold
      prose-h1:text-4xl prose-h1:mb-6
      prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4
      prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
      prose-p:text-gray-700 prose-p:leading-relaxed
      prose-a:text-accent prose-a:no-underline hover:prose-a:underline
      prose-strong:text-primary prose-strong:font-semibold
      prose-ul:my-6 prose-ol:my-6
      prose-li:my-2
      prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded
      prose-pre:bg-muted prose-pre:border prose-pre:border-border
    "
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw, rehypeSanitize]}>
        {content}
      </ReactMarkdown>
    </article>
  );
}
