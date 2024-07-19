import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

const env = process.env.NODE_ENV || 'prod'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // 配置构建选项
  build: {
    outDir: '../out/web',
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(__dirname, env == 'dev' ? 'index-dev.html' : 'index-prod.html'),
      output: {
        // 自定义资源命名
        assetFileNames: (assetInfo) => {
          if (assetInfo && assetInfo?.name?.endsWith('.css')) {
            return 'css/[name]-[hash][extname]'
          }
          if (assetInfo && (assetInfo?.name?.endsWith('.js') || assetInfo?.name?.endsWith('.ts'))) {
            return 'js/[name]-[hash][extname]'
          }
          return 'assets/[name]-[hash][extname]'
        }
      }
    }
  },

  // 配置 CSS 处理
  css: {
    // CSS 预处理器选项
    preprocessorOptions: {
      css: {
        additionalData: `$injectedColor: orange;`
      }
    }
  }
})
