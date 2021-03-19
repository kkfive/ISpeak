<template>
  <div>
    <template v-for="mydata in curSpeakData">
      <xk-card :speakData="mydata" :key="mydata.number" :name="name" />
    </template>
    <button @click="load" v-if="flag">下一页</button>
    <button v-else>没有更多了</button>
  </div>
</template>
<script>
import XkCard from './XkCard.vue';
export default {
  props: ['speakData', 'name'],
  components: { XkCard },
  data() {
    return {
      // 记录当前索引
      cursor: 0,
      curSpeakData: [],
      flag: true
    };
  },
  methods: {
    load() {
      if (this.curSpeakData.length == this.speakData.length) {
        this.flag = false;
        return;
      }
      this.curSpeakData = [
        ...this.curSpeakData,
        ...this.speakData.slice(
          this.curSpeakData.length,
          this.curSpeakData.length + 5
        )
      ];
      if (this.curSpeakData.length == this.speakData.length) {
        this.flag = false;
        return;
      }
    }
  },
  mounted() {
    // console.log(this.speakData);
    // this.load();
  },
  watch: {
    speakData(val) {
      this.load();
    }
  }
};
</script>
<style scoped>
@keyframes Gradient {
  0% {
    background-position: 0 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  to {
    background-position: 0 50%;
  }
}

button {
  cursor: pointer;
  color: #fff;
  border: 0;
  margin: 20px auto;
  border-radius: 0.3125rem;
  display: block;
  padding: 0 1rem;
  height: 40px;
  font-weight: 500;
  text-align: center;
  transition: all 0.5s ease-out;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 1000% 1000%;
  animation: Gradient 90s linear infinite;
  outline: 0;
}
</style>