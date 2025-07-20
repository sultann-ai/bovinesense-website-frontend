import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const adminService = {
  async login(password: string): Promise<void> {
    const response = await axios.post(`${API_URL}/admin/login`, { password });
    if (!response.data.success) {
      throw new Error('Invalid password');
    }
  }
};