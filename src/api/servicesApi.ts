import { services } from '@/data/mockData';
import { createId, mockRequest, readStorage, STORAGE_KEYS, writeStorage } from '@/lib/mockStorage';
import type { ServiceBooking, ServiceSort, ServiceType } from '@/types';
import { seedDemoData } from './seed';

interface BookingPayload {
  providerId: string;
  providerName: string;
  serviceName: string;
  date: string;
  time: string;
  petName: string;
  petBreed: string;
  note: string;
}

export const servicesApi = {
  async getServices(filters?: { type?: ServiceType | '全部'; sort?: ServiceSort }) {
    seedDemoData();
    const type = filters?.type ?? '全部';
    const sort = filters?.sort ?? 'rating';
    const items = services
      .filter((service) => (type === '全部' ? true : service.type === type))
      .sort((a, b) => (sort === 'distance' ? a.distanceKm - b.distanceKm : b.rating - a.rating));
    return mockRequest(items, 0);
  },
  async getServiceById(id: string) {
    seedDemoData();
    const found = services.find((service) => service.id === id);
    if (!found) throw new Error('服务不存在');
    return mockRequest(found, 0);
  },
  async createBooking(payload: BookingPayload) {
    seedDemoData();
    const bookings = readStorage<ServiceBooking[]>(STORAGE_KEYS.bookings, []);
    const booking: ServiceBooking = {
      id: createId('booking'),
      serviceProviderId: payload.providerId,
      providerName: payload.providerName,
      serviceName: payload.serviceName,
      date: payload.date,
      time: payload.time,
      petName: payload.petName,
      petBreed: payload.petBreed,
      note: payload.note,
      status: '待确认',
      createdAt: new Date().toISOString(),
    };
    writeStorage(STORAGE_KEYS.bookings, [booking, ...bookings]);
    return mockRequest(booking, 0);
  },
};
