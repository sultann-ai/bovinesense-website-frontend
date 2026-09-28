import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';
import toast from 'react-hot-toast';
import { GlassCard, Button } from '../components/ui';
import { AUTH_NOTICE_KEY } from '../services/apiClient';
import { WORDMARK_ON_DARK } from '../components/layout/navItems';

// Glass input recipe (same as the public contact form).
const inputClass =
  'w-full rounded-[14px] border border-[rgba(246,241,233,0.15)] bg-[rgba(246,241,233,0.07)] px-4 py-3 text-body text-cream placeholder:text-[rgba(246,241,233,0.45)] focus:border-terracotta';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  // Set by the API client when a request fails with an expired/invalid token.
  const [notice] = useState(() => sessionStorage.getItem(AUTH_NOTICE_KEY));
  const { login, isAuthenticated, isLoading: authLoading } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('AdminLogin: isAuthenticated:', isAuthenticated, 'authLoading:', authLoading);
    if (isAuthenticated && !authLoading) {
      console.log('AdminLogin: Navigating to admin');
      navigate('/admin', { replace: true });
    }
  }, [isAuthenticated, authLoading, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLoading || authLoading || isAuthenticated) return; // Prevent multiple submissions

    sessionStorage.removeItem(AUTH_NOTICE_KEY);
    setIsLoading(true);

    try {
      await login(formData.username, formData.password);
      toast.success('Login successful!');
      // Don't navigate here - let the useEffect handle it
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Login - Bovine</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="flex min-h-screen items-center justify-center bg-charcoal px-4 py-16">
        <div className="w-full max-w-md">
          <img
            src={WORDMARK_ON_DARK.src}
            width={WORDMARK_ON_DARK.width}
            height={WORDMARK_ON_DARK.height}
            alt="Bovine"
            className="mx-auto mb-8 h-8 w-auto"
          />

          <GlassCard tone="dark">
            <h1 className="text-h3 text-cream">Admin Login</h1>
            <p className="mt-2 text-small text-cream">Enter your credentials to access the admin dashboard</p>

            {notice && (
              <p role="alert" className="mt-5 rounded-[14px] border border-gold p-3 text-small text-gold">
                {notice}
              </p>
            )}

            <form onSubmit={handleLogin} className="mt-6">
              <div className="mb-4">
                <label htmlFor="username" className="mb-2 block text-small font-semibold text-cream">
                  Username or Email
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder="Enter username or email"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="mb-2 block text-small font-semibold text-cream">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder="Enter password"
                />
              </div>

              <Button type="submit" disabled={isLoading || authLoading} className="w-full">
                {isLoading ? 'Authenticating...' : 'Login'}
              </Button>
            </form>
          </GlassCard>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
