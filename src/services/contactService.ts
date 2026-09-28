import { api } from './apiClient';
import { Contact } from '../types';

export const contactService = {
  async getAll(): Promise<Contact[]> {
    const response = await api.get('/contact');
    return response.data;
  },

  // POST /contact accepts exactly { name, email, message } (docs/BACKEND.md §7.4).
  async create(contact: Pick<Contact, 'name' | 'email' | 'message'>): Promise<Contact> {
    const response = await api.post('/contact', contact);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/contact/${id}`);
  }
};
