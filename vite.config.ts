import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      
    }
  },
  build: {
    chunkSizeWarningLimit: 4000,
    outDir: "build",
    sourcemap: true,
    commonjsOptions: {
      include: [/node_modules/],
      extensions: ['.js', '.cjs'],
      strictRequires: true,
      // https://stackoverflow.com/questions/62770883/how-to-include-both-import-and-require-statements-in-the-bundle-using-rollup
      transformMixedEsModules: true,
    },
  }
})
