import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/",
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'framer-motion': ['framer-motion'],
          'lodash': ['lodash']
        }
      }
    },
    // Optimize build performance
    target: 'esnext',
    minify: 'terser',
    cssMinify: true,
    // Improve chunk loading
    chunkSizeWarningLimit: 1000,
    // Enable source maps for production debugging if needed
    sourcemap: false
  },
  // Optimize dev server
  server: {
    open: true,
    port: 3000,
    cors: true,
    // Enable HMR
    hmr: {
      overlay: true
    }
  },
  // Optimize asset handling
  assetsInclude: ['**/*.webp'],
  // Optimize CSS
  css: {
    devSourcemap: true,
    modules: {
      scopeBehavior: 'local'
    }
  }
})
