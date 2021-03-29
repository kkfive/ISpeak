<!--
 * @description: 顶部手风琴组件
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2021-03-23 10:53:04
 * @LastEditTime: 2021-03-29 12:56:47
 * @LastEditors: 小康
 * comments: code modify from:https://tomotoes.com/blog/weibo/
-->

<template>
  <div class="about-container collapse collapse-init">
    <p class="about-title">Details &amp; Summary</p>
    <!-- 关于speak -->
    <details v-bind:class="{ 'panel-active': first, '': !first }">
      <summary @click="toggle('first')">
        <span role="img" aria-label="about-content">🎉关于Speak</span>
      </summary>
      <transition name="fade">
        <div class="details-wrapper" style="">
          <div class="details-styling">
            <p>这是关于小康的Speak</p>
            <p>speak对我来说的意义是一个想法集，而哔哔则是一个吐槽记录。</p>
          </div>
        </div>
      </transition>
    </details>
    <!-- 关于内容 -->
    <details v-bind:class="{ 'panel-active': second, '': !second }">
      <summary @click="toggle('second')">
        <span role="img" aria-label="about-content">✨关于内容</span>
      </summary>
      <transition name="fade">
        <div class="details-wrapper" style="">
          <div class="details-styling">
            <p>目前，微博共有{{ labelList.count }}个分类，具体如下：</p>
            <div class="labels-container">
              <template v-for="label in labelList.label_list">
                <span
                  class="labels-label"
                  :style="
                    'background-color: #' +
                    label.color +
                    '; color: ' +
                    formatFontColor(label.color) +
                    ';'
                  "
                  :key="label.label_id"
                  >{{ label.name }}</span
                >
              </template>
            </div>
          </div>
        </div>
      </transition>
    </details>
  </div>
</template>

