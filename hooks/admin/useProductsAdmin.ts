import { useState, useCallback } from 'react';
import { Product } from '../../src/types';
import { productsService } from '../../src/services/productsService';

export const useProductsAdmin = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productsService.getAll();
      setProducts(data);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchProductById = useCallback(async (id: string) => {
    try {
      setError(null);
      const product = await productsService.getById(id);
      return product;
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to fetch product');
      throw err;
    }
  }, []);

  const createProduct = useCallback(async (formData: FormData) => {
    try {
      setError(null);
      const newProduct = await productsService.create(formData);
      setProducts(prev => [newProduct, ...prev]);
      return newProduct;
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to create product');
      throw err;
    }
  }, []);

  const updateProduct = useCallback(async (id: string, formData: FormData) => {
    try {
      setError(null);
      const updatedProduct = await productsService.update(id, formData);
      setProducts(prev => prev.map(product => product._id === id ? updatedProduct : product));
      return updatedProduct;
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to update product');
      throw err;
    }
  }, []);

  const deleteProduct = useCallback(async (id: string) => {
    try {
      setError(null);
      await productsService.delete(id);
      setProducts(prev => prev.filter(product => product._id !== id));
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to delete product');
      throw err;
    }
  }, []);

  const addScreenshots = useCallback(async (id: string, formData: FormData) => {
    try {
      setError(null);
      const result = await productsService.addScreenshots(id, formData);
      return result;
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to add screenshots');
      throw err;
    }
  }, []);

  const removeScreenshot = useCallback(async (id: string, index: number) => {
    try {
      setError(null);
      const result = await productsService.removeScreenshot(id, index);
      return result;
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to remove screenshot');
      throw err;
    }
  }, []);

  return {
    products,
    loading,
    error,
    fetchProducts,
    fetchProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    addScreenshots,
    removeScreenshot
  };
};
