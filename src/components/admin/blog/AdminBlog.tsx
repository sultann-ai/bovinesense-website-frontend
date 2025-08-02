import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../../reusables';
import LoadingSpinner from '../../common/LoadingSpinner';
import { useBlogAdmin } from '../../../../hooks/admin/useBlogAdmin';
import BlogCard from './BlogCard';
import BlogModal from './BlogModal';
import { BlogPost } from '../../../types';
import { toast } from 'react-hot-toast';

const AdminBlog: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const { blogs, loading, fetchBlogs, deleteBlog } = useBlogAdmin();

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleEdit = (blog: BlogPost) => {
    setEditingBlog(blog);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await deleteBlog(id);
        toast.success('Blog post deleted successfully');
      } catch (error) {
        toast.error('Failed to delete blog post');
      }
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingBlog(null);
  };

  const handleModalSuccess = () => {
    handleModalClose();
    fetchBlogs();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Blog Management</h1>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus size={20} />
          Add Blog Post
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <BlogCard
            key={blog._id}
            blog={blog}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {blogs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No blog posts found</p>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="mt-4"
          >
            Create Your First Blog Post
          </Button>
        </div>
      )}

      <BlogModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSuccess={handleModalSuccess}
        blog={editingBlog}
      />
    </div>
  );
};

export default AdminBlog;