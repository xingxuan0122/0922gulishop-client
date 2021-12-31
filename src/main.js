import Vue from 'vue'
import App from './App'
import router from '@/router'
import store from '@/store'



import TypeNav from '@/components/TypeNav'
// 全局注册的组件，如果一个非路由组件被多个组件使用，那么定义在components，注册在全局
Vue.component('TypeNav', TypeNav)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
