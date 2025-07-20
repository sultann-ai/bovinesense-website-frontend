import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaServicestack, FaProjectDiagram, FaNewspaper, FaEnvelope, FaHandshake } from 'react-icons/fa';
import AdminFounders from './AdminFounders';
import AdminTeam from './AdminTeam';
import AdminServices from './AdminServices';
import AdminProjects from './AdminProjects';
import AdminProducts from './AdminProducts';
import AdminBlog from './AdminBlog';
import AdminContacts from './AdminContacts';
import AdminPartners from './AdminPartners';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('founders');

  const tabs = [
    { id: 'founders', label: 'Founders', icon: FaUsers },
    { id: 'team', label: 'Team', icon: FaUsers },
    { id: 'services', label: 'Services', icon: FaServicestack },
    { id: 'projects', label: 'Projects', icon: FaProjectDiagram },
    { id: 'products', label: 'Products', icon: FaProjectDiagram },
    { id: 'blog', label: 'Blog', icon: FaNewspaper },
    { id: 'contacts', label: 'Contacts', icon: FaEnvelope },
    { id: 'partners', label: 'Partners', icon: FaHandshake }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'founders':
        return <AdminFounders />;
      case 'team':
        return <AdminTeam />;
      case 'services':
        return <AdminServices />;
      case 'projects':
        return <AdminProjects />;
      case 'products':
        return <AdminProducts />;
      case 'blog':
        return <AdminBlog />;
      case 'contacts':
        return <AdminContacts />;
      case 'partners':
        return <AdminPartners />;
      default:
        return <AdminFounders />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Admin Dashboard
          </h1>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            {/* Tab Navigation */}
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8 px-6" aria-label="Tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <tab.icon className="mr-2" size={16} />
                      {tab.label}
                    </div>
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {renderContent()}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;