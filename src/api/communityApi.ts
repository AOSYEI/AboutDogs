import { basePosts, demoUser, topics } from '@/data/mockData';
import { createId, mockRequest, readStorage, STORAGE_KEYS, writeStorage } from '@/lib/mockStorage';
import type { Comment, CommunityPost, CommunitySort } from '@/types';
import { seedDemoData } from './seed';

const getPostsStore = () => readStorage<CommunityPost[]>(STORAGE_KEYS.posts, basePosts);
const getViewer = () => readStorage(STORAGE_KEYS.profile, demoUser);

export const communityApi = {
  async getTopics() {
    return mockRequest(topics, 0);
  },
  async getPosts(filters?: { sort?: CommunitySort; topic?: string }) {
    seedDemoData();
    const sort = filters?.sort ?? 'latest';
    const items = getPostsStore()
      .filter((post) => (filters?.topic ? post.topicTags.includes(filters.topic) : true))
      .sort((a, b) =>
        sort === 'latest'
          ? +new Date(b.createdAt) - +new Date(a.createdAt)
          : b.heat + b.likeCount * 2 - (a.heat + a.likeCount * 2),
      );
    return mockRequest(items, 0);
  },
  async getPostById(id: string) {
    seedDemoData();
    const found = getPostsStore().find((post) => post.id === id);
    if (!found) throw new Error('帖子不存在');
    return mockRequest(found, 0);
  },
  async createPost(payload: { content: string; topicTags: string[]; images: string[] }) {
    seedDemoData();
    const viewer = getViewer();
    const posts = getPostsStore();
    const post: CommunityPost = {
      id: createId('post'),
      author: viewer.nickname,
      authorId: viewer.id,
      avatar: viewer.avatar,
      content: payload.content,
      createdAt: new Date().toISOString(),
      likeCount: 0,
      heat: 80,
      topicTags: payload.topicTags,
      images: payload.images,
      comments: [],
    };
    writeStorage(STORAGE_KEYS.posts, [post, ...posts]);
    return mockRequest(post, 0);
  },
  async likePost(id: string) {
    const posts = getPostsStore().map((post) =>
      post.id === id ? { ...post, likeCount: post.likeCount + 1 } : post,
    );
    writeStorage(STORAGE_KEYS.posts, posts);
    return mockRequest(posts.find((post) => post.id === id), 0);
  },
  async addComment(postId: string, content: string) {
    const viewer = getViewer();
    const nextComment: Comment = {
      id: createId('post-comment'),
      author: viewer.nickname,
      avatar: viewer.avatar,
      content,
      createdAt: new Date().toISOString(),
    };
    const posts = getPostsStore().map((post) =>
      post.id === postId ? { ...post, comments: [...post.comments, nextComment] } : post,
    );
    writeStorage(STORAGE_KEYS.posts, posts);
    return mockRequest(nextComment, 0);
  },
};
