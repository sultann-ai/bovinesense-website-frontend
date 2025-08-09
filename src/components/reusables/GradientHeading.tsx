import React from 'react';

interface GradientHeadingProps {
  children: React.ReactNode;
  highlightText: string;
  className?: string;
}

const GradientHeading: React.FC<GradientHeadingProps> = ({ 
  children, 
  highlightText, 
  className = "" 
}) => {
  // Convert children to string to work with text replacement
  const childrenString = React.Children.toArray(children).join(' ');
  
  // Split the text around the highlight word
  const parts = childrenString.split(new RegExp(`(${highlightText})`, 'gi'));
  
  return (
    <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight ${className}`}>
      {parts.map((part, index) => {
        if (part.toLowerCase() === highlightText.toLowerCase()) {
          return (
            <span 
              key={index} 
              className="bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-700 bg-clip-text text-transparent"
            >
              {part}
            </span>
          );
        }
        return part;
      })}
    </h1>
  );
};

export default GradientHeading;
