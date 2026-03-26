import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { knowledgeApi } from '@/api/knowledgeApi';
import { ErrorState } from '@/components/common/ErrorState';
import { LoadingState } from '@/components/common/LoadingState';
import { SectionIntro } from '@/components/common/SectionIntro';
import { severityTone } from '@/lib/utils';

export const SymptomCheckerPage = () => {
  const query = useQuery({
    queryKey: ['symptom-guides'],
    queryFn: knowledgeApi.getSymptomGuides,
  });
  const [selectedId, setSelectedId] = useState('symptom-vomit');

  if (query.isLoading) return <LoadingState label="正在加载症状判断工具..." />;
  if (query.isError) return <ErrorState onRetry={() => query.refetch()} />;

  const current = query.data?.find((item) => item.id === selectedId) ?? query.data?.[0];
  const tone = current ? severityTone[current.level] : null;

  return (
    <div className="space-y-8">
      <section className="surface-card p-6 sm:p-8">
        <SectionIntro
          eyebrow="Symptom Checker"
          title="症状判断对比表"
          description="点击症状后，先告诉你紧急程度，再给出下一步建议。"
        />
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {query.data?.map((item) => (
            <button
              key={item.id}
              className={`rounded-3xl border p-4 text-left transition ${item.id === current?.id ? 'border-brand-400 bg-brand-50' : 'border-slate-200 bg-white hover:border-brand-200'}`}
              onClick={() => setSelectedId(item.id)}
            >
              <div className="text-sm font-semibold text-brand-600">症状</div>
              <div className="mt-2 font-semibold text-ink">{item.symptom}</div>
            </button>
          ))}
        </div>
      </section>

      {current && tone ? (
        <section className={`surface-card border ${tone.panel} p-6 sm:p-8`}>
          <div className="flex flex-wrap items-center gap-3">
            <span className={`rounded-full px-3 py-1 text-sm font-semibold ${tone.badge}`}>{current.level}</span>
            <h2 className="text-2xl font-bold text-ink">{current.symptom}</h2>
          </div>
          <p className="mt-4 text-base leading-8 text-slate-700">{current.summary}</p>
          <div className="mt-6 rounded-3xl bg-white/70 p-5">
            <div className="text-sm font-semibold text-slate-700">下一步建议</div>
            <p className="mt-2 text-sm leading-7 text-slate-600">{tone.text}</p>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-600">
              {current.suggestion.map((item) => (
                <li key={item} className="flex gap-2"><span>•</span><span>{item}</span></li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </div>
  );
};
