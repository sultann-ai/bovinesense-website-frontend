import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Service } from '../../../types';
import { Button } from '../../reusables';
import LoadingSpinner from '../../common/LoadingSpinner';
import ServiceCard from './ServiceCardAdmin';
import ServiceModal from './ServiceModalAdmin';
import { useServices } from '../../../../hooks/admin/useServicesAdmin';

const AdminServices = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  const { services, loading, deletingId, fetchServices, deleteService } = useServices();

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingService(null);
  };

  const handleAddNew = () => {
    setEditingService(null);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <LoadingSpinner size="lg" className="mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-300">Loading services...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Services ({services.length})
        </h2>
        <Button
          onClick={handleAddNew}
          className="flex items-center"
        >
          <FaPlus className="mr-2" /> Add Service
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <ServiceCard
            key={service._id}
            service={service}
            onEdit={handleEdit}
            onDelete={deleteService}
            isDeleting={deletingId === service._id}
          />
        ))}
      </div>

      <ServiceModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editingService={editingService}
        onSuccess={fetchServices}
      />
    </div>
  );
};

export default AdminServices;
