import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    build: {
      rollupOptions: {
        output: {
          // Libraries change far less often than the site does, so they get
          // their own chunks: a copy edit then reissues a small app chunk while
          // React, motion and gsap stay in the browser cache. Split by what
          // needs them rather than into one lump of vendor code.
          manualChunks(id: string) {
            const at = id.lastIndexOf('node_modules/');
            if (at === -1) return;
            const pkg = id.slice(at + 'node_modules/'.length).split('/')[0];
            if (['react', 'react-dom', 'react-router', 'react-router-dom', 'scheduler'].includes(pkg)) return 'react';
            if (['motion', 'framer-motion', 'motion-dom', 'motion-utils'].includes(pkg)) return 'motion';
            if (['gsap', 'lenis'].includes(pkg)) return 'scroll';
            if (pkg === 'lucide-react') return 'icons';
          },
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
