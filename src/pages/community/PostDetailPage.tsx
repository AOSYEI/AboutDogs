import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { communityApi } from '@/api/communityApi';
import { Button } from '@/components/common/Button';
import { EmptyState } from '@/components/common/EmptyState';
import { ErrorState } from '@/components/common/ErrorState';
import { LoadingState } from '@/components/common/LoadingState';
import { formatDate } from '@/lib/utils';
import { useUIStore } from '@/stores/uiStore';

export const PostDetailPage = () => {
  const { id = '' } = useParams();
  const queryClient = useQueryClient();
  const addToast = useUIStore((state) => state.addToast);
  const [comment, setComment] = useState('');

  const query = useQuery({
    queryKey: ['post', id],
    queryFn: () => communityApi.getPostById(id),
  });

  const likeMutation = useMutation({
    mutationFn: () => communityApi.likePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', id] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      addToast({ title: '已点赞帖子', tone: 'success' });
    },
  });

  const commentMutation = useMutation({
    mutationFn: () => communityApi.addComment(id, comment),
    onSuccess: () => {
      setComment('');
      queryClient.invalidateQueries({ queryKey: ['post', id] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      addToast({ title: '评论成功', description: '你的留言已出现在帖子下方。', tone: 'success' });
    },
    onError: (error) => {
      addToast({ title: '评论失败', description: error.message, tone: 'error' });
    },
  });

  if (query.isLoading) return <LoadingState label="正在加载帖子详情..." />;
  if (query.isError || !query.data) return <ErrorState onRetry={() => query.refetch()} />;

  const post = query.data;

  return (
    <div className="space-y-8">
      <article className="surface-card p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <img src={post.avatar} alt={post.author} className="h-14 w-14 rounded-full object-cover" />
          <div>
            <div className="text-lg font-semibold text-ink">{post.author}</div>
            <div className="text-sm text-slate-500">{formatDate(post.createdAt)}</div>
          </div>
        </div>
        <p className="mt-6 text-base leading-8 text-slate-700">{post.content}</p>
        {post.images.length ? (
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {post.images.map((image) => (
              <img key={image} src={image} alt={post.author} className="h-72 w-full rounded-3xl object-cover" />
            ))}
          </div>
        ) : null}
        <div className="mt-5 flex flex-wrap gap-2">
          {post.topicTags.map((tag) => (
            <span key={tag} className="chip">{tag}</span>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button onClick={() => likeMutation.mutate()} disabled={likeMutation.isPending}>
            {likeMutation.isPending ? '处理中...' : `👍 点赞 ${post.likeCount}`}
          </Button>
        </div>
      </article>

      <section className="surface-card p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-ink">发表评论</h2>
        <textarea
          className="form-textarea mt-4"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          placeholder="写下你的回应、经验或补充建议..."
        />
        <div className="mt-4 flex justify-end">
          <Button onClick={() => commentMutation.mutate()} disabled={!comment.trim() || commentMutation.isPending}>
            {commentMutation.isPending ? '提交中...' : '发布评论'}
          </Button>
        </div>
        <div className="mt-6 space-y-4">
          {post.comments.length ? (
            post.comments.map((item) => (
              <article key={item.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-3">
                  <img src={item.avatar} alt={item.author} className="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <div className="font-semibold text-ink">{item.author}</div>
                    <div className="text-xs text-slate-500">{formatDate(item.createdAt)}</div>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.content}</p>
              </article>
            ))
          ) : (
            <EmptyState title="还没有评论" description="成为第一个留言的人吧。" />
          )}
        </div>
      </section>
    </div>
  );
};
