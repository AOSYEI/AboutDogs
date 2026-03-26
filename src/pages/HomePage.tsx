import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { communityApi } from '@/api/communityApi';
import { knowledgeApi } from '@/api/knowledgeApi';
import { servicesApi } from '@/api/servicesApi';
import { EmptyState } from '@/components/common/EmptyState';
import { ErrorState } from '@/components/common/ErrorState';
import { LoadingState } from '@/components/common/LoadingState';
import { RatingStars } from '@/components/common/RatingStars';
import { SectionIntro } from '@/components/common/SectionIntro';
import { formatDate, labelToCategorySlug } from '@/lib/utils';

const quickLinks = [
  { title: '品种选择', desc: '按家庭节奏挑更适合的新手犬种。', to: '/knowledge/breeds' },
  { title: '渠道鉴别', desc: '学会辨别高风险渠道，减少踩坑。', to: '/knowledge/before-buy' },
  { title: '预算清单', desc: '首年成本一眼看懂，先做现实评估。', to: '/knowledge/before-buy' },
  { title: '日常照顾', desc: '喂食、如厕、清洁训练全覆盖。', to: '/knowledge/daily-care' },
  { title: '健康护理', desc: '学会观察常见症状和就医时机。', to: '/knowledge/health-care' },
  { title: '行为引导', desc: '社会化与基础口令从生活开始。', to: '/knowledge/behavior-guide' },
];

