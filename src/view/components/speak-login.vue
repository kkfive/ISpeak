<template>
  <div v-if="prosp.visitorId">
    欢迎您，{{ prosp.visitorId === userConfig.author ? '博主' : 'GitHub用户' }}
    <a @click="logout" class="logoutBtn">退出</a>
  </div>
  <div v-else>
    <a class="login" @click="goToLogin">Github授权</a>
  </div>
</template>

<script setup lang="ts">
import { initOptions } from '@/types/parameter'
import { inject, PropType } from 'vue'
const prosp = defineProps({
  visitorId: {
    type: String as PropType<string | null>,
    default: null
  }
})
const userConfig = inject('option') as initOptions
function goToLogin() {
  const currentHref = decodeURIComponent(window.location.href)
  window.location.href =
    `https://github.com/login/oauth/authorize?client_id=${userConfig.githubClientId}&type=github&redirect_uri=` +
    currentHref
}
function logout() {
  window.localStorage.removeItem('ispeak-token')
  window.location.href = userConfig.speakPage || '/speak'
}
</script>

<style lang="scss"></style>
