import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Partner } from '../../../types';
import { Button } from '../../reusables';
import LoadingSpinner from '../../common/LoadingSpinner';
import PartnerCard from './PartnerCardAdmin';
import PartnerModal from './PartnerModalAdmin';
import { usePartners } from '../../../../hooks/admin/usePartnersAdmin';

const AdminPartners = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);

  const { partners, loading, deletingId, fetchPartners, deletePartner } = usePartners();

  const handleEdit = (partner: Partner) => {
    setEditingPartner(partner);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPartner(null);
  };

  const handleAddNew = () => {
    setEditingPartner(null);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <LoadingSpinner size="lg" className="mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-300">Loading partners...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Partners ({partners.length})
        </h2>
        <Button
          onClick={handleAddNew}
          className="flex items-center"
        >
          <FaPlus className="mr-2" /> Add Partner
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {partners.map((partner) => (
          <PartnerCard
            key={partner._id}
            partner={partner}
            onEdit={handleEdit}
            onDelete={deletePartner}
            isDeleting={deletingId === partner._id}
          />
        ))}
      </div>

      <PartnerModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editingPartner={editingPartner}
        onSuccess={fetchPartners}
      />
    </div>
  );
};

export default AdminPartners;
