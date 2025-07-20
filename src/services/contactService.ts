import axios from 'axios';
import { Contact } from '../types';

const API_URL = 'http://localhost:5000/api';

export const contactService = {
  async getAll(): Promise<Contact[]> {
    const response = await axios.get(`${API_URL}/contact`);
    return response.data;
  },

  async create(contact: Omit<Contact, '_id' | 'submittedAt'>): Promise<Contact> {
    const response = await axios.post(`${API_URL}/contact`, contact);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await axios.delete(`${API_URL}/contact/${id}`);
  }
};