import fs from 'fs/promises';
import path from 'path';
import { BlockMetadata, BlockContent } from '@/types/content.types';
import { Quiz } from '@/types/quiz.types';

export async function loadBlockMetadata(
  locale: string,
  blockId: string
): Promise<BlockMetadata> {
  const metadataPath = path.join(
    process.cwd(),
    'content',
    locale,
    'blocks',
    blockId,
    'metadata.json'
  );
  const data = await fs.readFile(metadataPath, 'utf-8');
  return JSON.parse(data);
}

export async function loadBlockContent(
  locale: string,
  blockId: string
): Promise<BlockContent> {
  const metadata = await loadBlockMetadata(locale, blockId);
  const sections = new Map<string, string>();

  for (const section of metadata.sections) {
    const contentPath = path.join(
      process.cwd(),
      'content',
      locale,
      'blocks',
      blockId,
      section.filename
    );
    const content = await fs.readFile(contentPath, 'utf-8');
    sections.set(section.id, content);
  }

  return { metadata, sections };
}

export async function loadAllBlocks(locale: string): Promise<BlockMetadata[]> {
  const blocksPath = path.join(process.cwd(), 'content', locale, 'blocks');

  try {
    const blockDirs = await fs.readdir(blocksPath);
    const blocks = await Promise.all(
      blockDirs
        .filter((dir) => dir.startsWith('block-'))
        .map((blockId) => loadBlockMetadata(locale, blockId))
    );

    return blocks.sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error('Error loading blocks:', error);
    return [];
  }
}

export async function loadQuiz(locale: string, blockId: string): Promise<Quiz> {
  const quizPath = path.join(
    process.cwd(),
    'content',
    locale,
    'quizzes',
    `${blockId}-quiz.json`
  );
  const data = await fs.readFile(quizPath, 'utf-8');
  return JSON.parse(data);
}
