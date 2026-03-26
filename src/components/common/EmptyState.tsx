import type { ReactNode } from 'react';

export const EmptyState = ({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) => (
  <div className="surface-card px-6 py-12 text-center">
    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-2xl">??</div>
    <h3 className="text-lg font-semibold text-ink">{title}</h3>
    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">{description}</p>
    {action ? <div className="mt-5">{action}</div> : null}
  </div>
);
