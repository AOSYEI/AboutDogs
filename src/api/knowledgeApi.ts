import { articleSeed, breeds, feedingGuide, symptomGuides, toiletTrainingSteps } from '@/data/mockData';
import { demoUser } from '@/data/mockData';
import {
  createId,
  mockRequest,
  readStorage,
  STORAGE_KEYS,
  writeStorage,
} from '@/lib/mockStorage';
import type { Article, ArticleCategory, ArticleSort, Comment } from '@/types';
import { seedDemoData } from './seed';

const getFavoriteIds = () => {
  seedDemoData();
  return readStorage<string[]>(STORAGE_KEYS.favorites, []);
};
const getLikeDelta = () => readStorage<Record<string, number>>(STORAGE_KEYS.articleLikes, {});
const getCommentMap = () => readStorage<Record<string, Comment[]>>(STORAGE_KEYS.articleComments, {});
const getCurrentViewer = () => readStorage(STORAGE_KEYS.profile, demoUser);

const hydrateArticle = (article: Article): Article => {
  const likeDelta = getLikeDelta()[article.id] ?? 0;
  const commentMap = getCommentMap();
  return {
    ...article,
    likeCount: article.likeCount + likeDelta,
    comments: commentMap[article.id] ?? article.comments ?? [],
  };
};

export const knowledgeApi = {
  async getArticles(options?: {
    category?: ArticleCategory;
    search?: string;
    sort?: ArticleSort;
    featuredOnly?: boolean;
  }) {
    seedDemoData();
    const search = options?.search?.trim().toLowerCase() ?? '';
    const items = articleSeed
      .map(hydrateArticle)
      .filter((article) => (options?.category ? article.category === options.category : true))
      .filter((article) => (options?.featuredOnly ? article.featured : true))
      .filter((article) => {
        if (!search) return true;
        return [article.title, article.summary, article.tags.join(' ')].join(' ').toLowerCase().includes(search);
      })
      .sort((a, b) => {
        if (options?.sort === 'latest') {
          return +new Date(b.publishedAt) - +new Date(a.publishedAt);
        }
        return b.readCount + b.likeCount * 3 - (a.readCount + a.likeCount * 3);
      });

    return mockRequest(items);
  },
  async getArticleById(id: string) {
    seedDemoData();
    const found = articleSeed.find((article) => article.id === id);
    if (!found) throw new Error('文章不存在');
    return mockRequest(hydrateArticle(found), 0);
  },
  async getRelatedArticles(ids: string[]) {
    return mockRequest(articleSeed.filter((item) => ids.includes(item.id)).map(hydrateArticle), 0);
  },
  async likeArticle(id: string) {
    const delta = getLikeDelta();
    delta[id] = (delta[id] ?? 0) + 1;
    writeStorage(STORAGE_KEYS.articleLikes, delta);
    const article = articleSeed.find((item) => item.id === id);
    return mockRequest({ likeCount: (article?.likeCount ?? 0) + delta[id] }, 0);
  },
  async toggleFavorite(articleId: string) {
    const ids = getFavoriteIds();
    const next = ids.includes(articleId) ? ids.filter((id) => id !== articleId) : [articleId, ...ids];
    writeStorage(STORAGE_KEYS.favorites, next);
    return mockRequest({ favoriteIds: next }, 0);
  },
  async addComment(articleId: string, content: string) {
    const comments = getCommentMap();
    const viewer = getCurrentViewer();
    const nextComment: Comment = {
      id: createId('article-comment'),
      author: viewer.nickname,
      avatar: viewer.avatar,
      content,
      createdAt: new Date().toISOString(),
    };
    comments[articleId] = [nextComment, ...(comments[articleId] ?? [])];
    writeStorage(STORAGE_KEYS.articleComments, comments);
    return mockRequest(nextComment, 0);
  },
  async getBreeds() {
    return mockRequest(breeds, 0);
  },
  async getFeedingGuide() {
    return mockRequest(feedingGuide, 0);
  },
  async getToiletTrainingSteps() {
    return mockRequest(toiletTrainingSteps, 0);
  },
  async getSymptomGuides() {
    return mockRequest(symptomGuides, 0);
  },
  getFavoriteIds,
};
