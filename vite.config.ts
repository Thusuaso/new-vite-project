import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
const path = require(`path`);
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      // '@': fileURLToPath(new URL('./src', import.meta.url)),
      vue: path.resolve(`./node_modules/vue`)
    }
  },
  build: {
    chunkSizeWarningLimit: 1600,
    outDir: "build",
     rollupOptions: {
        external: 'NonExistingPath'
      }
  }
})
