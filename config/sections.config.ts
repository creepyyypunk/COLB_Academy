export interface Section {
  id: string;
  title: {
    en: string;
    ru: string;
  };
  description: {
    en: string;
    ru: string;
  };
  blockIds: string[];
  order: number;
}

export const sections: Section[] = [
  {
    id: 'colb-whitepaper',
    title: {
      en: 'COLB Whitepaper',
      ru: 'COLB Whitepaper',
    },
    description: {
      en: 'Core documentation on COLB tokenization and blockchain technology',
      ru: 'Основная документация о токенизации COLB и технологии блокчейн',
    },
    blockIds: ['block-1', 'block-2', 'block-3', 'block-4', 'block-5', 'block-6', 'block-7'],
    order: 1,
  },
  {
    id: 'appendices',
    title: {
      en: 'Appendices to the COLB Whitepaper',
      ru: 'Приложения к COLB Whitepaper',
    },
    description: {
      en: 'Supplementary materials and additional technical documentation',
      ru: 'Дополнительные материалы и техническая документация',
    },
    blockIds: ['block-8', 'block-9', 'block-10', 'block-12'],
    order: 2,
  },
  {
    id: 'usc-whitepaper',
    title: {
      en: '$USC Whitepaper',
      ru: '$USC Whitepaper',
    },
    description: {
      en: 'Documentation on COLB USD stablecoin infrastructure',
      ru: 'Документация по инфраструктуре стейблкоина COLB USD',
    },
    blockIds: ['block-13', 'block-14', 'block-15', 'block-16', 'block-17', 'block-18', 'block-19'],
    order: 3,
  },
];

export function getSectionById(sectionId: string): Section | undefined {
  return sections.find((s) => s.id === sectionId);
}

export function getAllSections(): Section[] {
  return sections.sort((a, b) => a.order - b.order);
}
