import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, X } from 'lucide-react';
import { Button } from '../components/reusables';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ProductEditForm from '../components/admin/products/ProductEditForm';
import ScreenshotManager from '../components/admin/products/ScreenshotManager';
import { useProductsAdmin } from '../../hooks/admin/useProductsAdmin';
import { Product } from '../types';
import { toast } from 'react-hot-toast';

const AdminProductEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { fetchProductById } = useProductsAdmin();

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const productData = await fetchProductById(id);
        console.log("productData", productData);
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

  const handleBack = () => {
    navigate(`/admin/products/${id}`);
  };

  const handleCancel = () => {
    navigate(`/admin/products/${id}`);
  };

  const handleFormSuccess = () => {
    toast.success('Product updated successfully');
    navigate(`/admin/products/${id}`);
  };

  const handleScreenshotsUpdate = (newScreenshots: string[]) => {
    if (product) {
      setProduct({ ...product, screenshots: newScreenshots });
    }
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
                Back to Details
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
                <p className="text-gray-600">{product.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                onClick={handleCancel}
                className="flex items-center gap-2"
              >
                <X size={16} />
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Product Information</h2>
              <ProductEditForm
                product={product}
                onSuccess={handleFormSuccess}
                onCancel={handleCancel}
              />
            </div>
          </div>

          {/* Screenshot Management */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Screenshots</h2>
              <ScreenshotManager
                productId={product._id}
                screenshots={product.screenshots || []}
                onUpdate={handleScreenshotsUpdate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductEdit;
