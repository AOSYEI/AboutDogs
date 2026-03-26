import type { ReactNode } from 'react';

interface SectionIntroProps {
  eyebrow?: string;
  title: string;
  description: string;
  action?: ReactNode;
}

export const SectionIntro = ({ eyebrow, title, description, action }: SectionIntroProps) => (
  <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
    <div>
      {eyebrow ? <div className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-600">{eyebrow}</div> : null}
      <h2 className="section-title">{title}</h2>
      <p className="section-desc">{description}</p>
    </div>
    {action}
  </div>
);
