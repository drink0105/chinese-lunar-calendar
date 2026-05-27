import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { copyFileSync, mkdirSync, existsSync } from 'fs'
import { resolve } from 'path'
import dyadComponentTagger from "@dyad-sh/react-vite-component-tagger"

const copyWellKnown = {
  name: 'copy-well-known',
  closeBundle() {
    const src = resolve(__dirname, 'public/.well-known/assetlinks.json')
    const destDir = resolve(__dirname, 'dist/.well-known')
    const dest = resolve(destDir, 'assetlinks.json')
    if (existsSync(src)) {
      if (!existsSync(destDir)) {
        mkdirSync(destDir, { recursive: true })
      }
      copyFileSync(src, dest)
      console.log('✓ Copied .well-known/assetlinks.json to dist')
    } else {
      console.warn('⚠ public/.well-known/assetlinks.json not found')
    }
  }
}

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), dyadComponentTagger(), copyWellKnown],
  publicDir: 'public',
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
})