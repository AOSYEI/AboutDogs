import type { PropsWithChildren, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Button } from './Button';

interface ModalProps {
  open: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  footer?: ReactNode;
}

export const Modal = ({
  open,
  title,
  description,
  onClose,
  footer,
  children,
}: PropsWithChildren<ModalProps>) => {
  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 py-8 backdrop-blur-sm">
      <div className="surface-card max-h-[90vh] w-full max-w-2xl overflow-y-auto p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-ink">{title}</h3>
            {description ? <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p> : null}
          </div>
          <Button type="button" variant="ghost" onClick={onClose}>
            ??
          </Button>
        </div>
        <div>{children}</div>
        {footer ? <div className="mt-6 flex justify-end gap-3">{footer}</div> : null}
      </div>
    </div>,
    document.body,
  );
};
