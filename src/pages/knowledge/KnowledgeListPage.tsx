import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { knowledgeApi } from '@/api/knowledgeApi';
import { EmptyState } from '@/components/common/EmptyState';
import { ErrorState } from '@/components/common/ErrorState';
import { LoadingState } from '@/components/common/LoadingState';
import { SectionIntro } from '@/components/common/SectionIntro';
import { categoryMeta, categorySlugToLabel, formatDate, labelToCategorySlug } from '@/lib/utils';
import { useUIStore } from '@/stores/uiStore';

const specialGuides = [
  { title: '品种选择页', desc: '用适合人群、麻烦事和新手友好度快速判断。', to: '/knowledge/breeds' },
  { title: '喂食指南', desc: '按年龄 + 体重生成更直观的喂食参考。', to: '/knowledge/feeding-guide' },
  { title: '如厕训练', desc: '分步骤卡片式训练方案，一步步照着做。', to: '/knowledge/toilet-training' },
  { title: '症状判断', desc: '先看紧急程度，再决定观察还是就医。', to: '/knowledge/symptom-checker' },
];

export const KnowledgeListPage = () => {
  const { category } = useParams();
  const currentCategory = categorySlugToLabel(category);
  const { knowledgeSearch, knowledgeSort, setKnowledgeSearch, setKnowledgeSort } = useUIStore();

  const query = useQuery({
    queryKey: ['articles', currentCategory, knowledgeSearch, knowledgeSort],
    queryFn: () =>
      knowledgeApi.getArticles({
        category: currentCategory,
        search: knowledgeSearch,
        sort: knowledgeSort,
      }),
  });

  return (
    <div className="space-y-8">
      <section className="surface-card p-6 sm:p-8">
        <SectionIntro
          eyebrow="Knowledge Base"
          title={currentCategory ? `${currentCategory} · 知识内容` : '知识库'}
          description={
            currentCategory
              ? categoryMeta.find((item) => item.label === currentCategory)?.description ?? ''
              : '按买前 - 买后时间线组织内容，新手更容易理解和行动。'
          }
        />
        <div className="flex flex-wrap gap-3">
          <Link
            to="/knowledge"
            className={`chip ${!currentCategory ? 'chip-active' : ''}`}
          >
            全部
          </Link>
          {categoryMeta.map((item) => (
            <Link
              key={item.slug}
              to={`/knowledge/${item.slug}`}
              className={`chip ${item.label === currentCategory ? 'chip-active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-[1fr,200px]">
          <input
            value={knowledgeSearch}
            onChange={(event) => setKnowledgeSearch(event.target.value)}
            placeholder="搜索文章标题、摘要或标签"
            className="form-input"
          />
          <select
            value={knowledgeSort}
            onChange={(event) => setKnowledgeSort(event.target.value as 'hot' | 'latest')}
            className="form-select"
          >
            <option value="hot">按热度排序</option>
            <option value="latest">按最新排序</option>
          </select>
        </div>
      </section>

      <section>
        <SectionIntro
          eyebrow="Special Pages"
          title="一看就懂的专题页面"
          description="把新手最容易紧张的环节做成更直观、更适合照着做的页面。"
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {specialGuides.map((item) => (
            <Link key={item.title} to={item.to} className="surface-card p-5 transition hover:border-brand-200 hover:bg-brand-50/40">
              <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        {query.isLoading ? (
          <LoadingState label="正在加载知识文章..." />
        ) : query.isError ? (
          <ErrorState onRetry={() => query.refetch()} />
        ) : query.data?.length ? (
          <div className="grid gap-5 lg:grid-cols-2">
            {query.data.map((article) => (
              <article key={article.id} className="surface-card overflow-hidden">
                <img src={article.cover} alt={article.title} className="h-52 w-full object-cover" />
                <div className="p-5">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="chip">{article.category}</span>
                    <span>{formatDate(article.publishedAt)}</span>
                    <span>{article.readCount} 阅读</span>
                  </div>
                  <h3 className="mt-3 text-xl font-semibold text-ink">{article.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-500">{article.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <span key={tag} className="chip">{tag}</span>
                    ))}
                  </div>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link className="btn-primary" to={`/knowledge/article/${article.id}`}>阅读全文</Link>
                    <Link className="btn-secondary" to={`/knowledge/${labelToCategorySlug(article.category)}`}>更多同类内容</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState title="没找到相关文章" description="换个关键词试试，或者切换分类看看其他内容。" />
        )}
      </section>
    </div>
  );
};
