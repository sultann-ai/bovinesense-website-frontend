import React, { useState } from 'react';
import { FaUsers, FaServicestack, FaProjectDiagram, FaNewspaper, FaEnvelope, FaHandshake } from 'react-icons/fa';
import { useAdmin } from '../../contexts/AdminContext';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import AdminFounders from './founders/AdminFounders';
import AdminTeam from './AdminTeam';
import AdminServices from './AdminServices';
import AdminProjects from './AdminProjects';
import AdminProducts from './AdminProducts';
import AdminBlog from './AdminBlog';
import AdminContacts from './AdminContacts';
import AdminPartners from './AdminPartners';

export interface TabItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  component: React.ComponentType;
}

const AdminDashboardLayout = () => {
  const [activeTab, setActiveTab] = useState('founders');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { admin } = useAdmin();

  const tabs: TabItem[] = [
    { id: 'founders', label: 'Founders', icon: FaUsers, component: AdminFounders },
    { id: 'team', label: 'Team', icon: FaUsers, component: AdminTeam },
    { id: 'services', label: 'Services', icon: FaServicestack, component: AdminServices },
    { id: 'projects', label: 'Projects', icon: FaProjectDiagram, component: AdminProjects },
    { id: 'products', label: 'Products', icon: FaProjectDiagram, component: AdminProducts },
    { id: 'blog', label: 'Blog', icon: FaNewspaper, component: AdminBlog },
    { id: 'contacts', label: 'Contacts', icon: FaEnvelope, component: AdminContacts },
    { id: 'partners', label: 'Partners', icon: FaHandshake, component: AdminPartners }
  ];

  const renderContent = () => {
    const activeTabData = tabs.find(tab => tab.id === activeTab);
    if (!activeTabData) return null;
    
    const Component = activeTabData.component;
    return <Component />;
  };

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
          onTabChange={setActiveTab}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content */}
        <div className="flex-1">
          <div className="p-4 lg:p-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
              <div className="p-6">
                {renderContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