export const HomePage = () => {
  const featuredArticles = useQuery({
    queryKey: ['articles', 'featured'],
    queryFn: () => knowledgeApi.getArticles({ featuredOnly: true, sort: 'hot' }),
  });
  const featuredServices = useQuery({
    queryKey: ['services', 'featured'],
    queryFn: () => servicesApi.getServices({ sort: 'rating' }),
    select: (items) => items.filter((item) => item.featured).slice(0, 3),
  });
  const hotPosts = useQuery({
    queryKey: ['posts', 'hot-home'],
    queryFn: () => communityApi.getPosts({ sort: 'hot' }),
    select: (items) => items.slice(0, 2),
  });

  return (
    <div className="space-y-12 pb-4 pt-2">
      <section className="surface-card overflow-hidden p-6 sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr] lg:items-center">
          <div>
            <span className="chip chip-active">通俗化 · 场景化 · 实用性</span>
            <h1 className="mt-5 text-4xl font-black tracking-tight text-ink sm:text-5xl">
              给新手养犬人的一站式
              <span className="text-brand-600"> 知识 + 服务 + 社区 </span>
              体验
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
              从买前必读、喂食查表、症状判断，到训练、医疗、寄养、美容预约，再到真实新手交流社区，帮你更轻松地把“想养狗”走到“会养狗”。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="btn-primary" to="/knowledge">
                先去看知识库
              </Link>
              <Link className="btn-secondary" to="/services">
                查看热门服务
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-500">
              <span className="chip">🐶 新手友好内容结构</span>
              <span className="chip">📌 Mock 数据可演示</span>
              <span className="chip">📱 响应式体验</span>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-3xl bg-brand-50 p-6">
              <div className="text-sm font-semibold text-brand-700">推荐路径</div>
              <div className="mt-2 text-xl font-bold text-ink">先选知识，再补服务，最后进社区</div>
              <p className="mt-3 text-sm leading-6 text-slate-600">适合第一次系统了解养狗这件事的人，从信息到行动都有入口。</p>
            </div>
            <div className="rounded-3xl bg-sky-50 p-6">
              <div className="text-sm font-semibold text-sky-700">首屏高频入口</div>
              <div className="mt-2 text-xl font-bold text-ink">品种选择 / 喂食指南 / 症状判断</div>
              <p className="mt-3 text-sm leading-6 text-slate-600">用最适合新手的三个页面，快速解决“要养什么、怎么喂、什么时候该去医院”。</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <SectionIntro
          eyebrow="Quick Start"
          title="新手快速入门专区"
          description="把最容易焦虑和踩坑的节点，拆成可以马上点击进入的核心入口。"
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {quickLinks.map((item) => (
            <Link key={item.title} to={item.to} className="surface-card p-5 transition hover:-translate-y-0.5 hover:border-brand-200">
              <div className="text-sm font-semibold text-brand-600">快速入口</div>
              <h3 className="mt-2 text-xl font-semibold text-ink">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-500">{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <SectionIntro
          eyebrow="Knowledge"
          title="热门知识推荐"
          description="近期开启率最高的内容，适合第一次进站的新手从这里开始。"
          action={<Link className="btn-secondary" to="/knowledge">查看全部文章</Link>}
        />
        {featuredArticles.isLoading ? (
          <LoadingState label="正在加载推荐文章..." />
        ) : featuredArticles.isError ? (
          <ErrorState onRetry={() => featuredArticles.refetch()} />
        ) : featuredArticles.data?.length ? (
          <div className="grid gap-5 lg:grid-cols-3">
            {featuredArticles.data.slice(0, 3).map((article) => (
              <article key={article.id} className="surface-card overflow-hidden">
                <img src={article.cover} alt={article.title} className="h-48 w-full object-cover" />
                <div className="p-5">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="chip">{article.category}</span>
                    <span>{formatDate(article.publishedAt)}</span>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-ink">{article.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{article.summary}</p>
                  <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                    <span>{article.readCount} 阅读</span>
                    <span>{article.likeCount} 点赞</span>
                  </div>
                  <div className="mt-4 flex gap-3">
                    <Link className="btn-primary" to={`/knowledge/article/${article.id}`}>阅读全文</Link>
                    <Link className="btn-secondary" to={`/knowledge/${labelToCategorySlug(article.category)}`}>查看分类</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState title="暂时还没有推荐文章" description="稍后再来看看，我们会继续补充知识内容。" />
        )}
      </section>

      <section>
        <SectionIntro
          eyebrow="Services"
          title="精选服务推荐"
          description="为新手主人的高频需求精选训练、医疗、寄养、美容等服务。"
          action={<Link className="btn-secondary" to="/services">进入服务大厅</Link>}
        />
        {featuredServices.isLoading ? (
          <LoadingState label="正在加载服务推荐..." />
        ) : featuredServices.isError ? (
          <ErrorState onRetry={() => featuredServices.refetch()} />
        ) : (
          <div className="grid gap-5 lg:grid-cols-3">
            {featuredServices.data?.map((service) => (
              <article key={service.id} className="surface-card overflow-hidden p-5">
                <img src={service.image} alt={service.name} className="h-44 w-full rounded-3xl object-cover" />
                <div className="mt-4 flex flex-wrap gap-2">
                  {service.badges.map((badge) => (
                    <span key={badge} className="chip">{badge}</span>
                  ))}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-ink">{service.name}</h3>
                <p className="mt-2 text-sm text-slate-500">{service.type} · {service.location}</p>
                <p className="mt-3 text-sm leading-6 text-slate-500">{service.intro}</p>
                <div className="mt-4 flex items-center justify-between">
                  <RatingStars value={service.rating} />
                  <span className="text-sm font-semibold text-brand-600">{service.priceRange}</span>
                </div>
                <Link className="btn-primary mt-4 w-full" to={`/services/${service.id}`}>查看详情与预约</Link>
              </article>
            ))}
          </div>
        )}
      </section>

      <section>
        <SectionIntro
          eyebrow="Community"
          title="社区里的真实经验"
          description="看看其他新手主人都在交流什么，也能把自己的训练和困惑发出来。"
          action={<Link className="btn-secondary" to="/community">进入社区</Link>}
        />
        {hotPosts.isLoading ? (
          <LoadingState label="正在加载社区动态..." />
        ) : hotPosts.isError ? (
          <ErrorState onRetry={() => hotPosts.refetch()} />
        ) : (
          <div className="grid gap-5 lg:grid-cols-2">
            {hotPosts.data?.map((post) => (
              <article key={post.id} className="surface-card p-5">
                <div className="flex items-center gap-3">
                  <img src={post.avatar} alt={post.author} className="h-12 w-12 rounded-full object-cover" />
                  <div>
                    <div className="font-semibold text-ink">{post.author}</div>
                    <div className="text-xs text-slate-500">{formatDate(post.createdAt)}</div>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-600">{post.content}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.topicTags.map((tag) => (
                    <span key={tag} className="chip">{tag}</span>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                  <span>{post.likeCount} 点赞</span>
                  <span>{post.comments.length} 条评论</span>
                </div>
                <Link className="btn-secondary mt-4 w-full" to={`/community/post/${post.id}`}>查看帖子详情</Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
