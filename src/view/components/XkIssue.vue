<template>
  <div>
    <transition-group name="list" tag="p">
      <template v-for="mydata in speakData">
        <xk-card
          :speakData="mydata"
          :key="mydata.number"
          :name="name"
          :avatar="avatar"
        />
      </template>
    </transition-group>
  </div>
</template>
<script>
import XkCard from './XkCard.vue';
export default {
  props: ['speakData', 'name', 'avatar'],
  components: { XkCard },
  data() {
    return {};
  }
};
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