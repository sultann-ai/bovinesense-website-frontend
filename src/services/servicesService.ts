import { api } from './apiClient';
import { Service } from '../types';

export const servicesService = {
  async getAll(): Promise<Service[]> {
    const response = await api.get('/services');
    return response.data;
  },

  async getById(id: string): Promise<Service> {
    const response = await api.get(`/services/${id}`);
    return response.data;
  },

  async create(service: Omit<Service, '_id' | 'createdAt' | 'updatedAt'>): Promise<Service> {
    const response = await api.post('/services', service);
    return response.data;
  },

  async update(id: string, service: Partial<Service>): Promise<Service> {
    const response = await api.put(`/services/${id}`, service);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/services/${id}`);
  }
};
