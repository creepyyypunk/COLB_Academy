const dictionaries = {
  en: () => import('@/locales/en/common.json').then((module) => module.default),
  ru: () => import('@/locales/ru/common.json').then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
  if (locale !== 'en' && locale !== 'ru') {
    locale = 'en';
  }
  return dictionaries[locale as keyof typeof dictionaries]();
};
