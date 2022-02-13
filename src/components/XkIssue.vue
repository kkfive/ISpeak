<template>
  <div>
    <XKAccordion :labelList="props.labelList"></XKAccordion>
    <xk-card
      v-for="(mydata, index) in props.speakData"
      :speakData="mydata"
      :key="index"
    />
  </div>
</template>
<script setup lang="ts">
import XkCard from './XkCard.vue'
import XKAccordion from './XKAccordion.vue'
import { PropType } from 'vue'
const props = defineProps({
  speakData: {
    type: Array as PropType<any[]>
  },
  labelList: {
    type: Array as PropType<any[]>
  }
})
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
