import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Preload the Latin subset of the self-hosted Inter variable font in the built
 * index.html, so the font request starts with the HTML instead of after CSS
 * parsing. This avoids the fallback→Inter swap reflowing text (layout shift).
 * The filename is hashed at build time, so it is resolved from the bundle.
 */
const preloadInterFont = (): Plugin => ({
  name: 'preload-inter-latin',
  apply: 'build',
  transformIndexHtml: {
    order: 'post',
    handler(_html, ctx) {
      const file = Object.keys(ctx.bundle ?? {}).find((f) => /inter-latin-wght-normal-.*\.woff2$/.test(f));
      if (!file) return [];
      return [
        {
          tag: 'link',
          attrs: { rel: 'preload', href: `/${file}`, as: 'font', type: 'font/woff2', crossorigin: '' },
          injectTo: 'head',
        },
      ];
    },
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), preloadInterFont()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
