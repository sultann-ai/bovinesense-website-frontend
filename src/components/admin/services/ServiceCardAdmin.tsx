import { motion } from 'framer-motion';
import { FaEdit, FaTrash, FaCog } from 'react-icons/fa';
import { Service } from '../../../types';

interface ServiceCardProps {
  service: Service;
  onEdit: (service: Service) => void;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

const ServiceCard = ({ service, onEdit, onDelete, isDeleting }: ServiceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-cream-deep rounded-card p-6 relative ${
        isDeleting ? 'opacity-50 pointer-events-none' : ''
      }`}
    >
      {isDeleting && (
        <div className="absolute inset-0 flex items-center justify-center bg-cream bg-opacity-75 rounded-card">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-danger"></div>
        </div>
      )}
      
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-cream-deep rounded-card flex items-center justify-center mr-4">
          <FaCog className="text-charcoal " size={24} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-charcoal ">
            {service.category}
          </h3>
          <p className="text-sm text-ink ">
            {service.services?.length || 0} services
          </p>
        </div>
      </div>

      {service.services && service.services.length > 0 && (
        <div className="mb-4">
          <div className="space-y-2">
            {service.services.slice(0, 2).map((serviceItem, index) => (
              <div key={index} className="bg-cream rounded p-3">
                <h4 className="font-medium text-charcoal text-sm">
                  {serviceItem.title}
                </h4>
                <p className="text-ink text-xs mt-1 line-clamp-2">
                  {serviceItem.description}
                </p>
              </div>
            ))}
            {service.services.length > 2 && (
              <p className="text-xs text-ink text-center">
                +{service.services.length - 2} more services
              </p>
            )}
          </div>
        </div>
      )}

      {/* Features */}
      {service.features && service.features.length > 0 && (
        <div className="mb-4">
          <h5 className="text-sm font-medium text-ink mb-2">Features:</h5>
          <div className="flex flex-wrap gap-1">
            {service.features.slice(0, 3).map((feature, index) => (
              <span
                key={index}
                className="inline-block border border-hairline text-ink text-xs px-2 py-1 rounded"
              >
                {feature}
              </span>
            ))}
            {service.features.length > 3 && (
              <span className="text-xs text-ink ">
                +{service.features.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-center space-x-2">
        <button
          onClick={() => onEdit(service)}
          className="text-charcoal hover:text-terracotta p-2 transition-colors"
          title="Edit service"
          disabled={isDeleting}
        >
          <FaEdit />
        </button>
        <button
          onClick={() => onDelete(service._id)}
          className="text-danger hover:text-danger p-2 transition-colors"
          title="Delete service"
          disabled={isDeleting}
        >
          <FaTrash />
        </button>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
