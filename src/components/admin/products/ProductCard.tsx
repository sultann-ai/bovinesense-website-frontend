import React from 'react';
import { Edit, Trash2, Eye, ExternalLink, Github } from 'lucide-react';
import { Product } from '../../../types';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onView: (product: Product) => void;
  onDelete: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onView, onDelete }) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
  };

  const truncateDescription = (description: string, maxLength: number = 100) => {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + '...';
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {product.bannerImage && (
        <div className="h-48 overflow-hidden">
          <img
            src={product.bannerImage}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
            {product.name}
          </h3>
          {product.githubLink && (
            <a
              href={product.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700"
            >
              <Github size={16} />
            </a>
          )}
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
          {truncateDescription(product.shortDescription)}
        </p>

        {product.features && product.features.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {product.features.slice(0, 3).map((feature: string, index: number) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full"
              >
                {feature}
              </span>
            ))}
            {product.features.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{product.features.length - 3}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between mb-3">
          <div className="text-sm text-gray-500">
            Created: {formatDate(product.createdAt)}
          </div>
          {product.liveLink && (
            <a
              href={product.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
            >
              <ExternalLink size={14} />
              Live Demo
            </a>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {product.screenshots?.length || 0} screenshots
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onView(product)}
              className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
              title="View Details"
            >
              <Eye size={16} />
            </button>
            <button
              onClick={() => onEdit(product)}
              className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
              title="Edit"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={() => onDelete(product._id)}
              className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
              title="Delete"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
