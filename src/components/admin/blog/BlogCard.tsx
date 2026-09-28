import React from 'react';
import { Edit, Trash2, Calendar, Tag } from 'lucide-react';
import { BlogPost } from '../../../types';

interface BlogCardProps {
  blog: BlogPost;
  onEdit: (blog: BlogPost) => void;
  onDelete: (id: string) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, onEdit, onDelete }) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
  };

  const truncateContent = (content: string, maxLength: number = 100) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div className="bg-cream rounded-card shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {blog.coverImage && (
        <div className="h-48 overflow-hidden">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-4">
        <div className="flex items-center gap-2 text-sm text-ink mb-2">
          <Calendar size={14} />
          <span>{formatDate(blog.createdAt)}</span>
          {blog.category && (
            <>
              <Tag size={14} className="ml-2" />
              <span>{blog.category}</span>
            </>
          )}
        </div>

        <h3 className="font-semibold text-lg text-charcoal mb-2 line-clamp-2">
          {blog.title}
        </h3>

        <p className="text-ink text-sm mb-3 line-clamp-3">
          {truncateContent(blog.excerpt || blog.content)}
        </p>

        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {blog.tags.slice(0, 3).map((tag: string, index: number) => (
              <span
                key={index}
                className="px-2 py-1 border border-hairline text-charcoal text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
            {blog.tags.length > 3 && (
              <span className="px-2 py-1 bg-cream-deep text-ink text-xs rounded-full">
                +{blog.tags.length - 3}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span
              className={`px-2 py-1 rounded-full text-xs ${
                blog.published
                  ? 'border border-hairline text-ink'
                  : 'border border-hairline text-ink'
              }`}
            >
              {blog.published ? 'Published' : 'Draft'}
            </span>
            {blog.featured && (
              <span className="px-2 py-1 border border-hairline text-ink rounded-full text-xs">
                Featured
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(blog)}
              className="p-1 text-charcoal hover:bg-cream-deep rounded transition-colors"
              title="Edit"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={() => onDelete(blog._id)}
              className="p-1 text-danger hover:bg-cream-deep rounded transition-colors"
              title="Delete"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
