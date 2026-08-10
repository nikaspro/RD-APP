import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile()],
  resolve: {
    /* алиас нужен CLI shadcn и импортам вида @/components/ui/... */
    alias: { '@': path.resolve(__dirname, './src') },
  },
  server: {
    port: 5173,
  },
})
