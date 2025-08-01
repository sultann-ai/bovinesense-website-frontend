import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { foundersService } from '../../services/foundersService';
import { uploadService } from '../../services/uploadService';
import { Founder } from '../../types';
import { Button, Modal, FormInput } from '../reusables';
import { LoadingSpinner } from '../common-folder';

const AdminFounders = () => {
  const [founders, setFounders] = useState<Founder[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFounder, setEditingFounder] = useState<Founder | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    bio: '',
    image: '',
    linkedin: '',
    twitter: '',
    email: ''
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingFounder) {
        await foundersService.update(editingFounder._id, formData);
      } else {
        await foundersService.create(formData);
      }
      await fetchFounders();
      setIsModalOpen(false);
      setEditingFounder(null);
      setFormData({ name: '', role: '', bio: '', image: '', linkedin: '', twitter: '', email: '' });
    } catch (error) {
      console.error('Error saving founder:', error);
    }
  };

  const handleEdit = (founder: Founder) => {
    setEditingFounder(founder);
    setFormData({
      name: founder.name,
      role: founder.role,
      bio: founder.bio,
      image: founder.image,
      linkedin: founder.linkedin || '',
      twitter: founder.twitter || '',
      email: founder.email
    });
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const imageUrl = await uploadService.uploadImage(file);
        setFormData({ ...formData, image: imageUrl });
      } catch (error) {
        console.error('Error uploading image:', error);
      }
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
        onClose={() => {
          setIsModalOpen(false);
          setEditingFounder(null);
          setFormData({ name: '', role: '', bio: '', image: '', linkedin: '', twitter: '', email: '' });
        }}
        title={editingFounder ? 'Edit Founder' : 'Add Founder'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            id="name"
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <FormInput
            id="role"
            label="Role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            required
          />
          <FormInput
            id="bio"
            label="Bio"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            multiline
            rows={4}
            required
          />
          <FormInput
            id="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <FormInput
            id="linkedin"
            label="LinkedIn"
            type="url"
            value={formData.linkedin}
            onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
          />
          <FormInput
            id="twitter"
            label="Twitter"
            type="url"
            value={formData.twitter}
            onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            {formData.image && (
              <img src={formData.image} alt="Preview" className="mt-2 w-20 h-20 rounded-full object-cover" />
            )}
          </div>
          <div className="flex space-x-4">
            <Button type="submit" className="flex-1">
              {editingFounder ? 'Update' : 'Add'} Founder
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="flex-1"
              onClick={() => {
                setIsModalOpen(false);
                setEditingFounder(null);
                setFormData({ name: '', role: '', bio: '', image: '', linkedin: '', twitter: '', email: '' });
              }}
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
