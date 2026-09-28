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
    // Flat cream. The old decorative blobs were positioned relative to the whole
    // document height, so they moved (layout shift) whenever page content loaded.
    <section className={`bg-cream relative overflow-hidden ${className}`}>
      {children}
    </section>
  );
};

export default CustomBgWrapper;
