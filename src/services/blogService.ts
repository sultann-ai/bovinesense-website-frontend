import axios from 'axios';
import { BlogPost } from '../types';

const API_URL = 'http://localhost:5000/api';

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