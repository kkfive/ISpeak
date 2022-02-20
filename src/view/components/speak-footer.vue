<template>
  <div class="speak-footer">
    Powered by <a :href="homepage" target="_blank">iSpeak</a> v{{ version }}
  </div>
</template>

<script setup>
import { version, homepage } from '../../../package.json'
</script>

<style scoped>
.speak-footer {
  width: 100%;
  text-align: end;
  font-size: 0.75em;
  color: #999999;
  margin-top: 1em;
}
</style>
