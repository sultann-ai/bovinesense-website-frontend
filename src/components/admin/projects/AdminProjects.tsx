import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Project } from '../../../types';
import { Button } from '../../reusables';
import LoadingSpinner from '../../common/LoadingSpinner';
import ProjectCard from './ProjectCardAdmin';
import ProjectModal from './ProjectModalAdmin';
import { useProjects } from '../../../../hooks/admin/useProjectsAdmin';

const AdminProjects = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const { projects, loading, deletingId, fetchProjects, deleteProject } = useProjects();

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  const handleAddNew = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <LoadingSpinner size="lg" className="mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-300">Loading projects...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Projects ({projects.length})
        </h2>
        <Button
          onClick={handleAddNew}
          className="flex items-center"
        >
          <FaPlus className="mr-2" /> Add Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project._id}
            project={project}
            onEdit={handleEdit}
            onDelete={deleteProject}
            isDeleting={deletingId === project._id}
          />
        ))}
      </div>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editingProject={editingProject}
        onSuccess={fetchProjects}
      />
    </div>
  );
};

export default AdminProjects;
