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
      path: '/search/:keyword',
      name: 'search',
      component: search
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      // 路由对象中的元配置项，可以配置我们所需要的任何数据
      meta: {
        isHidden: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: register,
      meta: {
        isHidden: true
      }
    },
      //重定向
    {
      path: '/',
      redirect: '/home'
    }
  ]
})

// 需要向外暴露一个路由器的对象
export default router

