import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Edit, Trash2, ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { Button } from '../components/reusables';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useProductsAdmin } from '../../hooks/admin/useProductsAdmin';
import { Product } from '../types';
import { toast } from 'react-hot-toast';

const AdminProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { fetchProductById, deleteProduct } = useProductsAdmin();

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const productData = await fetchProductById(id);
        setProduct(productData);
      } catch (error) {
        toast.error('Failed to load product');
        navigate('/admin/dashboard');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id, fetchProductById, navigate]);

  const handleEdit = () => {
    navigate(`/admin/products/${id}/edit`);
  };

  const handleDelete = async () => {
    if (!id || !product) return;
    
    if (window.confirm(`Are you sure you want to delete "${product.name}"? This action cannot be undone.`)) {
      try {
        await deleteProduct(id);
        toast.success('Product deleted successfully');
        navigate('/admin/dashboard');
      } catch (error) {
        toast.error('Failed to delete product');
      }
    }
  };

  const handleBack = () => {
    navigate('/admin/products');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Button onClick={() => navigate('/admin/dashboard')}>Back to Admin</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={handleBack}
                className="flex items-center gap-2"
              >
                <ArrowLeft size={20} />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
                <p className="text-gray-600">Product Details</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="secondary"
                onClick={handleEdit}
                className="flex items-center gap-2"
              >
                <Edit size={16} />
                Edit
              </Button>
              <Button
                variant="danger"
                onClick={handleDelete}
                className="flex items-center gap-2"
              >
                <Trash2 size={16} />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Banner Image */}
          {product.bannerImage && (
            <div className="h-64 md:h-80 overflow-hidden">
              <img
                src={product.bannerImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-6">
            {/* Product Info */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {product.fullDescription}
                  </p>
                </div>

                {product.features && product.features.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {product.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Screenshots Gallery */}
                {product.screenshots && product.screenshots.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Screenshots ({product.screenshots.length})
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {product.screenshots.map((screenshot, index) => (
                        <div key={index} className="rounded-lg overflow-hidden shadow-md">
                          <img
                            src={screenshot}
                            alt={`${product.name} screenshot ${index + 1}`}
                            className="w-full h-40 object-cover hover:scale-105 transition-transform cursor-pointer"
                            onClick={() => window.open(screenshot, '_blank')}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Info</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Slug</label>
                      <p className="text-gray-900">{product.slug}</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500">Created</label>
                      <p className="text-gray-900">{new Date(product.createdAt).toLocaleDateString()}</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500">Last Updated</label>
                      <p className="text-gray-900">{new Date(product.updatedAt).toLocaleDateString()}</p>
                    </div>

                    {/* Links */}
                    <div className="border-t pt-4">
                      <h4 className="text-md font-semibold text-gray-900 mb-3">Links</h4>
                      <div className="space-y-2">
                        {product.githubLink && (
                          <a
                            href={product.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            <Github size={16} />
                            GitHub Repository
                            <ExternalLink size={14} />
                          </a>
                        )}
                        {product.liveLink && (
                          <a
                            href={product.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            <ExternalLink size={16} />
                            Live Demo
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductDetails;
