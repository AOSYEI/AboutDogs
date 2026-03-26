import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ArticleSort, CommunitySort, ServiceSort, ServiceType } from '@/types';

export type ToastTone = 'success' | 'error' | 'info';

export interface ToastItem {
  id: string;
  title: string;
  description?: string;
  tone: ToastTone;
}

interface UIState {
  mobileMenuOpen: boolean;
  hasSeenGuide: boolean;
  knowledgeSearch: string;
  knowledgeSort: ArticleSort;
  serviceTypeFilter: ServiceType | '全部';
  serviceSort: ServiceSort;
  communitySort: CommunitySort;
  toasts: ToastItem[];
  setMobileMenuOpen: (open: boolean) => void;
  markGuideSeen: () => void;
  setKnowledgeSearch: (value: string) => void;
  setKnowledgeSort: (value: ArticleSort) => void;
  setServiceTypeFilter: (value: ServiceType | '全部') => void;
  setServiceSort: (value: ServiceSort) => void;
  setCommunitySort: (value: CommunitySort) => void;
  addToast: (toast: Omit<ToastItem, 'id'>) => void;
  removeToast: (id: string) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      mobileMenuOpen: false,
      hasSeenGuide: false,
      knowledgeSearch: '',
      knowledgeSort: 'hot',
      serviceTypeFilter: '全部',
      serviceSort: 'rating',
      communitySort: 'latest',
      toasts: [],
      setMobileMenuOpen: (mobileMenuOpen) => set({ mobileMenuOpen }),
      markGuideSeen: () => set({ hasSeenGuide: true }),
      setKnowledgeSearch: (knowledgeSearch) => set({ knowledgeSearch }),
      setKnowledgeSort: (knowledgeSort) => set({ knowledgeSort }),
      setServiceTypeFilter: (serviceTypeFilter) => set({ serviceTypeFilter }),
      setServiceSort: (serviceSort) => set({ serviceSort }),
      setCommunitySort: (communitySort) => set({ communitySort }),
      addToast: ({ title, description, tone }) => {
        const id = `${Date.now()}-${Math.random().toString(16).slice(2, 6)}`;
        set({
          toasts: [...get().toasts, { id, title, description, tone }],
        });
        window.setTimeout(() => {
          get().removeToast(id);
        }, 3200);
      },
      removeToast: (id) =>
        set({
          toasts: get().toasts.filter((item) => item.id !== id),
        }),
    }),
    {
      name: 'about-dogs-ui',
      partialize: (state) => ({
        hasSeenGuide: state.hasSeenGuide,
        knowledgeSort: state.knowledgeSort,
        serviceTypeFilter: state.serviceTypeFilter,
        serviceSort: state.serviceSort,
        communitySort: state.communitySort,
      }),
    },
  ),
);
