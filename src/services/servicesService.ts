import axios from 'axios';
import { Service } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const servicesService = {
  async getAll(): Promise<Service[]> {
    const response = await axios.get(`${API_URL}/services`);
    return response.data;
  },

  async getById(id: string): Promise<Service> {
    const response = await axios.get(`${API_URL}/services/${id}`);
    return response.data;
  },

  async create(service: Omit<Service, '_id' | 'createdAt' | 'updatedAt'>): Promise<Service> {
    const response = await axios.post(`${API_URL}/services`, service);
    return response.data;
  },

  async update(id: string, service: Partial<Service>): Promise<Service> {
    const response = await axios.put(`${API_URL}/services/${id}`, service);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await axios.delete(`${API_URL}/services/${id}`);
  }
};