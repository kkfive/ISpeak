import path from 'path'
import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import { visualizer } from 'rollup-plugin-visualizer'
import analyze from 'rollup-plugin-analyzer'
import externalGlobals from 'rollup-plugin-external-globals'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.tsx'),
      name: 'ispeak'
    },
    cssCodeSplit: false,
    target: 'modules',
    terserOptions: {
      compress: {
        drop_console: true
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        charset: false,
        additionalData: `@import "@/styles/function.scss";`
      }
    }
  },
  plugins: [
    solidPlugin(),
    visualizer(),
    analyze({ summaryOnly: true }),
    externalGlobals({
      'highlight.js': 'hljs',
      marked: 'marked'
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src') // 设置 `@` 指向 `src` 目录
    }
  },

  server: {
    port: 5678
  }
})
