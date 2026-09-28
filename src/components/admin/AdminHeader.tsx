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
    <header className="bg-charcoal text-cream border-b border-hairline-dark sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left section */}
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-pill text-cream hover:bg-charcoal-soft"
          >
            <FaBars size={20} />
          </button>
          <h1 className="ml-2 lg:ml-0 text-xl font-bold text-cream">
            Admin Dashboard
          </h1>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-4">
          {/* Admin Info */}
          <div className="hidden md:flex items-center space-x-2 text-sm text-cream">
            <FaUser className="text-cream" />
            <span>{admin?.username || 'Admin'}</span>
            <span className="text-cream" aria-hidden="true">•</span>
            <span className="capitalize">{admin?.role || 'admin'}</span>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-3 py-2 text-sm font-semibold text-cream hover:bg-charcoal-soft rounded-pill transition-colors"
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
