<template>
  <div class="speak-body">
    <transition name="fade" v-if="speak !== null">
      <speak-comments
        :speak="speak"
        @closeComment="hideCommentHandler"
      ></speak-comments>
    </transition>
    <div class="speak-content" v-else>
      <transition-group name="fade">
        <speak-card
          v-for="speak in props.speakList"
          :key="speak._id"
          :speak="speak"
          @showComment="showCommentHandler"
        />
      </transition-group>
      <card-loading v-show="loading"></card-loading>
      <div class="controller">
        {{ message }}
        <button
          class="next-btn"
          @click="getSpeakData"
          v-if="btnClickFlag && !loading"
        >
          下一页
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SpeakType } from '@/types/speak'
import { PropType, ref, defineEmits, onMounted } from 'vue'
import SpeakCard from './speak-card.vue'
import SpeakComments from '../components/speak-comments.vue'
import CardLoading from '@/view/components/card-loading.vue'
import { lazyloadImage } from '@/utils/lazyload'

const props = defineProps({
  speakList: {
    type: Array as PropType<SpeakType[]>,
    required: true
  },
  message: {
    type: String as PropType<string>
  },
  btnClickFlag: {
    type: Boolean as PropType<boolean>
  },
  loading: {
    type: Boolean as PropType<boolean>
  }
})

const emits = defineEmits(['nextSpeak'])
const speak = ref<null | SpeakType>(null)
const showCommentHandler = (data: SpeakType) => {
  speak.value = data
}
const hideCommentHandler = (data) => {
  speak.value = null
  setTimeout(() => {
    document
      .getElementById(data._id)
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  })
}
const getSpeakData = () => {
  emits('nextSpeak')
}
onMounted(() => {
  console.log('父组件渲染完成')
  lazyloadImage()
})
</script>

<style scoped lang="scss">
.controller {
  text-align: center;
  margin: 1em auto;
  .next-btn {
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
