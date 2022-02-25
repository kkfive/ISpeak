/**
 * 图片懒加载
 * @param {*} img 需要懒加载的img元素(标签)
 * @param {*} attr 图片的真实url地址
 */
export const lazyloadImage = (
  img = 'img[speak-src]:not([loaded])',
  attr = 'speak-src'
) => {
  const imgLazyLoad = document.querySelectorAll(img)
  console.log(imgLazyLoad)

  imgLazyLoad.forEach((target) => {
    const io = new IntersectionObserver((entries, Observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          const src = img.getAttribute(attr)
          img.setAttribute('src', src || '')
          img.setAttribute('loaded', 'loaded')
          Observer.disconnect()
        }
      })
    })
    io.observe(target)
  })
}
