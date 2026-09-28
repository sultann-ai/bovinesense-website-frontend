import { api } from './apiClient';
import { BlogPost } from '../types';

export const blogService = {
  async getAll(): Promise<BlogPost[]> {
    const response = await api.get('/blog');
    return response.data;
  },

  async getById(id: string): Promise<BlogPost> {
    const response = await api.get(`/blog/${id}`);
    return response.data;
  },

  async getBySlug(slug: string): Promise<BlogPost> {
    const response = await api.get(`/blog/slug/${slug}`);
    return response.data;
  },

  async create(formData: FormData): Promise<BlogPost> {
    const response = await api.post('/blog', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async update(id: string, formData: FormData): Promise<BlogPost> {
    const response = await api.put(`/blog/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/blog/${id}`);
  }
};
