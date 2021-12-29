// 引入并声明使用插件
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 懒加载
const home = () => import('@/pages/Home')
const search = () => import('@/pages/Search')
const login = () => import('@/pages/Login')
const register = () => import('@/pages/Register')

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    }
  ]
})

// 需要向外暴露一个路由器的对象
export default router

