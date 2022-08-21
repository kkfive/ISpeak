<template>
  <div class="speak-comments">
    <speak-card
      :speak="props.speak"
      show-back-btn
      :show-comment="false"
      @closeComment="hideCommentHandler"
    />
    <div :class="userConfig.commentClass"></div>
  </div>
</template>

<script lang="ts" setup>
import { initOptions } from '@/types/parameter'
import { SpeakType } from '@/types/speak'
import { inject, onMounted, PropType, toRaw, isProxy } from 'vue'
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
    if (userConfig.comment) {
      const speakData = toRaw(props.speak)
      Object.keys(speakData).forEach((key) => {
        if (isProxy(speakData[key])) {
          speakData[key] = toRaw(speakData[key])
        }
      })
      userConfig.comment(toRaw(props.speak))
    }
  })
})

const emits = defineEmits(['closeComment'])
const hideCommentHandler = (data) => {
  emits('closeComment', data)
}
</script>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
