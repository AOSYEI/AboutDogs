import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { communityApi } from '@/api/communityApi';
import { Button } from '@/components/common/Button';
import { EmptyState } from '@/components/common/EmptyState';
import { ErrorState } from '@/components/common/ErrorState';
import { LoadingState } from '@/components/common/LoadingState';
import { SectionIntro } from '@/components/common/SectionIntro';
import { fileToDataUrl, formatDate } from '@/lib/utils';
import { useUIStore } from '@/stores/uiStore';

export const CommunityListPage = () => {
  const queryClient = useQueryClient();
  const { communitySort, setCommunitySort, addToast } = useUIStore();
  const [topicFilter, setTopicFilter] = useState('');
  const [content, setContent] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('#新手求助#');
  const [imagePreview, setImagePreview] = useState<string>('');
  const [imagePayload, setImagePayload] = useState<string>('');

  const postsQuery = useQuery({
    queryKey: ['posts', communitySort, topicFilter],
    queryFn: () => communityApi.getPosts({ sort: communitySort, topic: topicFilter || undefined }),
  });
  const topicsQuery = useQuery({
    queryKey: ['topics'],
    queryFn: communityApi.getTopics,
  });

  const createMutation = useMutation({
    mutationFn: () =>
      communityApi.createPost({
        content,
        topicTags: [selectedTopic],
        images: imagePayload ? [imagePayload] : [],
      }),
    onSuccess: () => {
      setContent('');
      setImagePayload('');
      setImagePreview('');
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['profile-posts'] });
      addToast({ title: '发帖成功', description: '你的分享已经出现在社区动态流中。', tone: 'success' });
    },
    onError: (error) => {
      addToast({ title: '发帖失败', description: error.message, tone: 'error' });
    },
  });

  return (
    <div className="space-y-8">
      <section className="surface-card p-6 sm:p-8">
        <SectionIntro
          eyebrow="Community"
          title="用户社区"
          description="浏览真实的新手困惑和训练记录，也可以马上发一条自己的帖子。"
        />
        <div className="grid gap-5 xl:grid-cols-[1.2fr,0.8fr]">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <div className="mb-3 text-sm font-semibold text-brand-600">发帖功能</div>
            <textarea
              className="form-textarea"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              placeholder="分享今天的训练进展、求助、护理经验或服务体验..."
            />
            <div className="mt-4 grid gap-4 md:grid-cols-[1fr,180px]">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">关联话题</label>
                <select className="form-select" value={selectedTopic} onChange={(event) => setSelectedTopic(event.target.value)}>
                  {topicsQuery.data?.map((topic) => (
                    <option key={topic.id} value={topic.name}>{topic.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">图片上传</label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-input"
                  onChange={async (event) => {
                    const file = event.target.files?.[0];
                    if (!file) return;
                    setImagePreview(URL.createObjectURL(file));
                    setImagePayload(await fileToDataUrl(file));
                  }}
                />
              </div>
            </div>
            {imagePreview ? (
              <img src={imagePreview} alt="预览" className="mt-4 h-40 w-full rounded-3xl object-cover" />
            ) : null}
            <div className="mt-4 flex justify-end">
              <Button onClick={() => createMutation.mutate()} disabled={!content.trim() || createMutation.isPending}>
                {createMutation.isPending ? '发布中...' : '发布帖子'}
              </Button>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5">
            <div className="text-sm font-semibold text-brand-600">热门话题</div>
            <div className="mt-4 flex flex-wrap gap-3">
              <button className={`chip ${!topicFilter ? 'chip-active' : ''}`} onClick={() => setTopicFilter('')}>全部</button>
              {topicsQuery.data?.map((topic) => (
                <button
                  key={topic.id}
                  className={`chip ${topicFilter === topic.name ? 'chip-active' : ''}`}
                  onClick={() => setTopicFilter(topic.name)}
                >
                  {topic.name}
                </button>
              ))}
            </div>
            <div className="mt-6 rounded-3xl bg-slate-50 p-4 text-sm leading-7 text-slate-500">
              排序：
              <button className={`ml-2 ${communitySort === 'latest' ? 'font-semibold text-brand-600' : ''}`} onClick={() => setCommunitySort('latest')}>最新</button>
              <span className="mx-2">/</span>
              <button className={`${communitySort === 'hot' ? 'font-semibold text-brand-600' : ''}`} onClick={() => setCommunitySort('hot')}>热门</button>
            </div>
          </div>
        </div>
      </section>

      {postsQuery.isLoading ? (
        <LoadingState label="正在加载社区动态..." />
      ) : postsQuery.isError ? (
        <ErrorState onRetry={() => postsQuery.refetch()} />
      ) : postsQuery.data?.length ? (
        <div className="grid gap-5 lg:grid-cols-2">
          {postsQuery.data.map((post) => (
            <article key={post.id} className="surface-card p-5">
              <div className="flex items-center gap-3">
                <img src={post.avatar} alt={post.author} className="h-12 w-12 rounded-full object-cover" />
                <div>
                  <div className="font-semibold text-ink">{post.author}</div>
                  <div className="text-xs text-slate-500">{formatDate(post.createdAt)}</div>
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-600">{post.content}</p>
              {post.images[0] ? (
                <img src={post.images[0]} alt={post.author} className="mt-4 h-52 w-full rounded-3xl object-cover" />
              ) : null}
              <div className="mt-4 flex flex-wrap gap-2">
                {post.topicTags.map((tag) => (
                  <span key={tag} className="chip">{tag}</span>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                <span>{post.likeCount} 点赞</span>
                <span>{post.comments.length} 条评论</span>
              </div>
              <Link className="btn-secondary mt-4 w-full" to={`/community/post/${post.id}`}>查看详情</Link>
            </article>
          ))}
        </div>
      ) : (
        <EmptyState title="当前筛选下暂无帖子" description="切换热门话题或排序方式，看看其他社区内容。" />
      )}
    </div>
  );
};
