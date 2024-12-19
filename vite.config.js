import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    sourcemap: false, // Disable sourcemap generation
  },
  build: {
    sourcemap: false, // Disable sourcemap in build
  },
})
