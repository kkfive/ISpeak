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
  loading_img: 'https://7.dusays.com/2021/03/04/d2d5e983e2961.gif',
  speakPage: '/speak'
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
  // init({
  //   el: '#app',
  //   // api: 'https://kkapi-dev.vercel.app/',
  //   api: 'https://kkapi-open.vercel.app/',
  //   author: '61fe93508fd621d39a155725',
  //   pageSize: 10,
  //   loading_img: 'https://7.dusays.com/2021/03/04/d2d5e983e2961.gif',
  //   speakPage: '/speak',
  //   githubClientId: 'Iv1.1a4e5a689816a636',
  //   initCommentName: 'Discuss',
  //   initCommentOptions: {
  //     serverURLs: 'https://kkdiscuss.vercel.app/'
  //   }
  // })
  init({
    el: '#app',
    // api: 'https://kkapi-dev.vercel.app/',
    // api: 'http://localhost:3000/',
    api: 'https://kkapi.vercel.app/',
    author: '61fe93508fd621d39a155725',
    pageSize: 10,
    loading_img: 'https://7.dusays.com/2021/03/04/d2d5e983e2961.gif',
    speakPage: '/',
    githubClientId: 'Iv1.59525e76d5e6f5e3',
    hideComment: false,
    initCommentName: 'Discuss',
    initCommentOptions: {
      serverURLs: 'https://kkdiscuss.vercel.app/'
    }
  })
}
