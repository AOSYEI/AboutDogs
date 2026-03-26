import { basePosts, defaultBookings, defaultFavorites, demoPets, demoUser } from '@/data/mockData';
import { ensureDefaultStorage } from '@/lib/mockStorage';

export const seedDemoData = () => {
  ensureDefaultStorage(demoUser, demoPets, basePosts, defaultFavorites, defaultBookings);
};
