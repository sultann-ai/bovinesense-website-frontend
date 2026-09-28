import axios from 'axios';

/**
 * The single API client. Every service uses it, so auth handling lives in one place.
 * - Request: attaches `Authorization: Bearer <token>` when an admin token is stored.
 * - Response: on 401, clears the stored token; on admin routes, redirects to the login page,
 *   with a "session expired" notice when the server says the token expired / is invalid.
 */
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const TOKEN_KEY = 'admin_token';
export const AUTH_NOTICE_KEY = 'admin_auth_notice';
export const SESSION_EXPIRED_MESSAGE = 'Your session expired. Please sign in again.';

export const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      const { pathname } = window.location;
      const onLoginPage = pathname.includes('/admin-login');

      // A 401 on the login page itself means wrong credentials: leave it to the form.
      if (!onLoginPage) {
        localStorage.removeItem(TOKEN_KEY);

        // Only redirect from admin routes. A stale token on a public page is cleared
        // silently instead of sending a visitor to the admin login.
        if (pathname.startsWith('/admin')) {
          const message = String(error.response.data?.message ?? '');
          // Backend messages: "Token expired.", "Invalid token.",
          // "Invalid token or admin account deactivated." (middleware/auth.js)
          if (/token expired|invalid token/i.test(message)) {
            sessionStorage.setItem(AUTH_NOTICE_KEY, SESSION_EXPIRED_MESSAGE);
          }
          window.location.href = '/admin-login';
        }
      }
    }
    return Promise.reject(error);
  }
);
