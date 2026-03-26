import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { z } from 'zod';
import { servicesApi } from '@/api/servicesApi';
import { Button } from '@/components/common/Button';
import { ErrorState } from '@/components/common/ErrorState';
import { LoadingState } from '@/components/common/LoadingState';
import { Modal } from '@/components/common/Modal';
import { RatingStars } from '@/components/common/RatingStars';
import { SectionIntro } from '@/components/common/SectionIntro';
import { formatDate } from '@/lib/utils';
import { useUIStore } from '@/stores/uiStore';
import { useState } from 'react';

const schema = z.object({
  serviceName: z.string().min(1, '请选择服务项目'),
  date: z.string().min(1, '请选择日期'),
  time: z.string().min(1, '请选择时间'),
  petName: z.string().min(1, '请填写宠物名称'),
  petBreed: z.string().min(1, '请填写宠物品种'),
  note: z.string().max(120, '备注请控制在 120 字以内').optional(),
});

type FormValues = z.infer<typeof schema>;

export const ServiceDetailPage = () => {
  const { id = '' } = useParams();
  const [open, setOpen] = useState(false);
  const addToast = useUIStore((state) => state.addToast);
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['service', id],
    queryFn: () => servicesApi.getServiceById(id),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const bookingMutation = useMutation({
    mutationFn: async (values: FormValues) => {
      if (!query.data) throw new Error('服务信息不存在');
      return servicesApi.createBooking({
        providerId: query.data.id,
        providerName: query.data.name,
        ...values,
        note: values.note ?? '',
      });
    },
    onSuccess: () => {
      addToast({ title: '预约已提交', description: '你可以在个人中心查看预约状态。', tone: 'success' });
      queryClient.invalidateQueries({ queryKey: ['profile-bookings'] });
      setOpen(false);
      reset();
    },
    onError: (error) => {
      addToast({ title: '预约失败', description: error.message, tone: 'error' });
    },
  });

  if (query.isLoading) return <LoadingState label="正在加载服务详情..." />;
  if (query.isError || !query.data) return <ErrorState onRetry={() => query.refetch()} />;

  const service = query.data;

  return (
    <div className="space-y-8">
      <section className="surface-card overflow-hidden">
        <img src={service.image} alt={service.name} className="h-[260px] w-full object-cover sm:h-[340px]" />
        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap gap-2">
            {service.badges.map((badge) => (
              <span key={badge} className="chip">{badge}</span>
            ))}
            <span className="chip chip-active">{service.type}</span>
          </div>
          <div className="mt-5 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black text-ink sm:text-4xl">{service.name}</h1>
              <p className="mt-2 text-sm text-slate-500">{service.location} · 约 {service.distanceKm.toFixed(1)} km</p>
            </div>
            <div className="rounded-3xl bg-brand-50 px-5 py-4 text-right">
              <div className="text-sm font-semibold text-brand-700">价格区间</div>
              <div className="mt-1 text-2xl font-black text-brand-700">{service.priceRange}</div>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <RatingStars value={service.rating} />
            <Button onClick={() => setOpen(true)}>立即预约</Button>
          </div>
          <p className="mt-6 text-base leading-8 text-slate-600">{service.intro}</p>
        </div>
      </section>

      <section className="surface-card p-6 sm:p-8">
        <SectionIntro title="服务项目" description="支持按需选择项目、时间和宠物信息进行预约。" />
        <div className="grid gap-4 md:grid-cols-3">
          {service.serviceItems.map((item) => (
            <article key={item.name} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-lg font-semibold text-ink">{item.name}</h3>
              <p className="mt-2 text-sm text-slate-500">时长：{item.duration}</p>
              <p className="mt-4 text-xl font-bold text-brand-600">{item.price}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="surface-card p-6 sm:p-8">
        <SectionIntro title="用户评价" description="看看其他主人如何评价服务体验。" />
        <div className="space-y-4">
          {service.reviews.map((review) => (
            <article key={review.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center gap-3">
                <img src={review.avatar} alt={review.author} className="h-12 w-12 rounded-full object-cover" />
                <div>
                  <div className="font-semibold text-ink">{review.author}</div>
                  <div className="text-xs text-slate-500">{formatDate(review.createdAt)}</div>
                </div>
              </div>
              <div className="mt-3"><RatingStars value={review.rating} /></div>
              <p className="mt-3 text-sm leading-7 text-slate-600">{review.content}</p>
            </article>
          ))}
        </div>
      </section>

      <Modal
        open={open}
        title="预约服务"
        description="填写服务项目、时间与宠物信息，提交后会写入本地 Mock 数据。"
        onClose={() => setOpen(false)}
      >
        <form className="space-y-5" onSubmit={handleSubmit((values) => bookingMutation.mutate(values))}>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">服务项目</label>
            <select className="form-select" {...register('serviceName')}>
              <option value="">请选择服务项目</option>
              {service.serviceItems.map((item) => (
                <option key={item.name} value={item.name}>{item.name}</option>
              ))}
            </select>
            {errors.serviceName ? <p className="mt-2 text-sm text-rose-600">{errors.serviceName.message}</p> : null}
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">日期</label>
              <input type="date" className="form-input" {...register('date')} />
              {errors.date ? <p className="mt-2 text-sm text-rose-600">{errors.date.message}</p> : null}
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">时间</label>
              <input type="time" className="form-input" {...register('time')} />
              {errors.time ? <p className="mt-2 text-sm text-rose-600">{errors.time.message}</p> : null}
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">宠物名称</label>
              <input className="form-input" placeholder="例如：拿铁" {...register('petName')} />
              {errors.petName ? <p className="mt-2 text-sm text-rose-600">{errors.petName.message}</p> : null}
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">宠物品种</label>
              <input className="form-input" placeholder="例如：边境牧羊犬" {...register('petBreed')} />
              {errors.petBreed ? <p className="mt-2 text-sm text-rose-600">{errors.petBreed.message}</p> : null}
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">备注</label>
            <textarea className="form-textarea" placeholder="补充狗狗年龄、注意事项、近期状态等" {...register('note')} />
            {errors.note ? <p className="mt-2 text-sm text-rose-600">{errors.note.message}</p> : null}
          </div>
          <div className="flex justify-end gap-3">
            <Button type="button" variant="secondary" onClick={() => setOpen(false)}>取消</Button>
            <Button type="submit" disabled={bookingMutation.isPending}>
              {bookingMutation.isPending ? '提交中...' : '确认预约'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
