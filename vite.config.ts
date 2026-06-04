import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { copyFileSync, mkdirSync, existsSync, readdirSync } from 'fs'
import { resolve } from 'path'
import dyadComponentTagger from "@dyad-sh/react-vite-component-tagger"

const copyWellKnown = {
  name: 'copy-well-known',
  closeBundle() {
    const srcDir = resolve(__dirname, 'public/.well-known')
    const destDir = resolve(__dirname, 'dist/.well-known')
    if (existsSync(srcDir)) {
      if (!existsSync(destDir)) mkdirSync(destDir, { recursive: true })
      const files = readdirSync(srcDir)
      files.forEach(file => {
        copyFileSync(resolve(srcDir, file), resolve(destDir, file))
        console.log(`✓ Copied .well-known/${file} to dist`)
      })
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