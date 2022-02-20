import { initOptions } from './types/parameter'
import { createApp } from 'vue'
import App from './view/App.vue'
import '@/styles/animation.scss'
declare global {
  interface Window {
    ispeak: any
  }
}
const defaultInitOption: initOptions = {
  api: '',
  author: '',
  pageSize: 10,
  loading_img: 'https://7.dusays.com/2021/03/04/d2d5e983e2961.gif'
}
const render = (options: initOptions) => {
  const app = createApp(App)
  app.provide('option', options)
  return app.mount(options.el || '#ispeak')
}

async function init(options: initOptions) {
  return render({ ...defaultInitOption, ...options })
}
export default init

export { init }

if (import.meta.env.DEV) {
  init({
    el: '#app',
    api: 'https://kkapi-dev.vercel.app/',
    author: '61fe93508fd621d39a155725',
    pageSize: 10,
    loading_img: 'https://7.dusays.com/2021/03/04/d2d5e983e2961.gif',
    commentOptions: {
      serverURLs: 'https://kkdiscuss.vercel.app/'
    }
  })
}
