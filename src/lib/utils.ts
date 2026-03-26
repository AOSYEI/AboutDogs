import { clsx } from 'clsx';
import type { CategoryMeta, SeverityLevel } from '@/types';

export const cn = (...inputs: Array<string | false | null | undefined>) => clsx(inputs);

export const formatDate = (value: string) =>
  new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(value));

export const categoryMeta: CategoryMeta[] = [
  {
    slug: 'before-buy',
    label: '买前必读',
    description: '从选犬、渠道、预算到法规责任，一次把买前关键信息讲清楚。',
  },
  {
    slug: 'daily-care',
    label: '日常照顾',
    description: '喂养、清洁、如厕训练与用品选择，帮你快速进入稳定养犬节奏。',
  },
  {
    slug: 'health-care',
    label: '健康护理',
    description: '疫苗、常见症状判断、家庭观察和就医建议，更安心地守护爱犬。',
  },
  {
    slug: 'behavior-guide',
    label: '行为引导',
    description: '社会化、基础口令、吠叫纠正和陪伴训练，让相处更省心。',
  },
];

export const categorySlugToLabel = (slug?: string) =>
  categoryMeta.find((item) => item.slug === slug)?.label;

export const labelToCategorySlug = (label: string) =>
  categoryMeta.find((item) => item.label === label)?.slug ?? 'before-buy';

export const severityTone: Record<
  SeverityLevel,
  { badge: string; panel: string; text: string }
> = {
  观察即可: {
    badge: 'bg-emerald-50 text-emerald-700',
    panel: 'border-emerald-200 bg-emerald-50/70',
    text: '继续观察狗狗状态，同时留意精神、食欲和排泄变化。',
  },
  尽快咨询: {
    badge: 'bg-amber-50 text-amber-700',
    panel: 'border-amber-200 bg-amber-50/70',
    text: '建议尽快线上咨询或预约门诊，避免轻微症状拖成大问题。',
  },
  立即就医: {
    badge: 'bg-rose-50 text-rose-700',
    panel: 'border-rose-200 bg-rose-50/70',
    text: '出现紧急风险，请立即联系附近医院或 24 小时急诊。',
  },
};

export const fileToDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
