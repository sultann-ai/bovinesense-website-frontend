import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ValueCardProps {
    title: string;
    description: string;
    icon: ReactNode;
    gradient: string;
    bgGradient: string;
    index?: number;
}

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

const ValueCard: React.FC<ValueCardProps> = ({
    title,
    description,
    icon = <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>,
    gradient = 'from-blue-500 to-cyan-500',
    bgGradient = 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
    index = 0
}) => {
    return (
        <FloatingCard
            className={`p-8 h-full bg-gradient-to-br ${bgGradient} border-0 group cursor-pointer`}
            delay={index * 0.1}
        >
            <div className="text-center h-full flex flex-col">
                <motion.div
                    className={`w-16 h-16 bg-gradient-to-r ${gradient} rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                >
                    {icon}
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                    {title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed flex-grow">
                    {description}
                </p>
            </div>
        </FloatingCard>
    );
};

export default ValueCard;
