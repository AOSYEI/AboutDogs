export const LoadingState = ({ label = '正在加载内容...' }: { label?: string }) => (
  <div className="surface-card flex min-h-48 items-center justify-center px-6 py-10 text-center text-sm text-slate-500">
    <div>
      <div className="mx-auto mb-3 h-10 w-10 animate-spin rounded-full border-4 border-brand-100 border-t-brand-500" />
      <p>{label}</p>
    </div>
  </div>
);
