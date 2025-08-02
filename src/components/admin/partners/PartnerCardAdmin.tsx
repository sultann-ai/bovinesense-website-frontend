import { motion } from 'framer-motion';
import { FaEdit, FaTrash, FaExternalLinkAlt } from 'react-icons/fa';
import { Partner } from '../../../types';

interface PartnerCardProps {
  partner: Partner;
  onEdit: (partner: Partner) => void;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

const PartnerCard = ({ partner, onEdit, onDelete, isDeleting }: PartnerCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gray-50 dark:bg-gray-700 rounded-lg p-4 relative ${
        isDeleting ? 'opacity-50 pointer-events-none' : ''
      }`}
    >
      {isDeleting && (
        <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-800 bg-opacity-75 rounded-lg">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-600"></div>
        </div>
      )}
      
      <div className="flex items-center mb-4">
        <img
          src={partner.logo}
          alt={partner.name}
          className="w-16 h-16 object-contain rounded-lg bg-white p-2 mr-4"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {partner.name}
          </h3>
          <div className="flex items-center">
            <a
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
              title="Visit website"
            >
              <FaExternalLinkAlt className="mr-1" size={12} />
              Visit Website
            </a>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-2">
        <button
          onClick={() => onEdit(partner)}
          className="text-blue-600 hover:text-blue-800 p-2 transition-colors"
          title="Edit partner"
          disabled={isDeleting}
        >
          <FaEdit />
        </button>
        <button
          onClick={() => onDelete(partner._id)}
          className="text-red-600 hover:text-red-800 p-2 transition-colors"
          title="Delete partner"
          disabled={isDeleting}
        >
          <FaTrash />
        </button>
      </div>
    </motion.div>
  );
};

export default PartnerCard;
