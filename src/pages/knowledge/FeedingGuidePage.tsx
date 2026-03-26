import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { knowledgeApi } from '@/api/knowledgeApi';
import { ErrorState } from '@/components/common/ErrorState';
import { LoadingState } from '@/components/common/LoadingState';
import { SectionIntro } from '@/components/common/SectionIntro';

export const FeedingGuidePage = () => {
  const query = useQuery({
    queryKey: ['feeding-guide'],
    queryFn: knowledgeApi.getFeedingGuide,
  });
  const [age, setAge] = useState('2-4 月龄');
  const [weight, setWeight] = useState('1-5kg');

  const result = useMemo(
    () => query.data?.find((item) => item.age === age && item.weight === weight),
    [age, query.data, weight],
  );

  if (query.isLoading) return <LoadingState label="正在加载喂食指南..." />;
  if (query.isError) return <ErrorState onRetry={() => query.refetch()} />;

  return (
    <div className="space-y-8">
      <section className="surface-card p-6 sm:p-8">
        <SectionIntro
          eyebrow="Feeding Guide"
          title="年龄 + 体重喂食查表"
          description="把复杂问题拆成两个选择，让新手更快得到一个稳妥的起点。"
        />
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">年龄阶段</label>
            <select className="form-select" value={age} onChange={(event) => setAge(event.target.value)}>
              {[...new Set(query.data?.map((item) => item.age))].map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">体重范围</label>
            <select className="form-select" value={weight} onChange={(event) => setWeight(event.target.value)}>
              {[...new Set(query.data?.map((item) => item.weight))].map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="surface-card p-6 sm:p-8">
        <div className="overflow-hidden rounded-3xl border border-slate-200">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3 font-semibold">年龄</th>
                <th className="px-4 py-3 font-semibold">体重</th>
                <th className="px-4 py-3 font-semibold">建议喂食量</th>
                <th className="px-4 py-3 font-semibold">每天餐次</th>
                <th className="px-4 py-3 font-semibold">喂养提示</th>
              </tr>
            </thead>
            <tbody>
              {result ? (
                <tr>
                  <td className="px-4 py-4">{result.age}</td>
                  <td className="px-4 py-4">{result.weight}</td>
                  <td className="px-4 py-4 font-semibold text-brand-600">{result.foodAmount}</td>
                  <td className="px-4 py-4">{result.frequency}</td>
                  <td className="px-4 py-4 leading-6 text-slate-600">{result.tips}</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
        <div className="mt-5 rounded-3xl border border-sky-200 bg-sky-50 p-5 text-sm leading-7 text-slate-600">
          <strong className="text-sky-700">傻瓜式提醒：</strong>
          喂食查表是起点，不是死规定。更重要的是观察精神、便便、体态和体重变化，必要时咨询兽医调整。
        </div>
      </section>
    </div>
  );
};
