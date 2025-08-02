# Products API Documentation

## 🎯 **RESTful API Design**

### **Core Product Operations**
```javascript
GET    /api/products           // Get all products (public)
GET    /api/products/:id       // Get single product by ID (public)
GET    /api/products/slug/:slug // Get single product by slug (public)
POST   /api/products           // Create product (protected)
PUT    /api/products/:id       // Update product (protected)
DELETE /api/products/:id       // Delete product (protected)
```

### **📸 Advanced Image Management Endpoints**
```javascript
GET    /api/products/:id/screenshots        // Get only screenshots array (public)
POST   /api/products/:id/screenshots        // Add new screenshots (protected)
DELETE /api/products/:id/screenshots/:index // Remove specific screenshot (protected)
```

---

## 🚀 **Usage Examples**

### **1. Get All Products (Public)**
```javascript
// Frontend
fetch('/api/products')
  .then(res => res.json())
  .then(products => {
    console.log(products); // Array of all products
  });

// Response: Array of products sorted by creation date (newest first)
[
  {
    "_id": "64a7b8c9d1e2f3a4b5c6d7e8",
    "name": "Product Name",
    "slug": "product-name",
    "shortDescription": "Brief description",
    "fullDescription": "Detailed description",
    "bannerImage": "https://cloudinary.com/banner.jpg",
    "screenshots": ["https://cloudinary.com/ss1.jpg", "https://cloudinary.com/ss2.jpg"],
    "features": ["Feature 1", "Feature 2"],
    "technologies": ["React", "Node.js"],
    "category": "Web Development",
    "price": 99.99,
    "demoUrl": "https://demo.example.com",
    "githubUrl": "https://github.com/example/repo",
    "createdAt": "2024-08-01T10:00:00.000Z",
    "updatedAt": "2024-08-01T10:00:00.000Z"
  }
]
```

### **2. Get Single Product by ID (Public)**
```javascript
// Frontend
fetch('/api/products/64a7b8c9d1e2f3a4b5c6d7e8')
  .then(res => res.json())
  .then(product => {
    console.log(product); // Single product object
  });

// Error handling
fetch('/api/products/invalid-id')
  .then(res => {
    if (!res.ok) throw new Error('Product not found');
    return res.json();
  })
  .catch(error => {
    console.error(error.message); // "Product not found"
  });
```

### **3. Get Product by Slug (Public)**
```javascript
// Frontend - SEO-friendly URLs
fetch('/api/products/slug/my-awesome-product')
  .then(res => res.json())
  .then(product => {
    console.log(product); // Product with slug "my-awesome-product"
  });
```

### **4. Create Product with Images (Protected)**
```javascript
// Frontend
const formData = new FormData();
formData.append('name', 'My New Product');
formData.append('slug', 'my-new-product');
formData.append('shortDescription', 'Brief description of the product');
formData.append('fullDescription', 'Detailed product description...');
formData.append('image', bannerFile);              // Banner image (single)
formData.append('screenshots', screenshot1);       // Screenshots (multiple)
formData.append('screenshots', screenshot2);
formData.append('screenshots', screenshot3);
formData.append('features', JSON.stringify(['Feature 1', 'Feature 2']));
formData.append('technologies', JSON.stringify(['React', 'Node.js']));
formData.append('category', 'Web Development');
formData.append('price', '99.99');
formData.append('demoUrl', 'https://demo.example.com');
formData.append('githubUrl', 'https://github.com/example/repo');

fetch('/api/products', {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${token}` },
  body: formData
});

// Result: Product created with 1 banner + 3 screenshots
// Response:
{
  "message": "Product created successfully",
  "_id": "64a7b8c9d1e2f3a4b5c6d7e8",
  "name": "My New Product",
  "bannerImage": "https://cloudinary.com/new-banner.jpg",
  "screenshots": [
    "https://cloudinary.com/screenshot1.jpg",
    "https://cloudinary.com/screenshot2.jpg",
    "https://cloudinary.com/screenshot3.jpg"
  ],
  // ... other fields
}
```

### **5. Update Product (Protected)**
```javascript
// Update only text fields (no images)
const formData = new FormData();
formData.append('name', 'Updated Product Name');
formData.append('shortDescription', 'Updated description');
formData.append('price', '149.99');

