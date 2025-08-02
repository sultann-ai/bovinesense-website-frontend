import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { projectsService } from '../../../services/projectsService';
import { Project } from '../../../types';
import { Button, FormInput, Modal, ImageUpload } from '../../reusables';

interface ProjectFormData {
  title: string;
  description: string;
  liveDemoLink: string;
  githubLink: string;
  tags: string;
  features: string;
  technologies: string;
  category: string;
}

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingProject: Project | null;
  onSuccess: () => void;
}

const ProjectModal = ({ isOpen, onClose, editingProject, onSuccess }: ProjectModalProps) => {
  const [submitting, setSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [imageError, setImageError] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ProjectFormData>({
    defaultValues: {
      title: '',
      description: '',
      liveDemoLink: '',
      githubLink: '',
      tags: '',
      features: '',
      technologies: '',
      category: ''
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange'
  });

  useEffect(() => {
    if (editingProject) {
      reset({
        title: editingProject.title,
        description: editingProject.description,
        liveDemoLink: editingProject.liveDemoLink || '',
        githubLink: editingProject.githubLink || '',
        tags: editingProject.tags?.join(', ') || '',
        features: editingProject.features?.join(', ') || '',
        technologies: editingProject.technologies?.join(', ') || '',
        category: editingProject.category || ''
      });
      setPreviewImage(editingProject.image);
      setSelectedFile(null);
    } else {
      reset();
      setPreviewImage('');
      setSelectedFile(null);
    }
    setImageError('');
  }, [editingProject, reset]);

  const onSubmit = async (data: ProjectFormData) => {
    // Validate image for new projects
    if (!editingProject && !selectedFile) {
      setImageError('Project image is required');
      return;
    }

    try {
      setSubmitting(true);
      setImageError('');
      
      const formData = new FormData();
      
      // Append basic form fields
      formData.append('title', data.title);
      formData.append('description', data.description);
      if (data.liveDemoLink) formData.append('liveDemoLink', data.liveDemoLink);
      if (data.githubLink) formData.append('githubLink', data.githubLink);
      if (data.category) formData.append('category', data.category);

      // Convert comma-separated strings to arrays and append as JSON
      if (data.tags) {
        const tagsArray = data.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
        if (tagsArray.length > 0) {
          formData.append('tags', JSON.stringify(tagsArray));
        }
      }

      if (data.features) {
        const featuresArray = data.features.split(',').map(feature => feature.trim()).filter(feature => feature !== '');
        if (featuresArray.length > 0) {
          formData.append('features', JSON.stringify(featuresArray));
        }
      }

      if (data.technologies) {
        const technologiesArray = data.technologies.split(',').map(tech => tech.trim()).filter(tech => tech !== '');
        if (technologiesArray.length > 0) {
          formData.append('technologies', JSON.stringify(technologiesArray));
        }
      }

      // Append image file if selected
      if (selectedFile) {
        formData.append('image', selectedFile);
      }

      if (editingProject) {
        await projectsService.update(editingProject._id, formData);
        toast.success('Project updated successfully!');
      } else {
        await projectsService.create(formData);
        toast.success('Project added successfully!');
      }
      
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error('Error saving project. Please try again.');
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
      title={editingProject ? 'Edit Project' : 'Add Project'}
      size="xl"
    >
      <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            id="title"
            label="Project Title"
            register={register}
            error={errors.title}
            required
            disabled={submitting}
          />
          
          <FormInput
            id="category"
            label="Category"
            register={register}
            error={errors.category}
            disabled={submitting}
            placeholder="e.g., Web Application, Mobile App"
          />
        </div>
        
        <FormInput
          id="description"
          label="Description"
          register={register}
          error={errors.description}
          multiline
          rows={4}
          required
          disabled={submitting}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            id="liveDemoLink"
            label="Live Demo Link"
            type="url"
            register={register}
            error={errors.liveDemoLink}
            disabled={submitting}
            placeholder="https://example.com"
          />
          
          <FormInput
            id="githubLink"
            label="GitHub Link"
            type="url"
            register={register}
            error={errors.githubLink}
            disabled={submitting}
            placeholder="https://github.com/username/repo"
          />
        </div>

        <ImageUpload
          label="Project Image"
          value={previewImage}
          onChange={handleImageChange}
          required={!editingProject}
          error={imageError}
        />

        <FormInput
          id="tags"
          label="Tags (comma-separated)"
          register={register}
          error={errors.tags}
          disabled={submitting}
          placeholder="React, Web App, E-commerce"
        />

        <FormInput
          id="technologies"
          label="Technologies (comma-separated)"
          register={register}
          error={errors.technologies}
          disabled={submitting}
          placeholder="React, Node.js, MongoDB, AWS"
        />

        <FormInput
          id="features"
          label="Features (comma-separated)"
          register={register}
          error={errors.features}
          multiline
          rows={3}
          disabled={submitting}
          placeholder="User Authentication, Real-time Chat, Payment Integration"
        />

        <div className="flex space-x-4">
          <Button 
            type="submit" 
            className="flex-1"
            disabled={submitting}
          >
            {submitting ? 'Saving...' : editingProject ? 'Update Project' : 'Add Project'}
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

export default ProjectModal;
