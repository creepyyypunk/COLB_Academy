import { loadQuiz } from '@/lib/content/contentLoader';
import { QuizContainer } from '@/components/quiz/QuizContainer';

export default async function QuizPage({
  params,
}: {
  params: { locale: string; blockId: string };
}) {
  try {
    const quiz = await loadQuiz(params.locale, params.blockId);

    return <QuizContainer quiz={quiz} locale={params.locale} />;
  } catch (error) {
    console.error('Error loading quiz:', error);
    return (
      <div className="mx-auto max-w-4xl px-6 py-12 text-center">
        <h1 className="text-2xl font-bold">
          {params.locale === 'en' ? 'Quiz not found' : 'Тест не найден'}
        </h1>
        <p className="mt-4 text-muted-foreground">
          {params.locale === 'en'
            ? 'The quiz for this block has not been created yet.'
            : 'Тест для этого блока еще не создан.'}
        </p>
      </div>
    );
  }
}
