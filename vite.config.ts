import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite configuration with React plugin
export default defineConfig({
  plugins: [react()],
  // Expose environment variables prefixed with VITE_
  envPrefix: 'VITE_',
})
