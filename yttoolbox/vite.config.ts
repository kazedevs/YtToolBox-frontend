import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), mdx()],
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        // Optimize chunk splitting to prevent unused preloads
        manualChunks: {
          vendor: ['react', 'react-dom'],
          antd: ['antd'],
          mui: ['@mui/material', '@mui/icons-material'],
        },
      },
    },
    // Disable CSS code splitting to prevent preload issues
    cssCodeSplit: false,
    // Optimize assets
    assetsInlineLimit: 4096,
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
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'antd', '@mui/material', '@mui/icons-material'],
  },
});
