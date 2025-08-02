import { useState, useCallback } from 'react';
import { BlogPost } from '../../src/types';
import { blogService } from '../../src/services/blogService';

export const useBlogAdmin = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await blogService.getAll();
      setBlogs(data);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to fetch blogs');
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createBlog = useCallback(async (formData: FormData) => {
    try {
      setError(null);
      const newBlog = await blogService.create(formData);
      setBlogs(prev => [newBlog, ...prev]);
      return newBlog;
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to create blog');
      throw err;
    }
  }, []);

  const updateBlog = useCallback(async (id: string, formData: FormData) => {
    try {
      setError(null);
      const updatedBlog = await blogService.update(id, formData);
      setBlogs(prev => prev.map(blog => blog._id === id ? updatedBlog : blog));
      return updatedBlog;
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to update blog');
      throw err;
    }
  }, []);

  const deleteBlog = useCallback(async (id: string) => {
    try {
      setError(null);
      await blogService.delete(id);
      setBlogs(prev => prev.filter(blog => blog._id !== id));
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to delete blog');
      throw err;
    }
  }, []);

  return {
    blogs,
    loading,
    error,
    fetchBlogs,
    createBlog,
    updateBlog,
    deleteBlog
  };
};
