import dts from "vite-plugin-dts";
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), dts({
    insertTypesEntry: true,
  })],
  build: {
    lib: {
      name: 'three-perspective',
      entry: resolve(__dirname, 'src/index.ts'),
      fileName: format => `three-perspective.${format}.js` // ES & UMD format
    },
    rollupOptions: {
      external: ['vue', 'three'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
          three: 'THREE'
        } // support for UMD builds
      }
    }
  }
})
