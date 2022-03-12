<template>
  <div class="xk-speak-container" id="xk-speak-container">
    <!-- <speak-header></speak-header> -->
    <speak-body
      :speakList="speakList"
      @nextSpeak="getSpeakData"
      :btn-click-flag="btnClickFlag"
      :loading="loading"
      :message="message"
    ></speak-body>

    <speak-footer :visitorId="visitorId"></speak-footer>
  </div>
</template>

<script lang="ts" setup>
import SpeakBody from './components/speak-body.vue'
import SpeakFooter from './components/speak-footer.vue'

import { computed, inject, onMounted, reactive, ref } from 'vue'
import { initOptions } from '@/types/parameter'
import { SpeakType, TagType } from '@/types/speak'
const userConfig = inject('option') as initOptions
/**
 * loading状态标识
 */
const loading = ref(false)
/**
 * 下一页btn是否可以点击
 */
const btnClickFlag = ref(true)
/**
 * 获取speak时的请求参数
 */
const axiosGetSpeakParams = reactive({
  author: userConfig.author,
  page: 1,
  pageSize: userConfig.pageSize
})
/**
 * 当前标签列表
 */
const tagList = ref<TagType[]>([])
/**
 * speak数据
 */
const speakList = ref<SpeakType[]>([])
/**
 * speak总数
 */
const speakTotal = ref(0)
/**
 * 当前状态信息描述
 */
const message = ref<string>('')
const visitorId = ref<string | null>(null)
const requestHeaders = computed(() => {
  const jwtToken = window.localStorage.getItem('ispeak-token')
  if (jwtToken) {
    return {
      Authorization: 'Bearer ' + jwtToken
    }
  } else {
    return { Authorization: '' }
  }
})
const getSpeakData = async () => {
  const url = userConfig.api
  try {
    loading.value = true
    /**
     *  author: userConfig.author,
  page: 1,
  pageSize: userConfig.pageSize
     */
    const data = await (
      await fetch(
        `${url}api/ispeak?author=${axiosGetSpeakParams.author}&page=${axiosGetSpeakParams.page}&pageSize=${axiosGetSpeakParams.pageSize}`,
        {
          headers: requestHeaders.value
        }
      )
    ).json()

    loading.value = false
    if (data.data.isLogin) {
      // window.localStorage.removeItem('ispeak-token')
      visitorId.value = data.data.isLogin
    }
    speakTotal.value = data.data.total
    axiosGetSpeakParams.page = axiosGetSpeakParams.page + 1

    speakList.value.push(...data.data.items)

    if (speakList.value.length >= speakTotal.value) {
      message.value = '已经到没有更多了！'
      btnClickFlag.value = false
    }
    const { data: tagListResult } = await (
      await fetch(
        url + 'api/ispeak/tag/list?userId=' + axiosGetSpeakParams.author
      )
    ).json()

    tagList.value = tagListResult.data
  } catch (e: any) {
    btnClickFlag.value = false
    message.value = e
  }
}
onMounted(async () => {
  await getSpeakData()
})
</script>

<style lang="scss"></style>
