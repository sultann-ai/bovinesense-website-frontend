import { api } from './apiClient';

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
