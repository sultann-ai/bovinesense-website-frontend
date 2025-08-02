# Founders API Documentation

## 🎯 **RESTful API Design**

### **Core Founders Operations**
```javascript
GET    /api/founders           // Get all founders (public)
GET    /api/founders/:id       // Get single founder by ID (public)
POST   /api/founders           // Create founder (no auth required)
PUT    /api/founders/:id       // Update founder (no auth required)
DELETE /api/founders/:id       // Delete founder (no auth required)
```

> **Note**: This API currently has no authentication requirements and supports single image upload functionality for founder profile photos.

---

## 🚀 **Usage Examples**

### **1. Get All Founders (Public)**
```javascript
// Frontend
fetch('/api/founders')
  .then(res => res.json())
  .then(founders => {
    console.log(founders); // Array of all founders
  });

// Response: Array of founders sorted by creation date (newest first)
[
  {
    "_id": "64a7b8c9d1e2f3a4b5c6d7e8",
    "name": "Sarah Johnson",
    "title": "CEO & Co-Founder",
    "image": "https://cloudinary.com/sarah-johnson.jpg",
    "bio": "Visionary leader with 15+ years in tech startups. Former VP at Google, passionate about innovation...",
    "email": "sarah@company.com",
    "linkedin": "https://linkedin.com/in/sarahjohnson",
    "twitter": "https://twitter.com/sarahjohnson",
    "github": "https://github.com/sarahjohnson",
    "education": "MBA Stanford, BS Computer Science MIT",
    "previousExperience": "VP of Product at Google, Senior Engineer at Facebook",
    "expertise": ["Product Strategy", "Team Leadership", "Venture Capital", "AI/ML"],
    "achievements": [
      "Led team that built product used by 100M+ users",
      "Raised $50M Series B funding",
      "Featured in Forbes 30 Under 30"
    ],
    "personalInterests": ["Rock climbing", "Photography", "Mentoring startups"],
    "foundingYear": 2022,
    "equityPercentage": 35,
    "isActive": true,
    "createdAt": "2024-08-01T10:00:00.000Z",
    "updatedAt": "2024-08-01T10:00:00.000Z"
  }
]
```

### **2. Get Single Founder by ID (Public)**
```javascript
// Frontend
fetch('/api/founders/64a7b8c9d1e2f3a4b5c6d7e8')
  .then(res => res.json())
  .then(founder => {
    console.log(founder); // Single founder object
  });

// Error handling
fetch('/api/founders/invalid-id')
  .then(res => {
    if (!res.ok) throw new Error('Founder not found');
    return res.json();
  })
  .catch(error => {
    console.error(error.message); // "Founder not found"
  });
```

### **3. Create New Founder with Profile Image**
```javascript
// Frontend
const formData = new FormData();
formData.append('name', 'Michael Chen');
formData.append('title', 'CTO & Co-Founder');
formData.append('image', profileImageFile);  // Founder profile photo
formData.append('bio', 'Full-stack architect with deep expertise in scalable systems. Former principal engineer at Amazon...');
formData.append('email', 'michael@company.com');
formData.append('linkedin', 'https://linkedin.com/in/michaelchen');
formData.append('twitter', 'https://twitter.com/michaelchen');
formData.append('github', 'https://github.com/michaelchen');
formData.append('education', 'PhD Computer Science Carnegie Mellon, BS Electrical Engineering UC Berkeley');
formData.append('previousExperience', 'Principal Engineer at Amazon, Senior Architect at Netflix');
formData.append('expertise', JSON.stringify(['System Architecture', 'Cloud Computing', 'DevOps', 'Machine Learning']));
formData.append('achievements', JSON.stringify([
  'Architected systems handling 1B+ requests/day',
  'Author of 12 technical patents',
  'Speaker at 25+ international conferences'
]));
formData.append('personalInterests', JSON.stringify(['Chess', 'Cooking', 'Open source contributing']));
formData.append('foundingYear', '2022');
formData.append('equityPercentage', '30');
formData.append('isActive', 'true');

fetch('/api/founders', {
  method: 'POST',
  body: formData
});

// Response:
{
  "_id": "64a7b8c9d1e2f3a4b5c6d7e9",
  "name": "Michael Chen",
  "title": "CTO & Co-Founder",
  "image": "https://cloudinary.com/michael-chen.jpg",
  "bio": "Full-stack architect with deep expertise in scalable systems...",
  "email": "michael@company.com",
  "linkedin": "https://linkedin.com/in/michaelchen",
  "twitter": "https://twitter.com/michaelchen",
  "github": "https://github.com/michaelchen",
  "education": "PhD Computer Science Carnegie Mellon, BS Electrical Engineering UC Berkeley",
  "previousExperience": "Principal Engineer at Amazon, Senior Architect at Netflix",
  "expertise": ["System Architecture", "Cloud Computing", "DevOps", "Machine Learning"],
  "achievements": [
    "Architected systems handling 1B+ requests/day",
    "Author of 12 technical patents",
    "Speaker at 25+ international conferences"
  ],
  "personalInterests": ["Chess", "Cooking", "Open source contributing"],
  "foundingYear": 2022,
  "equityPercentage": 30,
  "isActive": true,
  "createdAt": "2024-08-01T10:00:00.000Z",
  "updatedAt": "2024-08-01T10:00:00.000Z"
}
```

