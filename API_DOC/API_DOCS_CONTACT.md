# Contact API Documentation

## 🎯 **RESTful API Design**

### **Core Contact Operations**
```javascript
POST   /api/contact            // Submit contact form (public)
GET    /api/contact            // Get all contact submissions (protected)
DELETE /api/contact/:id        // Delete contact submission (protected)
```

> **Note**: This API has mixed authentication requirements - public form submission but protected admin access to view and manage submissions.

---

## 🚀 **Usage Examples**

### **1. Submit Contact Form (Public)**
```javascript
// Frontend - Public contact form submission
const contactData = {
  name: 'John Smith',
  email: 'john.smith@email.com',
  subject: 'Partnership Inquiry',
  message: 'Hi, I am interested in discussing a potential partnership opportunity...',
  phone: '+1-555-123-4567',
  company: 'TechCorp Solutions',
  preferredContactMethod: 'email'
};

fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(contactData)
});

// Response:
{
  "_id": "64a7b8c9d1e2f3a4b5c6d7e8",
  "name": "John Smith",
  "email": "john.smith@email.com",
  "subject": "Partnership Inquiry",
  "message": "Hi, I am interested in discussing a potential partnership opportunity...",
  "phone": "+1-555-123-4567",
  "company": "TechCorp Solutions",
  "preferredContactMethod": "email",
  "submittedAt": "2024-08-01T10:00:00.000Z",
  "status": "new",
  "isRead": false
}
```

### **2. Get All Contact Submissions (Protected)**
```javascript
// Frontend - Admin dashboard to view all submissions
fetch('/api/contact', {
  headers: { 'Authorization': `Bearer ${token}` }
})
.then(res => res.json())
.then(contacts => {
  console.log(contacts); // Array of all contact submissions
});

// Response: Array of contact submissions sorted by submission date (newest first)
[
  {
    "_id": "64a7b8c9d1e2f3a4b5c6d7e8",
    "name": "John Smith",
    "email": "john.smith@email.com",
    "subject": "Partnership Inquiry",
    "message": "Hi, I am interested in discussing a potential partnership opportunity...",
    "phone": "+1-555-123-4567",
    "company": "TechCorp Solutions",
    "preferredContactMethod": "email",
    "submittedAt": "2024-08-01T10:00:00.000Z",
    "status": "new",
    "isRead": false
  },
  {
    "_id": "64a7b8c9d1e2f3a4b5c6d7e9",
    "name": "Sarah Wilson",
    "email": "sarah@designstudio.com",
    "subject": "Project Consultation",
    "message": "We need help with a mobile app development project...",
    "phone": "+1-555-987-6543",
    "company": "Design Studio Pro",
    "preferredContactMethod": "phone",
    "submittedAt": "2024-08-01T09:30:00.000Z",
    "status": "replied",
    "isRead": true
  }
]
```

### **3. Delete Contact Submission (Protected)**
```javascript
// Frontend - Admin deletes a contact submission
fetch('/api/contact/64a7b8c9d1e2f3a4b5c6d7e8', {
  method: 'DELETE',
  headers: { 'Authorization': `Bearer ${token}` }
});

// Response:
{
  "message": "Contact deleted successfully"
}
```

---

## 📋 **Data Model**

### **Contact Schema**
```javascript
{
  name: String (required),
  email: String (required),
  subject: String (required),
  message: String (required),
  phone: String,
  company: String,
  preferredContactMethod: String (default: 'email'),
  submittedAt: Date (default: now),
  status: String (default: 'new'), // new, replied, closed
  isRead: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔒 **Authentication Requirements**

### **Public Endpoints (No Auth)**
- `POST /api/contact` - Submit contact form

### **Protected Endpoints (Bearer Token)**
- `GET /api/contact` - Get all submissions (admin only)
- `DELETE /api/contact/:id` - Delete submission (admin only)

### **Authentication Header**
```javascript
headers: {
  'Authorization': `Bearer ${token}`
}
```

---

## ✅ **Key Features**

### **🔥 Contact Management**
- **Public form submission**: Easy contact form for website visitors
- **Protected admin access**: Secure admin dashboard for managing submissions
- **Rich contact data**: Name, email, phone, company, and message details
- **Contact preferences**: Email, phone, or either contact method

### **👥 Business Features**
- **Submission tracking**: Track all incoming contact requests
- **Status management**: New, replied, closed status tracking
- **Read/Unread status**: Track which submissions have been reviewed
- **Timeline information**: Submission timestamps for response timing

### **🏗️ Performance**
- **Simple data model**: Fast submission and retrieval
- **Sorted results**: Newest submissions first
- **Efficient queries**: Quick dashboard loading

### **🧹 Clean Operations**
- **No file uploads**: Text-only data for simplicity
- **Validation**: Email and required field validation
- **Error handling**: Graceful error responses

---

## 🎯 **Recommended Usage Flow**

1. **Visitors submit** contact forms on website
2. **Admin reviews** submissions in dashboard
3. **Mark as read** when reviewing submissions
4. **Reply via email/phone** to contact inquiries
5. **Update status** to track response progress
6. **Delete old submissions** for data management

Perfect for business websites, customer inquiries, and lead generation! 📬✨
