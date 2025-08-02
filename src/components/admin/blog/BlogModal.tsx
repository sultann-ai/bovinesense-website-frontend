import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Button, FormInput, ImageUpload } from '../../reusables';
import { BlogPost } from '../../../types';
import { blogService } from '../../../services/blogService';
import { toast } from 'react-hot-toast';

interface BlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  blog?: BlogPost | null;
}

interface BlogFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string;
  published: boolean;
  featured: boolean;
  coverImage: File | null;
}

const BlogModal: React.FC<BlogModalProps> = ({ isOpen, onClose, onSuccess, blog }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>('');

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<BlogFormData>();

  useEffect(() => {
    if (blog) {
      setValue('title', blog.title);
      setValue('slug', blog.slug);
      setValue('excerpt', blog.excerpt);
      setValue('content', blog.content);
      setValue('author', blog.author);
      setValue('category', blog.category || '');
      setValue('tags', blog.tags?.join(', ') || '');
      setValue('published', blog.published || false);
      setValue('featured', blog.featured || false);
      setPreviewImage(blog.coverImage || '');
    } else {
      reset();
      setPreviewImage('');
      setCoverImageFile(null);
    }
  }, [blog, setValue, reset]);

  const handleImageUpload = (file: File | null, imageUrl?: string) => {
    if (file) {
      setCoverImageFile(file);
    }
    if (imageUrl) {
      setPreviewImage(imageUrl);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const onSubmit = async (data: BlogFormData) => {
    try {
      setIsSubmitting(true);

      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('slug', data.slug || generateSlug(data.title));
      formData.append('excerpt', data.excerpt);
      formData.append('content', data.content);
      formData.append('author', data.author);
      formData.append('category', data.category);
      formData.append('published', data.published.toString());
      formData.append('featured', data.featured.toString());

      // Handle tags
      if (data.tags) {
        const tagsArray = data.tags.split(',').map(tag => tag.trim()).filter(Boolean);
        tagsArray.forEach(tag => formData.append('tags', tag));
      }

      // Handle cover image
      if (coverImageFile) {
        formData.append('coverImage', coverImageFile);
      }

      if (blog) {
        await blogService.update(blog._id, formData);
        toast.success('Blog post updated successfully');
      } else {
        await blogService.create(formData);
        toast.success('Blog post created successfully');
      }

      onSuccess();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to save blog post');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={blog ? 'Edit Blog Post' : 'Create Blog Post'}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          id="title"
          label="Title"
          {...register('title', { required: 'Title is required' })}
          error={errors.title}
          onChange={(e) => {
            setValue('title', e.target.value);
            if (!blog) {
              setValue('slug', generateSlug(e.target.value));
            }
          }}
        />

        <FormInput
          id="slug"
          label="Slug"
          {...register('slug', { required: 'Slug is required' })}
          error={errors.slug}
          placeholder="auto-generated-from-title"
        />

        <FormInput
          id="author"
          label="Author"
          {...register('author', { required: 'Author is required' })}
          error={errors.author}
        />

        <FormInput
          id="category"
          label="Category"
          {...register('category')}
          error={errors.category}
          placeholder="Technology, Business, etc."
        />

        <FormInput
          id="tags"
          label="Tags (comma-separated)"
          {...register('tags')}
          error={errors.tags}
          placeholder="react, typescript, web development"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Excerpt
          </label>
          <textarea
            {...register('excerpt', { required: 'Excerpt is required' })}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Brief description of the blog post..."
          />
          {errors.excerpt && (
            <p className="mt-1 text-sm text-red-600">{errors.excerpt.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content
          </label>
          <textarea
            {...register('content', { required: 'Content is required' })}
            rows={8}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Full blog post content..."
          />
          {errors.content && (
            <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
          )}
        </div>

        <ImageUpload
          label="Cover Image"
          onChange={handleImageUpload}
          value={previewImage}
          accept="image/*"
        />

        <div className="flex items-center gap-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              {...register('published')}
              className="mr-2"
            />
            <span className="text-sm font-medium text-gray-700">Published</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              {...register('featured')}
              className="mr-2"
            />
            <span className="text-sm font-medium text-gray-700">Featured</span>
          </label>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : blog ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default BlogModal;
