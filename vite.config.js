import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // For custom domain deployment (globalsharks.wiki), use base: '/'
  // For GitHub Pages without custom domain, use base: '/repository-name/'
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: false, // Disable for production
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
          'vendor-viz': ['d3', 'recharts', 'plotly.js'],
          'vendor-maps': ['mapbox-gl', 'react-map-gl', 'leaflet', 'react-leaflet']
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true
  },
  preview: {
    port: 4173
  }
})

