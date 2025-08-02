import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { Plus, Trash2 } from 'lucide-react';
import { servicesService } from '../../../services/servicesService';
import { Service, ServiceItem } from '../../../types';
import { Button, FormInput, Modal } from '../../reusables';

interface ServiceFormData {
  category: string;
  services: ServiceItem[];
}

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingService: Service | null;
  onSuccess: () => void;
}

const ServiceModal = ({ isOpen, onClose, editingService, onSuccess }: ServiceModalProps) => {
  const [submitting, setSubmitting] = useState(false);
  const [serviceFeatures, setServiceFeatures] = useState<{ [key: number]: string[] }>({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control
  } = useForm<ServiceFormData>({
    defaultValues: {
      category: '',
      services: [{ title: '', description: '', icon: '' }]
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

  // Initialize service features state
  useEffect(() => {
    if (editingService) {
      reset({
        category: editingService.category,
        services: editingService.services || [{ title: '', description: '', icon: '' }]
      });
      // Initialize features for each service
      const featuresMap: { [key: number]: string[] } = {};
      editingService.services?.forEach((service, index) => {
        featuresMap[index] = service.features || [''];
      });
      setServiceFeatures(featuresMap);
    } else {
      reset({
        category: '',
        services: [{ title: '', description: '', icon: '' }]
      });
      setServiceFeatures({ 0: [''] });
    }
  }, [editingService, reset]);

  // Feature management functions
  const addFeature = (serviceIndex: number) => {
    setServiceFeatures(prev => ({
      ...prev,
      [serviceIndex]: [...(prev[serviceIndex] || []), '']
    }));
  };

  const removeFeature = (serviceIndex: number, featureIndex: number) => {
    setServiceFeatures(prev => ({
      ...prev,
      [serviceIndex]: prev[serviceIndex]?.filter((_, i) => i !== featureIndex) || []
    }));
  };

  const updateFeature = (serviceIndex: number, featureIndex: number, value: string) => {
    setServiceFeatures(prev => ({
      ...prev,
      [serviceIndex]: prev[serviceIndex]?.map((feature, i) => 
        i === featureIndex ? value : feature
      ) || []
    }));
  };

  // Handle adding/removing services
  const handleAddService = () => {
    const newIndex = serviceFields.length;
    appendService({ title: '', description: '', icon: '' });
    setServiceFeatures(prev => ({
      ...prev,
      [newIndex]: ['']
    }));
  };

  const handleRemoveService = (index: number) => {
    removeService(index);
    setServiceFeatures(prev => {
      const newFeatures = { ...prev };
      delete newFeatures[index];
      // Reindex remaining features
      const reindexed: { [key: number]: string[] } = {};
      Object.keys(newFeatures).forEach((key, i) => {
        const numKey = parseInt(key);
        if (numKey > index) {
          reindexed[numKey - 1] = newFeatures[numKey];
        } else if (numKey < index) {
          reindexed[numKey] = newFeatures[numKey];
        }
      });
      return reindexed;
    });
  };

  const onSubmit = async (data: ServiceFormData) => {
    try {
      setSubmitting(true);
      
      // Filter out empty services and add features to each service
      const servicesWithFeatures = data.services
        .filter(service => service.title.trim() !== '')
        .map((service, index) => ({
          ...service,
          features: serviceFeatures[index]?.filter(feature => feature.trim() !== '') || []
        }));

      const filteredData = {
        ...data,
        services: servicesWithFeatures
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
              onClick={handleAddService}
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
                      onClick={() => handleRemoveService(index)}
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

                  {/* Features for this service */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Features <span className="text-red-500">*</span>
                      </label>
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => addFeature(index)}
                        className="flex items-center gap-2 text-sm"
                        disabled={submitting}
                      >
                        <Plus size={16} />
                        Add Feature
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {(serviceFeatures[index] || ['']).map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={feature}
                            onChange={(e) => updateFeature(index, featureIndex, e.target.value)}
                            placeholder={`Feature ${featureIndex + 1}`}
                            disabled={submitting}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                          />
                          {(serviceFeatures[index] || []).length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeFeature(index, featureIndex)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
                              title="Remove feature"
                              disabled={submitting}
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      Add key features for this service. At least one feature is required.
                    </p>
                  </div>
                </div>
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
