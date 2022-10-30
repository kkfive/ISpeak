import { createMemo, createSignal } from 'solid-js'

interface UseSpeak {
  url: string
  author: string
  pageSize?: string
}

export default function useSpeak(config: UseSpeak) {
  const [speakList, setSpeakList] = createSignal<any[]>([])
  const [speakTotal, setSpeakTotal] = createSignal(0)
  const [visitorId, setVisitorId] = createSignal(0)
  const [loading, setLoading] = createSignal(false)
  const [axiosGetSpeakParams, setAxiosGetSpeakParams] = createSignal({
    url: config.url,
    author: config.author,
    page: 1,
    pageSize: config.pageSize || 10
  })

  const requestHeaders = createMemo(() => {
    const jwtToken = window.localStorage.getItem('ispeak-token')
    if (jwtToken) {
      return {
        Authorization: 'Bearer ' + jwtToken
      }
    } else {
      return { Authorization: '' }
    }
  })

  const getData = async () => {
    const url = axiosGetSpeakParams().url
    const author = axiosGetSpeakParams().author
    const page = axiosGetSpeakParams().page
    const pageSize = axiosGetSpeakParams().pageSize
    try {
      setLoading(true)
      const data = await (
        await fetch(
          `${url}api/ispeak?author=${author}&page=${page}&pageSize=${pageSize}`,
          {
            headers: requestHeaders()
          }
        )
      ).json()
      setLoading(false)

      if (data.data.isLogin) {
        setVisitorId(data.data.isLogin)
      }
      setSpeakTotal(data.data.total)
      setAxiosGetSpeakParams({
        ...axiosGetSpeakParams(),
        page: axiosGetSpeakParams().page + 1
      })
      setSpeakList([...speakList(), ...data.data.items])
      // tagList.value = tagListResult.data
    } catch (e: any) {
      console.log(e)

      // btnClickFlag.value = false
      // message.value = e
    }
  }
  return {
    getData,
    speakList,
    speakTotal,
    visitorId,
    setSpeakList,
    loading
  }
}
