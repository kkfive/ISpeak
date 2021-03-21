<template>
  <div class="xk-info">
    <div class="count">
      <i class="iconfont icon-pinlun"></i>
      My Speak({{ count }})
    </div>
    <div class="btn">
      <div id="speak-switch">
        <span class="first">直连</span>
        <span :class="move ? 'switch-btn move' : 'switch-btn'" @click="toggle">
        </span
        ><span class="second">CF代理</span>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
export default {
  props: ['count'],
  data() {
    return {
      move: false
    };
  },
  methods: {
    toggle() {
      this.move = !this.move;
      console.log(this.move);
      localStorage.setItem('speakProxy', this.move);
      Vue.prototype.$eventHub.$emit('toggleProxy', this.move);
    }
  },
  mounted() {
    this.move = localStorage.getItem('speakProxy') === 'true' ? true : false;
  }
};
</script>

<style scoped>
.xk-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.xk-info .count {
  font-weight: 700;
  font-size: 16px;
  /* color: #49b1f5; */
}
.xk-info .count i {
  /* color: black; */
  font-size: 20px;
}

#speak-switch {
  display: inline-block;

  margin: 0.1rem auto 0;
  padding: 0.2rem 0.8rem;
  width: max-content;
  border-radius: 8px;
  background: #f6f8fa;
}

#speak-switch .first {
  color: #49b1f5;
}

#speak-switch .second {
  color: #ff7242;
}

#speak-switch .switch-btn {
  position: relative;
  display: inline-block;
  margin: -4px 0.4rem 0;
  width: 42px;
  height: 22px;
  border-radius: 34px;
  background-color: #49b1f5;
  vertical-align: middle;
  cursor: pointer;
  -webkit-transition: 0.4s;
  -moz-transition: 0.4s;
  -o-transition: 0.4s;
  -ms-transition: 0.4s;
  transition: 0.4s;
}

#speak-switch .switch-btn:before {
  position: absolute;
  bottom: 4px;
  left: 4px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: #fff;
  content: '';
  transition: 0.4s;
}

#speak-switch .switch-btn.move {
  background-color: #ff7242;
}

#speak-switch .switch-btn.move:before {
  transform: translateX(20px);
}

@font-face {
  font-family: 'iconfont';
  src: url('//at.alicdn.com/t/font_2434936_h1orv7ic88t.eot?t=1616336275189'); /* IE9 */
  src: url('//at.alicdn.com/t/font_2434936_h1orv7ic88t.eot?t=1616336275189#iefix')
      format('embedded-opentype'),
    /* IE6-IE8 */
      url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAMUAAsAAAAABswAAALIAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCCcAqBWIFdATYCJAMICwYABCAFhG0HMBsDBsiemjwpUokNLPAZtJlEAoQIov3Yz947VJNLIopHtaRJSyVBhhYowRL5awlvck0zIE7JjQhkMf8FTPMDhUDn5xDUpuZ2E47y4rM+PUz6Di6nP8VbB5TLHJPHBAwsDXCsRZEVSGDeIruI7YlHxHECtXr4M1jLzC8H5jIYF4hbGS0E5g2vLBuJaqGSsjSLFxWq01O6BsBz9v34D0LDnKSiACXbNxkSkPyrB1OMGsoG5wmCt5wZxioKTAEysU+1bjIqolOM1HpRYwPAsQqDX/7LhHvYPx5BVIL8etAlc5+JF/EfNT+BXHSvAy4mXU2aIe6KHBubHndZtXp7q3r9rnz+LG942RidnFhxDUOv0Xh0TCvpfvkKeWkoP6BPE3RtTXlVja+vjjqXj4y6FSxNPCFP/9cWMbjH+Vr8HJw1ut80qkdWEp41nEkP1fYpibiTYR+wW5ODOSm89IJsVvIfIxgL2yCsVPRXsw6wUuzttbP2T3cpoRceFtw8Qi9NSOn5G8O6c2SUFT+SAZQfxUoR8HN/47U4O+XbzW1el8HP1cOZu/zIYJgdqL4FW/AreQObsi8AXcouj2pP1ieFE2oxQAmcrT6mKjvuOxmqddy9vUp3BYVqQ2gmp6BCnVmoVG0Rak3KWl2nDWYkcg0mtEoQmu1D0ugdCs1u0Ey+Q4VO31CpOYyg1mG0bVlnJGSWqxgJCZJAUR2UiTVqihiIZV5YimhGKcR1QUapRFgvC8CQwOB2IgupEV5ihr6aDiWEghTWqGCmdBpSKjVQizVyJCaBUkK0sUFBFO1NgWKNClhahSFCBCIBidSBZMQ01KikM2HZ+XwphMZQEsKcsh5zJQTTk/UOhQgUPADNkqoHlT3KK3rVaKEIggJRMA0VKFMahCgpaUBa+iA5RIwIJJ0Q1ooVhO2oodLA7eWqH8gxqgBVCuxXqHyUqZWMGgA=')
      format('woff2'),
    url('//at.alicdn.com/t/font_2434936_h1orv7ic88t.woff?t=1616336275189')
      format('woff'),
    url('//at.alicdn.com/t/font_2434936_h1orv7ic88t.ttf?t=1616336275189')
      format('truetype'),
    /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
      url('//at.alicdn.com/t/font_2434936_h1orv7ic88t.svg?t=1616336275189#iconfont')
      format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family: 'iconfont' !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-pinlun:before {
  content: '\e61e';
}
</style>
