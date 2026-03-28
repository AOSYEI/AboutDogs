import { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { seedDemoData } from '@/api/seed';
import { useAuthStore } from '@/stores/authStore';
import { useUIStore } from '@/stores/uiStore';
import { Button } from '@/components/common/Button';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { Modal } from '@/components/common/Modal';
import { ToastViewport } from '@/components/common/ToastViewport';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/', label: '首页' },
  { to: '/knowledge', label: '知识库' },
  { to: '/services', label: '服务大厅' },
  { to: '/community', label: '社区' },
  { to: '/me', label: '个人中心' },
];

const guideCards = [
  { title: '先看知识库', desc: '用通俗内容快速补齐养狗前后的基础信息。', to: '/knowledge' },
  { title: '再逛服务大厅', desc: '筛选训练、医疗、寄养、美容等真实服务场景。', to: '/services' },
  { title: '最后进社区', desc: '看看新手主人都在问什么，也能自己发帖记录。', to: '/community' },
];

const footerHelpLinks = [
  {
    to: '/about',
    title: '关于我们',
    desc: '了解汪汪小站的定位、内容原则和当前版本范围。',
  },
  {
    to: '/contact',
    title: '联系我们',
    desc: '查看反馈邮箱、合作方向和演示项目联络方式。',
  },
  {
    to: '/help',
    title: '帮助中心',
    desc: '快速了解站点使用方式、常见问题和演示说明。',
  },
];

export const AppShell = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuthStore();
  const { mobileMenuOpen, setMobileMenuOpen, hasSeenGuide, markGuideSeen } = useUIStore();
  const [guideOpen, setGuideOpen] = useState(false);

  useEffect(() => {
    seedDemoData();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === '/' && !hasSeenGuide) {
      setGuideOpen(true);
    }
  }, [hasSeenGuide, location.pathname]);

  const authArea = useMemo(() => {
    if (isAuthenticated && user) {
      return (
        <div className="hidden items-center gap-3 lg:flex">
          <img src={user.avatar} alt={user.nickname} className="h-10 w-10 rounded-full object-cover" />
          <div>
            <div className="text-sm font-semibold text-ink">{user.nickname}</div>
            <div className="text-xs text-slate-500">已登录体验</div>
          </div>
          <Button
            variant="secondary"
            onClick={() => {
              logout();
              navigate('/');
            }}
          >
            退出
          </Button>
        </div>
      );
    }

    return (
      <div className="hidden items-center gap-3 lg:flex">
        <Link to="/auth/login" className="btn-secondary">
          登录
        </Link>
        <Link to="/auth/register" className="btn-primary">
          注册
        </Link>
      </div>
    );
  }, [isAuthenticated, logout, navigate, user]);

  return (
    <div className="min-h-screen bg-hero-glow">
      <header className="sticky top-0 z-40 border-b border-white/80 bg-white/90 backdrop-blur">
        <div className="shell-container flex h-18 items-center justify-between gap-4 py-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-2xl">🐾</div>
            <div>
              <div className="text-lg font-black text-ink">汪汪小站</div>
              <div className="text-xs text-slate-500">新手养犬知识与服务指南</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'rounded-2xl px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-brand-50 hover:text-brand-700',
                    isActive && 'bg-brand-50 text-brand-700',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {authArea}
            <button
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-lg lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              ☰
            </button>
          </div>
        </div>

        {mobileMenuOpen ? (
          <div className="border-t border-slate-100 bg-white lg:hidden">
            <div className="shell-container grid gap-2 py-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'rounded-2xl px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-brand-50 hover:text-brand-700',
                      isActive && 'bg-brand-50 text-brand-700',
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <div className="mt-2 grid grid-cols-2 gap-3">
                <Link className="btn-secondary text-center" to="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                  登录
                </Link>
                <Link className="btn-primary text-center" to="/auth/register" onClick={() => setMobileMenuOpen(false)}>
                  注册
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </header>

      <Breadcrumbs />
      <main className="shell-container pb-16">
        <Outlet />
      </main>

      <footer className="border-t border-white/60 bg-white/80 py-10 backdrop-blur">
        <div className="shell-container grid gap-8 md:grid-cols-[1.5fr,1fr,1fr]">
          <div>
            <h3 className="text-lg font-bold text-ink">汪汪小站</h3>
            <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
              为准新手和新手主人提供更通俗的犬类知识、服务推荐和社区交流体验。当前为 Mock 演示站，适合前端方案展示与功能联调。
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-ink">快速入口</h4>
            <div className="mt-3 grid gap-2 text-sm text-slate-500">
              <Link to="/knowledge" className="hover:text-brand-600">知识库</Link>
              <Link to="/services" className="hover:text-brand-600">服务大厅</Link>
              <Link to="/community" className="hover:text-brand-600">用户社区</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-ink">帮助信息</h4>
            <div className="mt-3 grid gap-3 text-sm text-slate-500">
              {footerHelpLinks.map((item) => (
                <Link key={item.to} to={item.to} className="rounded-2xl p-2 transition hover:bg-brand-50 hover:text-brand-700">
                  <div className="font-medium text-slate-700">{item.title}</div>
                  <div className="mt-1 text-xs leading-5 text-slate-500">{item.desc}</div>
                </Link>
              ))}
              <span className="pt-1 text-xs text-slate-400">© 2026 AboutDogs</span>
            </div>
          </div>
        </div>
      </footer>

      <ToastViewport />

      <Modal
        open={guideOpen}
        title="欢迎来到汪汪小站"
        description="这是一个为新手养犬人准备的演示站。你可以按下面的顺序快速上手，也可以直接关闭稍后再看。"
        onClose={() => {
          setGuideOpen(false);
          markGuideSeen();
        }}
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => {
                setGuideOpen(false);
                markGuideSeen();
              }}
            >
              稍后再看
            </Button>
            <Button
              onClick={() => {
                setGuideOpen(false);
                markGuideSeen();
                navigate('/knowledge');
              }}
            >
              立即开始
            </Button>
          </>
        }
      >
        <div className="grid gap-4 md:grid-cols-3">
          {guideCards.map((card) => (
            <button
              key={card.title}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-left transition hover:border-brand-300 hover:bg-brand-50"
              onClick={() => {
                setGuideOpen(false);
                markGuideSeen();
                navigate(card.to);
              }}
            >
              <h4 className="font-semibold text-ink">{card.title}</h4>
              <p className="mt-2 text-sm leading-6 text-slate-500">{card.desc}</p>
            </button>
          ))}
        </div>
      </Modal>
    </div>
  );
};
