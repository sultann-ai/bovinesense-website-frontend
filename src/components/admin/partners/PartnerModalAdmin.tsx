import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { partnersService } from '../../../services/partnersService';
import { Partner } from '../../../types';
import { Button, FormInput, Modal, ImageUpload } from '../../reusables';

interface PartnerFormData {
  name: string;
  website: string;
}

interface PartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingPartner: Partner | null;
  onSuccess: () => void;
}

const PartnerModal = ({ isOpen, onClose, editingPartner, onSuccess }: PartnerModalProps) => {
  const [submitting, setSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [imageError, setImageError] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<PartnerFormData>({
    defaultValues: {
      name: '',
      website: ''
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange'
  });

  useEffect(() => {
    if (editingPartner) {
      reset({
        name: editingPartner.name,
        website: editingPartner.website
      });
      setPreviewImage(editingPartner.logo);
      setSelectedFile(null);
    } else {
      reset();
      setPreviewImage('');
      setSelectedFile(null);
    }
    setImageError('');
  }, [editingPartner, reset]);

  const onSubmit = async (data: PartnerFormData) => {
    // Validate image for new partners
    if (!editingPartner && !selectedFile) {
      setImageError('Partner logo is required');
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

      if (editingPartner) {
        await partnersService.update(editingPartner._id, formData);
        toast.success('Partner updated successfully!');
      } else {
        await partnersService.create(formData);
        toast.success('Partner added successfully!');
      }
      
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error saving partner:', error);
      toast.error('Error saving partner. Please try again.');
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
      title={editingPartner ? 'Edit Partner' : 'Add Partner'}
      size="lg"
    >
      <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
        <FormInput
          id="name"
          label="Partner Name"
          register={register}
          error={errors.name}
          required
          disabled={submitting}
        />
        
        <FormInput
          id="website"
          label="Website"
          type="url"
          register={register}
          error={errors.website}
          required
          disabled={submitting}
          placeholder="https://example.com"
          validation={{
            pattern: {
              value: /^https?:\/\/.+/,
              message: 'Please enter a valid URL starting with http:// or https://'
            }
          }}
        />

        <ImageUpload
          label="Partner Logo"
          value={previewImage}
          onChange={handleImageChange}
          required={!editingPartner}
          error={imageError}
        />

        <div className="flex space-x-4">
          <Button 
            type="submit" 
            className="flex-1"
            disabled={submitting}
          >
            {submitting ? 'Saving...' : editingPartner ? 'Update Partner' : 'Add Partner'}
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

export default PartnerModal;
