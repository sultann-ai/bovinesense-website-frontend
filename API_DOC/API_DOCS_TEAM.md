# Team API Documentation

## 🎯 **RESTful API Design**

### **Core Team Operations**
```javascript
GET    /api/team               // Get all team members (public)
GET    /api/team/:id           // Get single team member by ID (public)
POST   /api/team               // Create team member (no auth required)
PUT    /api/team/:id           // Update team member (no auth required)
DELETE /api/team/:id           // Delete team member (no auth required)
```

> **Note**: This API currently has no authentication requirements, making it suitable for internal admin tools or trusted environments.

---

## 🚀 **Usage Examples**

### **1. Get All Team Members (Public)**
```javascript
// Frontend
fetch('/api/team')
  .then(res => res.json())
  .then(teamMembers => {
    console.log(teamMembers); // Array of all team members
  });

// Response: Array of team members sorted by creation date (newest first)
[
  {
    "_id": "64a7b8c9d1e2f3a4b5c6d7e8",
    "name": "John Doe",
    "position": "Senior Developer",
    "image": "https://cloudinary.com/john-doe.jpg",
    "bio": "Experienced full-stack developer with 5+ years...",
    "email": "john@company.com",
    "linkedin": "https://linkedin.com/in/johndoe",
    "github": "https://github.com/johndoe",
    "twitter": "https://twitter.com/johndoe",
    "skills": ["React", "Node.js", "Python", "AWS"],
    "department": "Engineering",
    "startDate": "2023-01-15T00:00:00.000Z",
    "isActive": true,
    "createdAt": "2024-08-01T10:00:00.000Z",
    "updatedAt": "2024-08-01T10:00:00.000Z"
  }
]
```

### **2. Get Single Team Member by ID (Public)**
```javascript
// Frontend
fetch('/api/team/64a7b8c9d1e2f3a4b5c6d7e8')
  .then(res => res.json())
  .then(teamMember => {
    console.log(teamMember); // Single team member object
  });

// Error handling
fetch('/api/team/invalid-id')
  .then(res => {
    if (!res.ok) throw new Error('Team member not found');
    return res.json();
  })
  .catch(error => {
    console.error(error.message); // "Team member not found"
  });
```

### **3. Create Team Member with Profile Image**
```javascript
// Frontend
const formData = new FormData();
formData.append('name', 'Jane Smith');
formData.append('position', 'UI/UX Designer');
formData.append('bio', 'Creative designer with expertise in user experience...');
formData.append('email', 'jane@company.com');
formData.append('linkedin', 'https://linkedin.com/in/janesmith');
formData.append('github', 'https://github.com/janesmith');
formData.append('image', profileImageFile);  // Profile image file
formData.append('skills', JSON.stringify(['Figma', 'Adobe XD', 'Sketch', 'Prototyping']));
formData.append('department', 'Design');
formData.append('startDate', '2024-03-01');
formData.append('isActive', 'true');

fetch('/api/team', {
  method: 'POST',
  body: formData
});

// Response:
{
  "_id": "64a7b8c9d1e2f3a4b5c6d7e8",
  "name": "Jane Smith",
  "position": "UI/UX Designer",
  "image": "https://cloudinary.com/jane-smith.jpg",
  "bio": "Creative designer with expertise...",
  "email": "jane@company.com",
  "linkedin": "https://linkedin.com/in/janesmith",
  "github": "https://github.com/janesmith",
  "skills": ["Figma", "Adobe XD", "Sketch", "Prototyping"],
  "department": "Design",
  "startDate": "2024-03-01T00:00:00.000Z",
  "isActive": true,
  "createdAt": "2024-08-01T10:00:00.000Z",
  "updatedAt": "2024-08-01T10:00:00.000Z"
}
```

### **4. Update Team Member**
```javascript
// Update only text fields (no image change)
const formData = new FormData();
formData.append('position', 'Senior UI/UX Designer');
formData.append('bio', 'Updated bio with new achievements...');
formData.append('skills', JSON.stringify(['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research']));

fetch('/api/team/64a7b8c9d1e2f3a4b5c6d7e8', {
  method: 'PUT',
  body: formData
});

// Result: Text fields updated, profile image remains unchanged
```

### **5. Update Team Member with New Profile Image**
```javascript
// Update profile AND replace profile image
const formData = new FormData();
formData.append('name', 'Jane Smith-Johnson');
formData.append('image', newProfileImageFile);  // New profile image

fetch('/api/team/64a7b8c9d1e2f3a4b5c6d7e8', {
  method: 'PUT',
  body: formData
});

// Result: Fields updated + old profile image replaced with new one
// Old profile image is automatically deleted from Cloudinary
```

### **6. Deactivate Team Member**
```javascript
// Mark team member as inactive (soft delete)
const formData = new FormData();
formData.append('isActive', 'false');

fetch('/api/team/64a7b8c9d1e2f3a4b5c6d7e8', {
  method: 'PUT',
  body: formData
});

// Result: Team member marked as inactive but data preserved
```

### **7. Delete Team Member**
```javascript
// Permanently delete team member and profile image
fetch('/api/team/64a7b8c9d1e2f3a4b5c6d7e8', {
  method: 'DELETE'
});

// Response:
{
  "message": "Team member deleted successfully"
}

// Note: This also deletes the profile image from Cloudinary
```

---

## 📋 **Data Model**

### **Team Member Schema**
```javascript
{
  name: String (required),
  position: String (required),
  image: String (required),
  bio: String,
  email: String,
  linkedin: String,
  github: String,
  twitter: String,
  skills: [String],
  department: String,
  startDate: Date,
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔒 **Authentication Requirements**

### **Public Endpoints (No Auth Required)**
- `GET /api/team`
- `GET /api/team/:id`
- `POST /api/team`
- `PUT /api/team/:id`
- `DELETE /api/team/:id`

> **Security Note**: This API currently has no authentication. Consider adding authentication for write operations in production environments.

---

## ✅ **Key Features**

### **🔥 Team Management**
- **Profile images**: Professional headshots with Cloudinary optimization
- **Rich profiles**: Comprehensive member information
- **Social integration**: LinkedIn, GitHub, Twitter links
- **Skills tracking**: Technology and expertise tags

### **👥 Organizational Features**
- **Department grouping**: Organize by teams/departments
- **Active/Inactive status**: Soft delete capability
- **Start date tracking**: Employment history
- **Contact information**: Email and social links

### **🏗️ Performance**
- **Image optimization**: Automatic Cloudinary processing
- **Sorted results**: Newest members first
- **Efficient queries**: Fast database operations

### **🧹 Clean Operations**
- **Image cleanup**: Automatic deletion of old profile images
- **Validation**: Comprehensive input validation
- **Error handling**: Graceful error responses

---

## 🎯 **Recommended Usage Flow**

1. **Add new team members** with profile images and details
2. **Get all members** for team page display
3. **Get individual member** for detailed profiles
4. **Update member info** as roles/skills change
5. **Deactivate members** when they leave (soft delete)
6. **Delete permanently** when data cleanup is needed

Perfect for company websites, team showcases, and internal directories! 👥✨