<script>
export default {
  props: ['labelList'],
  data() {
    return {
      first: false,
      second: false
    };
  },
  methods: {
    toggle(attr) {
      this[attr] = !this[attr];
    },
    formatFontColor: (color) => {
      color = '#' + color;
      var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
      // eslint-disable-next-line no-extend-native
      String.prototype.colorRgb = function () {
        var sColor = this.toLowerCase();
        if (sColor && reg.test(sColor)) {
          if (sColor.length === 4) {
            var sColorNew = '#';
            for (var i = 1; i < 4; i += 1) {
              sColorNew += sColor
                .slice(i, i + 1)
                .concat(sColor.slice(i, i + 1));
            }
            sColor = sColorNew;
          }
          //处理六位的颜色值
          var sColorChange = [];
          for (var i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)));
          }
          return 'RGB(' + sColorChange.join(',') + ')';
        } else {
          return sColor;
        }
      };
      var flag = 'white';
      var rgbColor = color.colorRgb();

      rgbColor = rgbColor.replace('RGB(', '');
      rgbColor = rgbColor.replace(')', '');
      var temp = rgbColor.split(',');
      if (parseInt(temp[0]) + parseInt(temp[1]) + parseInt(temp[2]) > 450) {
        // console.log(parseInt(temp[0]) + parseInt(temp[1]) + parseInt(temp[2]));
        flag = 'black';
      }
      return flag;
    }
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
/*
  Please wrap your collapsible content in a single element or so help me
  Must add a transition or it breaks because that's the whole purpose of this
  Only one transition-duration works (see explanation on line #141 in JS)
  You can add more to an inner wrapper (.details-styling)
*/
.collapse-init summary + * {
  transition: all 0.25s ease-in-out;
  overflow: hidden;
}
/*
  Closed state. Any CSS transitions work here
  The JS has a height calculation to make sliding opened/closed easier, but it's not necessary
  Remove the height prop for a simple toggle on/off (after all that work I did for you?)
*/
.collapse-init :not(.panel-active) summary + * {
  height: 0;
  opacity: 0;
  -webkit-transform: scale(0.9);
  transform: scale(0.9);
  transform-origin: bottom center;
}
.collapse-init summary {
  list-style: none;
}
.collapse-init summary::-webkit-details-marker {
  display: none;
}
.collapse-init summary::before {
  display: none;
}
.collapse-init summary {
  cursor: pointer;
}
/*
  This element exists so .details-wrapper has no extra margin/padding that can screw with the smooth height collapse
  You can style .details-wrapper decoratively but avoid anything that modifies the box and add it to .details-styling instead
  Otherwise, this element is totally optional. Remove if you hate divitis
*/
.details-styling {
  padding: 1em;
}
.details-styling .labels-container {
  display: flex;
  flex-wrap: wrap;
}
.details-styling .labels-container .labels-label {
  padding: 3px 10px;
  border-radius: 5px;
  margin-right: 10px;
  margin-bottom: 10px;
}
.about-container {
  user-select: none;
  padding: 1em 1.5em;
  margin-top: 2em;
  transition: all 0.25s ease;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0.625em 3.75em 0 rgba(255, 255, 255, 0.2);
  transition: all 0.25s ease 0.2s,
    transform 0.5s cubic-bezier(0.6, 0.2, 0.1, 1) 0.2s;
  font-size: 1em;
  letter-spacing: 1px;
}
.about-container ol {
  list-style: decimal !important;
}
.about-container ul {
  list-style: circle !important;
}
.about-container:hover {
  /* box-shadow: 0 1em 4em 0.5em #d7d7d7; */
  transform: translatey(-3px);
}
.about-container code {
  background: rgba(232, 125, 143, 0.1);
  color: #e96384;
}
.about-container summary {
  cursor: pointer;
  font-size: 1.1em;
}
.about-container summary :focus {
  outline: none;
}
.about-container summary::-webkit-details-marker {
  display: none;
}
.about-container a {
  color: #8f63e9;
  box-shadow: inset 0 -3px #cfbcf5;
  font-weight: 700;
  text-decoration: none;
  transition: 0.2s;
}
.about-container a:hover,
.about-container a:focus {
  box-shadow: inset 0 -1.2em #8f63e9;
  color: #f8f5fe;
}
.about-container p {
  margin-top: 0;
  margin-bottom: 1em;
}
.about-container p:last-child {
  margin-bottom: 0;
}
.about-container .about-title {
  font-size: 1.8em;
  margin-bottom: 0.3em;
  text-align: center;
}
.about-container abbr {
  font-variant: small-caps;
  text-transform: lowercase;
  font-size: 1.2em;
}
.about-container [type='checkbox'] {
  opacity: 0;
  position: absolute;
  width: 0;
  height: 0;
}
.about-container [type='checkbox'] + label {
  background: #efe7fd;
  border-left: 4px solid #a7a7a7;
  cursor: pointer;
  display: block;
  font-size: 1rem;
  font-weight: 700;
  text-align: left;
  transition: 0.1s;
  padding: 0.75em 1em;
}
.about-container [type='checkbox'] + label::before {
  border: 2px solid;
  border-radius: 2px;
  color: #a7a7a7;
  content: '';
  display: inline-block;
  margin-right: 0.75ch;
  transition: 0.1s;
  width: 1ch;
  height: 1ch;
  vertical-align: baseline;
}
.about-container [type='checkbox']:focus + label {
  outline: 2px solid #a7a7a7;
}
.about-container [type='checkbox']:checked + label::before {
  background: currentColor;
  box-shadow: inset 0 0 0 2px #fff;
}
.about-container .container {
  box-shadow: 0.2em 1em 2em -1em #d6d1e0;
  margin: 2.4em 0;
}
.about-container details {
  border-bottom: 2px solid #d6d1e0;
  list-style: none;
}

.about-container summary {
  display: block;
  transition: 0.2s;
  padding: 1em;
  letter-spacing: 2px;
}
.about-container summary:hover {
  background-color: #f0f0f0;
}
.about-container summary:focus {
  outline: none;
}
.about-container summary:hover::after {
  content: '';
  top: auto;
}
.about-container summary::after {
  border-right: 2px solid;
  border-bottom: 2px solid;
  content: '';
  float: right;
  width: 0.5em;
  height: 0.5em;
  margin-top: 0.25em;
  transform: rotate(45deg);
  transition: inherit;
}
.about-container [open] summary {
  background: #a7a7a7;
  color: #fff;
  font-size: 1.2em;
}
.about-container [open] summary::after {
  margin-top: 0.5em;
  transform: rotate(225deg);
}
</style>