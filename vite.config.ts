import path from 'path'
import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import { visualizer } from 'rollup-plugin-visualizer'
import analyze from 'rollup-plugin-analyzer'
import externalGlobals from 'rollup-plugin-external-globals'
import VitePluginStyleInject from 'vite-plugin-style-inject'
import { resolve } from 'path'
const plugins = [
  solidPlugin(),
  VitePluginStyleInject(),
  visualizer(),
  analyze({ summaryOnly: true })
]
if (process.env.NODE_ENV !== 'development') {
  plugins.push(
    externalGlobals({
      'highlight.js': 'hljs',
      marked: 'marked'
    })
  )
}
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.tsx'),
      name: 'ispeak'
    },
    cssCodeSplit: false,
    target: 'modules'
  },
  css: {
    preprocessorOptions: {
      scss: {
        charset: false,
        additionalData: `@import "@/styles/function.scss";`
      }
    }
  },
  plugins,
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src') // 设置 `@` 指向 `src` 目录
    }
  },

  server: {
    port: 5678
  }
})
