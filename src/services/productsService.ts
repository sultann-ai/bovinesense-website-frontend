import { api } from './apiClient';
import { Product } from '../types';

export const productsService = {
  async getAll(): Promise<Product[]> {
    const response = await api.get('/products');
    return response.data;
  },

  async getById(id: string): Promise<Product> {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  async getBySlug(slug: string): Promise<Product> {
    const response = await api.get(`/products/slug/${slug}`);
    return response.data;
  },

  async create(formData: FormData): Promise<Product> {
    const response = await api.post('/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async update(id: string, formData: FormData): Promise<Product> {
    const response = await api.put(`/products/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/products/${id}`);
  },

  async getScreenshots(id: string): Promise<{ screenshots: string[] }> {
    const response = await api.get(`/products/${id}/screenshots`);
    return response.data;
  },

  async addScreenshots(id: string, formData: FormData): Promise<{ message: string; added: string[]; total: number; screenshots: string[] }> {
    const response = await api.post(`/products/${id}/screenshots`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async removeScreenshot(id: string, index: number): Promise<{ message: string; removed: string; remainingCount: number; screenshots: string[] }> {
    const response = await api.delete(`/products/${id}/screenshots/${index}`);
    return response.data;
  }
};
