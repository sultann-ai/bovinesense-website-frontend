import { motion } from 'framer-motion';
import { FaLinkedin } from 'react-icons/fa';
import { TeamMember } from '../../types';

interface TeamCardProps {
  member: TeamMember;
  index: number;
}

const TeamCard = ({ member, index }: TeamCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 p-6 rounded-3xl shadow-card dark:shadow-card-dark hover:shadow-card-hover dark:hover:shadow-card-dark-hover transition-all duration-500 border border-gray-100 dark:border-gray-700 overflow-hidden"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
      
      {/* Enhanced avatar section */}
      <div className="relative mb-6 flex justify-center">
        <div className="relative">
          {/* Outer glow ring */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-400 to-indigo-400 rounded-full blur-lg opacity-0 group-hover:opacity-25 transition-all duration-500 scale-110"></div>
          
          {/* Main avatar container - larger and rounded */}
          <div className="relative w-36 h-36 rounded-full p-1 bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 group-hover:scale-105 transition-all duration-300 shadow-lg">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full rounded-full object-cover shadow-xl"
            />
            {/* Inner gradient overlay */}
            <div className="absolute inset-1 rounded-full bg-gradient-to-br from-purple-500/10 via-transparent to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          {/* Status indicator */}
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
        </div>
      </div>
      
      <div className="relative z-10 text-center">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
          {member.name}
        </h3>
        
        {/* Enhanced role badge */}
        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-full mb-3 group-hover:from-purple-500/20 group-hover:to-indigo-500/20 transition-all duration-300">
          <p className="text-purple-600 dark:text-purple-400 font-semibold text-xs">
            {member.role}
          </p>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-sm line-clamp-5">
          {member.bio}
        </p>
        
        {/* Enhanced social link */}
        {/* <div className="flex justify-center">
          {member.linkedin && (
            <motion.a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group/social relative w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-2xl flex items-center justify-center hover:from-blue-500 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaLinkedin className="text-gray-600 dark:text-gray-300 group-hover/social:text-white transition-colors text-xl" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 opacity-0 group-hover/social:opacity-100 transition-opacity duration-300"></div>
            </motion.a>
          )}
        </div> */}
      </div>
      
      {/* Floating elements for visual interest */}
      <div className="absolute top-6 right-6 w-3 h-3 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
      <div className="absolute bottom-8 left-6 w-2 h-2 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full opacity-15 group-hover:opacity-30 transition-opacity duration-300"></div>
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 -top-[1px] -left-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform -skew-x-12 group-hover:animate-shimmer rounded-3xl"></div>
      
      {/* Bottom gradient accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-3xl"></div>
    </motion.div>
  );
};

export default TeamCard;
