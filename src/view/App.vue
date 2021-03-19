<template>
  <div id="ispeak" class="ispeak">
    <div class="loading" v-if="loading">
      <img src="https://7.dusays.com/2021/03/04/d2d5e983e2961.gif" alt="" />
    </div>

    <xk-issue :speakData="speakData" :name="name" />
    <xk-footer />
  </div>
</template>

<script>
import XkFooter from './components/XkFooter.vue';
import XkIssue from './components/XkIssue.vue';
import axios from 'axios';
import Vue from 'vue';

export default {
  components: {
    XkFooter,
    XkIssue
  },
  data() {
    return {
      speakData: [],
      loading: true,
      name: ''
    };
  },
  methods: {
    // 获得当前Speak数据
    async getSpeakData() {
      const { url, name } = Vue.prototype.$speakData;
      const { data } = await axios.get(url);
      this.loading = false;
      this.name = name;
      if (data.data.length > 0) {
        this.speakData = data.data;
      } else {
        this.speakData = [
          {
            number: 1,
            body: '暂无speak',
            label: [],
            updated_at: '2020-11-14T21:44:54+08:00'
          }
        ];
      }
      // console.log(data);
    }
  },
  mounted() {
    this.getSpeakData();
  },
  computed: {},

  watch: {}
};
</script>

<style scoped>
.loading {
  text-align: center;
}
</style>