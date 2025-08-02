import React, { useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../reusables';
import LoadingSpinner from '../../common/LoadingSpinner';
import { useProductsAdmin } from '../../../../hooks/admin/useProductsAdmin';
import ProductCard from './ProductCard';
import { Product } from '../../../types';
import { toast } from 'react-hot-toast';

const AdminProducts: React.FC = () => {
  const { products, loading, fetchProducts, deleteProduct } = useProductsAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleAdd = () => {
    navigate('/admin/products/add');
  };

  const handleEdit = (product: Product) => {
    navigate(`/admin/products/${product._id}/edit`);
  };

  const handleView = (product: Product) => {
    navigate(`/admin/products/${product._id}`);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        toast.success('Product deleted successfully');
      } catch (error) {
        toast.error('Failed to delete product');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
        <Button
          onClick={handleAdd}
          className="flex items-center gap-2"
        >
          <Plus size={20} />
          Add Product
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onEdit={handleEdit}
            onView={handleView}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found</p>
          <Button
            onClick={handleAdd}
            className="mt-4"
          >
            Create Your First Product
          </Button>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
