import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  delay?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-2xl shadow-card dark:shadow-card-dark hover:shadow-card-hover dark:hover:shadow-card-dark-hover transition-all duration-500 border border-gray-100 dark:border-gray-700 overflow-hidden"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
      
      <div className="relative overflow-hidden rounded-t-2xl">
        <img
          src={product.bannerImage}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Enhanced action buttons */}
        <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          {product.liveLink && (
            <motion.a
              href={product.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gradient-to-r from-primary-500 to-blue-500 backdrop-blur-sm rounded-xl text-white hover:from-primary-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
              whileHover={{ rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaExternalLinkAlt size={16} />
            </motion.a>
          )}
          {product.githubLink && (
            <motion.a
              href={product.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gradient-to-r from-gray-600 to-gray-700 backdrop-blur-sm rounded-xl text-white hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
              whileHover={{ rotate: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGithub size={16} />
            </motion.a>
          )}
        </div>

        {/* Product status indicator */}
        <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
            Product
          </div>
        </div>
      </div>
      
      <div className="p-6 relative z-10">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
          {product.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
          {product.shortDescription}
        </p>
        
        {/* Enhanced features section */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300">
            Key Features:
          </h4>
          <ul className="space-y-2">
            {product.features.slice(0, 3).map((feature, index) => (
              <motion.li 
                key={index} 
                className="flex items-center text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <div className="w-2 h-2 bg-gradient-to-r from-primary-500 to-blue-500 rounded-full mr-3 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
                {feature}
              </motion.li>
            ))}
            {product.features.length > 3 && (
              <li className="text-xs text-gray-500 dark:text-gray-500 ml-5 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                +{product.features.length - 3} more features
              </li>
            )}
          </ul>
        </div>
        
        {/* Enhanced action section */}
        <div className="flex justify-between items-center">
          <motion.div whileHover={{ x: 5 }}>
            <Link
              to={`/products/${product.slug}`}
              className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-all duration-300 font-medium group/link"
            >
              Learn More 
              <FaArrowRight className="ml-2 group-hover/link:translate-x-1 group-hover/link:scale-110 transition-all duration-300" size={14} />
            </Link>
          </motion.div>
          
          <div className="flex space-x-3">
            {product.liveLink && (
              <motion.a
                href={product.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaExternalLinkAlt size={16} />
              </motion.a>
            )}
            {product.githubLink && (
              <motion.a
                href={product.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaGithub size={16} />
              </motion.a>
            )}
          </div>
        </div>
      </div>

      {/* Shimmer effect */}
      <div className="absolute inset-0 -top-[1px] -left-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform -skew-x-12 group-hover:animate-shimmer"></div>
      
      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-blue-500 to-secondary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </motion.div>
  );
};

export default ProductCard;