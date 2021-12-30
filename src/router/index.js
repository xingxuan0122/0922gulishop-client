// 引入并声明使用插件
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 解决 vue-router 报 NavigationDuplicated 错误
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch(err => err)
}

// 懒加载
const home = () => import('@/pages/Home')
const search = () => import('@/pages/Search')
const login = () => import('@/pages/Login')
const register = () => import('@/pages/Register')

const router = new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/search/:keyword?',
      name: 'search',
      component: search,
      // 这个props是我们在路由组件当中操作params参数和query参数的简化方法
      props(route) {
        return {
          keyword: route.params.keyword,
          keyword1: route.query.keyword1
        }
      }
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

