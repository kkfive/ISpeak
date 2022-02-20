import { initOptions } from './types/parameter'
import { createApp } from 'vue'
import VueLazyloadNext from 'vue-lazyload-next'
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
  // app.use(VueLazyloadNext, {
  //   preLoad: 1.3,
  //   error: options.fail_img,
  //   loading: options.loading_img,
  //   attempt: 1
  // })
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
