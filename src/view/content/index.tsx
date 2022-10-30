/**
 * 内容
 */

import { createSignal, Setter } from 'solid-js'
import { marked } from 'marked'
import hljs from 'highlight.js'
import SpeakText from '@/view/content/text'
import SpeakImage from '@/view/content/image'

function renderMarkdown(body: string, setImageList) {
  const renderer = {
    image(href, title, text) {
      setImageList(href)
      return ``
    }
  }
  marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function (code) {
      if (hljs) {
        return hljs.highlightAuto(code).value
      } else {
        return code
      }
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

export function SpeakContent(props) {
  const [imageList, setImageList] = createSignal<string[]>([])
  function appendImage(image: any) {
    return setImageList([...imageList(), image])
  }
  const text = renderMarkdown(props.text, appendImage)

  return (
    <>
      <SpeakText text={text} />
      <SpeakImage imageList={imageList()} />
    </>
  )
}
