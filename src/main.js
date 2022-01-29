import Vue from 'vue'
import App from './App'
import router from '@/router'
import store from '@/store'

import 'swiper/css/swiper.css' // 引入swiper的css， 一般是直接在main里面引入

import '@/mock/mockServer' // 引入mockServer, 让模拟的接口生效

// import '@/api'

import TypeNav from '@/components/TypeNav'
import SlideLoop from '@/components/SlideLoop'
// 全局注册的组件，如果一个非路由组件被多个组件使用，那么定义在components，注册在全局
Vue.component('TypeNav', TypeNav)
Vue.component('SlideLoop', SlideLoop)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
