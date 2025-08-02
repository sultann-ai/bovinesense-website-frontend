import axios from 'axios';
import { Contact } from '../types';

const API_URL = 'http://localhost:5000/api';

// Create axios instance with interceptors
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

export const contactService = {
  async getAll(): Promise<Contact[]> {
    const response = await api.get('/contact');
    return response.data;
  },

  async create(contact: Omit<Contact, '_id' | 'submittedAt'>): Promise<Contact> {
    const response = await axios.post(`${API_URL}/contact`, contact);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/contact/${id}`);
  }
};