import { Button } from './Button';

export const ErrorState = ({
  title = '加载失败',
  description = '演示数据暂时不可用，请稍后再试。',
  onRetry,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
}) => (
  <div className="surface-card px-6 py-12 text-center">
    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-50 text-2xl">⚠️</div>
    <h3 className="text-lg font-semibold text-ink">{title}</h3>
    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">{description}</p>
    {onRetry ? (
      <div className="mt-5">
        <Button onClick={onRetry}>重新加载</Button>
      </div>
    ) : null}
  </div>
);
