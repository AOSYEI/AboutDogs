import { Link } from 'react-router-dom';

export const NotFoundPage = () => (
  <div className="surface-card px-6 py-16 text-center">
    <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-brand-50 text-4xl">🐕</div>
    <h1 className="text-3xl font-black text-ink">页面走丢了</h1>
    <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-500">
      你访问的页面不存在，可能是链接失效，或者这只小狗还没把页面叼回来。
    </p>
    <div className="mt-6 flex justify-center gap-3">
      <Link className="btn-primary" to="/">回到首页</Link>
      <Link className="btn-secondary" to="/knowledge">去知识库</Link>
    </div>
  </div>
);
