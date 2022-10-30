import { render } from 'solid-js/web'

import App from '@/view/App'
import { UserConfig } from './types/userProvider'
import { GlobalProvider } from './store/config'
import '@/styles/global.scss'
const renderApp = (options: UserConfig) => {
  render(
    () => <GlobalProvider children={<App />} userConfig={options} />,
    document.getElementById('app') as HTMLElement
  )
}

function init(options: UserConfig) {
  return renderApp(options)
}
export default init

export { init }

if (import.meta.env.DEV) {
  init({
    el: '#app',
    api: 'https://kkapi.vercel.app/',
    author: '61fe93508fd621d39a155725',
    pageSize: 10,
    loading_img: 'https://bu.dusays.com/2021/03/04/d2d5e983e2961.gif',
    speakPage: '/',
    githubClientId: 'Iv1.59525e76d5e6f5e3',
    hideComment: false,
    comment: function (speak) {
      // const { _id, title, content } = speak
      // const contentSub = content.substring(0, 30)
      // // @ts-ignore
      // new Artalk({
      //   el: '.ispeak-comment',
      //   pageKey: '/speak/info.html#' + _id,
      //   pageTitle: title || contentSub,
      //   server: 'https://api.antmoe.com/artalk/',
      //   site: 'speak' // 你的站点名
      // })
    }
  })
}
