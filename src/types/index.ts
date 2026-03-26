export type ArticleCategory = '买前必读' | '日常照顾' | '健康护理' | '行为引导';
export type ArticleSort = 'hot' | 'latest';
export type ServiceType = '训练师' | '兽医' | '寄养' | '美容';
export type ServiceSort = 'distance' | 'rating';
export type CommunitySort = 'latest' | 'hot';
export type BookingStatus = '待确认' | '进行中' | '已完成' | '已取消';
export type SeverityLevel = '观察即可' | '尽快咨询' | '立即就医';

export interface CategoryMeta {
  slug: string;
  label: ArticleCategory;
  description: string;
}

export interface ArticleStep {
  title: string;
  description: string;
}

export type ArticleContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'tip'; title: string; text: string }
  | { type: 'steps'; title: string; items: ArticleStep[] }
  | { type: 'table'; title: string; headers: string[]; rows: string[][] }
  | { type: 'comparison'; title: string; headers: string[]; rows: string[][] };

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  createdAt: string;
}

export interface Article {
  id: string;
  title: string;
  category: ArticleCategory;
  summary: string;
  cover: string;
  publishedAt: string;
  readCount: number;
  likeCount: number;
  tags: string[];
  blocks: ArticleContentBlock[];
  relatedIds: string[];
  featured?: boolean;
  comments?: Comment[];
}

export interface BreedProfile {
  id: string;
  name: string;
  image: string;
  suitableFor: string;
  troubleNote: string;
  beginnerRating: number;
  personality: string;
  truthTalk: string;
}

export interface ServiceItem {
  name: string;
  price: string;
  duration: string;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  content: string;
  createdAt: string;
  images?: string[];
}

export interface ServiceProvider {
  id: string;
  name: string;
  type: ServiceType;
  rating: number;
  distanceKm: number;
  priceRange: string;
  intro: string;
  image: string;
  badges: string[];
  location: string;
  serviceItems: ServiceItem[];
  reviews: Review[];
  featured?: boolean;
}

export interface TopicTag {
  id: string;
  name: string;
  count: number;
}

export interface CommunityPost {
  id: string;
  author: string;
  authorId: string;
  avatar: string;
  content: string;
  createdAt: string;
  likeCount: number;
  heat: number;
  topicTags: string[];
  images: string[];
  comments: Comment[];
}

export interface UserProfile {
  id: string;
  nickname: string;
  avatar: string;
  bio: string;
  phone: string;
  email: string;
  joinedAt: string;
}

export interface PetProfile {
  id: string;
  name: string;
  breed: string;
  birthday: string;
  gender: '公' | '母';
  image: string;
}

export interface ServiceBooking {
  id: string;
  serviceProviderId: string;
  providerName: string;
  serviceName: string;
  date: string;
  time: string;
  petName: string;
  petBreed: string;
  note: string;
  status: BookingStatus;
  createdAt: string;
}

export interface FeedingGuideRecord {
  age: string;
  weight: string;
  foodAmount: string;
  frequency: string;
  tips: string;
}

export interface TrainingStep {
  title: string;
  description: string;
  tips: string[];
}

export interface SymptomGuide {
  id: string;
  symptom: string;
  level: SeverityLevel;
  summary: string;
  suggestion: string[];
}

export interface AuthPayload {
  email: string;
  password: string;
}
