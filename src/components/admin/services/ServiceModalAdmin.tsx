import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { servicesService } from '../../../services/servicesService';
import { Service, ServiceItem } from '../../../types';
import { Button, FormInput, Modal } from '../../reusables';

interface ServiceFormData {
  category: string;
  services: ServiceItem[];
  features: string[];
}

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingService: Service | null;
  onSuccess: () => void;
}

const ServiceModal = ({ isOpen, onClose, editingService, onSuccess }: ServiceModalProps) => {
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control
  } = useForm<ServiceFormData>({
    defaultValues: {
      category: '',
      services: [{ title: '', description: '', icon: '' }],
      features: ['']
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange'
  });

  const {
    fields: serviceFields,
    append: appendService,
    remove: removeService
  } = useFieldArray({
    control,
    name: 'services'
  });

  const {
    fields: featureFields,
    append: appendFeature,
    remove: removeFeature
  } = useFieldArray({
    control,
    name: 'features' as const
  });

  useEffect(() => {
    if (editingService) {
      reset({
        category: editingService.category,
        services: editingService.services || [{ title: '', description: '', icon: '' }],
        features: editingService.features || ['']
      });
    } else {
      reset({
        category: '',
        services: [{ title: '', description: '', icon: '' }],
        features: ['']
      });
    }
  }, [editingService, reset]);

  const onSubmit = async (data: ServiceFormData) => {
    try {
      setSubmitting(true);
      
      // Filter out empty services and features
      const filteredData = {
        ...data,
        services: data.services.filter(service => service.title.trim() !== ''),
        features: data.features.filter(feature => feature.trim() !== '')
      };

      if (editingService) {
        await servicesService.update(editingService._id, filteredData);
        toast.success('Service updated successfully!');
      } else {
        await servicesService.create(filteredData);
        toast.success('Service added successfully!');
      }
      
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error saving service:', error);
      toast.error('Error saving service. Please try again.');
    } finally {
      setSubmitting(false);
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
      title={editingService ? 'Edit Service' : 'Add Service'}
      size="lg"
    >
      <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
        <FormInput
          id="category"
          label="Service Category"
          register={register}
          error={errors.category}
          required
          disabled={submitting}
          placeholder="e.g., Web Development, Mobile Development"
        />

        {/* Services Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Services
            </label>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => appendService({ title: '', description: '', icon: '' })}
              disabled={submitting}
            >
              <FaPlus className="mr-1" size={12} /> Add Service
            </Button>
          </div>
          
          <div className="space-y-4">
            {serviceFields.map((field, index) => (
              <div key={field.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Service {index + 1}
                  </h4>
                  {serviceFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeService(index)}
                      className="text-red-600 hover:text-red-800 p-1"
                      disabled={submitting}
                    >
                      <FaTrash size={12} />
                    </button>
                  )}
                </div>
                
                <div className="space-y-3">
                  <FormInput
                    id={`services.${index}.title`}
                    label="Title"
                    register={register}
                    error={errors.services?.[index]?.title}
                    required
                    disabled={submitting}
                    placeholder="Service title"
                  />
                  
                  <FormInput
                    id={`services.${index}.description`}
                    label="Description"
                    register={register}
                    error={errors.services?.[index]?.description}
                    multiline
                    rows={3}
                    required
                    disabled={submitting}
                    placeholder="Service description"
                  />
                  
                  <FormInput
                    id={`services.${index}.icon`}
                    label="Icon (Font Awesome class)"
                    register={register}
                    error={errors.services?.[index]?.icon}
                    disabled={submitting}
                    placeholder="e.g., fas fa-code, fas fa-mobile-alt"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Features
            </label>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => appendFeature('')}
              disabled={submitting}
            >
              <FaPlus className="mr-1" size={12} /> Add Feature
            </Button>
          </div>
          
          <div className="space-y-2">
            {featureFields.map((field, index) => (
              <div key={field.id} className="flex items-center space-x-2">
                <FormInput
                  id={`features.${index}`}
                  label=""
                  register={register}
                  error={errors.features?.[index]}
                  disabled={submitting}
                  placeholder="Feature description"
                  className="flex-1"
                />
                {featureFields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="text-red-600 hover:text-red-800 p-2"
                    disabled={submitting}
                  >
                    <FaTrash size={12} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex space-x-4">
          <Button 
            type="submit" 
            className="flex-1"
            disabled={submitting}
          >
            {submitting ? 'Saving...' : editingService ? 'Update Service' : 'Add Service'}
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

export default ServiceModal;
