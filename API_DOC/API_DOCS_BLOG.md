# Blog API Documentation

## 🎯 **RESTful API Design**

### **Core Blog Operations**
```javascript
GET    /api/blog               // Get all blog posts (public)
GET    /api/blog/:id           // Get single blog post by ID (public)
GET    /api/blog/slug/:slug    // Get single blog post by slug (public)
POST   /api/blog               // Create blog post (protected)
PUT    /api/blog/:id           // Update blog post (protected)
DELETE /api/blog/:id           // Delete blog post (protected)
```

---

## 🚀 **Usage Examples**

### **1. Get All Blog Posts (Public)**
```javascript
// Frontend
fetch('/api/blog')
  .then(res => res.json())
  .then(blogPosts => {
    console.log(blogPosts); // Array of all blog posts
  });

// Response: Array of blog posts sorted by creation date (newest first)
[
  {
    "_id": "64a7b8c9d1e2f3a4b5c6d7e8",
    "title": "Getting Started with React",
    "slug": "getting-started-with-react",
    "coverImage": "https://cloudinary.com/cover.jpg",
    "excerpt": "Learn the basics of React development...",
    "content": "Full blog post content here...",
    "author": "John Doe",
    "tags": ["React", "JavaScript", "Frontend"],
    "published": true,
    "publishedAt": "2024-08-01T10:00:00.000Z",
    "createdAt": "2024-08-01T09:00:00.000Z",
    "updatedAt": "2024-08-01T10:00:00.000Z"
  }
]
```

### **2. Get Single Blog Post by ID (Public)**
```javascript
// Frontend
fetch('/api/blog/64a7b8c9d1e2f3a4b5c6d7e8')
  .then(res => res.json())
  .then(blogPost => {
    console.log(blogPost); // Single blog post object
  });

// Error handling
fetch('/api/blog/invalid-id')
  .then(res => {
    if (!res.ok) throw new Error('Blog post not found');
    return res.json();
  })
  .catch(error => {
    console.error(error.message); // "Blog post not found"
  });
```

### **3. Get Blog Post by Slug (Public)**
```javascript
// Frontend - SEO-friendly URLs
fetch('/api/blog/slug/getting-started-with-react')
  .then(res => res.json())
  .then(blogPost => {
    console.log(blogPost); // Blog post with slug "getting-started-with-react"
  });
```

### **4. Create Blog Post with Cover Image (Protected)**
```javascript
// Frontend
const formData = new FormData();
formData.append('title', 'My New Blog Post');
formData.append('slug', 'my-new-blog-post');
formData.append('excerpt', 'This is a brief excerpt of the blog post...');
formData.append('content', 'Full content of the blog post goes here...');
formData.append('author', 'Jane Smith');
formData.append('coverImage', coverImageFile);  // Cover image file
formData.append('tags', JSON.stringify(['React', 'Tutorial', 'Beginner']));
formData.append('published', 'true');

fetch('/api/blog', {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${token}` },
  body: formData
});

// Response:
{
  "_id": "64a7b8c9d1e2f3a4b5c6d7e8",
  "title": "My New Blog Post",
  "slug": "my-new-blog-post",
  "coverImage": "https://cloudinary.com/new-cover.jpg",
  "excerpt": "This is a brief excerpt...",
  "content": "Full content...",
  "author": "Jane Smith",
  "tags": ["React", "Tutorial", "Beginner"],
  "published": true,
  "publishedAt": "2024-08-01T10:00:00.000Z",
  "createdAt": "2024-08-01T10:00:00.000Z",
  "updatedAt": "2024-08-01T10:00:00.000Z"
}
```

### **5. Update Blog Post (Protected)**
```javascript
// Update only text fields (no cover image change)
const formData = new FormData();
formData.append('title', 'Updated Blog Post Title');
formData.append('content', 'Updated content...');
formData.append('published', 'false'); // Unpublish

fetch('/api/blog/64a7b8c9d1e2f3a4b5c6d7e8', {
  method: 'PUT',
  headers: { 'Authorization': `Bearer ${token}` },
  body: formData
});

// Result: Text fields updated, cover image remains unchanged
```

### **6. Update Blog Post with New Cover Image (Protected)**
```javascript
// Update content AND replace cover image
const formData = new FormData();
formData.append('title', 'Updated Title');
formData.append('coverImage', newCoverImageFile);  // New cover image

fetch('/api/blog/64a7b8c9d1e2f3a4b5c6d7e8', {
  method: 'PUT',
  headers: { 'Authorization': `Bearer ${token}` },
  body: formData
});

// Result: Fields updated + old cover image replaced with new one
// Old cover image is automatically deleted from Cloudinary
```

### **7. Delete Blog Post (Protected)**
```javascript
// Delete entire blog post and cover image
fetch('/api/blog/64a7b8c9d1e2f3a4b5c6d7e8', {
  method: 'DELETE',
  headers: { 'Authorization': `Bearer ${token}` }
});

// Response:
{
  "message": "Blog post deleted successfully"
}

// Note: This also deletes the cover image from Cloudinary
```

---

## 📋 **Data Model**

### **Blog Post Schema**
```javascript
{
  title: String (required),
  slug: String (required, unique),
  coverImage: String (required),
  excerpt: String (required),
  content: String (required),
  author: String (required),
  tags: [String],
  published: Boolean (default: false),
  publishedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔒 **Authentication Requirements**

### **Public Endpoints (No Auth)**
- `GET /api/blog`
- `GET /api/blog/:id`
- `GET /api/blog/slug/:slug`

### **Protected Endpoints (Bearer Token)**
- `POST /api/blog`
- `PUT /api/blog/:id`
- `DELETE /api/blog/:id`

### **Authentication Header**
```javascript
headers: {
  'Authorization': `Bearer ${token}`
}
```


## ✅ **Key Features**

### **🔥 SEO Optimized**
- **Slug-based URLs**: SEO-friendly URLs for better search rankings
- **Cover images**: Automatic Cloudinary optimization
- **Meta data**: Rich excerpt and author information

### **👥 Content Management**
- **Draft system**: Publish/unpublish functionality
- **Rich content**: Full HTML/Markdown support in content field
- **Tagging system**: Organize posts with tags
- **Author attribution**: Track content creators

### **🏗️ Performance**
- **Sorted results**: Newest posts first by default
- **Cloudinary integration**: Optimized image delivery
- **Efficient queries**: Fast database operations

### **🧹 Clean Operations**
- **Image cleanup**: Automatic deletion of old cover images
- **Validation**: Comprehensive input validation
- **Error handling**: Graceful error responses

---

## 🎯 **Recommended Usage Flow**

1. **Create blog post** with cover image and content
2. **Save as draft** for review and editing
3. **Get all posts** for admin dashboard
4. **Get by slug** for public blog pages
5. **Update content** as needed
6. **Publish** when ready for public viewing
7. **Delete** when no longer needed

Perfect for content management systems and blog platforms! 📝✨
