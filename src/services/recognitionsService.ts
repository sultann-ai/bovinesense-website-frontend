import axios from 'axios';
import { Recognition } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const recognitionsService = {
  async getAll(): Promise<Recognition[]> {
    const response = await axios.get(`${API_URL}/recognitions`);
    return response.data;
  },

  async create(formData: FormData): Promise<Recognition> {
    const response = await axios.post(`${API_URL}/recognitions`, formData);
    return response.data;
  },

  async update(id: string, formData: FormData): Promise<Recognition> {
    const response = await axios.put(`${API_URL}/recognitions/${id}`, formData);
    return response.data;
  },

  async remove(id: string): Promise<void> {
    await axios.delete(`${API_URL}/recognitions/${id}`);
  }
};
