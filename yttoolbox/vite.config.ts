import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { visualizer } from 'rollup-plugin-visualizer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: false,
      gzipSize: true,
      brotliSize: true,
      filename: 'dist/stats.html'
    })
  ],
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
    target: ['es2022', 'edge90', 'firefox90', 'chrome95', 'safari15'],
    rollupOptions: {
      output: {
        // Ultra-granular chunk splitting for maximum optimization
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            // Separate chunks for each major library
            if (id.includes('@mui/material')) return 'mui-material';
            if (id.includes('@mui/icons-material')) return 'mui-icons';
            if (id.includes('antd')) return 'antd';
            if (id.includes('@ant-design/icons')) return 'ant-icons';
            if (id.includes('react-dom')) return 'react-dom';
            if (id.includes('react')) return 'react-core';
            if (id.includes('@emotion')) return 'emotion';
            return 'vendor-common';
          }
          
          // Split individual tools into separate chunks
          if (id.includes('/ThumbnailDownloader')) return 'tool-thumbnail';
          if (id.includes('/PFPDownloader')) return 'tool-pfp';
          if (id.includes('/BannerDownloader')) return 'tool-banner';
          if (id.includes('/CommentsExtractor')) return 'tool-comments';
          if (id.includes('/TitleExtractor')) return 'tool-title';
          
          // Split pages
          if (id.includes('/LandingPage')) return 'page-landing';
          if (id.includes('/About')) return 'page-about';
          if (id.includes('/Privacy')) return 'page-privacy';
          if (id.includes('/TermsOfService')) return 'page-terms';
          if (id.includes('/Contact')) return 'page-contact';
          if (id.includes('/Blog')) return 'page-blog';
          if (id.includes('/ErrorPage')) return 'page-error';
          
          // Split components
          if (id.includes('/Layout')) return 'layout-core';
          if (id.includes('/Navbar')) return 'layout-navbar';
          if (id.includes('/Footer')) return 'layout-footer';
          if (id.includes('/MobileDrawer')) return 'layout-mobile';
          
          return 'shared-common';
        },
        // Optimize chunk naming
        chunkFileNames: (chunkInfo) => {
          const name = chunkInfo.name;
          if (name.startsWith('page-') || name.startsWith('component-')) {
            return `assets/[name]-[hash].js`;
          }
          return `assets/[name]-[hash].js`;
        }
      },
    },
    // Disable CSS code splitting to prevent preload issues
    cssCodeSplit: false,
    // Optimize assets - increase inline limit for small assets
    assetsInlineLimit: 8192,
    // Minify with terser for better compression
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.warn', 'console.info'],
        passes: 3,
        // Enable additional optimizations
        unsafe: true,
        unsafe_arrows: true,
        unsafe_comps: true,
        unsafe_math: true,
        unsafe_methods: true,
        unsafe_proto: true,
        unsafe_regexp: true,
      },
      mangle: {
        safari10: false,
        properties: {
          regex: /^_/,
        },
      },
    } as any,
    // Enable source maps for debugging (can be disabled in production)
    sourcemap: false,
  },
  base: "/",
  server: {
    port: 5173,
    strictPort: true,
    headers: {
      'Cache-Control': 'public, max-age=0',
    },
  },
  preview: {
    port: 5173,
    strictPort: true,
    headers: {
      'Cache-Control': 'public, max-age=3600',
    },
  },
  // Optimize dependencies - only include critical deps
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: ['@ant-design/icons', '@emotion/react', '@emotion/styled'],
  },
  // Modern browser support - skip legacy transforms
  esbuild: {
    target: 'es2022',
    supported: {
      'top-level-await': true,
      'dynamic-import': true,
      'import-meta': true,
      'class-field': true,
      'class-private-field': true,
      'class-private-method': true,
      'class-private-accessor': true,
      'logical-assignment': true,
    },
    // Enable tree-shaking for unused code elimination
    treeShaking: true,
  },
});
