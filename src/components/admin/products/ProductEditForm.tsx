import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Save, Plus, Trash2 } from 'lucide-react';
import { Button, FormInput, ImageUpload } from '../../reusables';
import { Product } from '../../../types';
import { useProductsAdmin } from '../../../../hooks/admin/useProductsAdmin';
import { toast } from 'react-hot-toast';

interface ProductEditFormProps {
  product: Product;
  onSuccess: () => void;
  onCancel: () => void;
}

interface ProductFormData {
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  githubLink: string;
  liveLink: string;
}

const ProductEditForm: React.FC<ProductEditFormProps> = ({ product, onSuccess, onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bannerImageFile, setBannerImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>(product.bannerImage || '');
  const [features, setFeatures] = useState<string[]>(product.features || ['']);
  const { updateProduct } = useProductsAdmin();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ProductFormData>({
    defaultValues: {
      name: '',
      slug: '',
      shortDescription: '',
      fullDescription: '',
      githubLink: '',
      liveLink: ''
    }
  });

  // Populate form fields when component mounts or product ID changes
  useEffect(() => {
    console.log('Resetting form with product data:', product);
    reset({
      name: product.name,
      slug: product.slug,
      shortDescription: product.shortDescription,
      fullDescription: product.fullDescription,
      githubLink: product.githubLink || '',
      liveLink: product.liveLink || ''
    });
    setFeatures(product.features && product.features.length > 0 ? product.features : ['']);
  }, [product._id, reset]); // Only reset when product ID changes, not on every product object change

  const handleImageUpload = (file: File | null, imageUrl?: string) => {
    if (file) {
      setBannerImageFile(file);
    }
    if (imageUrl) {
      setPreviewImage(imageUrl);
    }
  };

  const addFeature = () => {
    setFeatures([...features, '']);
  };

  const removeFeature = (index: number) => {
    if (features.length > 1) {
      setFeatures(features.filter((_, i) => i !== index));
    }
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const onSubmit = async (data: ProductFormData) => {
    try {
      setIsSubmitting(true);

      console.log('Submitting form with data:', data);

      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('slug', data.slug);
      formData.append('shortDescription', data.shortDescription);
      formData.append('fullDescription', data.fullDescription);
      formData.append('githubLink', data.githubLink);
      formData.append('liveLink', data.liveLink);

      // Handle features - send as individual entries
      const validFeatures = features.filter(feature => feature.trim() !== '');
      console.log('Valid features array:', validFeatures);
      if (validFeatures.length > 0) {
        validFeatures.forEach(feature => {
          formData.append('features[]', feature);
        });
      }

      // Handle banner image only if a new one was selected
      if (bannerImageFile) {
        formData.append('image', bannerImageFile);
      }

      await updateProduct(product._id, formData);
      onSuccess();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to update product');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          id="name"
          label="Product Name"
          register={register}
          error={errors.name}
          required
        />

        <FormInput
          id="slug"
          label="Slug"
          register={register}
          error={errors.slug}
          required
        />
      </div>

      <FormInput
        id="shortDescription"
        label="Short Description"
        register={register}
        error={errors.shortDescription}
        multiline
        rows={3}
        required
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Full Description
        </label>
        <textarea
          {...register('fullDescription', { required: 'Full description is required' })}
          rows={6}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {errors.fullDescription && (
          <p className="mt-1 text-sm text-red-600">{errors.fullDescription.message}</p>
        )}
      </div>

      {/* Dynamic Features */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium text-gray-700">
            Features
          </label>
          <Button
            type="button"
            variant="ghost"
            onClick={addFeature}
            className="flex items-center gap-2 text-sm"
          >
            <Plus size={16} />
            Add Feature
          </Button>
        </div>
        <div className="space-y-2">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={feature}
                onChange={(e) => updateFeature(index, e.target.value)}
                placeholder={`Feature ${index + 1}`}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {features.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                  title="Remove feature"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          id="githubLink"
          label="GitHub Link"
          register={register}
          error={errors.githubLink}
          type="url"
        />

        <FormInput
          id="liveLink"
          label="Live Demo Link"
          register={register}
          error={errors.liveLink}
          type="url"
        />
      </div>

      <div>
        <ImageUpload
          label="Banner Image"
          onChange={handleImageUpload}
          value={previewImage}
          accept="image/*"
        />
        <p className="mt-1 text-sm text-gray-500">
          Leave empty to keep current banner image
        </p>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2"
        >
          <Save size={16} />
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  );
};

export default ProductEditForm;
