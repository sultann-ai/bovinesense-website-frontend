import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Modal, FormInput, ImageUpload, Button } from '../../reusables';
import { Founder } from '../../../types';
import { foundersService } from '../../../services/foundersService';

interface FounderFormData {
  name: string;
  role: string;
  bio: string;
  email: string;
  linkedin: string;
  twitter: string;
}

interface FounderModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingFounder: Founder | null;
  onSuccess: () => void;
}

const FounderModal = ({ isOpen, onClose, editingFounder, onSuccess }: FounderModalProps) => {
  const [submitting, setSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [imageError, setImageError] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FounderFormData>({
    defaultValues: {
      name: '',
      role: '',
      bio: '',
      email: '',
      linkedin: '',
      twitter: ''
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange'
  });

  useEffect(() => {
    if (editingFounder) {
      reset({
        name: editingFounder.name,
        role: editingFounder.role,
        bio: editingFounder.bio,
        email: editingFounder.email,
        linkedin: editingFounder.linkedin || '',
        twitter: editingFounder.twitter || ''
      });
      setPreviewImage(editingFounder.image);
      setSelectedFile(null);
    } else {
      reset();
      setPreviewImage('');
      setSelectedFile(null);
    }
    setImageError('');
  }, [editingFounder, reset]);

  const onSubmit = async (data: FounderFormData) => {
    // Validate image for new founders
    if (!editingFounder && !selectedFile) {
      setImageError('Profile image is required');
      return;
    }

    try {
      setSubmitting(true);
      setImageError('');
      
      const formData = new FormData();
      
      // Append all form fields to FormData
      Object.entries(data).forEach(([key, value]) => {
        if (value) {
          formData.append(key, value);
        }
      });

      // Append image file if selected
      if (selectedFile) {
        formData.append('image', selectedFile);
      }

      if (editingFounder) {
        await foundersService.update(editingFounder._id, formData);
        toast.success('Founder updated successfully!');
      } else {
        await foundersService.create(formData);
        toast.success('Founder added successfully!');
      }
      
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error saving founder:', error);
      toast.error('Error saving founder. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageChange = (file: File | null, imageUrl?: string) => {
    setSelectedFile(file);
    setPreviewImage(imageUrl || '');
    if (file) {
      setImageError('');
    }
  };

  const onError = (errors: any) => {
    console.log('Form validation errors:', errors);
  };

  const handleClose = () => {
    if (!submitting) {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={editingFounder ? 'Edit Founder' : 'Add Founder'}
      size="lg"
    >
      <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
        <FormInput
          id="name"
          label="Name"
          register={register}
          error={errors.name}
          required
          disabled={submitting}
        />
        
        <FormInput
          id="role"
          label="Role"
          register={register}
          error={errors.role}
          required
          disabled={submitting}
        />
        
        <FormInput
          id="bio"
          label="Bio"
          register={register}
          error={errors.bio}
          multiline
          rows={4}
          required
          disabled={submitting}
        />
        
        <FormInput
          id="email"
          label="Email"
          type="email"
          register={register}
          error={errors.email}
          required
          disabled={submitting}
          validation={{
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Please enter a valid email address'
            }
          }}
        />
        
        <FormInput
          id="linkedin"
          label="LinkedIn"
          type="url"
          register={register}
          error={errors.linkedin}
          placeholder="https://linkedin.com/in/username"
          disabled={submitting}
          validation={{
            pattern: {
              value: /^https?:\/\/(www\.)?linkedin\.com\/in\/[\w-]+\/?$/,
              message: 'Please enter a valid LinkedIn URL (e.g., https://linkedin.com/in/username)'
            },
            validate: (value: string) => {
              if (!value) return true; // Allow empty values
              return /^https?:\/\/(www\.)?linkedin\.com\/in\/[\w-]+\/?$/.test(value) || 'Please enter a valid LinkedIn URL';
            }
          }}
        />
        
        <FormInput
          id="twitter"
          label="Twitter"
          type="url"
          register={register}
          error={errors.twitter}
          placeholder="https://twitter.com/username"
          disabled={submitting}
          validation={{
            pattern: {
              value: /^https?:\/\/(www\.)?(twitter\.com|x\.com)\/[\w-]+\/?$/,
              message: 'Please enter a valid Twitter/X URL (e.g., https://twitter.com/username)'
            },
            validate: (value: string) => {
              if (!value) return true; // Allow empty values
              return /^https?:\/\/(www\.)?(twitter\.com|x\.com)\/[\w-]+\/?$/.test(value) || 'Please enter a valid Twitter/X URL';
            }
          }}
        />

        <ImageUpload
          label="Profile Image"
          value={previewImage}
          onChange={handleImageChange}
          required={!editingFounder}
          error={imageError}
        />

        <div className="flex space-x-4">
          <Button 
            type="submit" 
            className="flex-1"
            disabled={submitting}
          >
            {submitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </div>
            ) : (
              `${editingFounder ? 'Update' : 'Add'} Founder`
            )}
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="flex-1"
            onClick={handleClose}
            disabled={submitting}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default FounderModal;
