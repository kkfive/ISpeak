<template>
  <div class="speak-footer">
    Powered by <a :href="homepage" target="_blank">iSpeak</a> v{{ version }}
    <div v-if="prosp.visitorId">
      欢迎您，{{
        prosp.visitorId === userConfig.author ? '博主' : 'GitHub用户'
      }}
      <a @click="logout" class="logoutBtn">退出</a>
    </div>
    <div v-else>
      <a class="login" @click="goToLogin">Github授权</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, PropType } from 'vue'
import { version, homepage } from '../../../package.json'
import { initOptions } from '@/types/parameter'
const prosp = defineProps({
  visitorId: {
    type: String as PropType<string | null>,
    default: null
  }
})

const userConfig = inject('option') as initOptions
function GetQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var r = decodeURIComponent(window.location.search).substring(1).match(reg)
  if (r != null) return decodeURIComponent(r[2])
  return null
}
function goToLogin() {
  const currentHref = decodeURIComponent(window.location.href)
  window.location.href =
    'https://github.com/login/oauth/authorize?client_id=Iv1.1a4e5a689816a636&type=github&redirect_uri=' +
    currentHref
}
function logout() {
  window.localStorage.removeItem('ispeak-token')
  window.location.href = userConfig.speakPage || '/speak'
}

onMounted(async () => {
  const code = GetQueryString('code')

  if (code) {
    const result = await (
      await fetch(userConfig.api + 'api/user/oauth/github?code=' + code)
    ).json()
    if (result.data?.token) {
      window.localStorage.setItem('ispeak-token', result.data.token)
    }
    console.log(result)

    location.href = userConfig.speakPage || '/speak'
  }
})
</script>

<style scoped lang="scss">
.speak-footer {
  width: 100%;
  text-align: end;
  font-size: 0.75em;
  color: #999999;
  margin-top: 1em;
  .login {
    cursor: pointer;
  }
}
</style>
