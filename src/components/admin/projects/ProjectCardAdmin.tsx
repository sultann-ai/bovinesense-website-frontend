import { motion } from 'framer-motion';
import { FaEdit, FaTrash, FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { Project } from '../../../types';

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

const ProjectCard = ({ project, onEdit, onDelete, isDeleting }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-cream-deep rounded-card overflow-hidden relative ${
        isDeleting ? 'opacity-50 pointer-events-none' : ''
      }`}
    >
      {isDeleting && (
        <div className="absolute inset-0 flex items-center justify-center bg-cream bg-opacity-75 rounded-card z-10">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-danger"></div>
        </div>
      )}
      
      {/* Project Image */}
      <div className="w-full h-48 bg-cream-deep ">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-charcoal mb-2">
          {project.title}
        </h3>
        
        <p className="text-ink text-sm mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Technologies */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {project.technologies.slice(0, 3).map((tech, index) => (
                <span
                  key={index}
                  className="inline-block border border-hairline text-ink text-xs px-2 py-1 rounded"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="text-xs text-ink ">
                  +{project.technologies.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {project.tags.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  className="inline-block border border-hairline text-ink text-xs px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 2 && (
                <span className="text-xs text-ink ">
                  +{project.tags.length - 2} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Links */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-2">
            {project.liveDemoLink && (
              <a
                href={project.liveDemoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-charcoal hover:text-terracotta p-1 transition-colors"
                title="Live Demo"
              >
                <FaExternalLinkAlt size={14} />
              </a>
            )}
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink hover:text-charcoal p-1 transition-colors"
                title="GitHub"
              >
                <FaGithub size={14} />
              </a>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-2">
          <button
            onClick={() => onEdit(project)}
            className="text-charcoal hover:text-terracotta p-2 transition-colors"
            title="Edit project"
            disabled={isDeleting}
          >
            <FaEdit />
          </button>
          <button
            onClick={() => onDelete(project._id)}
            className="text-danger hover:text-danger p-2 transition-colors"
            title="Delete project"
            disabled={isDeleting}
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
