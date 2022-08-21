<!--
 * @description: 卡片
-->
<template>
  <div class="speak-body-card" :id="props.speak._id">
    <div class="speak-body-card-header">
      <div class="speak-body-card-name">
        <div class="avatar">
          <img
            class="avatar-img"
            :speak-src="props.speak.author.avatar"
            :src="userConfig.loading_img"
            alt="avatar"
          />
        </div>
        <div class="name">{{ props.speak.author.nickName }}</div>
        <svg-badge style="margin-left: 10px" :height="20" :width="20" />
        <div class="speak-body-card-time">
          {{ timeAgo(props.speak.createdAt) }}
        </div>
      </div>
      <div
        v-if="props.speak.tag"
        :style="{
          background: props.speak.tag['bgColor'],
          color: formatFontColor(props.speak.tag['bgColor'])
        }"
        class="speak-body-card-label"
      >
        {{ props.speak.tag['name'] }}
      </div>
    </div>
    <div
      class="speak-body-card-content"
      v-html="markedRender(props.speak.content, userConfig.loading_img)"
    ></div>
    <div class="speak-body-card-footer">
      <div
        @click="toComment"
        class="comments-btn"
        v-if="
          props.speak?.showComment === '1' &&
          !userConfig.hideComment &&
          props.showComment
        "
      >
        <svg-comment />
        评论
      </div>
    </div>
    <div class="speak-body-card-back" v-if="props.showBackBtn">
      <div class="back-btn" @click="hideComment">
        <svg-back />
        返回
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { PropType, ref, defineEmits, toRefs, inject, onMounted } from 'vue'
import SvgComment from '../svg/svg-comment.vue'
import SvgBadge from '../svg/svg-badge.vue'
import SvgBack from '../svg/svg-back.vue'
import { SpeakType } from '@/types/speak'
import { timeAgo, formatFontColor } from '@/utils/utils'
import { markedRender } from '@/utils/markedRender'
import { initOptions } from '@/types/parameter'

import { lazyloadImage } from '@/utils/lazyload'

const userConfig = inject('option') as initOptions
const props = defineProps({
  speak: {
    type: Object as PropType<SpeakType>,
    required: true
  },
  showBackBtn: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  showComment: {
    type: Boolean as PropType<boolean>,
    default: true
  }
})
const emits = defineEmits(['showComment', 'closeComment'])
const toComment = () => {
  emits('showComment', {
    ...props.speak
  })
}
const hideComment = () => {
  emits('closeComment', { ...props.speak })
}
onMounted(() => {
  console.log('子组件渲染完成')
  lazyloadImage()
})
</script>
<style scoped lang="scss">
.speak-body-card {
  padding: 10px 20px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.06);
  overflow: hidden;
  margin-top: 20px;
  transition: all 0.25s ease 0.2s,
    transform 0.5s cubic-bezier(0.6, 0.2, 0.1, 1) 0.2s,
    -webkit-transform 0.5s cubic-bezier(0.6, 0.2, 0.1, 1) 0.2s;
  &:hover {
    box-shadow: 0 5px 10px 8px rgba(7, 17, 27, 0.16);
    transform: translateY(-3px);
  }
  .speak-body-card-time {
    font-size: 12px;
    text-shadow: #d9d9d9 0 0 1px, #fffffb 0 0 1px, #fffffb 0 0 2px;
    margin-left: 5px;
    white-space: nowrap;
  }
  .speak-body-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    user-select: none;
    flex-wrap: wrap;
    .speak-body-card-name {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        margin-right: 10px;
      }
      .avatar-img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
      .name {
        font-weight: 600;
        white-space: nowrap;
      }
      .is-badge {
        height: 20px;
        width: 20px;
        margin-left: 5px;
      }
    }
  }
  .speak-body-card-content {
    padding: 10px 0;
    & :deep(img) {
      width: 100%;
    }
  }
  .speak-body-card-label {
    border-radius: 5px;
    padding: 0 5px;
    font-weight: 550;
    border-radius: 3px;
    box-shadow: inset 0 -1px 0 rgb(27 31 35 / 12%);
    font-size: 14px;
    cursor: pointer;
    user-select: none;
    height: 25px;
    line-height: 25px;
  }
  .speak-body-card-footer {
    display: flex;
    padding-bottom: 10px;
    user-select: none;
    .comments-btn {
      display: flex;
      align-items: center;
      cursor: pointer;
      user-select: none;
      color: #666;
      margin-left: 10px;
    }
  }
  .speak-body-card-back {
    display: flex;
    align-items: center;
    justify-content: center;
    .back-btn {
      text-align: center;
      margin-top: 1em;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100px;
      height: 30px;
      border-radius: 5px;
      margin: 0 auto;
      cursor: pointer;
      user-select: none;
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

@media screen and (min-width: 768px) {
  .speak-body-card-content :deep(.fancybox),
  .speak-body-card-content :deep(video) {
    display: inline-block;
    max-width: 24%;
  }
}

@media screen and (max-width: 768px) {
  .speak-body-card-content :deep(.fancybox),
  .speak-body-card-content :deep(video) {
    display: inline-block;
    max-width: 49%;
  }
}
</style>
