import ImageStyle from '@/styles/content-image.module.scss'
import mediumZoom from 'medium-zoom'
import { For, onMount } from 'solid-js'

function Image(props) {
  let imgRef

  onMount(() => {
    const io = new IntersectionObserver((entries, Observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = imgRef
          const src = img.getAttribute('speak-src')
          img.setAttribute('src', src || '')
          img.setAttribute('loaded', 'loaded')
          Observer.disconnect()
        }
      })
    })
    io.observe(imgRef)
    mediumZoom(imgRef)
  })

  return <img speak-src={props.src} alt='' ref={imgRef} />
}

export default function SpeakImage(props) {
  return (
    <div class={ImageStyle.imageBox}>
      <For each={props.imageList} children={(item) => <Image src={item} />} />
    </div>
  )
}
