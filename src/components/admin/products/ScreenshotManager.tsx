import React, { useState } from 'react';
import { Plus, Trash2, Upload } from 'lucide-react';
import { Button } from '../../reusables';
import { useProductsAdmin } from '../../../../hooks/admin/useProductsAdmin';
import { toast } from 'react-hot-toast';

interface ScreenshotManagerProps {
  productId: string;
  screenshots: string[];
  onUpdate: (newScreenshots: string[]) => void;
}

const ScreenshotManager: React.FC<ScreenshotManagerProps> = ({ 
  productId, 
  screenshots, 
  onUpdate 
}) => {
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const { addScreenshots, removeScreenshot } = useProductsAdmin();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(event.target.files);
  };

  const handleUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      toast.error('Please select files to upload');
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      
      Array.from(selectedFiles).forEach(file => {
        formData.append('screenshots', file);
      });

      const result = await addScreenshots(productId, formData);
      onUpdate(result.screenshots);
      toast.success(`Added ${result.added.length} screenshot(s)`);
      
      // Reset file input
      const fileInput = document.getElementById('screenshot-input') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      setSelectedFiles(null);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to upload screenshots');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = async (index: number) => {
    if (window.confirm('Are you sure you want to remove this screenshot?')) {
      try {
        const result = await removeScreenshot(productId, index);
        onUpdate(result.screenshots);
        toast.success('Screenshot removed');
      } catch (error: any) {
        toast.error(error?.response?.data?.message || 'Failed to remove screenshot');
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload Section */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
        <div className="text-center">
          <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
          <p className="text-sm text-gray-600 mb-3">
            Add new screenshots to the gallery
          </p>
          
          <input
            id="screenshot-input"
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          
          <div className="space-y-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => document.getElementById('screenshot-input')?.click()}
              className="flex items-center gap-2 mx-auto"
            >
              <Plus size={16} />
              Select Images
            </Button>
            
            {selectedFiles && selectedFiles.length > 0 && (
              <div className="text-sm text-gray-600">
                {selectedFiles.length} file(s) selected
              </div>
            )}
            
            {selectedFiles && selectedFiles.length > 0 && (
              <Button
                onClick={handleUpload}
                disabled={uploading}
                className="flex items-center gap-2 mx-auto"
              >
                <Upload size={16} />
                {uploading ? 'Uploading...' : 'Upload'}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Current Screenshots */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          Current Screenshots ({screenshots.length})
        </h3>
        
        {screenshots.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-8 border rounded-lg bg-gray-50">
            No screenshots yet. Upload some images to get started.
          </p>
        ) : (
          <div className="space-y-3">
            {screenshots.map((screenshot, index) => (
              <div 
                key={index} 
                className="flex items-center gap-3 p-3 border rounded-lg bg-gray-50"
              >
                <img
                  src={screenshot}
                  alt={`Screenshot ${index + 1}`}
                  className="w-16 h-16 object-cover rounded"
                />
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 truncate">
                    Screenshot {index + 1}
                  </p>
                  <p className="text-xs text-gray-500">
                    Position: {index + 1}
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.open(screenshot, '_blank')}
                    className="text-blue-600 hover:text-blue-800 text-xs"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleRemove(index)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Remove screenshot"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="text-xs text-gray-500 bg-blue-50 p-3 rounded">
        <p className="font-medium mb-1">Screenshot Management Tips:</p>
        <ul className="space-y-1">
          <li>• Screenshots are displayed in the order they appear here</li>
          <li>• Supported formats: JPG, PNG, WebP</li>
          <li>• Recommended size: 1200x800px or larger</li>
          <li>• You can upload multiple screenshots at once</li>
        </ul>
      </div>
    </div>
  );
};

export default ScreenshotManager;
