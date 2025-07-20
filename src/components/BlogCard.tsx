import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaUser, FaArrowRight } from 'react-icons/fa';
import { BlogPost } from '../types';

interface BlogCardProps {
  post: BlogPost;
  delay?: number;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, delay = 0 }) => {
  const formatDate = (dateString: string | Date) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
    >
      <div className="relative overflow-hidden">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
          <div className="flex items-center">
            <FaCalendarAlt className="mr-2" size={12} />
            {formatDate(post.createdAt)}
          </div>
          <div className="flex items-center">
            <FaUser className="mr-2" size={12} />
            {post.author}
          </div>
        </div>
        
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
          {post.title}
        </h2>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <Link
          to={`/blog/${post.slug}`}
          className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors font-medium"
        >
          Read More <FaArrowRight className="ml-2" size={14} />
        </Link>
      </div>
    </motion.article>
  );
};

export default BlogCard;