import { motion } from 'framer-motion';
import { ServiceItem } from '../../types';
import { getIconComponent } from '../../utils/iconUtils';

interface ServiceCardProps {
  service: ServiceItem;
  delay?: number;
  features?: string[];
}

const ServiceCard = ({ service, delay = 0, features }: ServiceCardProps) => {
  const IconComponent = getIconComponent(service.icon);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 p-8 rounded-2xl shadow-card dark:shadow-card-dark hover:shadow-card-hover dark:hover:shadow-card-dark-hover transition-all duration-500 border border-gray-100 dark:border-gray-700 overflow-hidden"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
      
      {/* Enhanced icon container */}
      <div className="relative w-16 h-16 bg-gradient-to-br from-primary-500 via-blue-500 to-secondary-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg mx-auto sm:mx-0">
        <IconComponent className="text-white text-2xl relative z-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-400 via-blue-400 to-secondary-400 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors relative z-10 text-center sm:text-left">
        {service.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6 relative z-10 leading-relaxed">
        {service.description}
      </p>
      
      {/* Feature list if provided */}
      {features && features.length > 0 && (
        <ul className="space-y-3 mb-6 relative z-10">
          {features.map((feature, featureIndex) => (
            <motion.li 
              key={featureIndex} 
              className="flex items-center text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * featureIndex }}
            >
              <div className="w-2 h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mr-3 group-hover:scale-125 transition-transform"></div>
              {feature}
            </motion.li>
          ))}
        </ul>
      )}
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 -top-[1px] -left-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform -skew-x-12 group-hover:animate-shimmer"></div>
      
      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-blue-500 to-secondary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </motion.div>
  );
};

export default ServiceCard;