import { motion } from 'framer-motion';
import { FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Founder } from '../../types';

interface FounderCardProps {
  founder: Founder;
  index: number;
}

const FounderCard = ({ founder, index }: FounderCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 p-6 rounded-3xl shadow-card dark:shadow-card-dark hover:shadow-card-hover dark:hover:shadow-card-dark-hover transition-all duration-500 border border-gray-100 dark:border-gray-700 overflow-hidden text-center cursor-pointer"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
      
      {/* Enhanced avatar with multiple layers */}
      <div className="relative mb-6 flex justify-center">
        <div className="relative">
          {/* Outer glow ring */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-400 via-blue-400 to-secondary-400 rounded-full blur-lg opacity-0 group-hover:opacity-30 transition-all duration-500 scale-110"></div>
          
          {/* Main avatar container */}
          <div className="relative w-40 h-40 rounded-full p-1 bg-gradient-to-br from-primary-500 via-blue-500 to-secondary-500 group-hover:scale-105 transition-all duration-300 ">
            <img
              src={founder.image}
              alt={founder.name}
              className="w-full h-full rounded-full object-cover shadow-xl"
            />
            {/* Inner gradient overlay */}
            <div className="absolute inset-1 rounded-full bg-gradient-to-br from-primary-500/10 via-transparent to-secondary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          {/* Floating accent dot */}
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>
      </div>
      
      <div className="relative z-10">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {founder.name}
        </h3>
        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-full mb-3">
          <p className="text-primary-600 dark:text-primary-400 font-semibold text-xs">
            {founder.role}
          </p>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 leading-relaxed line-clamp-5">
          {founder.bio}
        </p>
        
        {/* Enhanced social links */}
        {/* <div className="flex justify-center space-x-4">
          {founder.linkedin && (
            <motion.a
              href={founder.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group/social relative w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-xl flex items-center justify-center hover:from-blue-500 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-lg"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaLinkedin className="text-gray-600 dark:text-gray-300 group-hover/social:text-white transition-colors text-lg" />
            </motion.a>
          )}
          {founder.twitter && (
            <motion.a
              href={founder.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="group/social relative w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-xl flex items-center justify-center hover:from-blue-400 hover:to-blue-500 transition-all duration-300 shadow-md hover:shadow-lg"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaTwitter className="text-gray-600 dark:text-gray-300 group-hover/social:text-white transition-colors text-lg" />
            </motion.a>
          )}
        </div> */}
      </div>
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 -top-[1px] -left-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform -skew-x-12 group-hover:animate-shimmer rounded-3xl"></div>
      
      {/* Bottom gradient accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-blue-500 to-secondary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-3xl"></div>
    </motion.div>
  );
};

export default FounderCard;
