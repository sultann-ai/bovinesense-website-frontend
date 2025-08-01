import axios from 'axios';

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
      // Don't redirect here if we're already on the login page
      if (!window.location.pathname.includes('/admin-login')) {
        window.location.href = '/admin-login';
      }
    }
    return Promise.reject(error);
  }
);

export const adminService = {
  async login(username: string, password: string): Promise<{ token: string; admin: any }> {
    const response = await api.post('/admin/login', { username, password });
    if (!response.data.success) {
      throw new Error(response.data.message || 'Login failed');
    }
    return response.data;
  },

  async getProfile(): Promise<any> {
    const response = await api.get('/admin/profile');
    if (!response.data.success) {
      throw new Error('Failed to get profile');
    }
    return response.data.admin;
  },

  async logout(): Promise<void> {
    try {
      await api.post('/admin/logout');
    } catch (error) {
      // Even if logout fails on backend, we'll clear local storage
      console.warn('Logout request failed:', error);
    }
  },

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    const response = await api.put('/admin/change-password', {
      currentPassword,
      newPassword,
    });
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to change password');
    }
  }
};