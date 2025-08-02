import { useState, useRef } from 'react';

interface ImageUploadProps {
  label: string;
  value?: string;
  onChange: (file: File | null, imageUrl?: string) => void;
  required?: boolean;
  className?: string;
  preview?: boolean;
  previewSize?: 'sm' | 'md' | 'lg';
  accept?: string;
  error?: string;
}

const ImageUpload = ({
  label,
  value,
  onChange,
  required = false,
  className = '',
  preview = true,
  previewSize = 'md',
  accept = 'image/*',
  error
}: ImageUploadProps) => {
  const [previewUrl, setPreviewUrl] = useState<string>(value || '');
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    processFile(file);
  };

  const processFile = (file: File | undefined) => {
    if (file && file.type.startsWith('image/')) {
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      
      // Pass the file back to parent
      onChange(file, url);
    } else if (!file) {
      setPreviewUrl('');
      onChange(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      processFile(imageFile);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const previewSizes = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-32 h-32'
  };

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />
      
      {/* Drag and Drop Area */}
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-lg p-6 transition-all duration-200 cursor-pointer
          hover:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20
          ${isDragOver 
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30' 
            : error 
              ? 'border-red-400 bg-red-50 dark:bg-red-900/20' 
              : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800'
          }
        `}
      >
        {preview && (previewUrl || value) ? (
          <div className="flex flex-col items-center space-y-3">
            <img 
              src={previewUrl || value} 
              alt="Preview" 
              className={`${previewSizes[previewSize]} rounded-lg object-cover border border-gray-300 dark:border-gray-600 shadow-sm`} 
            />
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Click to change image or drag and drop a new one
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-3">
            <div className="w-12 h-12 border-2 border-gray-400 dark:border-gray-500 border-dashed rounded-lg flex items-center justify-center">
              <svg 
                className="w-6 h-6 text-gray-400 dark:text-gray-500" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
                />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {isDragOver ? 'Drop image here' : 'Click to upload or drag and drop'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-red-500 text-xs mt-2 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};

export default ImageUpload;
