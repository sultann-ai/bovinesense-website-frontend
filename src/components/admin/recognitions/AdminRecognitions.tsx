import { useEffect, useState } from 'react';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { recognitionsService } from '../../../services/recognitionsService';
import { Recognition } from '../../../types';
import { Button, FormInput, ImageUpload, Modal } from '../../reusables';

interface RecognitionFormData {
  name: string;
  website: string;
  section: 'trusted' | 'recognitions';
}

const AdminRecognitions = () => {
  const [recognitions, setRecognitions] = useState<Recognition[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRecognition, setEditingRecognition] = useState<Recognition | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [imageError, setImageError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const recognitionForm = useForm<RecognitionFormData>({ defaultValues: { name: '', website: '', section: 'trusted' } });

  const fetchData = async () => {
    try {
      setLoading(true);
      const recognitionData = await recognitionsService.getAll();
      setRecognitions(recognitionData);
    } catch (error) {
      console.error('Error loading recognitions:', error);
      toast.error('Error loading recognitions. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const openCreate = (section: 'trusted' | 'recognitions' = 'trusted') => {
    setEditingRecognition(null);
    recognitionForm.reset({ name: '', website: '', section });
    setSelectedImage(null);
    setImagePreview('');
    setImageError('');
    setModalOpen(true);
  };

  const openEdit = (recognition: Recognition) => {
    setEditingRecognition(recognition);
    recognitionForm.reset({ name: recognition.name, website: recognition.website || '', section: recognition.section || 'trusted' });
    setSelectedImage(null);
    setImagePreview(recognition.image);
    setImageError('');
    setModalOpen(true);
  };

  const saveRecognition = async (data: RecognitionFormData) => {
    if (!editingRecognition && !selectedImage) {
      setImageError('Recognition image is required');
      return;
    }

    try {
      setSubmitting(true);
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('website', data.website || '');
      formData.append('section', data.section);
      if (selectedImage) formData.append('image', selectedImage);

      if (editingRecognition) {
        await recognitionsService.update(editingRecognition._id, formData);
        toast.success('Recognition updated successfully');
      } else {
        await recognitionsService.create(formData);
        toast.success('Recognition added successfully');
      }
      setModalOpen(false);
      await fetchData();
    } catch (error: any) {
      console.error('Error saving recognition:', error);
      toast.error(error?.response?.data?.message || 'Error saving recognition. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const removeRecognition = async (recognition: Recognition) => {
    if (!window.confirm(`Delete ${recognition.name}?`)) return;
    try {
      await recognitionsService.remove(recognition._id);
      toast.success('Recognition deleted successfully');
      await fetchData();
    } catch (error) {
      console.error('Error deleting recognition:', error);
      toast.error('Error deleting recognition. Please try again.');
    }
  };

  if (loading) {
    return <p className="text-gray-600 dark:text-gray-300">Loading recognitions...</p>;
  }

  return (
    <div className="space-y-10">
      <section>
        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recognized Organizations ({recognitions.length})</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Manage one image for each organization or recognition event.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => openCreate('trusted')} className="flex items-center"><FaPlus className="mr-2" /> Add Trusted Organization</Button>
            <Button onClick={() => openCreate('recognitions')} className="flex items-center"><FaPlus className="mr-2" /> Add Recognition</Button>
          </div>
        </div>

        {recognitions.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 py-8 text-center border border-dashed rounded-lg">No recognition organizations added yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recognitions.map((recognition) => (
              <div key={recognition._id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-700/40">
                <div className="h-28 bg-white dark:bg-gray-800 rounded flex items-center justify-center p-4 mb-4">
                  <img src={recognition.image} alt={recognition.name} className="max-h-full max-w-full object-contain" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white truncate">{recognition.name}</h3>
                <p className="text-xs uppercase tracking-wide text-primary-600 dark:text-primary-400 mt-1">{recognition.section === 'recognitions' ? 'Recognition' : 'Trusted by'}</p>
                {recognition.website && <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-1">{recognition.website}</p>}
                <div className="flex gap-2 mt-4">
                  <Button variant="secondary" onClick={() => openEdit(recognition)} className="flex items-center"><FaEdit className="mr-2" /> Edit</Button>
                  <button type="button" onClick={() => removeRecognition(recognition)} className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded" title="Delete recognition"><FaTrash /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Modal isOpen={modalOpen} onClose={() => !submitting && setModalOpen(false)} title={editingRecognition ? 'Edit Recognition' : 'Add Recognition'} size="lg">
        <form onSubmit={recognitionForm.handleSubmit(saveRecognition)} className="space-y-4">
          <FormInput id="name" label="Organization or Event Name" register={recognitionForm.register} error={recognitionForm.formState.errors.name} required disabled={submitting} />
          <FormInput id="website" label="Website" type="url" register={recognitionForm.register} disabled={submitting} placeholder="https://example.com" />
          <div>
            <label htmlFor="section" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Section</label>
            <select id="section" {...recognitionForm.register('section')} disabled={submitting} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              <option value="trusted">Trusted and recognized by</option>
              <option value="recognitions">Recognitions: meetups, forums, expos</option>
            </select>
          </div>
          <ImageUpload label="Recognition Image" value={imagePreview} onChange={(file, imageUrl) => { setSelectedImage(file); setImagePreview(imageUrl || ''); setImageError(''); }} required={!editingRecognition} error={imageError} />
          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={submitting}>{submitting ? 'Saving...' : editingRecognition ? 'Update Recognition' : 'Add Recognition'}</Button>
            <Button type="button" variant="secondary" onClick={() => setModalOpen(false)} disabled={submitting}>Cancel</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminRecognitions;
