import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { knowledgeApi } from '@/api/knowledgeApi';
import { Button } from '@/components/common/Button';
import { EmptyState } from '@/components/common/EmptyState';
import { ErrorState } from '@/components/common/ErrorState';
import { LoadingState } from '@/components/common/LoadingState';
import { SectionIntro } from '@/components/common/SectionIntro';
import { formatDate } from '@/lib/utils';
import { useUIStore } from '@/stores/uiStore';

export const ArticleDetailPage = () => {
  const { id = '' } = useParams();
  const queryClient = useQueryClient();
  const addToast = useUIStore((state) => state.addToast);
  const [commentText, setCommentText] = useState('');
  const [favoriteIds, setFavoriteIds] = useState(() => knowledgeApi.getFavoriteIds());

  const articleQuery = useQuery({
    queryKey: ['article', id],
    queryFn: () => knowledgeApi.getArticleById(id),
  });
  const relatedQuery = useQuery({
    queryKey: ['article-related', id],
    queryFn: () => knowledgeApi.getRelatedArticles(articleQuery.data?.relatedIds ?? []),
    enabled: Boolean(articleQuery.data?.relatedIds.length),
  });

  const likeMutation = useMutation({
    mutationFn: () => knowledgeApi.likeArticle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['article', id] });
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      addToast({ title: '已点赞文章', description: '感谢你的反馈，这会帮助我们了解热门内容。', tone: 'success' });
    },
  });

  const favoriteMutation = useMutation({
    mutationFn: () => knowledgeApi.toggleFavorite(id),
    onSuccess: (result) => {
      const nextIsFavorite = result.favoriteIds.includes(id);
      setFavoriteIds(result.favoriteIds);
      queryClient.invalidateQueries({ queryKey: ['profile-favorites'] });
      addToast({ title: nextIsFavorite ? '收藏成功' : '已取消收藏', tone: 'success' });
    },
  });

  const commentMutation = useMutation({
    mutationFn: () => knowledgeApi.addComment(id, commentText.trim()),
    onSuccess: () => {
      setCommentText('');
      queryClient.invalidateQueries({ queryKey: ['article', id] });
      addToast({ title: '评论已发布', description: '你的经验可能会帮到更多新手主人。', tone: 'success' });
    },
    onError: (error) => {
      addToast({ title: '评论失败', description: error.message, tone: 'error' });
    },
  });

  const isFavorite = useMemo(() => favoriteIds.includes(id), [favoriteIds, id]);

  if (articleQuery.isLoading) return <LoadingState label="正在加载文章详情..." />;
  if (articleQuery.isError || !articleQuery.data) return <ErrorState onRetry={() => articleQuery.refetch()} />;

  const article = articleQuery.data;

  return (
    <div className="space-y-8">
      <article className="surface-card overflow-hidden">
        <img src={article.cover} alt={article.title} className="h-[280px] w-full object-cover sm:h-[360px]" />
        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <span className="chip chip-active">{article.category}</span>
            <span>{formatDate(article.publishedAt)}</span>
            <span>{article.readCount} 阅读</span>
            <span>{article.likeCount} 点赞</span>
          </div>
          <h1 className="mt-5 text-3xl font-black text-ink sm:text-4xl">{article.title}</h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">{article.summary}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span key={tag} className="chip">{tag}</span>
            ))}
          </div>

          <div className="mt-8 space-y-6">
            {article.blocks.map((block, index) => {
              if (block.type === 'paragraph') {
                return <p key={index} className="text-base leading-8 text-slate-700">{block.text}</p>;
              }
              if (block.type === 'tip') {
                return (
                  <div key={index} className="rounded-3xl border border-brand-200 bg-brand-50 p-5">
                    <h3 className="text-lg font-semibold text-brand-700">{block.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{block.text}</p>
                  </div>
                );
              }
              if (block.type === 'steps') {
                return (
                  <section key={index}>
                    <h3 className="text-2xl font-bold text-ink">{block.title}</h3>
                    <div className="mt-4 grid gap-4 md:grid-cols-3">
                      {block.items.map((item, stepIndex) => (
                        <div key={item.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                          <div className="text-sm font-semibold text-brand-600">STEP {stepIndex + 1}</div>
                          <h4 className="mt-2 text-lg font-semibold text-ink">{item.title}</h4>
                          <p className="mt-2 text-sm leading-6 text-slate-500">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                );
              }

              return (
                <section key={index}>
                  <h3 className="text-2xl font-bold text-ink">{block.title}</h3>
                  <div className="mt-4 overflow-hidden rounded-3xl border border-slate-200 bg-white">
                    <table className="min-w-full text-left text-sm">
                      <thead className="bg-slate-50 text-slate-600">
                        <tr>
                          {block.headers.map((header) => (
                            <th key={header} className="px-4 py-3 font-semibold">{header}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {block.rows.map((row, rowIndex) => (
                          <tr key={rowIndex} className="border-t border-slate-100">
                            {row.map((cell, cellIndex) => (
                              <td key={cellIndex} className="px-4 py-3 leading-6 text-slate-600">{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button onClick={() => likeMutation.mutate()} disabled={likeMutation.isPending}>
              {likeMutation.isPending ? '处理中...' : `👍 点赞 ${article.likeCount}`}
            </Button>
            <Button variant="secondary" onClick={() => favoriteMutation.mutate()} disabled={favoriteMutation.isPending}>
              {isFavorite ? '已收藏，点此取消' : '⭐ 收藏文章'}
            </Button>
          </div>
        </div>
      </article>

      <section className="surface-card p-6 sm:p-8">
        <SectionIntro title="评论区" description="欢迎分享你的养犬经验、补充或提问。" />
        <div className="space-y-4">
          <textarea
            value={commentText}
            onChange={(event) => setCommentText(event.target.value)}
            className="form-textarea"
            placeholder="写下你的想法，例如：这个方法我试过很有效 / 我家狗狗也遇到过类似问题..."
          />
          <Button
            onClick={() => commentMutation.mutate()}
            disabled={!commentText.trim() || commentMutation.isPending}
          >
            {commentMutation.isPending ? '发布中...' : '发布评论'}
          </Button>
        </div>
        <div className="mt-6 space-y-4">
          {article.comments?.length ? (
            article.comments.map((comment) => (
              <div key={comment.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-3">
                  <img src={comment.avatar} alt={comment.author} className="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <div className="font-semibold text-ink">{comment.author}</div>
                    <div className="text-xs text-slate-500">{formatDate(comment.createdAt)}</div>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-600">{comment.content}</p>
              </div>
            ))
          ) : (
            <EmptyState title="还没有评论" description="你可以成为第一个留言的人，分享自己的经验。" />
          )}
        </div>
      </section>

      <section>
        <SectionIntro title="相关推荐" description="继续看这几篇，也能帮助你把同一类问题理解得更完整。" />
        {relatedQuery.isLoading ? (
          <LoadingState label="正在加载相关推荐..." />
        ) : relatedQuery.data?.length ? (
          <div className="grid gap-5 md:grid-cols-3">
            {relatedQuery.data.map((item) => (
              <Link key={item.id} to={`/knowledge/article/${item.id}`} className="surface-card overflow-hidden p-5 transition hover:border-brand-200">
                <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{item.summary}</p>
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState title="暂无相关推荐" description="后续会继续补充关联知识内容。" />
        )}
      </section>
    </div>
  );
};
