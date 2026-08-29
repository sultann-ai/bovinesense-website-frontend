import React, { ReactNode } from 'react';

interface CTAWrapperProps {
  children: ReactNode;
  className?: string;
  variant?: 'home' | 'about';
}

const CTAWrapper: React.FC<CTAWrapperProps> = ({ 
  children, 
  className = "", 
  variant = 'home' 
}) => {
  const getBackgroundClasses = () => {
    if (variant === 'about') {
      return "bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-[#06101f] dark:via-[#0a1b33] dark:to-[#102746]";
    }
    return ""; // For home variant, we use the existing complex background layers
  };

  return (
    <section className={`relative py-14 overflow-hidden ${getBackgroundClasses()} ${className}`}>
      {variant === 'home' ? (
        <>
          {/* Multi-layer gradient background for home */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-primary-50 to-secondary-50 dark:from-[#06101f] dark:via-[#0a1b33] dark:to-[#102746]"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-primary-100/50 via-transparent to-secondary-100/50 dark:from-[#17345a]/60 dark:via-transparent dark:to-[#0d2b4f]/50"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-200/30 via-transparent to-transparent dark:from-blue-600/20 dark:via-transparent dark:to-transparent"></div>
          
          {/* Animated background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary-300/20 to-secondary-300/20 dark:from-cyan-500/10 dark:to-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-secondary-300/20 to-primary-300/20 dark:from-[#17345a]/30 dark:to-[#0d2b4f]/20 rounded-full blur-3xl animate-bounce-slow" style={{ animationDelay: '1s' }}></div>
          </div>
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        </>
      ) : (
        <>
          {/* About page background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5 dark:from-blue-600/20 dark:via-purple-600/20 dark:to-pink-600/20"></div>
            {/* Glowing orbs for about page */}
            <div 
              className="absolute top-0 -left-32 rounded-full blur-3xl opacity-20 dark:opacity-30 animate-pulse"
              style={{
                width: 500,
                height: 500,
                background: "linear-gradient(45deg, rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.3))"
              }} 
            />
            <div 
              className="absolute bottom-0 -right-32 rounded-full blur-3xl opacity-20 dark:opacity-30 animate-pulse"
              style={{
                width: 400,
                height: 400,
                background: "linear-gradient(45deg, rgba(245, 158, 11, 0.3), rgba(239, 68, 68, 0.3))"
              }} 
            />
          </div>
        </>
      )}
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {children}
      </div>
    </section>
  );
};

export default CTAWrapper;
