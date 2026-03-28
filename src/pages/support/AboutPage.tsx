import { Link } from 'react-router-dom';
import { SectionIntro } from '@/components/common/SectionIntro';

const highlights = [
  {
    title: '定位清晰',
    description: '面向准新手和新手养犬人，把零散知识整理成更通俗、可执行、可快速浏览的内容结构。',
  },
  {
    title: '内容实用',
    description: '围绕买前决策、日常照顾、健康护理、行为引导四条主线，帮助用户更快建立稳定养犬节奏。',
  },
  {
    title: '服务联动',
    description: '除知识内容外，还把训练、医疗、寄养、美容等高频服务场景纳入统一体验流程。',
  },
];

const principles = [
  '先讲“新手最想知道什么”，再展开专业细节。',
  '尽量用场景语言和操作建议，减少抽象说明。',
  '首版以前端演示为目标，优先保证浏览和交互闭环。',
];

export const AboutPage = () => (
  <div className="space-y-8">
    <section className="surface-card p-6 sm:p-8">
      <SectionIntro
        eyebrow="About Us"
        title="关于汪汪小站"
        description="一个围绕犬类知识分享、多元服务和社区交流打造的中文前端演示站，重点服务准新手与新手养犬人。"
      />
      <div className="grid gap-4 lg:grid-cols-3">
        {highlights.map((item) => (
          <article key={item.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
          </article>
        ))}
      </div>
    </section>

    <section className="surface-card p-6 sm:p-8">
      <SectionIntro
        title="我们在做什么"
        description="把养狗这件事拆成“能看懂、能比较、能马上行动”的前端体验，让用户从信息获取走到服务决策。"
      />
      <div className="grid gap-5 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="rounded-3xl bg-brand-50 p-5">
          <h3 className="text-lg font-semibold text-brand-700">当前版本范围</h3>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
            <li>• 首页、知识库、服务大厅、社区、个人中心完整可浏览。</li>
            <li>• 认证、收藏、预约、发帖、评论等流程支持本地演示。</li>
            <li>• 采用 Mock 数据和 localStorage，不依赖真实后端。</li>
          </ul>
        </div>
        <div className="rounded-3xl border border-slate-200 p-5">
          <h3 className="text-lg font-semibold text-ink">内容原则</h3>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
            {principles.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-brand-600">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>

    <section className="surface-card p-6 sm:p-8">
      <SectionIntro
        title="你可以从哪里开始"
        description="如果你是第一次来到站内，建议先从知识库入门，再去服务大厅和社区查看具体场景。"
      />
      <div className="flex flex-wrap gap-3">
        <Link className="btn-primary" to="/knowledge">先看知识库</Link>
        <Link className="btn-secondary" to="/services">查看服务大厅</Link>
        <Link className="btn-secondary" to="/community">进入社区</Link>
      </div>
    </section>
  </div>
);
