<template>
  <div class="loading-container">
    <img :src="userConfig.loading_img" />
  </div>
</template>

<script setup lang="ts">
import { initOptions } from '@/types/parameter'
import { inject } from 'vue'
const userConfig = inject('option') as initOptions
</script>

<style lang="scss">
.loading-container {
  width: 200px;
  height: 200px;
  text-align: center;
  margin: 0 auto;
  img {
    height: 100%;
    width: 100%;
  }
}
</style>
