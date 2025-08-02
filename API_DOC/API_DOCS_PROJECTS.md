# Projects API Documentation

## 🎯 **RESTful API Design**

### **Core Projects Operations**
```javascript
GET    /api/projects           // Get all projects (public)
GET    /api/projects/:id       // Get single project by ID (public)
POST   /api/projects           // Create project (no auth required)
PUT    /api/projects/:id       // Update project (no auth required)
DELETE /api/projects/:id       // Delete project (no auth required)
```

> **Note**: This API currently has no authentication requirements and supports single image upload functionality.

---

## 🚀 **Usage Examples**

### **1. Get All Projects (Public)**
```javascript
// Frontend
fetch('/api/projects')
  .then(res => res.json())
  .then(projects => {
    console.log(projects); // Array of all projects
  });

// Response: Array of projects sorted by creation date (newest first)
[
  {
    "_id": "64a7b8c9d1e2f3a4b5c6d7e8",
    "title": "E-commerce Platform",
    "description": "A full-featured e-commerce platform with modern design and advanced functionality...",
    "image": "https://cloudinary.com/ecommerce-project.jpg",
    "technologies": ["React", "Node.js", "MongoDB", "Stripe"],
    "category": "Web Application",
    "status": "Completed",
    "startDate": "2024-01-15T00:00:00.000Z",
    "endDate": "2024-04-15T00:00:00.000Z",
    "clientName": "TechCorp Inc.",
    "projectUrl": "https://demo-ecommerce.example.com",
    "githubUrl": "https://github.com/company/ecommerce-platform",
    "features": [
      "User Authentication",
      "Payment Processing",
      "Admin Dashboard",
      "Inventory Management"
    ],
    "isPublic": true,
    "createdAt": "2024-08-01T10:00:00.000Z",
    "updatedAt": "2024-08-01T10:00:00.000Z"
  }
]
```

### **2. Get Single Project by ID (Public)**
```javascript
// Frontend
fetch('/api/projects/64a7b8c9d1e2f3a4b5c6d7e8')
  .then(res => res.json())
  .then(project => {
    console.log(project); // Single project object
  });

// Error handling
fetch('/api/projects/invalid-id')
  .then(res => {
    if (!res.ok) throw new Error('Project not found');
    return res.json();
  })
  .catch(error => {
    console.error(error.message); // "Project not found"
  });
```

### **3. Create Project with Image**
```javascript
// Frontend
const formData = new FormData();
formData.append('title', 'Mobile Banking App');
formData.append('description', 'A secure mobile banking application with biometric authentication...');
formData.append('image', projectImageFile);  // Project screenshot/image
formData.append('technologies', JSON.stringify(['React Native', 'Node.js', 'PostgreSQL', 'AWS']));
formData.append('category', 'Mobile Application');
formData.append('status', 'In Progress');
formData.append('startDate', '2024-06-01');
formData.append('endDate', '2024-09-01');
formData.append('clientName', 'FinanceBank');
formData.append('projectUrl', 'https://banking-app-demo.example.com');
formData.append('githubUrl', 'https://github.com/company/banking-app');
formData.append('features', JSON.stringify([
  'Biometric Authentication',
  'Transaction History',
  'Bill Payments',
  'Account Management'
]));
formData.append('isPublic', 'true');

fetch('/api/projects', {
  method: 'POST',
  body: formData
});

// Response:
{
  "_id": "64a7b8c9d1e2f3a4b5c6d7e9",
  "title": "Mobile Banking App",
  "description": "A secure mobile banking application...",
  "image": "https://cloudinary.com/banking-app.jpg",
  "technologies": ["React Native", "Node.js", "PostgreSQL", "AWS"],
  "category": "Mobile Application",
  "status": "In Progress",
  "startDate": "2024-06-01T00:00:00.000Z",
  "endDate": "2024-09-01T00:00:00.000Z",
  "clientName": "FinanceBank",
  "projectUrl": "https://banking-app-demo.example.com",
  "githubUrl": "https://github.com/company/banking-app",
  "features": [
    "Biometric Authentication",
    "Transaction History", 
    "Bill Payments",
    "Account Management"
  ],
  "isPublic": true,
  "createdAt": "2024-08-01T10:00:00.000Z",
  "updatedAt": "2024-08-01T10:00:00.000Z"
}
```

### **4. Update Project (No Image Change)**
```javascript
// Update only text fields
const formData = new FormData();
formData.append('status', 'Completed');
formData.append('endDate', '2024-08-15');
formData.append('description', 'Updated description with final features...');

fetch('/api/projects/64a7b8c9d1e2f3a4b5c6d7e9', {
  method: 'PUT',
  body: formData
});

// Result: Text fields updated, project image remains unchanged
```

### **5. Update Project with New Image**
```javascript
// Update project AND replace image
const formData = new FormData();
formData.append('title', 'Mobile Banking App - Final Version');
formData.append('image', newProjectImageFile);  // New project image

fetch('/api/projects/64a7b8c9d1e2f3a4b5c6d7e9', {
  method: 'PUT',
  body: formData
});

// Result: Fields updated + old image replaced with new one
// Old image is automatically deleted from Cloudinary
```

### **6. Make Project Private**
```javascript
// Hide project from public portfolio
const formData = new FormData();
formData.append('isPublic', 'false');

fetch('/api/projects/64a7b8c9d1e2f3a4b5c6d7e9', {
  method: 'PUT',
  body: formData
});

// Result: Project hidden from public display but data preserved
```

### **7. Delete Project**
```javascript
// Permanently delete project and image
fetch('/api/projects/64a7b8c9d1e2f3a4b5c6d7e9', {
  method: 'DELETE'
});

// Response:
{
  "message": "Project deleted successfully"
}

// Note: This also deletes the project image from Cloudinary
```

---

## 📋 **Data Model**

### **Project Schema**
```javascript
{
  title: String (required),
  description: String (required),
  image: String (required),
  technologies: [String],
  category: String,
  status: String,
  startDate: Date,
  endDate: Date,
  clientName: String,
  projectUrl: String,
  githubUrl: String,
  features: [String],
  isPublic: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔒 **Authentication Requirements**

### **Public Endpoints (No Auth Required)**
- `GET /api/projects`
- `GET /api/projects/:id`
- `POST /api/projects`
- `PUT /api/projects/:id`
- `DELETE /api/projects/:id`

> **Security Note**: This API currently has no authentication. Consider adding authentication for write operations in production environments.

---

## ✅ **Key Features**

### **🔥 Portfolio Management**
- **Project images**: Visual portfolio with Cloudinary optimization
- **Status tracking**: Project lifecycle management
- **Client information**: Professional project attribution
- **Technology showcase**: Technical skill demonstration

### **👥 Business Features**
- **Public/Private control**: Portfolio visibility management
- **Timeline tracking**: Project duration and milestones
- **Live demos**: Link to working applications
- **Source code**: GitHub repository links

### **🏗️ Performance**
- **Image optimization**: Automatic Cloudinary processing
- **Sorted results**: Newest projects first
- **Efficient queries**: Fast database operations

### **🧹 Clean Operations**
- **Image cleanup**: Automatic deletion of old project images
- **Validation**: Comprehensive input validation
- **Error handling**: Graceful error responses

---

## 🎯 **Recommended Usage Flow**

1. **Create projects** with images and detailed information
2. **Track project status** through development lifecycle
3. **Get all projects** for portfolio display
4. **Filter by category/status** for organized showcase
5. **Update project details** as development progresses
6. **Mark as private** for confidential projects
7. **Delete permanently** when cleanup is needed

Perfect for agencies, freelancers, and development companies showcasing their work! 🚀💼
