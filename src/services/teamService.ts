import axios from 'axios';
import { TeamMember } from '../types';

const API_URL = 'http://localhost:5000/api';

export const teamService = {
  async getAll(): Promise<TeamMember[]> {
    const response = await axios.get(`${API_URL}/team`);
    return response.data;
  },

  async getById(id: string): Promise<TeamMember> {
    const response = await axios.get(`${API_URL}/team/${id}`);
    return response.data;
  },

  async create(member: Omit<TeamMember, '_id' | 'createdAt' | 'updatedAt'>): Promise<TeamMember> {
    const response = await axios.post(`${API_URL}/team`, member);
    return response.data;
  },

  async update(id: string, member: Partial<TeamMember>): Promise<TeamMember> {
    const response = await axios.put(`${API_URL}/team/${id}`, member);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await axios.delete(`${API_URL}/team/${id}`);
  }
};