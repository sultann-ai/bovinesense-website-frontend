import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { teamService } from '../../../services/teamService';
import { TeamMember } from '../../../types';
import { Button, FormInput, Modal, ImageUpload } from '../../reusables';

interface TeamFormData {
  name: string;
  role: string;
  bio: string;
  email: string;
  linkedin: string;
}

interface TeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingTeamMember: TeamMember | null;
  onSuccess: () => void;
}

const TeamModal = ({ isOpen, onClose, editingTeamMember, onSuccess }: TeamModalProps) => {
  const [submitting, setSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [imageError, setImageError] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<TeamFormData>({
    defaultValues: {
      name: '',
      role: '',
      bio: '',
      email: '',
      linkedin: ''
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange'
  });

  useEffect(() => {
    if (editingTeamMember) {
      reset({
        name: editingTeamMember.name,
        role: editingTeamMember.role,
        bio: editingTeamMember.bio,
        email: editingTeamMember.email,
        linkedin: editingTeamMember.linkedin || ''
      });
      setPreviewImage(editingTeamMember.image);
      setSelectedFile(null);
    } else {
      reset();
      setPreviewImage('');
      setSelectedFile(null);
    }
    setImageError('');
  }, [editingTeamMember, reset]);

  const onSubmit = async (data: TeamFormData) => {
    // Validate image for new team members
    if (!editingTeamMember && !selectedFile) {
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

      if (editingTeamMember) {
        await teamService.update(editingTeamMember._id, formData);
        toast.success('Team member updated successfully!');
      } else {
        await teamService.create(formData);
        toast.success('Team member added successfully!');
      }
      
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error saving team member:', error);
      toast.error('Error saving team member. Please try again.');
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
      title={editingTeamMember ? 'Edit Team Member' : 'Add Team Member'}
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

        <ImageUpload
          label="Profile Image"
          value={previewImage}
          onChange={handleImageChange}
          required={!editingTeamMember}
          error={imageError}
        />

        <div className="flex space-x-4">
          <Button 
            type="submit" 
            className="flex-1"
            disabled={submitting}
          >
            {submitting ? 'Saving...' : editingTeamMember ? 'Update Team Member' : 'Add Team Member'}
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

export default TeamModal;
