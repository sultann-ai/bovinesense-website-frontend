import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useLenis } from 'lenis/react';
import { Button, Menu, Close, cx } from '../ui';
import { NAV_ITEMS, WORDMARK_ON_DARK } from './navItems';

const SCROLL_THRESHOLD = 80;

const Wordmark = () => (
  <Link to="/" aria-label="Bovine — home" className="inline-flex shrink-0 items-center rounded-pill px-3 py-2">
    <img
      src={WORDMARK_ON_DARK.src}
      width={WORDMARK_ON_DARK.width}
      height={WORDMARK_ON_DARK.height}
      alt=""
      decoding="async"
      className="h-8 w-auto"
    />
  </Link>
);

const desktopLinkClass = ({ isActive }: { isActive: boolean }) =>
  cx(
    'rounded-pill px-[18px] py-[10px] text-base font-medium leading-6 transition-colors duration-150',
    isActive ? 'bg-terracotta text-white' : 'text-cream hover:bg-[rgba(246,241,233,0.08)]'
  );

const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
  cx(
    'inline-block rounded-pill px-5 py-2 text-[28px] font-semibold leading-tight transition-colors duration-150',
    isActive ? 'bg-terracotta text-white' : 'text-cream hover:bg-[rgba(246,241,233,0.08)]'
  );

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Floating pill header for public routes. NavLink sets aria-current="page" on the active link. */
const SiteHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);
  const location = useLocation();
  const lenis = useLenis();

  // Solid charcoal at the top; frosted after 80px of scroll.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Route change closes the menu.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Close if the viewport grows to desktop while the menu is open.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const onChange = (e: MediaQueryListEvent) => e.matches && setOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Open: lock scroll, focus into the dialog, trap Tab, close on Escape.
  // Close: unlock scroll and return focus to the trigger.
  useEffect(() => {
    if (!open) {
      if (wasOpen.current) triggerRef.current?.focus();
      wasOpen.current = false;
      return;
    }
    wasOpen.current = true;

    const overlay = overlayRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    lenis?.stop();

    const focusables = () => Array.from(overlay?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []);
    focusables()[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
        return;
      }
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
      } else if (!overlay?.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      lenis?.start();
    };
  }, [open, lenis]);

  return (
    <header>
      <div
        className={cx(
          'fixed left-1/2 top-4 z-50 flex h-16 w-[calc(100%-32px)] max-w-[1120px] -translate-x-1/2 items-center justify-between rounded-pill p-[10px]',
          'transition-[background-color,backdrop-filter,border-color] duration-200',
          scrolled ? 'glass-dark rounded-pill' : 'bg-charcoal'
        )}
      >
        <Wordmark />

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className={desktopLinkClass}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden md:block">
          <Button to="/contact" size="compact">Talk to us</Button>
        </div>

        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="inline-flex h-11 w-11 items-center justify-center rounded-pill text-cream hover:bg-[rgba(246,241,233,0.08)] md:hidden"
        >
          <Menu />
        </button>
      </div>

      {open && (
        <div
          id="mobile-menu"
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label="Main menu"
          data-lenis-prevent
          className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-charcoal px-4 pb-10 pt-4 md:hidden"
        >
          <div className="flex h-16 items-center justify-between p-[10px]">
            <Wordmark />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-pill text-cream hover:bg-[rgba(246,241,233,0.08)]"
            >
              <Close />
            </button>
          </div>

          <nav aria-label="Main" className="mt-10 px-2">
            <ul className="flex flex-col items-start gap-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} className={mobileLinkClass}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-10 px-2">
            <Button to="/contact" tone="dark">Talk to us</Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
