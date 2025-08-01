import React from 'react';
import { FaBars, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useAdmin } from '../../contexts/AdminContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface AdminHeaderProps {
  admin: any;
  onMenuClick: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ admin, onMenuClick }) => {
  const { logout } = useAdmin();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/admin-login');
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left section */}
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FaBars size={20} />
          </button>
          <h1 className="ml-2 lg:ml-0 text-xl font-bold text-gray-900 dark:text-white">
            Admin Dashboard
          </h1>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-4">
          {/* Admin Info */}
          <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
            <FaUser className="text-gray-400" />
            <span>{admin?.username || 'Admin'}</span>
            <span className="text-gray-400">•</span>
            <span className="capitalize">{admin?.role || 'admin'}</span>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <FaSignOutAlt size={16} />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
