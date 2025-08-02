import React from 'react';

interface HeroBgWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const HeroBgWrapper: React.FC<HeroBgWrapperProps> = ({ children, className = "" }) => {
  return (
    <section className={`relative min-h-[65vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-primary-50 to-secondary-50 dark:from-gray-950 dark:via-slate-900 dark:to-gray-900 ${className}`}>
      {/* Enhanced animated background elements */}
     <div className="absolute inset-0 bg-mesh-gradient opacity-30 dark:opacity-20"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 dark:bg-slate-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Animated blobs */}
       <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 dark:from-slate-600/15 dark:to-gray-600/15 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 dark:from-slate-700/10 dark:to-gray-700/10 rounded-full blur-3xl animate-bounce-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 dark:from-slate-500/8 dark:to-gray-500/8 rounded-full blur-2xl animate-rotate-slow"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      {/* Content */}
      <div className="relative z-10 w-full">
        {children}
      </div>

      {/* Bottom gradient fade */}
       <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 dark:from-cyan-900 to-transparent"></div>
 
    </section>
  );
};

export default HeroBgWrapper;
