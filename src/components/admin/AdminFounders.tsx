import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { foundersService } from '../../services/foundersService';
import { Founder } from '../../types';
import { Button, Modal, FormInput, ImageUpload } from '../reusables';
import { LoadingSpinner } from '../common-folder';

interface FounderFormData {
  name: string;
  role: string;
  bio: string;
  email: string;
  linkedin: string;
  twitter: string;
}

const AdminFounders = () => {
  const [founders, setFounders] = useState<Founder[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFounder, setEditingFounder] = useState<Founder | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [imageError, setImageError] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FounderFormData>({
    defaultValues: {
      name: '',
      role: '',
      bio: '',
      email: '',
      linkedin: '',
      twitter: ''
    }
  });

  useEffect(() => {
    fetchFounders();
  }, []);

  const fetchFounders = async () => {
    try {
      const data = await foundersService.getAll();
      setFounders(data);
    } catch (error) {
      console.error('Error fetching founders:', error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: FounderFormData) => {
    // Validate image for new founders
    if (!editingFounder && !selectedFile) {
      setImageError('Profile image is required');
      return;
    }

    try {
      setSubmitting(true);
      setImageError('');
      
      const formData = new FormData();
      
      // Append all form fields to FormData
      Object.entries(data).forEach(([key, value]) => {
        if (value) {
          formData.append(key, value);
        }
      });

      // Append image file if selected
      if (selectedFile) {
        formData.append('image', selectedFile);
      }

      if (editingFounder) {
        await foundersService.update(editingFounder._id, formData);
      } else {
        await foundersService.create(formData);
      }
      
      await fetchFounders();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving founder:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (founder: Founder) => {
    setEditingFounder(founder);
    reset({
      name: founder.name,
      role: founder.role,
      bio: founder.bio,
      email: founder.email,
      linkedin: founder.linkedin || '',
      twitter: founder.twitter || ''
    });
    setPreviewImage(founder.image);
    setSelectedFile(null);
    setImageError('');
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this founder?')) {
      try {
        await foundersService.delete(id);
        await fetchFounders();
      } catch (error) {
        console.error('Error deleting founder:', error);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingFounder(null);
    setSelectedFile(null);
    setPreviewImage('');
    setImageError('');
    reset();
  };

  const handleImageChange = (file: File | null, imageUrl?: string) => {
    setSelectedFile(file);
    setPreviewImage(imageUrl || '');
    if (file) {
      setImageError('');
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <LoadingSpinner size="lg" className="mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-300">Loading founders...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Founders ({founders.length})
        </h2>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center"
        >
          <FaPlus className="mr-2" /> Add Founder
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {founders.map((founder) => (
          <motion.div
            key={founder._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
          >
            <img
              src={founder.image}
              alt={founder.name}
              className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center">
              {founder.name}
            </h3>
            <p className="text-primary-600 dark:text-primary-400 text-center mb-2">
              {founder.role}
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-sm text-center mb-4 line-clamp-3">
              {founder.bio}
            </p>
            <div className="flex justify-center space-x-2">
              <button
                onClick={() => handleEdit(founder)}
                className="text-blue-600 hover:text-blue-800 p-2"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(founder._id)}
                className="text-red-600 hover:text-red-800 p-2"
              >
                <FaTrash />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingFounder ? 'Edit Founder' : 'Add Founder'}
        size="lg"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormInput
            id="name"
            label="Name"
            register={register}
            error={errors.name}
            required
          />
          
          <FormInput
            id="role"
            label="Role"
            register={register}
            error={errors.role}
            required
          />
          
          <FormInput
            id="bio"
            label="Bio"
            register={register}
            error={errors.bio}
            multiline
            rows={4}
            required
          />
          
          <FormInput
            id="email"
            label="Email"
            type="email"
            register={register}
            error={errors.email}
            required
          />
          
          <FormInput
            id="linkedin"
            label="LinkedIn"
            type="url"
            register={register}
            error={errors.linkedin}
            placeholder="https://linkedin.com/in/username"
          />
          
          <FormInput
            id="twitter"
            label="Twitter"
            type="url"
            register={register}
            error={errors.twitter}
            placeholder="https://twitter.com/username"
          />

          <ImageUpload
            label="Profile Image"
            value={previewImage}
            onChange={handleImageChange}
            required={!editingFounder}
            error={imageError}
          />

          <div className="flex space-x-4">
            <Button 
              type="submit" 
              className="flex-1"
              disabled={submitting}
            >
              {submitting ? 'Saving...' : editingFounder ? 'Update' : 'Add'} Founder
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="flex-1"
              onClick={handleCloseModal}
              disabled={submitting}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminFounders;
