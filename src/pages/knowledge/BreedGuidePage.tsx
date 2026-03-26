import { useQuery } from '@tanstack/react-query';
import { knowledgeApi } from '@/api/knowledgeApi';
import { ErrorState } from '@/components/common/ErrorState';
import { LoadingState } from '@/components/common/LoadingState';
import { RatingStars } from '@/components/common/RatingStars';
import { SectionIntro } from '@/components/common/SectionIntro';

export const BreedGuidePage = () => {
  const query = useQuery({
    queryKey: ['breeds'],
    queryFn: knowledgeApi.getBreeds,
  });

  if (query.isLoading) return <LoadingState label="正在加载品种推荐..." />;
  if (query.isError) return <ErrorState onRetry={() => query.refetch()} />;

  return (
    <div className="space-y-8">
      <section className="surface-card p-6 sm:p-8">
        <SectionIntro
          eyebrow="Breed Picker"
          title="新手品种选择页"
          description="每张卡片只保留新手最关心的三个信息点：适合人群、麻烦事、新手友好度。"
        />
      </section>
      <div className="grid gap-6 lg:grid-cols-2">
        {query.data?.map((breed) => (
          <article key={breed.id} className="surface-card overflow-hidden">
            <img src={breed.image} alt={breed.name} className="h-60 w-full object-cover" />
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-ink">{breed.name}</h2>
                  <p className="mt-2 text-sm text-slate-500">{breed.personality}</p>
                </div>
                <RatingStars value={breed.beginnerRating} />
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-50 p-4">
                  <div className="text-sm font-semibold text-brand-600">适合人群</div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{breed.suitableFor}</p>
                </div>
                <div className="rounded-3xl bg-amber-50 p-4">
                  <div className="text-sm font-semibold text-amber-700">麻烦事</div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{breed.troubleNote}</p>
                </div>
              </div>
              <div className="mt-5 rounded-3xl border border-brand-200 bg-brand-50 p-5">
                <div className="text-sm font-semibold text-brand-700">养犬人实话</div>
                <p className="mt-2 text-sm leading-7 text-slate-600">{breed.truthTalk}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
