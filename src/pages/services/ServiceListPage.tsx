import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { servicesApi } from '@/api/servicesApi';
import { EmptyState } from '@/components/common/EmptyState';
import { ErrorState } from '@/components/common/ErrorState';
import { LoadingState } from '@/components/common/LoadingState';
import { RatingStars } from '@/components/common/RatingStars';
import { SectionIntro } from '@/components/common/SectionIntro';
import { useUIStore } from '@/stores/uiStore';

const typeOptions = ['全部', '训练师', '兽医', '寄养', '美容'] as const;

export const ServiceListPage = () => {
  const { serviceTypeFilter, serviceSort, setServiceTypeFilter, setServiceSort } = useUIStore();
  const query = useQuery({
    queryKey: ['services', serviceTypeFilter, serviceSort],
    queryFn: () => servicesApi.getServices({ type: serviceTypeFilter, sort: serviceSort }),
  });

  return (
    <div className="space-y-8">
      <section className="surface-card p-6 sm:p-8">
        <SectionIntro
          eyebrow="Service Market"
          title="服务大厅"
          description="训练师、兽医、寄养、美容等常见养犬服务一站查看，支持按类型和距离 / 评分筛选。"
        />
        <div className="grid gap-4 md:grid-cols-[1fr,220px]">
          <div className="flex flex-wrap gap-3">
            {typeOptions.map((option) => (
              <button
                key={option}
                className={`chip ${option === serviceTypeFilter ? 'chip-active' : ''}`}
                onClick={() => setServiceTypeFilter(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <select
            className="form-select"
            value={serviceSort}
            onChange={(event) => setServiceSort(event.target.value as 'distance' | 'rating')}
          >
            <option value="rating">按评分排序</option>
            <option value="distance">按距离排序</option>
          </select>
        </div>
      </section>

      {query.isLoading ? (
        <LoadingState label="正在加载服务商列表..." />
      ) : query.isError ? (
        <ErrorState onRetry={() => query.refetch()} />
      ) : query.data?.length ? (
        <div className="grid gap-5 lg:grid-cols-2">
          {query.data.map((service) => (
            <article key={service.id} className="surface-card overflow-hidden p-5">
              <div className="grid gap-5 md:grid-cols-[220px,1fr]">
                <img src={service.image} alt={service.name} className="h-52 w-full rounded-3xl object-cover md:h-full" />
                <div>
                  <div className="flex flex-wrap gap-2">
                    {service.badges.map((badge) => (
                      <span key={badge} className="chip">{badge}</span>
                    ))}
                    <span className="chip">{service.type}</span>
                  </div>
                  <h2 className="mt-4 text-2xl font-bold text-ink">{service.name}</h2>
                  <p className="mt-2 text-sm text-slate-500">{service.location} · {service.distanceKm.toFixed(1)} km</p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{service.intro}</p>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <RatingStars value={service.rating} />
                    <div className="text-sm font-semibold text-brand-600">{service.priceRange}</div>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link className="btn-primary" to={`/services/${service.id}`}>查看详情</Link>
                    <Link className="btn-secondary" to={`/services/${service.id}`}>立即预约</Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <EmptyState title="暂无匹配服务" description="你可以切换服务类型或排序方式，看看其他推荐。" />
      )}
    </div>
  );
};
