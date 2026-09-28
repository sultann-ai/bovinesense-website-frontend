import { api } from './apiClient';
import { Founder } from '../types';

export const foundersService = {
  async getAll(): Promise<Founder[]> {
    const response = await api.get('/founders');
    return response.data;
  },

  async getById(id: string): Promise<Founder> {
    const response = await api.get(`/founders/${id}`);
    return response.data;
  },

  async create(formData: FormData): Promise<Founder> {
    const response = await api.post('/founders', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async update(id: string, formData: FormData): Promise<Founder> {
    const response = await api.put(`/founders/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/founders/${id}`);
  }
};
