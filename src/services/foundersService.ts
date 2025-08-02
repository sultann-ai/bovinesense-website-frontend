import axios from 'axios';
import { Founder } from '../types';

const API_URL = 'http://localhost:5000/api';

export const foundersService = {
  async getAll(): Promise<Founder[]> {
    const response = await axios.get(`${API_URL}/founders`);
    return response.data;
  },

  async getById(id: string): Promise<Founder> {
    const response = await axios.get(`${API_URL}/founders/${id}`);
    return response.data;
  },

  async create(formData: FormData): Promise<Founder> {
    const response = await axios.post(`${API_URL}/founders`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async update(id: string, formData: FormData): Promise<Founder> {
    const response = await axios.put(`${API_URL}/founders/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await axios.delete(`${API_URL}/founders/${id}`);
  }
};