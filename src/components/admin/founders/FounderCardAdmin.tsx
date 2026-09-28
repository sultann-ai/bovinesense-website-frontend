import { motion } from 'framer-motion';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Founder } from '../../../types';

interface FounderCardProps {
  founder: Founder;
  onEdit: (founder: Founder) => void;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

const FounderCard = ({ founder, onEdit, onDelete, isDeleting }: FounderCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-cream-deep rounded-card p-4 relative ${
        isDeleting ? 'opacity-50 pointer-events-none' : ''
      }`}
    >
      {isDeleting && (
        <div className="absolute inset-0 flex items-center justify-center bg-cream bg-opacity-75 rounded-card">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-danger"></div>
        </div>
      )}
      
      <img
        src={founder.image}
        alt={founder.name}
        className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
      />
      <h3 className="text-lg font-semibold text-charcoal text-center">
        {founder.name}
      </h3>
      <p className="text-charcoal text-center mb-2">
        {founder.role}
      </p>
      <p className="text-ink text-sm text-center mb-4 line-clamp-3">
        {founder.bio}
      </p>
      <div className="flex justify-center space-x-2">
        <button
          onClick={() => onEdit(founder)}
          className="text-charcoal hover:text-terracotta p-2 transition-colors"
          title="Edit founder"
          disabled={isDeleting}
        >
          <FaEdit />
        </button>
        <button
          onClick={() => onDelete(founder._id)}
          className="text-danger hover:text-danger p-2 transition-colors"
          title="Delete founder"
          disabled={isDeleting}
        >
          <FaTrash />
        </button>
      </div>
    </motion.div>
  );
};

export default FounderCard;