### **4. Update Founder (No Image Change)**
```javascript
// Update only text fields
const formData = new FormData();
formData.append('title', 'CTO, Co-Founder & Head of Engineering');
formData.append('bio', 'Updated bio with recent accomplishments and new role responsibilities...');
formData.append('achievements', JSON.stringify([
  'Architected systems handling 1B+ requests/day',
  'Author of 15 technical patents', // Updated count
  'Speaker at 30+ international conferences', // Updated count
  'Led engineering team to 50+ developers' // New achievement
]));

fetch('/api/founders/64a7b8c9d1e2f3a4b5c6d7e9', {
  method: 'PUT',
  body: formData
});

// Result: Text fields updated, profile image remains unchanged
```

### **5. Update Founder with New Profile Image**
```javascript
// Update founder AND replace profile image
const formData = new FormData();
formData.append('name', 'Michael Chen, PhD');
formData.append('image', newProfileImageFile);  // New profile photo

fetch('/api/founders/64a7b8c9d1e2f3a4b5c6d7e9', {
  method: 'PUT',
  body: formData
});

// Result: Fields updated + old profile image replaced with new one
// Old profile image is automatically deleted from Cloudinary
```

### **6. Mark Founder as Inactive**
```javascript
// Mark founder as inactive (for departed founders)
const formData = new FormData();
formData.append('isActive', 'false');

fetch('/api/founders/64a7b8c9d1e2f3a4b5c6d7e9', {
  method: 'PUT',
  body: formData
});

// Result: Founder marked as inactive but data preserved for company history
```

### **7. Delete Founder**
```javascript
// Permanently delete founder and profile image
fetch('/api/founders/64a7b8c9d1e2f3a4b5c6d7e9', {
  method: 'DELETE'
});

// Response:
{
  "message": "Founder deleted successfully"
}

// Note: This also deletes the profile image from Cloudinary
```

---

## 📋 **Data Model**

### **Founder Schema**
```javascript
{
  name: String (required),
  title: String (required),
  image: String (required),
  bio: String,
  email: String,
  linkedin: String,
  twitter: String,
  github: String,
  education: String,
  previousExperience: String,
  expertise: [String],
  achievements: [String],
  personalInterests: [String],
  foundingYear: Number,
  equityPercentage: Number,
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔒 **Authentication Requirements**

### **Public Endpoints (No Auth Required)**
- `GET /api/founders`
- `GET /api/founders/:id`
- `POST /api/founders`
- `PUT /api/founders/:id`
- `DELETE /api/founders/:id`

> **Security Note**: This API currently has no authentication. Consider adding authentication for write operations in production environments.

---

## ✅ **Key Features**

### **🔥 Founder Profiles**
- **Professional photos**: High-quality profile images with Cloudinary optimization
- **Comprehensive bios**: Detailed background and experience information
- **Social integration**: LinkedIn, Twitter, GitHub profiles
- **Achievement tracking**: Key accomplishments and recognition

### **👥 Company Features**
- **Founding information**: Year founded and equity distribution
- **Active/Former status**: Current and historical founder tracking
- **Educational background**: Academic credentials and certifications
- **Expertise areas**: Skills and domain knowledge

### **🏗️ Performance**
- **Image optimization**: Automatic Cloudinary processing
- **Rich profiles**: Comprehensive founder information
- **Sorted results**: Newest founders first

### **🧹 Clean Operations**
- **Image cleanup**: Automatic deletion of old profile images
- **Validation**: Comprehensive input validation
- **Error handling**: Graceful error responses

---

## 🎯 **Recommended Usage Flow**

1. **Add founder profiles** with photos and comprehensive information
2. **Get all founders** for company about page
3. **Get individual founder** for detailed founder profiles
4. **Update founder information** as roles and achievements evolve
5. **Mark as inactive** when founders leave (preserve company history)
6. **Delete permanently** only when necessary

Perfect for startup websites, company about pages, and investor relations! 👔✨
