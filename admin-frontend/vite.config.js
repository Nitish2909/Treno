import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'redux-vendor': ['@reduxjs/toolkit', 'react-redux'],
          'charts-vendor': ['recharts'],
          'editor-vendor': ['react-quill'],
          'motion-vendor': ['framer-motion'],
          'ui-vendor': ['@headlessui/react', 'lucide-react'],
          'form-vendor': ['react-datepicker', 'react-dropzone', 'react-hot-toast'],
          'utils-vendor': ['date-fns', 'clsx', 'axios'],
        },
      },
    },
  },
})
