import { motion } from 'framer-motion';
import { FaEdit, FaTrash, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { TeamMember } from '../../../types';

interface TeamCardProps {
  teamMember: TeamMember;
  onEdit: (teamMember: TeamMember) => void;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

const TeamCard = ({ teamMember, onEdit, onDelete, isDeleting }: TeamCardProps) => {
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
      
      <img
        src={teamMember.image}
        alt={teamMember.name}
        className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
      />
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center">
        {teamMember.name}
      </h3>
      <p className="text-primary-600 dark:text-primary-400 text-center mb-2">
        {teamMember.role}
      </p>
      <p className="text-gray-600 dark:text-gray-300 text-sm text-center mb-4 line-clamp-3">
        {teamMember.bio}
      </p>
      
      {/* Contact Links */}
      <div className="flex justify-center space-x-2 mb-4">
        {teamMember.email && (
          <a
            href={`mailto:${teamMember.email}`}
            className="text-gray-500 hover:text-blue-600 p-1 transition-colors"
            title="Email"
          >
            <FaEnvelope size={14} />
          </a>
        )}
        {teamMember.linkedin && (
          <a
            href={teamMember.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-blue-600 p-1 transition-colors"
            title="LinkedIn"
          >
            <FaLinkedin size={14} />
          </a>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-2">
        <button
          onClick={() => onEdit(teamMember)}
          className="text-blue-600 hover:text-blue-800 p-2 transition-colors"
          title="Edit team member"
          disabled={isDeleting}
        >
          <FaEdit />
        </button>
        <button
          onClick={() => onDelete(teamMember._id)}
          className="text-red-600 hover:text-red-800 p-2 transition-colors"
          title="Delete team member"
          disabled={isDeleting}
        >
          <FaTrash />
        </button>
      </div>
    </motion.div>
  );
};

export default TeamCard;
