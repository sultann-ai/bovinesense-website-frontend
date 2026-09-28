import { RefObject, useEffect, useRef } from 'react';
import { useLenis } from 'lenis/react';

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface Options {
  /** Extra key handling while open (e.g. arrow keys in a lightbox). */
  onKeyDown?: (e: KeyboardEvent) => void;
}

/**
 * Modal dialog behaviour: while `open`, locks page scroll (native + Lenis), moves focus
 * into `containerRef`, traps Tab, closes on Escape. On close, focus returns to the
 * element that had focus when the dialog opened.
 */
export function useModalDialog(
  open: boolean,
  onClose: () => void,
  containerRef: RefObject<HTMLElement>,
  { onKeyDown }: Options = {}
) {
  const lenis = useLenis();
  const onCloseRef = useRef(onClose);
  const onKeyDownRef = useRef(onKeyDown);

  useEffect(() => {
    onCloseRef.current = onClose;
    onKeyDownRef.current = onKeyDown;
  });

  useEffect(() => {
    if (!open) return;

    const returnTo = document.activeElement as HTMLElement | null;
    const container = containerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    lenis?.stop();

    const focusables = () => Array.from(container?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []);
    focusables()[0]?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onCloseRef.current();
        return;
      }
      onKeyDownRef.current?.(e);
      if (e.key !== 'Tab') return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      } else if (!container?.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      lenis?.start();
      returnTo?.focus();
    };
  }, [open, lenis, containerRef]);
}
