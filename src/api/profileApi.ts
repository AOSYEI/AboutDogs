import { articleSeed, basePosts, demoPets, demoUser } from '@/data/mockData';
import { createId, mockRequest, readStorage, STORAGE_KEYS, writeStorage } from '@/lib/mockStorage';
import type { PetProfile, ServiceBooking, UserProfile } from '@/types';
import { seedDemoData } from './seed';

const getProfile = () => readStorage<UserProfile>(STORAGE_KEYS.profile, demoUser);

export const profileApi = {
  async getProfile() {
    seedDemoData();
    return mockRequest(getProfile(), 0);
  },
  async updateProfile(payload: Omit<UserProfile, 'id' | 'joinedAt'>) {
    seedDemoData();
    const current = getProfile();
    const next: UserProfile = {
      ...current,
      ...payload,
    };
    writeStorage(STORAGE_KEYS.profile, next);
    return mockRequest(next, 0);
  },
  async getPets() {
    seedDemoData();
    return mockRequest(readStorage<PetProfile[]>(STORAGE_KEYS.pets, demoPets), 0);
  },
  async savePet(payload: Omit<PetProfile, 'id'> & { id?: string }) {
    seedDemoData();
    const pets = readStorage<PetProfile[]>(STORAGE_KEYS.pets, demoPets);
    const nextPet: PetProfile = {
      id: payload.id ?? createId('pet'),
      name: payload.name,
      breed: payload.breed,
      birthday: payload.birthday,
      gender: payload.gender,
      image: payload.image,
    };
    const next = payload.id ? pets.map((pet) => (pet.id === payload.id ? nextPet : pet)) : [nextPet, ...pets];
    writeStorage(STORAGE_KEYS.pets, next);
    return mockRequest(nextPet, 0);
  },
  async deletePet(id: string) {
    const next = readStorage<PetProfile[]>(STORAGE_KEYS.pets, demoPets).filter((pet) => pet.id !== id);
    writeStorage(STORAGE_KEYS.pets, next);
    return mockRequest({ success: true }, 0);
  },
  async getFavoriteArticles() {
    seedDemoData();
    const favoriteIds = readStorage<string[]>(STORAGE_KEYS.favorites, []);
    const items = articleSeed.filter((article) => favoriteIds.includes(article.id));
    return mockRequest(items, 0);
  },
  async getBookings() {
    seedDemoData();
    return mockRequest(readStorage<ServiceBooking[]>(STORAGE_KEYS.bookings, []), 0);
  },
  async getMyPosts() {
    seedDemoData();
    const profile = getProfile();
    const posts = readStorage(STORAGE_KEYS.posts, basePosts).filter((post) => post.authorId === profile.id);
    return mockRequest(posts, 0);
  },
};
