import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { adminService } from '../services/adminService';

interface Admin {
  id: string;
  username: string;
  email: string;
  role: string;
  lastLogin?: Date;
}

interface AdminContextType {
  admin: Admin | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const adminData = await adminService.getProfile();
      setAdmin(adminData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('admin_token');
      setAdmin(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    console.log('AdminContext: Starting login...');
    setIsLoading(true);
    try {
      const response = await adminService.login(username, password);
      console.log('AdminContext: Login response:', response);
      localStorage.setItem('admin_token', response.token);
      setAdmin(response.admin);
      setIsAuthenticated(true);
      console.log('AdminContext: Login successful, auth state updated');
    } catch (error) {
      console.error('AdminContext: Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    setAdmin(null);
    setIsAuthenticated(false);
    adminService.logout();
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value: AdminContextType = {
    admin,
    isAuthenticated,
    isLoading,
    login,
    logout,
    checkAuth,
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};
