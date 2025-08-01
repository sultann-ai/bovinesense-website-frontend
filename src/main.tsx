import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import ReactLenis from 'lenis/react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactLenis
      root
      options={{
        lerp: 0.08, // Smoothness (lower = smoother, more momentum)
        duration: 1.8, // Animation duration in seconds
        smoothWheel: true, // Enable smooth scrolling with the mouse wheel
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
