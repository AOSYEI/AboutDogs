import { useQuery } from '@tanstack/react-query';
import { knowledgeApi } from '@/api/knowledgeApi';
import { ErrorState } from '@/components/common/ErrorState';
import { LoadingState } from '@/components/common/LoadingState';
import { SectionIntro } from '@/components/common/SectionIntro';

export const ToiletTrainingPage = () => {
  const query = useQuery({
    queryKey: ['toilet-training'],
    queryFn: knowledgeApi.getToiletTrainingSteps,
  });

  if (query.isLoading) return <LoadingState label="正在加载训练步骤..." />;
  if (query.isError) return <ErrorState onRetry={() => query.refetch()} />;

  return (
    <div className="space-y-8">
      <section className="surface-card p-6 sm:p-8">
        <SectionIntro
          eyebrow="Toilet Training"
          title="如厕训练分步指南"
          description="把“不要急、不要吼”拆成可以照着执行的 4 个步骤。"
        />
      </section>
      <div className="grid gap-5 lg:grid-cols-2">
        {query.data?.map((step, index) => (
          <article key={step.title} className="surface-card p-6">
            <div className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-600">STEP {index + 1}</div>
            <h2 className="mt-3 text-2xl font-bold text-ink">{step.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{step.description}</p>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-500">
              {step.tips.map((tip) => (
                <li key={tip} className="flex gap-2"><span>•</span><span>{tip}</span></li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
};
