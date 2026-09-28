import { api } from './apiClient';
import { TeamMember } from '../types';

export const teamService = {
  async getAll(): Promise<TeamMember[]> {
    const response = await api.get('/team');
    return response.data;
  },

  async getById(id: string): Promise<TeamMember> {
    const response = await api.get(`/team/${id}`);
    return response.data;
  },

  async create(formData: FormData): Promise<TeamMember> {
    const response = await api.post('/team', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async update(id: string, formData: FormData): Promise<TeamMember> {
    const response = await api.put(`/team/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/team/${id}`);
  }
};
