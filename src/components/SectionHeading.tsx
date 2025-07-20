import { motion } from 'framer-motion';

interface SectionHeadingProps {
  title: string;
  tagline?: string;
  highlightText?: string;
  className?: string;
  center?: boolean;
}

const SectionHeading = ({ 
  title, 
  tagline, 
  highlightText, 
  className = "", 
  center = true 
}: SectionHeadingProps) => {
  const renderTitle = () => {
    if (!highlightText) {
      return (
        <h2 className={`text-2xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-300 dark:to-purple-300 bg-clip-text text-transparent mb-4 ${className}`}>
          {title}
        </h2>
      );
    }

    // Split the title to highlight specific text
    const parts = title.split(new RegExp(`(${highlightText})`, 'gi'));
    
    return (
      <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 ${className}`}>
        {parts.map((part, index) => 
          part.toLowerCase() === highlightText.toLowerCase() ? (
            <span 
              key={index}
              className="bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-700 bg-clip-text text-transparent"
            >
              {part}
            </span>
          ) : (
            part
          )
        )}
      </h2>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`mb-16 ${center ? 'text-center' : ''}`}
    >
      {renderTitle()}
      {tagline && (
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          {tagline}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeading;
