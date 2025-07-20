import React, { ReactNode } from 'react';

interface CustomBgWrapperProps {
  children: ReactNode;
  className?: string;
}

const CustomBgWrapper: React.FC<CustomBgWrapperProps> = ({ 
  children, 
  className = "" 
}) => {
  return (
    <section className={`bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-cyan-900 relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-200/30 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-purple-200/30 dark:bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-100/20 to-purple-100/20 dark:from-blue-900/10 dark:to-purple-900/10 rounded-full blur-3xl"></div>
      </div>
      
      {children}
    </section>
  );
};

export default CustomBgWrapper;
