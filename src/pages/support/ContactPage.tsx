import { Link } from 'react-router-dom';
import { SectionIntro } from '@/components/common/SectionIntro';

const contactCards = [
  {
    title: '产品反馈',
    value: 'feedback@aboutdogs.demo',
    description: '适合反馈页面问题、内容建议、交互体验意见。',
  },
  {
    title: '商务合作',
    value: 'bd@aboutdogs.demo',
    description: '适合服务合作、内容共建、品牌联动等沟通。',
  },
  {
    title: '演示支持',
    value: 'support@aboutdogs.demo',
    description: '适合演示讲解、功能说明、前端方案交流。',
  },
];

const faq = [
  {
    q: '多久会回复？',
    a: '演示站默认按工作日节奏回复，通常 1-3 个工作日内会集中处理反馈信息。',
  },
  {
    q: '可以直接通过网站下单或支付吗？',
    a: '当前版本仅为前端演示站，不接入真实支付、地图定位或线下履约能力。',
  },
  {
    q: '提交的资料会同步到真实数据库吗？',
    a: '不会。当前数据保存在浏览器本地 localStorage，仅用于演示页面交互流程。',
  },
];

export const ContactPage = () => (
  <div className="space-y-8">
    <section className="surface-card p-6 sm:p-8">
      <SectionIntro
        eyebrow="Contact"
        title="联系我们"
        description="如果你想反馈体验问题、讨论合作方向，或了解这个演示项目的实现方式，都可以从这里找到入口。"
      />
      <div className="grid gap-4 lg:grid-cols-3">
        {contactCards.map((item) => (
          <article key={item.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <div className="text-sm font-semibold text-brand-600">{item.title}</div>
            <div className="mt-3 break-all text-lg font-bold text-ink">{item.value}</div>
            <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
          </article>
        ))}
      </div>
    </section>

    <section className="surface-card p-6 sm:p-8">
      <SectionIntro
        title="联系前建议"
        description="为了更快收到清晰回复，建议在联系时附上页面路径、问题描述和复现步骤。"
      />
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-3xl bg-brand-50 p-5">
          <h3 className="text-lg font-semibold text-brand-700">建议提供的信息</h3>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
            <li>• 具体页面，例如“个人中心 / 我的预约”。</li>
            <li>• 你执行了什么操作，预期结果是什么。</li>
            <li>• 实际看到的现象，例如白屏、报错、样式错乱等。</li>
          </ul>
        </div>
        <div className="rounded-3xl border border-slate-200 p-5">
          <h3 className="text-lg font-semibold text-ink">快速入口</h3>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link className="btn-primary" to="/help">先看帮助中心</Link>
            <Link className="btn-secondary" to="/knowledge">浏览知识库</Link>
            <Link className="btn-secondary" to="/services">查看服务大厅</Link>
          </div>
        </div>
      </div>
    </section>

    <section className="surface-card p-6 sm:p-8">
      <SectionIntro
        title="常见联系问题"
        description="下面这些问题是演示项目里最容易被问到的，先看一眼会更省时间。"
      />
      <div className="space-y-4">
        {faq.map((item) => (
          <article key={item.q} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="text-lg font-semibold text-ink">{item.q}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">{item.a}</p>
          </article>
        ))}
      </div>
    </section>
  </div>
);