fetch('/api/products/64a7b8c9d1e2f3a4b5c6d7e8', {
  method: 'PUT',
  headers: { 'Authorization': `Bearer ${token}` },
  body: formData
});

// Result: Text fields updated, all images remain unchanged
```

### **6. Update Product + Add More Screenshots (Protected)**
```javascript
// Update product details AND append new screenshots
const formData = new FormData();
formData.append('name', 'Updated Product Name');
formData.append('screenshots', newScreenshot1);  // These APPEND to existing
formData.append('screenshots', newScreenshot2);

fetch('/api/products/64a7b8c9d1e2f3a4b5c6d7e8', {
  method: 'PUT',
  headers: { 'Authorization': `Bearer ${token}` },
  body: formData
});

// Result: Product updated + new screenshots appended to existing ones
// If product had 3 screenshots, now it has 5 (3 old + 2 new)
```

### **7. Get Product Screenshots Only (Public)**
```javascript
// Lightweight request for just screenshots
fetch('/api/products/64a7b8c9d1e2f3a4b5c6d7e8/screenshots')
  .then(res => res.json())
  .then(data => {
    console.log(data.screenshots); // Array of screenshot URLs only
  });

// Response:
{
  "screenshots": [
    "https://cloudinary.com/screenshot1.jpg",
    "https://cloudinary.com/screenshot2.jpg",
    "https://cloudinary.com/screenshot3.jpg"
  ]
}
```

### **8. Add More Screenshots (Protected)**
```javascript
// Add screenshots to existing product without affecting other data
const formData = new FormData();
formData.append('screenshots', newScreenshot1);
formData.append('screenshots', newScreenshot2);

