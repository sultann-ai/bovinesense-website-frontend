import axios from 'axios';
import { Partner } from '../types';

const API_URL = 'http://localhost:5000/api';

export const partnersService = {
  async getAll(): Promise<Partner[]> {
    const response = await axios.get(`${API_URL}/partners`);
    return response.data;
  },

  async create(partner: Omit<Partner, '_id' | 'createdAt'>): Promise<Partner> {
    const response = await axios.post(`${API_URL}/partners`, partner);
    return response.data;
  },

  async update(id: string, partner: Partial<Partner>): Promise<Partner> {
    const response = await axios.put(`${API_URL}/partners/${id}`, partner);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await axios.delete(`${API_URL}/partners/${id}`);
  }
};