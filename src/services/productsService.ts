import axios from 'axios';
import { Product } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with interceptors for protected routes
const api = axios.create({
  baseURL: API_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('admin_token');
      if (!window.location.pathname.includes('/admin-login')) {
        window.location.href = '/admin-login';
      }
    }
    return Promise.reject(error);
  }
);

export const productsService = {
  async getAll(): Promise<Product[]> {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  },

  async getById(id: string): Promise<Product> {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data;
  },

  async getBySlug(slug: string): Promise<Product> {
    const response = await axios.get(`${API_URL}/products/slug/${slug}`);
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
    const response = await axios.get(`${API_URL}/products/${id}/screenshots`);
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