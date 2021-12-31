import {reqCategoryList} from '@/api'

// 这个是home的vuex模块

// vuex当中的4个核心概念
const state ={
  //存数据
  categoryList: []
}

const mutation = {
  // 直接修改数据
  RECEIVE_CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList
  }
}

const action = {
  // 与组件单中用户对接
  // 一般是异步发请求
  // 提交mutation
  async getCategoryList({commit}) {
    // 发请求拿数据，提交给mutation,存储到state
    // await和async作用
    // 通过同步代码实现异步效果，可读性强
    // .then().catch()不是说不能用，而是可读性不强，里面还是有异步代码（异步回调函数）
    const result = await reqCategoryList()
    if(result.code === 200) {
      commit('RECEIVE_CATEGORYLIST',result.data)
    }
  }
}

const getters = {
  // 后面用来简化数据的操作
}

export default {
  state,
  mutation,
  action,
  getters
}