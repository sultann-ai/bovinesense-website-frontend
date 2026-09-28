import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import '@fontsource-variable/inter';
import './index.css';
import ReactLenis from 'lenis/react';

// Smooth scrolling is only enabled when the user has not asked for reduced motion.
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactLenis
      root
      options={{
        lerp: 0.08, // Smoothness (lower = smoother, more momentum)
        duration: 1.8, // Animation duration in seconds
        smoothWheel: !prefersReducedMotion, // Enable smooth scrolling with the mouse wheel
        // smoothTouch: true, // Enable smooth scrolling on touch devices
        prevent: (node) => {
          // Prevent Lenis from handling scroll events on modal elements
          return !!(node.closest('[data-lenis-prevent]') || 
                   node.closest('.modal-content') ||
                   node.closest('[role="dialog"]') ||
                   node.classList.contains('overflow-y-auto'));
        }
      }}
    >
      <App />
    </ReactLenis>
  </StrictMode>
);
