import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Save, Plus, Trash2 } from 'lucide-react';
import { Button, FormInput, ImageUpload } from '../../reusables';
import { useProductsAdmin } from '../../../../hooks/admin/useProductsAdmin';
import { toast } from 'react-hot-toast';

interface ProductAddFormProps {
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

const ProductAddForm: React.FC<ProductAddFormProps> = ({ onSuccess, onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bannerImageFile, setBannerImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [imageError, setImageError] = useState<string>('');
  const [features, setFeatures] = useState<string[]>(['']);
  const { createProduct } = useProductsAdmin();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<ProductFormData>({
    defaultValues: {
      name: '',
      slug: '',
      shortDescription: '',
      fullDescription: '',
      githubLink: '',
      liveLink: ''
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange'
  });

  // Watch name field to auto-generate slug
  const watchedName = watch('name');

  // Auto-generate slug from name as suggestion only
  React.useEffect(() => {
    if (watchedName && !watch('slug')) {
      const slug = watchedName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setValue('slug', slug);
    }
  }, [watchedName, setValue, watch]);

  const handleImageUpload = (file: File | null, imageUrl?: string) => {
    if (file) {
      setBannerImageFile(file);
      setImageError('');
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
    // Validate required banner image
    if (!bannerImageFile) {
      setImageError('Banner image is required');
      return;
    }

    // Validate at least one feature
    const validFeatures = features.filter(feature => feature.trim() !== '');
    if (validFeatures.length === 0) {
      toast.error('Please add at least one feature');
      return;
    }

    try {
      setIsSubmitting(true);
      setImageError('');

      console.log('Submitting form with data:', data);

      const formData = new FormData();
      formData.append('name', data.name);
      
      // Only append slug if it's not empty, let backend auto-generate if empty
      if (data.slug && data.slug.trim()) {
        formData.append('slug', data.slug.trim());
      }
      
      formData.append('shortDescription', data.shortDescription);
      formData.append('fullDescription', data.fullDescription);
      formData.append('githubLink', data.githubLink);
      formData.append('liveLink', data.liveLink);

      // Handle features - send as individual entries
      console.log('Valid features array:', validFeatures);
      validFeatures.forEach(feature => {
        formData.append('features[]', feature);
      });

      // Handle banner image
      formData.append('image', bannerImageFile);

      await createProduct(formData);
      onSuccess();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to create product');
    } finally {
      setIsSubmitting(false);
    }
  };

  const onError = (errors: any) => {
    console.log('Form validation errors:', errors);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          id="name"
          label="Product Name"
          register={register}
          error={errors.name}
          required
          disabled={isSubmitting}
          placeholder="Enter product name"
        />

        <div>
          <FormInput
            id="slug"
            label="Slug"
            register={register}
            error={errors.slug}
            disabled={isSubmitting}
            placeholder="auto-generated-slug (leave empty for auto-generation)"
            validation={{
              pattern: {
                value: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                message: 'Slug must contain only lowercase letters, numbers, and hyphens'
              },
              validate: (value: string) => {
                if (!value) return true; // Allow empty values for auto-generation
                return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value) || 'Slug must contain only lowercase letters, numbers, and hyphens';
              }
            }}
          />
          <p className="mt-1 text-sm text-gray-500">
            URL-friendly identifier. Leave empty to auto-generate from product name.
          </p>
        </div>
      </div>

      <FormInput
        id="shortDescription"
        label="Short Description"
        register={register}
        error={errors.shortDescription}
        multiline
        rows={3}
        required
        disabled={isSubmitting}
        placeholder="Brief description of the product"
        validation={{
          maxLength: {
            value: 200,
            message: 'Short description must be less than 200 characters'
          }
        }}
      />

      <FormInput
        id="fullDescription"
        label="Full Description"
        register={register}
        error={errors.fullDescription}
        multiline
        rows={6}
        required
        disabled={isSubmitting}
        placeholder="Detailed description of the product"
        validation={{
          minLength: {
            value: 50,
            message: 'Full description must be at least 50 characters'
          }
        }}
      />

      {/* Dynamic Features */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium text-gray-700">
            Features <span className="text-red-500">*</span>
          </label>
          <Button
            type="button"
            variant="ghost"
            onClick={addFeature}
            className="flex items-center gap-2 text-sm"
            disabled={isSubmitting}
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
                disabled={isSubmitting}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              />
              {features.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
                  title="Remove feature"
                  disabled={isSubmitting}
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
        <p className="mt-1 text-sm text-gray-500">
          Add key features of your product. At least one feature is required.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          id="githubLink"
          label="GitHub Link"
          register={register}
          error={errors.githubLink}
          type="url"
          disabled={isSubmitting}
          placeholder="https://github.com/username/repo"
          validation={{
            pattern: {
              value: /^https?:\/\/(www\.)?github\.com\/[\w-]+\/[\w-]+\/?$/,
              message: 'Please enter a valid GitHub repository URL'
            },
            validate: (value: string) => {
              if (!value) return true; // Allow empty values
              return /^https?:\/\/(www\.)?github\.com\/[\w-]+\/[\w-]+\/?$/.test(value) || 'Please enter a valid GitHub repository URL';
            }
          }}
        />

        <FormInput
          id="liveLink"
          label="Live Demo Link"
          register={register}
          error={errors.liveLink}
          type="url"
          disabled={isSubmitting}
          placeholder="https://your-demo.com"
          validation={{
            pattern: {
              value: /^https?:\/\/.+\..+/,
              message: 'Please enter a valid URL'
            },
            validate: (value: string) => {
              if (!value) return true; // Allow empty values
              return /^https?:\/\/.+\..+/.test(value) || 'Please enter a valid URL';
            }
          }}
        />
      </div>

      <div>
        <ImageUpload
          label="Banner Image"
          onChange={handleImageUpload}
          value={previewImage}
          accept="image/*"
          required={true}
          error={imageError}
        />
        <p className="mt-1 text-sm text-gray-500">
          Upload a banner image for your product. Recommended size: 1200x600px
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
          {isSubmitting ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Creating...
            </div>
          ) : (
            'Create Product'
          )}
        </Button>
      </div>
    </form>
  );
};

export default ProductAddForm;
