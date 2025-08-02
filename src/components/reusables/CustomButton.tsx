import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ReactNode } from 'react';

interface CustomButtonProps {
  text: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  href?: string;
  onClick?: () => void;
  outlined?: boolean;
  className?: string;
}

const CustomButton = ({
  text,
  leftIcon,
  rightIcon,
  href,
  onClick,
  outlined = false,
  className = ''
}: CustomButtonProps) => {
  const baseClasses = `group relative inline-flex items-center px-10 py-4 font-bold rounded-xl overflow-hidden transition-all duration-300 text-lg ${className}`;
   
  const gradientClasses = outlined
    ? "bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white font-semibold hover:bg-white dark:hover:bg-gray-700"
    : "bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-glow hover:shadow-glow-lg";

  const buttonContent = (
    <>
      {!outlined && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-secondary-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      )}
      <span className="relative z-10 flex items-center">
        {leftIcon && (
          <span className="mr-2 group-hover:scale-110 transition-transform">
            {leftIcon}
          </span>
        )}
        {text}
        {rightIcon && (
          <span className="ml-2 group-hover:translate-x-1 transition-transform">
            {rightIcon}
          </span>
        )}
      </span>
    </>
  );

  const motionProps = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 }
  };

  if (href) {
    // Check if href is an external link
    const isExternal = href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//');
    
    if (isExternal) {
      return (
        <motion.a
          {...motionProps}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${baseClasses} ${gradientClasses}`}
        >
          {buttonContent}
        </motion.a>
      );
    }
    
    return (
      <motion.div {...motionProps}>
        <Link to={href} className={`${baseClasses} ${gradientClasses}`}>
          {buttonContent}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      {...motionProps}
      onClick={onClick}
      className={`${baseClasses} ${gradientClasses}`}
    >
      {buttonContent}
    </motion.button>
  );
};

export default CustomButton;
