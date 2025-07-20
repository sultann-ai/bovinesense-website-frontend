import axios from 'axios';
import { Product } from '../types';

const API_URL = 'http://localhost:5000/api';

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

  async create(product: Omit<Product, '_id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    const response = await axios.post(`${API_URL}/products`, product);
    return response.data;
  },

  async update(id: string, product: Partial<Product>): Promise<Product> {
    const response = await axios.put(`${API_URL}/products/${id}`, product);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await axios.delete(`${API_URL}/products/${id}`);
  }
};