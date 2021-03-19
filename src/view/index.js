import Vue from 'vue'
import App from './App.vue'

const render = (data = {}) => {
  Vue.prototype.$speakData = data

  return new Vue({
    render: (h) => h(App)
  }).$mount(data.el || '#ispeak')
}

export { render }