fetch('/api/products/64a7b8c9d1e2f3a4b5c6d7e8/screenshots', {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${token}` },
  body: formData
});

// Response:
{
  "message": "Added 2 screenshots",
  "added": [
    "https://cloudinary.com/new1.jpg",
    "https://cloudinary.com/new2.jpg"
  ],
  "total": 5,
  "screenshots": [
    "https://cloudinary.com/old1.jpg",
    "https://cloudinary.com/old2.jpg",
    "https://cloudinary.com/old3.jpg",
    "https://cloudinary.com/new1.jpg",
    "https://cloudinary.com/new2.jpg"
  ]
}
```

### **9. Remove Specific Screenshot (Protected)**
```javascript
// Remove screenshot at index 1 (2nd screenshot)
fetch('/api/products/64a7b8c9d1e2f3a4b5c6d7e8/screenshots/1', {
  method: 'DELETE',
  headers: { 'Authorization': `Bearer ${token}` }
});

// Response:
{
  "message": "Screenshot removed successfully",
  "removed": "https://cloudinary.com/old2.jpg",
  "remainingCount": 4,
  "screenshots": [
    "https://cloudinary.com/old1.jpg",
    "https://cloudinary.com/old3.jpg",
    "https://cloudinary.com/new1.jpg",
    "https://cloudinary.com/new2.jpg"
  ]
}
```

### **10. Delete Product (Protected)**
```javascript
// Delete entire product and all associated images
fetch('/api/products/64a7b8c9d1e2f3a4b5c6d7e8', {
  method: 'DELETE',
  headers: { 'Authorization': `Bearer ${token}` }
});

// Response:
{
  "message": "Product deleted successfully"
}

// Note: This also deletes the banner image from Cloudinary
```

---

## 🎨 **Frontend UI Patterns**

### **Product Gallery Management Component**
```javascript
function ProductGallery({ productId, screenshots, onUpdate }) {
  const [isLoading, setIsLoading] = useState(false);

  const addScreenshots = async (files) => {
    setIsLoading(true);
    const formData = new FormData();
    files.forEach(file => formData.append('screenshots', file));
    
    try {
      const response = await fetch(`/api/products/${productId}/screenshots`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${getToken()}` },
        body: formData
      });
      
      const result = await response.json();
      onUpdate(result.screenshots); // Update UI with new array
    } catch (error) {
      console.error('Error adding screenshots:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeScreenshot = async (index) => {
    try {
      const response = await fetch(`/api/products/${productId}/screenshots/${index}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      
      const result = await response.json();
      onUpdate(result.screenshots); // Update UI with remaining screenshots
    } catch (error) {
      console.error('Error removing screenshot:', error);
    }
  };

  return (
    <div className="product-gallery">
      {screenshots.map((url, index) => (
        <div key={index} className="screenshot-item">
          <img src={url} alt={`Screenshot ${index + 1}`} />
          <button 
            onClick={() => removeScreenshot(index)}
            className="remove-btn"
          >
            🗑️ Remove
          </button>
        </div>
      ))}
      
      <div className="add-screenshots">
        <input 
          type="file" 
          multiple 
          accept="image/*" 
          onChange={(e) => addScreenshots(Array.from(e.target.files))}
          disabled={isLoading}
        />
        <label>
          {isLoading ? '⏳ Uploading...' : '➕ Add More Screenshots'}
        </label>
      </div>
    </div>
  );
}
```

---

## 📋 **Data Model**

### **Product Schema**
```javascript
{
  name: String (required),
  slug: String (required, unique),
  shortDescription: String (required),
  fullDescription: String (required),
  bannerImage: String (required),
  screenshots: [String],
  features: [String],
  technologies: [String],
  category: String,
  price: Number,
  demoUrl: String,
  githubUrl: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔒 **Authentication Requirements**

### **Public Endpoints (No Auth)**
- `GET /api/products`
- `GET /api/products/:id`
- `GET /api/products/slug/:slug`
- `GET /api/products/:id/screenshots`

### **Protected Endpoints (Bearer Token)**
- `POST /api/products`
- `PUT /api/products/:id`
- `DELETE /api/products/:id`
- `POST /api/products/:id/screenshots`
- `DELETE /api/products/:id/screenshots/:index`

### **Authentication Header**
```javascript
headers: {
  'Authorization': `Bearer ${token}`
}
```

---

## ✅ **Benefits of This API Design**

### **🔥 Performance**
- **Minimal data transfer**: Only upload new images when needed
- **Fast operations**: Add/remove individual screenshots
- **Bandwidth efficient**: No re-uploading existing images
- **Lightweight queries**: Get only screenshots when needed

### **👥 User Experience**
- **Granular control**: Add/remove individual screenshots
- **Forgiving**: Hard to accidentally lose all screenshots
- **Intuitive**: Clear actions for each operation
- **Real-time feedback**: Detailed response messages

### **🏗️ Scalability**
- **Handles large galleries**: Works with 100+ screenshots
- **Concurrent safe**: Multiple operations can run safely
- **Future-proof**: Easy to add features like reordering, metadata
- **Cloud optimized**: Automatic Cloudinary integration

### **🧹 Clean API Design**
- **RESTful**: Follows REST conventions perfectly
- **Predictable**: Clear endpoints for each operation
- **Composable**: Can combine operations as needed
- **Self-documenting**: URLs clearly indicate functionality

---

## 🎯 **Recommended Usage Flow**

1. **Create product** with initial banner + screenshots
2. **Get products** for listing/display pages
3. **Get single product** for detail pages
4. **Add more screenshots** using dedicated endpoint
5. **Remove unwanted screenshots** by index
6. **Update product details** without touching images
7. **Replace all screenshots** only when needed (bulk operation)

This gives you the best of all worlds: simple operations when you need them, powerful management when you need it! 🚀
