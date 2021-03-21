<template>
  <div id="ispeak" class="ispeak">
    <xk-issue :speakData="speakData" :name="name" />
    <div class="loading" v-if="loading">
      <img src="https://7.dusays.com/2021/03/04/d2d5e983e2961.gif" alt="" />
    </div>
    <button @click="getSpeakData(url, next)" v-if="flag && !loading">
      下一页
    </button>
    <div style="text-align: center; margin-top: 20px" v-else>
      {{ message }}
    </div>
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
      // 用户昵称
      name: '',
      // api路径
      url: '',
      // 总数量
      total: -1,
      // 当前页数
      page: 1,
      flag: true,
      limit: 5,
      message: '正在获取，请稍后！'
    };
  },
  methods: {
    // 获得当前Speak数据
    async getSpeakData(url) {
      try {
        this.loading = true;
        const { data } = await axios.get(url, {
          params: {
            page: this.page,
            limit: this.limit
          }
        });
        this.loading = false;
        this.total = data.data.count;
        this.page = this.page + 1;
        this.speakData = this.speakData.concat(data.data.issue_list);
        if (this.speakData.length == this.total) {
          this.flag = false;
          this.message = '已经到没有更多了！';
        }
      } catch (e) {
        this.flag = false;
        this.message = e;
      }

      // console.log(data);
    }
  },
  async mounted() {
    const { url, name } = Vue.prototype.$speakData;
    this.name = name;
    this.url = url;
    await this.getSpeakData(url);
  },
  computed: {},

  watch: {}
};
</script>

<style scoped>
.loading {
  text-align: center;
}
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