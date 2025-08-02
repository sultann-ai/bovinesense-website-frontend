import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { partnersService } from '../../src/services/partnersService';
import { Partner } from '../../src/types';

export const usePartners = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      setLoading(true);
      const data = await partnersService.getAll();
      setPartners(data);
    } catch (error) {
      console.error('Error fetching partners:', error);
      toast.error('Error loading partners. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  const deletePartner = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this partner?')) {
      try {
        setDeletingId(id);
        await partnersService.delete(id);
        toast.success('Partner deleted successfully!');
        await fetchPartners();
      } catch (error) {
        console.error('Error deleting partner:', error);
        toast.error('Error deleting partner. Please try again.');
      } finally {
        setDeletingId(null);
      }
    }
  };

  return {
    partners,
    loading,
    deletingId,
    fetchPartners,
    deletePartner
  };
};
