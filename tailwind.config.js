/** @type {import('tailwindcss').Config} */

// Brand tokens. Values live as CSS custom properties on :root in src/index.css;
// Tailwind only references them, so there is a single source of truth.
const brand = {
  terracotta: 'var(--terracotta)',
  'terracotta-deep': 'var(--terracotta-deep)',
  cream: 'var(--cream)',
  'cream-deep': 'var(--cream-deep)',
  charcoal: 'var(--charcoal)',
  'charcoal-soft': 'var(--charcoal-soft)',
  ink: 'var(--ink)',
  gold: 'var(--gold)',
  white: 'var(--white)',
};

// LEGACY SHIM — remove once every component is migrated to brand tokens.
// The old cyan `primary` and sky `secondary` scales were deleted. Existing
// components still reference `primary-*` / `secondary-*` classes (including the
// admin Button, whose white text would otherwise sit on no background), so the
// names are aliased to brand tokens only. No old color value remains.
const legacyScale = {
  50: 'var(--cream)',
  100: 'var(--cream-deep)',
  200: 'var(--cream-deep)',
  300: 'var(--terracotta)',
  400: 'var(--terracotta)',
  500: 'var(--terracotta)',
  600: 'var(--terracotta)',
  700: 'var(--terracotta-deep)',
  800: 'var(--terracotta-deep)',
  900: 'var(--terracotta-deep)',
};

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    // Replaces (not extends) the default families: Inter is the only font.
    fontFamily: {
      sans: ['"Inter Variable"', '"Inter Fallback"', 'sans-serif'],
    },
    extend: {
      colors: {
        ...brand,
        primary: legacyScale,
        secondary: legacyScale,
        // Admin only (destructive actions). Not part of the brand palette.
        danger: 'var(--danger)',
      },
      // Hairline dividers. Also the default for a bare `border` class.
      borderColor: {
        DEFAULT: 'rgba(58, 55, 51, 0.25)',
        hairline: 'rgba(58, 55, 51, 0.25)',
        'hairline-dark': 'rgba(246, 241, 233, 0.12)',
      },
      // Fluid type: clamp() interpolates between 360px and 1280px viewports.
      fontSize: {
        hero: ['var(--fs-hero)', { lineHeight: '1.06', letterSpacing: '-0.02em', fontWeight: '700' }],
        h2: ['var(--fs-h2)', { lineHeight: '1.15', fontWeight: '700' }],
        h3: ['var(--fs-h3)', { lineHeight: '1.3', fontWeight: '600' }],
        body: ['var(--fs-body)', { lineHeight: '1.65', fontWeight: '400' }],
        small: ['var(--fs-small)', { lineHeight: '1.5' }],
      },
      maxWidth: {
        measure: '68ch',
        container: 'var(--container-max)',
      },
      borderRadius: {
        pill: 'var(--radius-pill)',
        card: 'var(--radius-card)',
        panel: 'var(--radius-panel)',
        image: 'var(--radius-image)',
      },
      spacing: {
        section: 'var(--section-pad)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'bounce-slow': 'bounce 3s ease-in-out infinite',
        'rotate-slow': 'rotate 8s linear infinite',
        'gradient-x': 'gradient-x 4s ease infinite',
        'gradient-y': 'gradient-y 4s ease infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        'gradient-x': {
          '0%, 100%': { 'background-size': '200% 200%', 'background-position': 'left center' },
          '50%': { 'background-size': '200% 200%', 'background-position': 'right center' }
        },
        'gradient-y': {
          '0%, 100%': { 'background-size': '200% 200%', 'background-position': 'center top' },
          '50%': { 'background-size': '200% 200%', 'background-position': 'center bottom' }
        }
      },
      // Neutral black-alpha shadows kept (black is an allowed color); all
      // colored glows were removed.
      boxShadow: {
        'card': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 30px rgba(0, 0, 0, 0.12)',
        'card-dark': '0 4px 20px rgba(0, 0, 0, 0.3)',
        'card-dark-hover': '0 8px 30px rgba(0, 0, 0, 0.4)',
        '3xl': '0 35px 60px -12px rgba(0, 0, 0, 0.25)',
        '4xl': '0 45px 80px -15px rgba(0, 0, 0, 0.3)',
        'floating': '0 20px 40px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06)',
        'floating-lg': '0 35px 60px rgba(0, 0, 0, 0.15), 0 15px 30px rgba(0, 0, 0, 0.08)'
      },
      backdropBlur: {
        'xs': '2px'
      }
    }
  },
  plugins: []
};
