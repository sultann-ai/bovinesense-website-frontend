import axios from 'axios';
import { BlogPost } from '../types';

const API_URL = 'http://localhost:5000/api';

export const blogService = {
  async getAll(): Promise<BlogPost[]> {
    const response = await axios.get(`${API_URL}/blog`);
    return response.data;
  },

  async getById(id: string): Promise<BlogPost> {
    const response = await axios.get(`${API_URL}/blog/${id}`);
    return response.data;
  },

  async getBySlug(slug: string): Promise<BlogPost> {
    const response = await axios.get(`${API_URL}/blog/slug/${slug}`);
    return response.data;
  },

  async create(post: Omit<BlogPost, '_id' | 'createdAt' | 'updatedAt'>): Promise<BlogPost> {
    const response = await axios.post(`${API_URL}/blog`, post);
    return response.data;
  },

  async update(id: string, post: Partial<BlogPost>): Promise<BlogPost> {
    const response = await axios.put(`${API_URL}/blog/${id}`, post);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await axios.delete(`${API_URL}/blog/${id}`);
  }
};