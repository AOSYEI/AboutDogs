import type {
  CommunityPost,
  PetProfile,
  ServiceBooking,
  UserProfile,
} from '@/types';

export const syncOwnedPostsWithProfile = (profile: UserProfile, posts: CommunityPost[]) =>
  posts.map((post) =>
    post.authorId === profile.id
      ? {
          ...post,
          author: profile.nickname,
          avatar: profile.avatar,
        }
      : post,
  );

export const STORAGE_KEYS = {
  profile: 'about-dogs-profile',
  pets: 'about-dogs-pets',
  favorites: 'about-dogs-favorites',
  bookings: 'about-dogs-bookings',
  posts: 'about-dogs-posts',
  onboardingSeen: 'about-dogs-onboarding-seen',
  articleLikes: 'about-dogs-article-likes',
  articleComments: 'about-dogs-article-comments',
  postLikes: 'about-dogs-post-likes',
} as const;

export const readStorage = <T,>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') return fallback;
  const raw = window.localStorage.getItem(key);
  if (!raw) return fallback;

  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

export const writeStorage = <T,>(key: string, value: T) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const createId = (prefix: string) => `${prefix}-${Math.random().toString(36).slice(2, 10)}`;

export const mockRequest = async <T,>(value: T, failureRate = 0.03): Promise<T> => {
  await new Promise((resolve) => setTimeout(resolve, 280 + Math.random() * 420));
  if (Math.random() < failureRate) {
    throw new Error('演示数据请求失败，请稍后再试。');
  }
  return structuredClone(value);
};

export const ensureDefaultStorage = (
  profile: UserProfile,
  pets: PetProfile[],
  posts: CommunityPost[],
  favorites: string[],
  bookings: ServiceBooking[],
) => {
  if (typeof window === 'undefined') return;

  const hasProfile = Boolean(window.localStorage.getItem(STORAGE_KEYS.profile));
  const hasPets = Boolean(window.localStorage.getItem(STORAGE_KEYS.pets));
  const hasPosts = Boolean(window.localStorage.getItem(STORAGE_KEYS.posts));
  const hasFavorites = Boolean(window.localStorage.getItem(STORAGE_KEYS.favorites));
  const hasBookings = Boolean(window.localStorage.getItem(STORAGE_KEYS.bookings));

  if (!hasProfile) {
    writeStorage(STORAGE_KEYS.profile, profile);
  }
  if (!hasPets) {
    writeStorage(STORAGE_KEYS.pets, pets);
  }
  if (!hasPosts) {
    writeStorage(STORAGE_KEYS.posts, syncOwnedPostsWithProfile(profile, posts));
  }
  if (!hasFavorites) {
    writeStorage(STORAGE_KEYS.favorites, favorites);
  }
  if (!hasBookings) {
    writeStorage(STORAGE_KEYS.bookings, bookings);
  }

  const currentProfile = readStorage(STORAGE_KEYS.profile, profile);
  const currentPosts = readStorage(STORAGE_KEYS.posts, posts);
  const normalizedPosts = syncOwnedPostsWithProfile(currentProfile, currentPosts);

  if (JSON.stringify(currentPosts) !== JSON.stringify(normalizedPosts)) {
    writeStorage(STORAGE_KEYS.posts, normalizedPosts);
  }
};

