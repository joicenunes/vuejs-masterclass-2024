import { fileURLToPath, URL } from 'node:url'
import VueRouter from 'unplugin-vue-router/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'

import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [VueRouter(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/, // .vue
        /\.vue$\?vue/, // .vue
        /\.md$/, // .mdx
      ],
      imports: [
        'vue',
        VueRouterAutoImports
      ],
      dts: true,
      viteOptimizeDeps: true
    }),
    vue({
    template: {
      compilerOptions: {
        isCustomElement: tag => tag.startsWith('iconify-icon')
      }
    }
  })],
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
