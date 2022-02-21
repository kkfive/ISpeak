<template>
  <div class="speak-comments">
    <speak-card
      :speak="props.speak"
      show-back-btn
      :show-comment="false"
      @closeComment="hideCommentHandler"
    />
    <div class="comment-container">
      <div class="comment" id="comment-one-container"></div>
      <div class="comment" id="comment-two-container"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { initOptions } from '@/types/parameter'
import { SpeakType } from '@/types/speak'
import { inject, onMounted, PropType } from 'vue'
import speakCard from './speak-card.vue'
const props = defineProps({
  speak: {
    type: Object as PropType<SpeakType>,
    required: true
  }
})
const userConfig = inject('option') as initOptions
onMounted(() => {
  setTimeout(() => {
    document
      .getElementById(props.speak._id)
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' })

    if (userConfig.initCommentName) {
      window[userConfig.initCommentName]?.init({
        ...userConfig.initCommentOptions,
        el: '#comment-one-container', // 将评论挂载到某个DOM上
        path: '#' + props.speak._id // 网站的唯一标识符，评论会根据该标识返回评论，默认: location.pathname
      })
    }
    if (userConfig.globalCommentName) {
      window[userConfig.globalCommentName]({
        ...userConfig.globalCommentOptions,
        el: '#comment-two-container', // 将评论挂载到某个DOM上
        path: '#' + props.speak._id // 网站的唯一标识符，评论会根据该标识返回评论，默认: location.pathname
      })
    }
  })
})

const emits = defineEmits(['closeComment'])
const hideCommentHandler = (data) => {
  emits('closeComment', data)
}
</script>
<style lang="scss" scoped>
:deep(.D-footer) {
  display: none;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
