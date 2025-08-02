import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/reusables';
import ProductAddForm from '../components/admin/products/ProductAddForm';
import { toast } from 'react-hot-toast';

const AdminProductAdd: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/admin/products');
  };

  const handleCancel = () => {
    navigate('/admin/products');
  };

  const handleFormSuccess = () => {
    toast.success('Product created successfully');
    navigate('/admin/products');
  };

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
                Back to Products
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
                <p className="text-gray-600">Create a new product for your portfolio</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Product Information</h2>
          <ProductAddForm
            onSuccess={handleFormSuccess}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminProductAdd;
