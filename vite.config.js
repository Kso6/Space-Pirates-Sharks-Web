import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // For custom domain deployment, use base: '/'
  // For GitHub Pages without custom domain, use base: '/repository-name/'
  base: '/',
  resolve: {
    alias: {
      // Polyfill Node.js modules for browser compatibility
      stream: 'stream-browserify',
      assert: 'assert',
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false, // Disable for production
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-viz': ['d3', 'recharts', 'plotly.js'],
          'vendor-maps': ['mapbox-gl', 'react-map-gl', 'leaflet', 'react-leaflet'],
        },
      },
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      // Define global for plotly.js and other packages that might need it
      define: {
        global: 'globalThis',
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  preview: {
    port: 4173,
  },
})
