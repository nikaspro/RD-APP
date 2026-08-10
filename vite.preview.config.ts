import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

/* Сборка для предпросмотра-ссылки.
   Отличается от основной одним: код выходит обычным скриптом, а не модулем.
   Песочница, в которой открывается ссылка, модульные скрипты не выполняет —
   получался белый экран. На боевую сборку не влияет, та собирается
   vite.config.ts как раньше. */
export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile({ useRecommendedBuildConfig: false })],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  build: {
    outDir: 'dist-preview',
    assetsInlineLimit: 100000000,
    cssCodeSplit: false,
    rollupOptions: {
      output: { format: 'iife', inlineDynamicImports: true, entryFileNames: 'app.js' },
    },
  },
})
