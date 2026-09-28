import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { TabItem } from './AdminDashboardLayout';

interface AdminSidebarProps {
  tabs: TabItem[];
  activeTab: string;
  isOpen: boolean;
  onClose: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  tabs,
  activeTab,
  isOpen,
  onClose
}) => {
  const navigate = useNavigate();
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 w-64 h-full bg-charcoal text-cream border-r border-hairline-dark transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:z-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-hairline-dark lg:hidden">
          <h2 className="text-lg font-semibold text-cream">
            Admin Menu
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-pill text-cream hover:bg-charcoal-soft"
          >
            <FaTimes size={16} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-4 lg:mt-20 px-4">
          <ul className="space-y-1">
            {tabs.map((tab) => (
              <li key={tab.id}>
                <button
                  onClick={() => {
                    navigate(tab.path);
                    onClose(); // Close sidebar on mobile after selection
                  }}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-pill transition-colors ${
                    activeTab === tab.id
                      ? 'bg-terracotta text-white'
                      : 'text-cream hover:bg-charcoal-soft'
                  }`}
                >
                  <tab.icon 
                    className={`mr-3 ${
                      activeTab === tab.id ? 'text-white' : 'text-cream'
                    }`} 
                    size={18} 
                  />
                  <span className="font-medium">{tab.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;
