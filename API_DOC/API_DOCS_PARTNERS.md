# Partners API Documentation

## 🎯 **RESTful API Design**

### **Core Partners Operations**
```javascript
GET    /api/partners           // Get all partners (public)
POST   /api/partners           // Create partner (no auth required)
PUT    /api/partners/:id       // Update partner (no auth required)
DELETE /api/partners/:id       // Delete partner (no auth required)
```

> **Note**: This API currently has no authentication requirements, supports single image upload (logo), and has no individual partner retrieval endpoint.

---

## 🚀 **Usage Examples**

### **1. Get All Partners (Public)**
```javascript
// Frontend
fetch('/api/partners')
  .then(res => res.json())
  .then(partners => {
    console.log(partners); // Array of all partners
  });

// Response: Array of partners sorted by creation date (newest first)
[
  {
    "_id": "64a7b8c9d1e2f3a4b5c6d7e8",
    "name": "TechCorp Solutions",
    "logo": "https://cloudinary.com/techcorp-logo.jpg",
    "website": "https://techcorp.com",
    "description": "Leading technology solutions provider specializing in enterprise software...",
    "industry": "Technology",
    "partnershipType": "Strategic",
    "startDate": "2023-06-15T00:00:00.000Z",
    "contactEmail": "partnerships@techcorp.com",
    "location": "San Francisco, CA",
    "isActive": true,
    "createdAt": "2024-08-01T10:00:00.000Z",
    "updatedAt": "2024-08-01T10:00:00.000Z"
  },
  {
    "_id": "64a7b8c9d1e2f3a4b5c6d7e9",
    "name": "Design Studio Pro",
    "logo": "https://cloudinary.com/design-studio-logo.jpg",
    "website": "https://designstudiopro.com",
    "description": "Award-winning design agency focusing on user experience and brand identity...",
    "industry": "Design",
    "partnershipType": "Collaboration",
    "startDate": "2024-01-10T00:00:00.000Z",
    "contactEmail": "hello@designstudiopro.com",
    "location": "New York, NY",
    "isActive": true,
    "createdAt": "2024-08-01T09:00:00.000Z",
    "updatedAt": "2024-08-01T09:00:00.000Z"
  }
]
```

### **2. Create New Partner with Logo**
```javascript
// Frontend
const formData = new FormData();
formData.append('name', 'Cloud Infrastructure Inc.');
formData.append('logo', logoImageFile);  // Partner logo file
formData.append('website', 'https://cloudinfra.com');
formData.append('description', 'Reliable cloud infrastructure and hosting services for businesses of all sizes...');
formData.append('industry', 'Cloud Services');
formData.append('partnershipType', 'Technology');
formData.append('startDate', '2024-08-01');
formData.append('contactEmail', 'partners@cloudinfra.com');
formData.append('location', 'Austin, TX');
formData.append('isActive', 'true');

fetch('/api/partners', {
  method: 'POST',
  body: formData
});

// Response:
{
  "_id": "64a7b8c9d1e2f3a4b5c6d7ea",
  "name": "Cloud Infrastructure Inc.",
  "logo": "https://cloudinary.com/cloud-infra-logo.jpg",
  "website": "https://cloudinfra.com",
  "description": "Reliable cloud infrastructure and hosting services...",
  "industry": "Cloud Services",
  "partnershipType": "Technology",
  "startDate": "2024-08-01T00:00:00.000Z",
  "contactEmail": "partners@cloudinfra.com",
  "location": "Austin, TX",
  "isActive": true,
  "createdAt": "2024-08-01T10:00:00.000Z",
  "updatedAt": "2024-08-01T10:00:00.000Z"
}
```

### **3. Update Partner (No Logo Change)**
```javascript
// Update only text fields
const formData = new FormData();
formData.append('description', 'Updated description with new services and expanded capabilities...');
formData.append('partnershipType', 'Strategic');
formData.append('location', 'Austin, TX (Headquarters), Seattle, WA (Branch)');

fetch('/api/partners/64a7b8c9d1e2f3a4b5c6d7ea', {
  method: 'PUT',
  body: formData
});

// Result: Text fields updated, logo remains unchanged
```

### **4. Update Partner with New Logo**
```javascript
// Update partner AND replace logo
const formData = new FormData();
formData.append('name', 'Cloud Infrastructure Inc. (Rebranded)');
formData.append('logo', newLogoImageFile);  // New logo file

fetch('/api/partners/64a7b8c9d1e2f3a4b5c6d7ea', {
  method: 'PUT',
  body: formData
});

// Result: Fields updated + old logo replaced with new one
// Old logo is automatically deleted from Cloudinary
```

### **5. Deactivate Partnership**
```javascript
// Mark partnership as inactive (soft delete)
const formData = new FormData();
formData.append('isActive', 'false');

fetch('/api/partners/64a7b8c9d1e2f3a4b5c6d7ea', {
  method: 'PUT',
  body: formData
});

// Result: Partnership marked as inactive but data preserved
```

### **6. Delete Partner**
```javascript
// Permanently delete partner and logo
fetch('/api/partners/64a7b8c9d1e2f3a4b5c6d7ea', {
  method: 'DELETE'
});

// Response:
{
  "message": "Partner deleted successfully"
}

// Note: This also deletes the logo from Cloudinary
```

---


## 📋 **Data Model**

### **Partner Schema**
```javascript
{
  name: String (required),
  logo: String (required),
  website: String,
  description: String,
  industry: String,
  partnershipType: String,
  startDate: Date,
  contactEmail: String,
  location: String,
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔒 **Authentication Requirements**

### **Public Endpoints (No Auth Required)**
- `GET /api/partners`
- `POST /api/partners`
- `PUT /api/partners/:id`
- `DELETE /api/partners/:id`

> **Security Note**: This API currently has no authentication. Consider adding authentication for write operations in production environments.

---

## ✅ **Key Features**

### **🔥 Partnership Management**
- **Partner logos**: Professional branding with Cloudinary optimization
- **Partnership types**: Strategic, Technology, Collaboration, Vendor classifications
- **Active/Inactive status**: Partnership lifecycle management
- **Contact information**: Email and website links

### **👥 Business Features**
- **Industry categorization**: Partner ecosystem organization
- **Timeline tracking**: Partnership start dates
- **Location information**: Geographic partner distribution
- **Description details**: Partnership value propositions

### **🏗️ Performance**
- **Logo optimization**: Automatic Cloudinary processing
- **Sorted results**: Newest partnerships first
- **Efficient queries**: Fast database operations

### **🧹 Clean Operations**
- **Logo cleanup**: Automatic deletion of old partner logos
- **Validation**: Comprehensive input validation
- **Error handling**: Graceful error responses

---

## 🎯 **Recommended Usage Flow**

1. **Add new partners** with logos and partnership details
2. **Get all partners** for partners page display
3. **Filter by partnership type** for organized showcase
4. **Update partner information** as relationships evolve
5. **Deactivate partnerships** when relationships end (soft delete)
6. **Delete permanently** when data cleanup is needed

Perfect for showcasing business partnerships, vendor relationships, and strategic alliances! 🤝✨
