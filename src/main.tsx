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
      }}
    >
      <App />
    </ReactLenis>
  </StrictMode>
);
