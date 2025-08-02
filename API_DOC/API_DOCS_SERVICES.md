# Services API Documentation

## 🎯 **RESTful API Design**

### **Core Services Operations**
```javascript
GET    /api/services           // Get all services (public)
GET    /api/services/:id       // Get single service by ID (public)
POST   /api/services           // Create service (no auth required)
PUT    /api/services/:id       // Update service (no auth required)
DELETE /api/services/:id       // Delete service (no auth required)
```

> **Note**: This API currently has no authentication requirements and no image upload functionality, making it suitable for simple service listings.

---

## 🚀 **Usage Examples**

### **1. Get All Services (Public)**
```javascript
// Frontend
fetch('/api/services')
  .then(res => res.json())
  .then(services => {
    console.log(services); // Array of all services
  });

// Response: Array of services sorted by creation date (newest first)
[
  {
    "_id": "64a7b8c9d1e2f3a4b5c6d7e8",
    "name": "Web Development",
    "description": "Full-stack web application development using modern technologies...",
    "shortDescription": "Custom web applications and websites",
    "category": "Development",
    "price": 2500,
    "duration": "4-8 weeks",
    "features": [
      "Responsive Design",
      "Modern Technologies",
      "SEO Optimization",
      "Performance Optimization"
    ],
    "technologies": ["React", "Node.js", "MongoDB", "AWS"],
    "isActive": true,
    "createdAt": "2024-08-01T10:00:00.000Z",
    "updatedAt": "2024-08-01T10:00:00.000Z"
  },
  {
    "_id": "64a7b8c9d1e2f3a4b5c6d7e9",
    "name": "Mobile App Development",
    "description": "Native and cross-platform mobile application development...",
    "shortDescription": "iOS and Android mobile applications",
    "category": "Development",
    "price": 5000,
    "duration": "8-12 weeks",
    "features": [
      "Cross-platform Development",
      "Native Performance",
      "App Store Deployment",
      "Push Notifications"
    ],
    "technologies": ["React Native", "Flutter", "Swift", "Kotlin"],
    "isActive": true,
    "createdAt": "2024-08-01T09:00:00.000Z",
    "updatedAt": "2024-08-01T09:00:00.000Z"
  }
]
```

### **2. Get Single Service by ID (Public)**
```javascript
// Frontend
fetch('/api/services/64a7b8c9d1e2f3a4b5c6d7e8')
  .then(res => res.json())
  .then(service => {
    console.log(service); // Single service object
  });

// Error handling
fetch('/api/services/invalid-id')
  .then(res => {
    if (!res.ok) throw new Error('Service not found');
    return res.json();
  })
  .catch(error => {
    console.error(error.message); // "Service not found"
  });
```

### **3. Create New Service**
```javascript
// Frontend
const serviceData = {
  name: 'UI/UX Design',
  description: 'Complete user interface and user experience design services including wireframing, prototyping, and visual design...',
  shortDescription: 'Professional UI/UX design services',
  category: 'Design',
  price: 1500,
  duration: '3-6 weeks',
  features: [
    'User Research',
    'Wireframing',
    'Prototyping',
    'Visual Design',
    'Usability Testing'
  ],
  technologies: ['Figma', 'Adobe XD', 'Sketch', 'InVision'],
  isActive: true
};

fetch('/api/services', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(serviceData)
});

// Response:
{
  "_id": "64a7b8c9d1e2f3a4b5c6d7ea",
  "name": "UI/UX Design",
  "description": "Complete user interface and user experience design services...",
  "shortDescription": "Professional UI/UX design services",
  "category": "Design",
  "price": 1500,
  "duration": "3-6 weeks",
  "features": [
    "User Research",
    "Wireframing",
    "Prototyping",
    "Visual Design",
    "Usability Testing"
  ],
  "technologies": ["Figma", "Adobe XD", "Sketch", "InVision"],
  "isActive": true,
  "createdAt": "2024-08-01T10:00:00.000Z",
  "updatedAt": "2024-08-01T10:00:00.000Z"
}
```

### **4. Update Service**
```javascript
// Frontend - Update service details
const updatedData = {
  price: 1800,
  duration: '4-7 weeks',
  features: [
    'User Research',
    'Wireframing',
    'Prototyping',
    'Visual Design',
    'Usability Testing',
    'Design System Creation'  // Added new feature
  ]
};

fetch('/api/services/64a7b8c9d1e2f3a4b5c6d7ea', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(updatedData)
});

// Response: Updated service object with new values
```

### **5. Deactivate Service**
```javascript
// Mark service as inactive (soft disable)
fetch('/api/services/64a7b8c9d1e2f3a4b5c6d7ea', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ isActive: false })
});

// Result: Service marked as inactive but data preserved
```

### **6. Delete Service**
```javascript
// Permanently delete service
fetch('/api/services/64a7b8c9d1e2f3a4b5c6d7ea', {
  method: 'DELETE'
});

// Response:
{
  "message": "Service deleted successfully"
}
```

---

## 📋 **Data Model**

### **Service Schema**
```javascript
{
  name: String (required),
  description: String (required),
  shortDescription: String,
  category: String,
  price: Number,
  duration: String,
  features: [String],
  technologies: [String],
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔒 **Authentication Requirements**

### **Public Endpoints (No Auth Required)**
- `GET /api/services`
- `GET /api/services/:id`
- `POST /api/services`
- `PUT /api/services/:id`
- `DELETE /api/services/:id`

> **Security Note**: This API currently has no authentication. Consider adding authentication for write operations in production environments.

---

## ✅ **Key Features**

### **🔥 Service Management**
- **Flexible pricing**: Support for different pricing models
- **Feature lists**: Detailed service inclusions
- **Technology tags**: Technology stack information
- **Categories**: Service type organization

### **👥 Business Features**
- **Active/Inactive status**: Service availability control
- **Duration estimates**: Project timeline information
- **Pricing transparency**: Clear cost information
- **Feature breakdown**: Detailed service descriptions

### **🏗️ Performance**
- **Simple data model**: No complex relationships
- **Fast queries**: Efficient database operations
- **Sorted results**: Newest services first

### **🧹 Clean Operations**
- **Text-only data**: No file upload complexity
- **Validation**: Comprehensive input validation
- **Error handling**: Graceful error responses

---

## 🎯 **Recommended Usage Flow**

1. **Create services** with detailed descriptions and pricing
2. **Get all services** for service showcase pages
3. **Filter by category** for organized display
4. **Get individual service** for detailed service pages
5. **Update pricing/features** as services evolve
6. **Deactivate services** no longer offered (soft delete)
7. **Delete permanently** when cleanup is needed

Perfect for service-based businesses, consulting firms, and agencies! 💼✨
