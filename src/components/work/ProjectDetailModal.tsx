import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaExternalLinkAlt, FaGithub, FaCheckCircle, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Project } from '../../types';
import CustomButton from '../reusables/CustomButton';

interface ProjectDetailModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
    project,
    isOpen,
    onClose
}) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

    // Handle escape key press
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                if (selectedImageIndex !== null) {
                    setSelectedImageIndex(null);
                } else {
                    onClose();
                }
            }
            if (event.key === 'ArrowLeft' && selectedImageIndex !== null && project?.screenshots) {
                setSelectedImageIndex(prev => prev! > 0 ? prev! - 1 : project.screenshots!.length - 1);
            }
            if (event.key === 'ArrowRight' && selectedImageIndex !== null && project?.screenshots) {
                setSelectedImageIndex(prev => prev! < project.screenshots!.length - 1 ? prev! + 1 : 0);
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        };
    }, [isOpen, onClose]);

    if (!project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="relative w-full max-w-6xl max-h-[95vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden z-[10000]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-[10001] p-2 bg-white/20 hover:bg-white/30 dark:bg-gray-800/70 dark:hover:bg-gray-700/70 rounded-full transition-all duration-200 backdrop-blur-sm"
                        >
                            <FaTimes className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                        </button>

                        {/* Scrollable Content - Everything is scrollable now */}
                        <div
                            className="h-[95vh] overflow-y-auto overscroll-contain"
                            onWheel={(e) => e.stopPropagation()}
                            onTouchMove={(e) => e.stopPropagation()}
                        >
                            {/* Hero Section - Now scrollable */}
                            <div className="relative h-64 md:h-72 flex-shrink-0">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                                {/* Hero Content - Only title */}
                                <div className="absolute bottom-6 left-6 right-6 text-white">
                                    <motion.h1
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-3xl md:text-4xl font-bold"
                                    >
                                        {project.title}
                                    </motion.h1>
                                </div>
                            </div>

                            {/* Project Description Section */}
                            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
                                >
                                    {project.description}
                                </motion.p>
                            </div>

                            {/* Content Section */}
                            <div className="p-6 md:p-8">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    {/* Main Content - Left Side */}
                                    <div className="lg:col-span-2 space-y-8">
                                        {/* Key Features */}
                                        {project.features && project.features.length > 0 && (
                                            <section>
                                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                                    Key Features
                                                </h2>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    {project.features.map((feature, index) => (
                                                        <motion.div
                                                            key={index}
                                                            initial={{ opacity: 0, x: -20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: 0.1 * index }}
                                                            className="flex items-center space-x-3"
                                                        >
                                                            <FaCheckCircle className="text-green-500 flex-shrink-0" />
                                                            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </section>
                                        )}

                                        {/* Screenshots Gallery */}
                                        {project.screenshots && project.screenshots.length > 0 && (
                                            <section>
                                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                                    Project Gallery
                                                </h2>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    {project.screenshots.map((screenshot, index) => (
                                                        <motion.div
                                                            key={index}
                                                            initial={{ opacity: 0, scale: 0.95 }}
                                                            whileInView={{ opacity: 1, scale: 1 }}
                                                            transition={{ delay: 0.1 * index, duration: 0.4 }}
                                                            className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-gray-100 dark:bg-gray-800 cursor-pointer"
                                                            onClick={() => setSelectedImageIndex(index)}
                                                        >
                                                            <div className="aspect-video w-full">
                                                                <img
                                                                    src={screenshot}
                                                                    alt={`${project.title} screenshot ${index + 1}`}
                                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                                    onError={(e) => {
                                                                        const target = e.target as HTMLImageElement;
                                                                        target.style.display = 'none';
                                                                        const parent = target.parentElement;
                                                                        if (parent) {
                                                                            parent.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500"><span>Image not available</span></div>';
                                                                        }
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                            <div className="absolute bottom-3 left-3 text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                                Screenshot {index + 1}
                                                            </div>
                                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                                <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                                                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </section>
                                        )}
                                    </div>

                                    {/* Sidebar - Right Side */}
                                    <div className="space-y-6">
                                        {/* Project Info Card */}
                                        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                                Project Information
                                            </h3>

                                            {/* Category */}
                                            {project.category && (
                                                <div className="mb-4">
                                                    <span className="text-sm text-gray-500 dark:text-gray-400">Category</span>
                                                    <p className="text-gray-700 dark:text-gray-300">{project.category}</p>
                                                </div>
                                            )}

                                            {/* Action Buttons */}
                                            <div className="space-y-3">
                                                {project.liveDemoLink && (
                                                    <div className="w-full">
                                                        <CustomButton
                                                            text="Live Demo"
                                                            leftIcon={<FaExternalLinkAlt className="w-4 h-4" />}
                                                            href={project.liveDemoLink}
                                                            className="w-full text-base justify-center"
                                                        />
                                                    </div>
                                                )}

                                                {project.githubLink && (
                                                    <div className="w-full">
                                                        <CustomButton
                                                            text="View Code"
                                                            leftIcon={<FaGithub className="w-4 h-4" />}
                                                            href={project.githubLink}
                                                            outlined={true}
                                                            className="w-full text-base !bg-gray-800 hover:!bg-gray-900 !text-white !border-gray-800 hover:!border-gray-900 justify-center"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Technologies Used */}
                                        {project.technologies && project.technologies.length > 0 && (
                                            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                                    Technologies
                                                </h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {project.technologies.map((tech, index) => (
                                                        <span
                                                            key={index}
                                                            className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm rounded-full"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Tags */}
                                        {/* {project.tags && project.tags.length > 0 && (
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                          Tags
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-gradient-to-r from-primary-100 to-blue-100 dark:from-primary-900/30 dark:to-blue-900/30 text-primary-700 dark:text-primary-300 text-sm rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )} */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Image Viewer Modal */}
            {selectedImageIndex !== null && project?.screenshots && (
                <div className="fixed inset-0 z-[10002] flex items-center justify-center bg-black/95 backdrop-blur-sm">
                    <button
                        onClick={() => setSelectedImageIndex(null)}
                        className="absolute top-4 right-4 z-[10003] p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-200"
                    >
                        <FaTimes className="w-6 h-6 text-white" />
                    </button>

                    <div className="relative w-full h-full flex items-center justify-center p-4">
                        <img
                            src={project.screenshots[selectedImageIndex]}
                            alt={`${project.title} screenshot ${selectedImageIndex + 1}`}
                            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />

                        {/* Navigation arrows */}
                        {project.screenshots.length > 1 && (
                            <>
                                <button
                                    onClick={() => setSelectedImageIndex(prev => prev! > 0 ? prev! - 1 : project.screenshots!.length - 1)}
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-200"
                                >
                                    <FaChevronLeft className="w-6 h-6 text-white" />
                                </button>
                                <button
                                    onClick={() => setSelectedImageIndex(prev => prev! < project.screenshots!.length - 1 ? prev! + 1 : 0)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-200"
                                >
                                    <FaChevronRight className="w-6 h-6 text-white" />
                                </button>
                            </>
                        )}

                        {/* Image counter */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-black/50 text-white rounded-full text-sm">
                            {selectedImageIndex + 1} / {project.screenshots.length}
                        </div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ProjectDetailModal;
