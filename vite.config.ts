import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Relative base keeps assets working on GitHub Pages under /<repo>/.
export default defineConfig({
  base: './',
  plugins: [vue()],
  server: { host: true, port: 5173, allowedHosts: true },
})
