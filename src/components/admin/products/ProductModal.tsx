import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Button, FormInput, ImageUpload } from '../../reusables';
import { Product } from '../../../types';
import { useProductsAdmin } from '../../../../hooks/admin/useProductsAdmin';
import { toast } from 'react-hot-toast';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  product?: Product | null;
}

interface ProductFormData {
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  features: string;
  githubLink: string;
  liveLink: string;
  bannerImage: File | null;
  screenshots: FileList | null;
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, onSuccess, product }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bannerImageFile, setBannerImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>('');
  const { createProduct, updateProduct } = useProductsAdmin();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<ProductFormData>();

  useEffect(() => {
    if (product) {
      setValue('name', product.name);
      setValue('slug', product.slug);
      setValue('shortDescription', product.shortDescription);
      setValue('fullDescription', product.fullDescription);
      setValue('features', product.features?.join(', ') || '');
      setValue('githubLink', product.githubLink || '');
      setValue('liveLink', product.liveLink || '');
      setPreviewImage(product.bannerImage || '');
    } else {
      reset();
      setPreviewImage('');
      setBannerImageFile(null);
    }
  }, [product, setValue, reset]);

  const handleImageUpload = (file: File | null, imageUrl?: string) => {
    if (file) {
      setBannerImageFile(file);
    }
    if (imageUrl) {
      setPreviewImage(imageUrl);
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const onSubmit = async (data: ProductFormData) => {
    try {
      setIsSubmitting(true);

      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('slug', data.slug || generateSlug(data.name));
      formData.append('shortDescription', data.shortDescription);
      formData.append('fullDescription', data.fullDescription);
      formData.append('githubLink', data.githubLink);
      formData.append('liveLink', data.liveLink);

      // Handle features
      if (data.features) {
        const featuresArray = data.features.split(',').map(feature => feature.trim()).filter(Boolean);
        formData.append('features', JSON.stringify(featuresArray));
      }

      // Handle banner image
      if (bannerImageFile) {
        formData.append('image', bannerImageFile);
      }

      // Handle screenshots
      if (data.screenshots && data.screenshots.length > 0) {
        Array.from(data.screenshots).forEach(file => {
          formData.append('screenshots', file);
        });
      }

      if (product) {
        await updateProduct(product._id, formData);
        toast.success('Product updated successfully');
      } else {
        await createProduct(formData);
        toast.success('Product created successfully');
      }

      onSuccess();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to save product');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={product ? 'Edit Product' : 'Create Product'}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          id="name"
          label="Product Name"
          {...register('name', { required: 'Product name is required' })}
          error={errors.name}
          onChange={(e) => {
            setValue('name', e.target.value);
            if (!product) {
              setValue('slug', generateSlug(e.target.value));
            }
          }}
        />

        <FormInput
          id="slug"
          label="Slug"
          {...register('slug', { required: 'Slug is required' })}
          error={errors.slug}
          placeholder="auto-generated-from-name"
        />

        <FormInput
          id="shortDescription"
          label="Short Description"
          {...register('shortDescription', { required: 'Short description is required' })}
          error={errors.shortDescription}
          placeholder="Brief description for card view"
          multiline
          rows={2}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Description
          </label>
          <textarea
            {...register('fullDescription', { required: 'Full description is required' })}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Detailed product description..."
          />
          {errors.fullDescription && (
            <p className="mt-1 text-sm text-red-600">{errors.fullDescription.message}</p>
          )}
        </div>

        <FormInput
          id="features"
          label="Features (comma-separated)"
          {...register('features')}
          error={errors.features}
          placeholder="Feature 1, Feature 2, Feature 3"
        />

        <FormInput
          id="githubLink"
          label="GitHub Link"
          {...register('githubLink')}
          error={errors.githubLink}
          placeholder="https://github.com/username/repo"
          type="url"
        />

        <FormInput
          id="liveLink"
          label="Live Demo Link"
          {...register('liveLink')}
          error={errors.liveLink}
          placeholder="https://demo.example.com"
          type="url"
        />

        <ImageUpload
          label="Banner Image"
          onChange={handleImageUpload}
          value={previewImage}
          accept="image/*"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Screenshots (multiple files)
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            {...register('screenshots')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="mt-1 text-sm text-gray-500">
            Select multiple images for the product gallery
          </p>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : product ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ProductModal;
