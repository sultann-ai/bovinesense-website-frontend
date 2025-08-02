# Admin API Documentation

## 🎯 **RESTful API Design**

### **Admin Authentication & Management**
```javascript
POST   /api/admin/login              // Admin login (public)
GET    /api/admin/profile            // Get admin profile (protected)
POST   /api/admin/logout             // Admin logout (protected)
PUT    /api/admin/change-password    // Change admin password (protected)
```

> **Note**: All protected endpoints require a valid JWT Bearer token obtained from the login endpoint.

---

## 🚀 **Usage Examples**

### **1. Admin Login (Public)**
```javascript
// Frontend - Admin login form
const loginData = {
  username: 'admin@company.com',  // Can be username or email
  password: 'securePassword123'
};

fetch('/api/admin/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(loginData)
});

// Success Response:
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": {
    "id": "64a7b8c9d1e2f3a4b5c6d7e8",
    "username": "admin",
    "email": "admin@company.com",
    "role": "super_admin",
    "lastLogin": "2024-08-01T10:00:00.000Z"
  }
}

// Error Response:
{
  "success": false,
  "message": "Invalid credentials"
}
```

### **2. Get Admin Profile (Protected)**
```javascript
// Frontend - Get current admin user info
fetch('/api/admin/profile', {
  headers: { 'Authorization': `Bearer ${token}` }
})
.then(res => res.json())
.then(data => {
  console.log(data.admin); // Current admin profile
});

// Response:
{
  "success": true,
  "admin": {
    "_id": "64a7b8c9d1e2f3a4b5c6d7e8",
    "username": "admin",
    "email": "admin@company.com",
    "role": "super_admin",
    "isActive": true,
    "lastLogin": "2024-08-01T10:00:00.000Z",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-08-01T10:00:00.000Z"
  }
}
```

### **3. Change Password (Protected)**
```javascript
// Frontend - Admin password change
const passwordData = {
  currentPassword: 'oldPassword123',
  newPassword: 'newSecurePassword456'
};

fetch('/api/admin/change-password', {
  method: 'PUT',
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}` 
  },
  body: JSON.stringify(passwordData)
});

// Success Response:
{
  "success": true,
  "message": "Password changed successfully"
}

// Error Response:
{
  "success": false,
  "message": "Current password is incorrect"
}
```

### **4. Admin Logout (Protected)**
```javascript
// Frontend - Admin logout
fetch('/api/admin/logout', {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${token}` }
});

// Response:
{
  "success": true,
  "message": "Logged out successfully"
}

// Note: Client should also clear the token from local storage
```

---

## 📋 **Data Model**

### **Admin Schema**
```javascript
{
  username: String (required, unique),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (default: 'admin'),
  isActive: Boolean (default: true),
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔒 **Authentication & Security**

### **JWT Token Structure**
```javascript
// Token payload
{
  "adminId": "64a7b8c9d1e2f3a4b5c6d7e8",
  "iat": 1691000000,
  "exp": 1691086400  // 24 hours from issue time
}
```

### **Password Requirements**
- Minimum 6 characters
- Hashed using bcrypt before storage
- Current password required for changes

### **Security Features**
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt for secure password storage
- **Token Expiration**: 24-hour token lifetime (configurable)
- **Input Validation**: Comprehensive request validation
- **CORS Protection**: Proper CORS configuration

---

## ✅ **Key Features**

### **🔥 Authentication System**
- **Secure login**: Username/email + password authentication
- **JWT tokens**: Stateless authentication with configurable expiration
- **Password management**: Secure password change functionality
- **Session tracking**: Last login timestamp tracking

### **👥 Admin Management**
- **Role-based access**: Support for different admin roles
- **Account status**: Active/inactive admin accounts
- **Profile management**: View admin profile information
- **Secure logout**: Token invalidation on logout

### **🏗️ Security**
- **Password hashing**: Bcrypt for secure password storage
- **Token validation**: JWT signature verification
- **Input sanitization**: Comprehensive request validation
- **Error handling**: Secure error messages without data leaks

### **🧹 Clean Implementation**
- **RESTful design**: Clean API endpoints
- **Consistent responses**: Standardized response format
- **Error handling**: Graceful error responses
- **Token management**: Automatic token handling

---

## 🎯 **Recommended Usage Flow**

1. **Admin logs in** with username/email and password
2. **Receive JWT token** for subsequent API calls
3. **Include token** in Authorization header for protected routes
4. **Check token validity** on page load/refresh
5. **Change password** when needed using current password
6. **Logout** to invalidate session
7. **Handle token expiration** gracefully with re-authentication

Perfect for admin dashboards, content management systems, and secure administrative access! 🔐✨
