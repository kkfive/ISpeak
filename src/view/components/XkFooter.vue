<template>
  <div class="xk-footer">
    Powered by <a href="https://xiaokang.me" target="_blank">iSpeak</a> v{{
      version
    }}
  </div>
</template>

<script>
import { version } from '../../../package.json';

export default {
  data() {
    return {
      version
    };
  },
  methods: {},
  mounted() {}
};
</script>

<style scoped>
.xk-footer {
  width: 100%;
  text-align: end;
  font-size: 0.75em;
  color: #999999;
  margin-top: 1em;
}
</style>
