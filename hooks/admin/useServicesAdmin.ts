import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { servicesService } from '../../src/services/servicesService';
import { Service } from '../../src/types';

export const useServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const data = await servicesService.getAll();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
      toast.error('Error loading services. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  const deleteService = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        setDeletingId(id);
        await servicesService.delete(id);
        toast.success('Service deleted successfully!');
        await fetchServices();
      } catch (error) {
        console.error('Error deleting service:', error);
        toast.error('Error deleting service. Please try again.');
      } finally {
        setDeletingId(null);
      }
    }
  };

  return {
    services,
    loading,
    deletingId,
    fetchServices,
    deleteService
  };
};
