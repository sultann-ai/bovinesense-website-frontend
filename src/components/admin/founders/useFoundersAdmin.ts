import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { foundersService } from '../../../services/foundersService';
import { Founder } from '../../../types';

export const useFounders = () => {
  const [founders, setFounders] = useState<Founder[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchFounders();
  }, []);

  const fetchFounders = async () => {
    try {
      setLoading(true);
      const data = await foundersService.getAll();
      setFounders(data);
    } catch (error) {
      console.error('Error fetching founders:', error);
      toast.error('Error loading founders. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  const deleteFounder = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this founder?')) {
      try {
        setDeletingId(id);
        await foundersService.delete(id);
        toast.success('Founder deleted successfully!');
        await fetchFounders();
      } catch (error) {
        console.error('Error deleting founder:', error);
        toast.error('Error deleting founder. Please try again.');
      } finally {
        setDeletingId(null);
      }
    }
  };

  return {
    founders,
    loading,
    deletingId,
    fetchFounders,
    deleteFounder
  };
};
