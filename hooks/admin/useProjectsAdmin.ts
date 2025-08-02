import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { projectsService } from '../../src/services/projectsService';
import { Project } from '../../src/types';

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await projectsService.getAll();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Error loading projects. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        setDeletingId(id);
        await projectsService.delete(id);
        toast.success('Project deleted successfully!');
        await fetchProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
        toast.error('Error deleting project. Please try again.');
      } finally {
        setDeletingId(null);
      }
    }
  };

  return {
    projects,
    loading,
    deletingId,
    fetchProjects,
    deleteProject
  };
};
