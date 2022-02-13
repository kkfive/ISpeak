import { initOptions } from './types/parameter'
import { createApp } from 'vue'
import VueLazyloadNext from 'vue-lazyload-next'
import App from './view/App.vue'
declare global {
  interface Window {
    ispeak: any
  }
}

const render = (options: initOptions) => {
  const app = createApp(App)
  app.provide('option', options)
  app.use(VueLazyloadNext, {
    preLoad: 1.3,
    error: options.fail_img,
    loading: options.loading_img,
    attempt: 1
  })
  return app.mount(options.el || '#ispeak')
}

async function init(options: initOptions = { url: '', author: '' }) {
  return render(options)
}
export default init

export { init }

if (import.meta.env.DEV) {
  init({
    el: '#app',
    url: 'http://127.0.0.1:3000/',
    author: '61fe93508fd621d39a155725',

    loading_img: 'https://7.dusays.com/2021/03/04/d2d5e983e2961.gif',
    fail_img:
      'https://file.acs.pw/picGo/2021/1/22/90331f043583fe472e59602f835cc28c.gif'
  })
}
