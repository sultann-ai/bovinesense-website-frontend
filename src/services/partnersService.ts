import { api } from './apiClient';
import { Partner } from '../types';

export const partnersService = {
  async getAll(): Promise<Partner[]> {
    const response = await api.get('/partners');
    return response.data;
  },

  async create(formData: FormData): Promise<Partner> {
    const response = await api.post('/partners', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async update(id: string, formData: FormData): Promise<Partner> {
    const response = await api.put(`/partners/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/partners/${id}`);
  }
};
