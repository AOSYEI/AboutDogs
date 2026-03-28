import { Link } from 'react-router-dom';
import { SectionIntro } from '@/components/common/SectionIntro';

const helpGroups = [
  {
    title: '如何快速上手',
    items: ['首页首屏提供新手入口，可从品种选择、喂食指南、症状判断开始。', '首次访问首页会显示新手引导浮层，可直接跳转到核心模块。'],
  },
  {
    title: '账号与个人中心',
    items: ['登录、注册、找回密码均为前端演示流程。', '个人资料、宠物档案、收藏、预约和我的发布会保存在本地浏览器中。'],
  },
  {
    title: '服务与社区',
    items: ['服务大厅支持筛选、排序、查看详情并提交预约。', '社区支持发帖、图片预览、评论和点赞，适合演示互动闭环。'],
  },
];

const commonQuestions = [
  {
    q: '为什么我换了浏览器后数据不见了？',
    a: '因为当前版本使用 localStorage 保存演示数据，数据只存在当前浏览器环境中。',
  },
  {
    q: '为什么预约或发帖后不会真的发送给商家？',
    a: '当前站点是 Mock 优先的前端演示站，所有提交只会写入本地模拟数据。',
  },
  {
    q: '如果页面显示异常，我该怎么处理？',
    a: '优先尝试刷新页面；如果仍有问题，可以前往联系我们页面并附上复现步骤。',
  },
];

export const HelpCenterPage = () => (
  <div className="space-y-8">
    <section className="surface-card p-6 sm:p-8">
      <SectionIntro
        eyebrow="Help Center"
        title="帮助中心"
        description="这里整理了站点使用方式、常见问题和演示说明，适合第一次使用时快速查阅。"
      />
      <div className="grid gap-4 lg:grid-cols-3">
        {helpGroups.map((group) => (
          <article key={group.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="text-lg font-semibold text-ink">{group.title}</h3>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
              {group.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-brand-600">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>

    <section className="surface-card p-6 sm:p-8">
      <SectionIntro
        title="常见问题"
        description="如果你对站点行为有疑问，通常可以先从下面几条找到答案。"
      />
      <div className="space-y-4">
        {commonQuestions.map((item) => (
          <article key={item.q} className="rounded-3xl border border-slate-200 bg-white p-5">
            <h3 className="text-lg font-semibold text-ink">{item.q}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">{item.a}</p>
          </article>
        ))}
      </div>
    </section>

    <section className="surface-card p-6 sm:p-8">
      <SectionIntro
        title="继续浏览"
        description="如果你已经知道自己要找什么，可以直接跳转到对应模块继续使用。"
      />
      <div className="flex flex-wrap gap-3">
        <Link className="btn-primary" to="/knowledge">去知识库</Link>
        <Link className="btn-secondary" to="/services">去服务大厅</Link>
        <Link className="btn-secondary" to="/community">去社区</Link>
        <Link className="btn-secondary" to="/contact">联系支持</Link>
      </div>
    </section>
  </div>
);
