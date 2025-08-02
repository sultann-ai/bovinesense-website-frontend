import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { contactService } from '../../src/services/contactService';
import { Contact } from '../../src/types';

export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const data = await contactService.getAll();
      setContacts(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      toast.error('Error loading contacts. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  const deleteContact = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this contact submission?')) {
      try {
        setDeletingId(id);
        await contactService.delete(id);
        toast.success('Contact submission deleted successfully!');
        await fetchContacts();
      } catch (error) {
        console.error('Error deleting contact submission:', error);
        toast.error('Error deleting contact submission. Please try again.');
      } finally {
        setDeletingId(null);
      }
    }
  };

  return {
    contacts,
    loading,
    deletingId,
    fetchContacts,
    deleteContact
  };
};
