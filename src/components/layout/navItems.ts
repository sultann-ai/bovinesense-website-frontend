// Public navigation. Labels are redesign names; paths are the existing routes (src/App.tsx).
export const NAV_ITEMS = [
  { label: 'Products', to: '/products' },
  { label: 'Services', to: '/services' },
  { label: 'Projects', to: '/projects' },
  { label: 'About', to: '/about' },
  { label: 'Blog', to: '/blog' },
] as const;

// Wordmark: no SVG exists in the repo yet. Using the light PNG (8192×2035) on charcoal.
// TODO(owner): supply the Bovine wordmark as an SVG and replace this.
export const WORDMARK_ON_DARK = { src: '/whiteLogo.png', width: 129, height: 32 } as const;
