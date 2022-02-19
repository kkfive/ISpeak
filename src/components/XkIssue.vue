<template>
  <div>
    <!-- <XKAccordion :labelList="props.labelList"></XKAccordion> -->
    <xk-card
      v-for="(mydata, index) in props.speakData"
      :speakData="mydata"
      :key="index"
      @comment="emitComment"
      @closeComment="closeComment"
    />
  </div>
</template>
<script setup lang="ts">
import XkCard from './XkCard.vue'
import XKAccordion from './XKAccordion.vue'
import { PropType, defineEmits } from 'vue'
const props = defineProps({
  speakData: {
    type: Array as PropType<any[]>
  },
  labelList: {
    type: Array as PropType<any[]>
  }
})
const emits = defineEmits(['comment', 'closeComment'])
const emitComment = (data) => {
  emits('comment', data)
}
const closeComment = () => {
  emits('closeComment')
}
console.log('speakData', props.speakData)
</script>
<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.2s cubic-bezier(0.55, 0.085, 0.68, 0.53);
  transform-origin: 50% 50%;
}
.list-enter,
.list-leave-to {
  transform-origin: 50% 50%;
  transform: scaleY(0) translateZ(0);
  opacity: 0;
}
</style>
