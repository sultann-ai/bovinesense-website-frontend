import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { TeamMember } from '../../../types';
import { Button } from '../../reusables';
import LoadingSpinner from '../../common/LoadingSpinner';
import TeamCard from './TeamCardAdmin';
import TeamModal from './TeamModalAdmin';
import { useTeams } from '../../../../hooks/admin/useTeamsAdmin';

const AdminTeam = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeamMember, setEditingTeamMember] = useState<TeamMember | null>(null);

  const { teams, loading, deletingId, fetchTeams, deleteTeamMember } = useTeams();

  const handleEdit = (teamMember: TeamMember) => {
    setEditingTeamMember(teamMember);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTeamMember(null);
  };

  const handleAddNew = () => {
    setEditingTeamMember(null);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <LoadingSpinner size="lg" className="mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-300">Loading team members...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Team Members ({teams.length})
        </h2>
        <Button
          onClick={handleAddNew}
          className="flex items-center"
        >
          <FaPlus className="mr-2" /> Add Team Member
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((teamMember) => (
          <TeamCard
            key={teamMember._id}
            teamMember={teamMember}
            onEdit={handleEdit}
            onDelete={deleteTeamMember}
            isDeleting={deletingId === teamMember._id}
          />
        ))}
      </div>

      <TeamModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editingTeamMember={editingTeamMember}
        onSuccess={fetchTeams}
      />
    </div>
  );
};

export default AdminTeam;
