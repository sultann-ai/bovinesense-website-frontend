import { api } from './apiClient';
import { Recognition } from '../types';

export const recognitionsService = {
  async getAll(): Promise<Recognition[]> {
    const response = await api.get('/recognitions');
    return response.data;
  },

  async create(formData: FormData): Promise<Recognition> {
    const response = await api.post('/recognitions', formData);
    return response.data;
  },

  async update(id: string, formData: FormData): Promise<Recognition> {
    const response = await api.put(`/recognitions/${id}`, formData);
    return response.data;
  },

  async remove(id: string): Promise<void> {
    await api.delete(`/recognitions/${id}`);
  }
};
