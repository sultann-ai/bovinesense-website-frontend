import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { teamService } from '../../src/services/teamService';
import { TeamMember } from '../../src/types';

export const useTeams = () => {
  const [teams, setTeams] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      setLoading(true);
      const data = await teamService.getAll();
      setTeams(data);
    } catch (error) {
      console.error('Error fetching team members:', error);
      toast.error('Error loading team members. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  const deleteTeamMember = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      try {
        setDeletingId(id);
        await teamService.delete(id);
        toast.success('Team member deleted successfully!');
        await fetchTeams();
      } catch (error) {
        console.error('Error deleting team member:', error);
        toast.error('Error deleting team member. Please try again.');
      } finally {
        setDeletingId(null);
      }
    }
  };

  return {
    teams,
    loading,
    deletingId,
    fetchTeams,
    deleteTeamMember
  };
};
