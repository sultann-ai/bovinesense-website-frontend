import { RefObject, useEffect } from 'react';

// All drifting elements share ONE passive scroll listener, throttled to one update per frame.
const items = new Set<HTMLElement>();
let ticking = false;
let listening = false;

const MAX_DRIFT = 30; // px
const FACTOR = 0.08;

const update = () => {
  ticking = false;
  const mid = window.innerHeight / 2;
  items.forEach((el) => {
    // Measure the untransformed parent so the drift never feeds back into itself.
    const box = (el.parentElement ?? el).getBoundingClientRect();
    const distance = mid - (box.top + box.height / 2);
    const offset = Math.max(-MAX_DRIFT, Math.min(MAX_DRIFT, distance * FACTOR));
    el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
  });
};

const onScroll = () => {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(update);
  }
};

const MOTION_OK = '(min-width: 768px) and (prefers-reduced-motion: no-preference)';

/** Subtle scroll drift (max ±30px) for decorative elements. Off below 768px and under reduced motion. */
export function useDrift(ref: RefObject<HTMLElement>) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia(MOTION_OK).matches) return;

    items.add(el);
    if (!listening) {
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
      listening = true;
    }
    onScroll();

    return () => {
      items.delete(el);
      el.style.transform = '';
      if (items.size === 0 && listening) {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
        listening = false;
      }
    };
  }, [ref]);
}
