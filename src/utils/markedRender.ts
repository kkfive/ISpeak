import marked from 'marked'
import hljs from 'highlight.js'
import { inject } from 'vue'
import { initOptions } from '@/types/parameter'
const userConfig = inject('option') as initOptions
export const markedRender = (body) => {
  const renderer = {
    image(href, title, text) {
      return `<a href="${href}" target="_blank" data-fancybox="group" class="fancybox">
           <img speak-src="${href}" src=${userConfig.loading_img} alt='${text}'>
          </a>`
    }
  }
  marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function (code) {
      return hljs.highlightAuto(code).value
    },
    pedantic: false,
    gfm: true,
    tables: true,
    breaks: true,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false
  })
  marked.use({ renderer })
  return marked(body)
}
