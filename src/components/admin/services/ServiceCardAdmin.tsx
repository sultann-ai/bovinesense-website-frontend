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
      className={`bg-gray-50 dark:bg-gray-700 rounded-lg p-6 relative ${
        isDeleting ? 'opacity-50 pointer-events-none' : ''
      }`}
    >
      {isDeleting && (
        <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-800 bg-opacity-75 rounded-lg">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-600"></div>
        </div>
      )}
      
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mr-4">
          <FaCog className="text-primary-600 dark:text-primary-400" size={24} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {service.category}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {service.services?.length || 0} services
          </p>
        </div>
      </div>

      {service.services && service.services.length > 0 && (
        <div className="mb-4">
          <div className="space-y-2">
            {service.services.slice(0, 2).map((serviceItem, index) => (
              <div key={index} className="bg-white dark:bg-gray-600 rounded p-3">
                <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                  {serviceItem.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-xs mt-1 line-clamp-2">
                  {serviceItem.description}
                </p>
              </div>
            ))}
            {service.services.length > 2 && (
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                +{service.services.length - 2} more services
              </p>
            )}
          </div>
        </div>
      )}

      {/* Features */}
      {service.features && service.features.length > 0 && (
        <div className="mb-4">
          <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Features:</h5>
          <div className="flex flex-wrap gap-1">
            {service.features.slice(0, 3).map((feature, index) => (
              <span
                key={index}
                className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded"
              >
                {feature}
              </span>
            ))}
            {service.features.length > 3 && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
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
          className="text-blue-600 hover:text-blue-800 p-2 transition-colors"
          title="Edit service"
          disabled={isDeleting}
        >
          <FaEdit />
        </button>
        <button
          onClick={() => onDelete(service._id)}
          className="text-red-600 hover:text-red-800 p-2 transition-colors"
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
