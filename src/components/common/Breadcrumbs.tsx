import { Link, useLocation } from 'react-router-dom';

const labels: Record<string, string> = {
  knowledge: '知识库',
  services: '服务大厅',
  community: '用户社区',
  me: '个人中心',
  auth: '账号',
  login: '登录',
  register: '注册',
  'forgot-password': '找回密码',
  article: '文章详情',
  breeds: '品种选择',
  'feeding-guide': '喂食指南',
  'toilet-training': '如厕训练',
  'symptom-checker': '症状判断',
  post: '帖子详情',
  'before-buy': '买前必读',
  'daily-care': '日常照顾',
  'health-care': '健康护理',
  'behavior-guide': '行为引导',
};

export const Breadcrumbs = () => {
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);
  if (segments.length === 0) return null;

  return (
    <div className="shell-container mb-4 mt-4 text-sm text-slate-500">
      <div className="flex flex-wrap items-center gap-2">
        <Link to="/" className="hover:text-brand-600">
          首页
        </Link>
        {segments.map((segment, index) => {
          const path = `/${segments.slice(0, index + 1).join('/')}`;
          const isLast = index === segments.length - 1;
          return (
            <span key={path} className="flex items-center gap-2">
              <span>/</span>
              {isLast ? (
                <span className="font-medium text-slate-700">{labels[segment] ?? '详情'}</span>
              ) : (
                <Link to={path} className="hover:text-brand-600">
                  {labels[segment] ?? segment}
                </Link>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
};
