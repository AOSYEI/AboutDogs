import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
}

export const Button = ({
  children,
  className,
  variant = 'primary',
  ...props
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      className={cn(
        variant === 'primary' && 'btn-primary',
        variant === 'secondary' && 'btn-secondary',
        variant === 'ghost' && 'inline-flex items-center justify-center rounded-2xl px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
