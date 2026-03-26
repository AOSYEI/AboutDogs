import { demoUser } from '@/data/mockData';
import { mockRequest, readStorage, STORAGE_KEYS, writeStorage } from '@/lib/mockStorage';
import type { UserProfile } from '@/types';
import { seedDemoData } from './seed';

interface RegisterPayload {
  nickname: string;
  email: string;
  password: string;
}

const resolveProfile = () => readStorage<UserProfile>(STORAGE_KEYS.profile, demoUser);

export const authApi = {
  async login(payload: { email: string; password: string }) {
    seedDemoData();
    const current = resolveProfile();
    const next = { ...current, email: payload.email };
    writeStorage(STORAGE_KEYS.profile, next);
    return mockRequest(next, 0);
  },
  async register(payload: RegisterPayload) {
    seedDemoData();
    const next: UserProfile = {
      ...resolveProfile(),
      nickname: payload.nickname,
      email: payload.email,
    };
    writeStorage(STORAGE_KEYS.profile, next);
    return mockRequest(next, 0);
  },
  async forgotPassword(payload: { email: string }) {
    return mockRequest({ message: `找回密码邮件已发送到 ${payload.email}` }, 0);
  },
};
