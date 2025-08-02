import LoadingSpinner from '../../common/LoadingSpinner';
import ContactCard from './ContactCardAdmin';
import { useContacts } from '../../../../hooks/admin/useContactsAdmin';

const AdminContacts = () => {
  const { contacts, loading, deletingId, deleteContact } = useContacts();

  if (loading) {
    return (
      <div className="text-center py-8">
        <LoadingSpinner size="lg" className="mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-300">Loading contact submissions...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Contact Submissions ({contacts.length})
        </h2>
      </div>

      {contacts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            No contact submissions yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contacts.map((contact) => (
            <ContactCard
              key={contact._id}
              contact={contact}
              onDelete={deleteContact}
              isDeleting={deletingId === contact._id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminContacts;
