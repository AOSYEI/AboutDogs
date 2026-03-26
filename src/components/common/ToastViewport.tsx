import { useUIStore } from '@/stores/uiStore';
import { cn } from '@/lib/utils';

const toneClass = {
  success: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  error: 'border-rose-200 bg-rose-50 text-rose-800',
  info: 'border-sky-200 bg-sky-50 text-sky-800',
};

export const ToastViewport = () => {
  const { toasts, removeToast } = useUIStore();

  return (
    <div className="fixed right-4 top-4 z-[60] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3">
      {toasts.map((toast) => (
        <div key={toast.id} className={cn('rounded-3xl border px-4 py-3 shadow-soft', toneClass[toast.tone])}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-semibold">{toast.title}</p>
              {toast.description ? <p className="mt-1 text-sm opacity-80">{toast.description}</p> : null}
            </div>
            <button className="text-xs opacity-70" onClick={() => removeToast(toast.id)}>
              ??
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
