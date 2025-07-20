import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

// FloatingCard component (reused from About page)
interface FloatingCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const FloatingCard: React.FC<FloatingCardProps> = ({ children, className = "", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, rotateX: 20 }}
    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
    whileHover={{ 
      y: -10, 
      rotateX: 5,
      rotateY: 5,
      transition: { duration: 0.3 }
    }}
    transition={{ 
      duration: 0.8, 
      delay,
      type: "spring",
      stiffness: 100,
      damping: 20
    }}
    className={`bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-3xl shadow-2xl shadow-black/20 dark:shadow-black/40 hover:shadow-3xl hover:shadow-black/30 dark:hover:shadow-black/60 transform-gpu ${className}`}
  >
    {children}
  </motion.div>
);

const OurJourney = () => {
  const milestones = [
    {
      year: "2020",
      title: "The Genesis",
      description: "Founded with a vision to revolutionize AI-powered solutions and transform how businesses approach technology.",
      side: "left"
    },
    {
      year: "2021",
      title: "First Breakthrough",
      description: "Delivered our first major AI solution, establishing our reputation for innovation and excellence in the industry.",
      side: "right"
    },
    {
      year: "2022",
      title: "Rapid Expansion",
      description: "Grew our team to 50+ experts and expanded our service offerings to include comprehensive digital transformation solutions.",
      side: "left"
    },
    {
      year: "2023",
      title: "Global Recognition",
      description: "Achieved industry recognition and expanded our client base internationally, serving Fortune 500 companies.",
      side: "right"
    },
    {
      year: "2024",
      title: "Innovation Leadership",
      description: "Launched cutting-edge AI platforms and established ourselves as thought leaders in emerging technologies.",
      side: "left"
    }
  ];

  return (
    <section className="py-32 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-2 h-full bg-gradient-to-b from-blue-500/20 to-purple-500/20 blur-sm"></div>
        <div className="absolute top-0 right-1/4 w-2 h-full bg-gradient-to-b from-purple-500/20 to-pink-500/20 blur-sm"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-8">
            <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Our Journey
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            From vision to reality - the milestones that shaped ZyninLabs
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>

          <div className="space-y-16">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: milestone.side === "left" ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`flex items-center ${milestone.side === "left" ? "justify-start" : "justify-end"}`}
              >
                <div className={`w-5/12 ${milestone.side === "left" ? "pr-8 text-right" : "pl-8 text-left"}`}>
                  <FloatingCard className="p-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-white/20 dark:border-gray-700/30">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">{milestone.year}</div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{milestone.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{milestone.description}</p>
                  </FloatingCard>
                </div>
                
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-white dark:border-gray-900 shadow-2xl z-10"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurJourney;
