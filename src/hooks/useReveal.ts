import { useLayoutEffect, useRef } from 'react';

// One IntersectionObserver shared by every revealed element on the page.
let observer: IntersectionObserver | null = null;

const getObserver = () => {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-in');
            observer?.unobserve(entry.target); // once per element
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
  }
  return observer;
};

const MOTION_OK = '(min-width: 768px) and (prefers-reduced-motion: no-preference)';

/**
 * Fade + rise 16px when the element scrolls into view, once.
 * Never hides content that is already on screen when the page opens (text the
 * user is already reading), and does nothing below 768px or under reduced motion.
 */
export function useReveal<T extends HTMLElement>(enabled = true) {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!enabled || !el || typeof IntersectionObserver === 'undefined') return;
    if (!window.matchMedia(MOTION_OK).matches) return;

    // Page position (routes always open scrolled to the top): only content that
    // starts below the first screen gets hidden and revealed.
    const pageTop = el.getBoundingClientRect().top + window.scrollY;
    if (pageTop < window.innerHeight) return;

    el.classList.add('reveal');
    const obs = getObserver();
    obs.observe(el);
    return () => {
      obs.unobserve(el);
      el.classList.remove('reveal', 'reveal-in');
    };
  }, [enabled]);

  return ref;
}
