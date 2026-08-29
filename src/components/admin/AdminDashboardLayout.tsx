import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { FaUsers, FaServicestack, FaProjectDiagram, FaNewspaper, FaEnvelope, FaHandshake, FaAward } from 'react-icons/fa';
import { useAdmin } from '../../contexts/AdminContext';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';

export interface TabItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  path: string;
}

const AdminDashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { admin } = useAdmin();
  const location = useLocation();

  const tabs: TabItem[] = [
    { id: 'founders', label: 'Founders', icon: FaUsers, path: '/admin/founders' },
    { id: 'team', label: 'Team', icon: FaUsers, path: '/admin/team' },
    { id: 'services', label: 'Services', icon: FaServicestack, path: '/admin/services' },
    { id: 'projects', label: 'Projects', icon: FaProjectDiagram, path: '/admin/projects' },
    { id: 'products', label: 'Products', icon: FaProjectDiagram, path: '/admin/products' },
    { id: 'blog', label: 'Blog', icon: FaNewspaper, path: '/admin/blog' },
    { id: 'contacts', label: 'Contacts', icon: FaEnvelope, path: '/admin/contacts' },
    { id: 'partners', label: 'Partners', icon: FaHandshake, path: '/admin/partners' },
    { id: 'recognitions', label: 'Recognitions', icon: FaAward, path: '/admin/recognitions' }
  ];

  // Get active tab from current location
  const activeTab = tabs.find(tab => location.pathname === tab.path)?.id || 'founders';

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <AdminHeader 
        admin={admin}
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex">
        {/* Sidebar */}
        <AdminSidebar
          tabs={tabs}
          activeTab={activeTab}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content */}
        <div className="flex-1">
          <div className="p-4 lg:p-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
              <div className="p-6">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
