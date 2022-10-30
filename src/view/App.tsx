/**
 * 卡片容器
 */
import { Component, For, onMount, Show } from 'solid-js'
import { useGlobal } from '@/store/config'
import appStyle from '@/styles/App.module.scss'
import { SpeakContent } from './content'
import Label from '@/components/label/label'
import WiTime4 from '@/view/svg/WiTime4'
import { timeAgo } from '@/utils/timeago'
import useSpeak from '@/hooks/useSpeak'
import { SpeakType } from '@/types/speak'
import BiSolidComment from './svg/BiSolidComment'
import Button from '@/components/button/button'
import Loading from '@/components/loading/loading'

const App: Component = () => {
  const [userConfig] = useGlobal()
  console.log(userConfig())

  const { getData, speakList, speakTotal, loading } = useSpeak({
    url: userConfig().api,
    author: userConfig().author
  })
  onMount(() => {
    getData()
  })
  return (
    <>
      <For each={speakList()} children={<div></div>}>
        {(speak: SpeakType) => (
          <div
            classList={{
              'ispeak-w-full': true,
              'ispeak-bg-white': false,
              'ispeak-overflow-hidden': true,
              'ispeak-border-box': true,
              [appStyle['ispeak-container']]: true
            }}
          >
            <SpeakContent text={speak.content} />
            <hr class={appStyle.hr} />
            <div
              classList={{
                'ispeak-flex': true,
                'ispeak-items-center': true,
                'ispeak-justify-between': true,
                [appStyle['ispeak-container-func']]: true
              }}
            >
              {/* 左侧 */}
              <div
                classList={{
                  [appStyle['label-container']]: true,
                  'ispeak-flex-wrap': true,
                  'ispeak-flex': true
                }}
              >
                {/* 发布时间 */}
                <Label
                  content={timeAgo(new Date(speak.createdAt))}
                  icon={<WiTime4 />}
                />
                <Show
                  when={speak.tag}
                  children={
                    <Label
                      content={speak?.tag?.name}
                      backgroundColor={speak?.tag?.bgColor}
                    />
                  }
                />
              </div>
              {/* 左侧 */}

              {/* 右侧 */}
              <Show
                when={speak.type === '0'}
                children={
                  <div
                    classList={{
                      'ispeak-flex': true,
                      'ispeak-items-center': true,
                      'ispeak-pointer': true
                    }}
                  >
                    {/* <AiOutlineEye color='#000' size={24} />
                    <span>查看详情</span> */}
                    <BiSolidComment size={18} />
                  </div>
                }
              />

              {/* 右侧 */}
            </div>
          </div>
        )}
      </For>
      <Show when={loading()} children={<Loading />} />
      <Show
        when={speakList().length < speakTotal()}
        children={<Button text='下一页' onClick={getData} />}
      />
    </>
  )
}

export default App
