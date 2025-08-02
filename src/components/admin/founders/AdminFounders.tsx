import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Founder } from '../../../types';
import { Button } from '../../reusables';
import LoadingSpinner from '../../common/LoadingSpinner';
import FounderCard from './FounderCardAdmin';
import FounderModal from './FounderModalAdmin';
import { useFounders } from '../../../../hooks/admin/useFoundersAdmin';

const AdminFounders = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFounder, setEditingFounder] = useState<Founder | null>(null);

  const { founders, loading, deletingId, fetchFounders, deleteFounder } = useFounders();

  const handleEdit = (founder: Founder) => {
    setEditingFounder(founder);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingFounder(null);
  };

  const handleAddNew = () => {
    setEditingFounder(null);
    setIsModalOpen(true);
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
          onClick={handleAddNew}
          className="flex items-center"
        >
          <FaPlus className="mr-2" /> Add Founder
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {founders.map((founder) => (
          <FounderCard
            key={founder._id}
            founder={founder}
            onEdit={handleEdit}
            onDelete={deleteFounder}
            isDeleting={deletingId === founder._id}
          />
        ))}
      </div>

      <FounderModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editingFounder={editingFounder}
        onSuccess={fetchFounders}
      />
    </div>
  );
};

export default AdminFounders;
