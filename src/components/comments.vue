<template>
  <div class="comment-container">
    <div class="header"></div>
    <div class="speak-content">
      <div class="content">{{ props.speakData?.content }}</div>
      <div class="back-btn">
        <div class="btn" @click="closeComment">
          <svg
            t="1645239919789"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="15463"
            width="25"
            height="25"
          >
            <path
              d="M478.104276 337.595469V184.66079L114.48369 442.197642l363.620586 257.597261V548.220967c145.529941 0.060409 280.456525 7.405763 394.534756 210.864063 0.001024-129.244021-21.321388-417.874222-394.534756-421.489561z"
              fill="#98C4D8"
              p-id="15464"
            ></path>
            <path
              d="M447.778841 307.270034V154.334331L84.158254 411.871182 447.778841 669.468444V517.894508c145.529941 0.060409 280.456525 7.405763 394.534756 210.864063 0-129.244021-21.322412-417.874222-394.534756-421.488537z"
              fill="#EFD9A0"
              p-id="15465"
            ></path>
            <path
              d="M283.00269 350.410162a27.283472 57.977507 55.515 1 0 95.578754-65.652623 27.283472 57.977507 55.515 1 0-95.578754 65.652623Z"
              fill="#FEFEFE"
              p-id="15466"
            ></path>
            <path
              d="M224.416795 445.822358a18.189323 31.830547 55.515 1 0 52.474213-36.044304 18.189323 31.830547 55.515 1 0-52.474213 36.044304Z"
              fill="#FEFEFE"
              p-id="15467"
            ></path>
          </svg>
          返回
        </div>
      </div>
    </div>
    <!-- <div class="comment" id="waline-comment-container"></div> -->
    <div class="comment" id="discuess-comment-container"></div>
    <div class=""></div>
  </div>
</template>

<script lang="ts" setup>
import Waline from '@waline/client'
import { onMounted, onUpdated, PropType, ref, watch } from 'vue'

interface speakCommentOptions {
  id?: string
  content?: string
  title?: string
}
let waline
const props = defineProps({
  speakData: {
    type: Object as PropType<speakCommentOptions>
  }
})
const emits = defineEmits(['closeComment'])
onMounted(() => {
  // waline = Waline({
  //   el: '#waline-comment-container',
  //   serverURL: 'https://comment.app.cloudendpoint.cn/',
  //   visitor: true,
  //   copyright: false,
  //   path: ''
  // })
})
watch(props, (newVal, val) => {
  // waline.update({ path: newVal.speakData?.id })
  window['Discuss'].init({
    el: '#discuess-comment-container', // 将评论挂载到某个DOM上
    serverURLs: 'https://kkdiscuss.vercel.app/', // 服务端部署地址
    master: '博主', // 博主标签占位符，默认: 博主
    placeholder: '评论你的想法~', // 评论框占位符，默认: 评论你的想法~
    path: newVal.speakData?.id, // 网站的唯一标识符，评论会根据该标识返回评论，默认: location.pathname
    lang: 'zh_CN', // 评论语言，默认: zh_CN ，可选: [zh_CN , en_US]
    visitStat: true, // 是否开启访问统计，默认: true
    imgLoading: 'https://7.dusays.com/2021/03/04/d2d5e983e2961.gif' // 评论图片懒加载，加载动画，默认为1像素白色base64图
  })
})
const closeComment = () => {
  emits('closeComment', { id: props.speakData?.id })
}
</script>

<style lang="scss" scoped>
.comment-container {
  width: 100%;
  min-height: 300px;
  .head {
  }
  .speak-content {
    padding: 2em;
    transform: translateY(-3px);
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 3px 8px 6px #07111b0f;
    overflow: hidden;
    transition: all 0.25s ease 0.2s,
      transform 0.5s cubic-bezier(0.6, 0.2, 0.1, 1) 0.2s,
      -webkit-transform 0.5s cubic-bezier(0.6, 0.2, 0.1, 1) 0.2s;
    .content {
    }
    .back-btn {
      text-align: center;
      margin-top: 1em;
      @keyframes wobble-horizontal {
        16.65% {
          transform: translateX(8px);
        }
        33.3% {
          transform: translateX(-6px);
        }
        49.95% {
          transform: translateX(4px);
        }
        66.6% {
          transform: translateX(-2px);
        }
        83.25% {
          transform: translateX(1px);
        }
        100% {
          transform: translateX(0);
        }
      }
      .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100px;
        height: 30px;
        border-radius: 5px;
        margin: 0 auto;
        cursor: pointer;
        transform: translateZ(0);
        box-shadow: 0 0 1px rgba(0, 0, 0, 0);
        color: #efd9a0;
        border: 1px solid #efd9a0;
        &:hover {
          animation-name: wobble-horizontal;
          animation-duration: 1s;
          animation-timing-function: ease-in-out;
          animation-iteration-count: 1;
          transition: background 1s;
          background: #ff7242;
          color: #fff;
        }
      }
    }
  }
  .comment {
    width: 100%;
  }
}
</style>
