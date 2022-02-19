<template>
  <div id="ispeak" class="ispeak">
    <transition name="fade">
      <xk-issue
        :speakData="speakData"
        :labelList="labelList"
        @comment="showComment"
        v-show="!commentShow"
      />
    </transition>
    <transition name="fade">
      <comments
        :speakData="commentSpeakData"
        v-show="commentShow"
        @closeComment="closeComment"
      ></comments>
    </transition>
    <div class="loading" v-if="loading">
      <img src="https://7.dusays.com/2021/03/04/d2d5e983e2961.gif" alt="" />
    </div>
    <button @click="getSpeakData(url)" v-if="flag && !loading">下一页</button>
    <div
      style="text-align: center; margin-top: 20px"
      v-show="!commentShow"
      v-else
    >
      {{ message }}
    </div>
    <xk-footer />
  </div>
</template>

<script setup lang="ts">
import XkFooter from '@/components/XkFooter.vue'
import XkIssue from '@/components/XkIssue.vue'
import axios from 'axios'

import { inject, onMounted, ref, toRefs } from 'vue'
import { initOptions } from '../../types/parameter'
import Comments from '@/components/comments.vue'
const speakData = ref<any[]>([])
const labelList = ref<any[]>([])

const loading = ref(true)
const url = ref('')
const total = ref(-1)
const page = ref(1)
const flag = ref(true)
const limit = ref(5)
const author = ref('')
const message = ref('正在获取，请稍后！')
const userConfig = inject('option') as initOptions
const commentSpeakData = ref<{}>({})
const commentShow = ref<boolean>(false)
const getSpeakData = async (url) => {
  try {
    loading.value = true
    const { data } = await axios.get(url + 'api/ispeak', {
      params: {
        page: page.value,
        limit: limit.value,
        author: author.value
      }
    })

    loading.value = false
    total.value = data.data.total
    page.value = page.value + 1

    speakData.value.push(...data.data.items)

    if (speakData.value.length >= total.value) {
      flag.value = false
      message.value = '已经到没有更多了！'
    }
    const { data: labelListResult } = await axios.get(
      url + 'api/ispeak/tag/list',
      {
        params: {
          userId: author.value
        }
      }
    )

    labelList.value = labelListResult.data
  } catch (e: any) {
    flag.value = false
    message.value = e
  }
}
onMounted(async () => {
  url.value = userConfig.url
  author.value = userConfig.author
  await getSpeakData(url.value)
})
const showComment = (speakCommentOptions) => {
  commentSpeakData.value = speakCommentOptions
  commentShow.value = true
  window.scroll({ behavior: 'smooth', top: 0 })
}
const closeComment = (data) => {
  commentShow.value = false
  setTimeout(() => {
    document
      .getElementById(data.id)
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  })
}
</script>

<style scoped lang="scss">
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
.ispeak {
  position: relative;
}
.fade-enter-active {
  transition: transform 0.5s ease-out;
}

.fade-enter-from {
  transform: translateY(3px);
}
.fade-leave-to {
  transform: translateY(-3px);
}
</style>
