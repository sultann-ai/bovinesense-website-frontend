import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import AdminDashboardLayout from '../components/admin/AdminDashboardLayout';

const AdminDashboard = () => {
  return (
    <>
      <Helmet>
        <title>Admin Dashboard - ZyninLabs</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-gray-100 dark:bg-gray-900"
      >
        <AdminDashboardLayout />
      </motion.div>
    </>
  );
};

export default AdminDashboard;
