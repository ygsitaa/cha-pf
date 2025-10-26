import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // Add base path for GitHub Pages
  base: '/cha-pf/',
  server: {
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173
    },
    watch: {
      usePolling: false
    }
  }
})
