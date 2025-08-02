import { motion } from 'framer-motion';
import { FaTrash, FaEnvelope, FaCalendarAlt } from 'react-icons/fa';
import { Contact } from '../../../types';

interface ContactCardProps {
  contact: Contact;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

const ContactCard = ({ contact, onDelete, isDeleting }: ContactCardProps) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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
      
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {contact.name}
          </h3>
          <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm mt-1">
            <FaEnvelope className="mr-2" size={12} />
            <a
              href={`mailto:${contact.email}`}
              className="hover:text-blue-600 transition-colors"
            >
              {contact.email}
            </a>
          </div>
        </div>
        
        <button
          onClick={() => onDelete(contact._id)}
          className="text-red-600 hover:text-red-800 p-2 transition-colors"
          title="Delete contact submission"
          disabled={isDeleting}
        >
          <FaTrash />
        </button>
      </div>

      <div className="mb-4">
        <p className="text-gray-700 dark:text-gray-300 text-sm">
          {contact.message}
        </p>
      </div>

      <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs">
        <FaCalendarAlt className="mr-2" size={12} />
        <span>Submitted: {formatDate(contact.submittedAt)}</span>
      </div>
    </motion.div>
  );
};

export default ContactCard;
