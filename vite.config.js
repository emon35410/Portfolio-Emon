import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        // Static 404 page — Netlify/Vercel serve dist/404.html for unknown URLs
        notFound: resolve(__dirname, '404.html'),
      },
    },
  },
})
