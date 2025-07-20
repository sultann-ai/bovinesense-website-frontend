import axios from 'axios';
import { Project } from '../types';

const API_URL = 'http://localhost:5000/api';

export const projectsService = {
  async getAll(): Promise<Project[]> {
    const response = await axios.get(`${API_URL}/projects`);
    return response.data;
  },

  async getById(id: string): Promise<Project> {
    const response = await axios.get(`${API_URL}/projects/${id}`);
    return response.data;
  },

  async create(project: Omit<Project, '_id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
    const response = await axios.post(`${API_URL}/projects`, project);
    return response.data;
  },

  async update(id: string, project: Partial<Project>): Promise<Project> {
    const response = await axios.put(`${API_URL}/projects/${id}`, project);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await axios.delete(`${API_URL}/projects/${id}`);
  }
};