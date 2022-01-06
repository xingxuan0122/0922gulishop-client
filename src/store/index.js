import Vue from 'vue';
import Vuex from 'vuex';

import user from "./user";
import home from "./home";

Vue.use(Vuex)

// vuex当中的4个核心概念
const state ={
  //存数据
}

const mutations = {
  // 直接修改数据
}

const actions = {
  // 与组件单中用户对接
  // 一般是异步发请求
  // 提交mutation

}

const getters = {
  // 后面用来简化数据的操作
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  // modules 代表模块化
  modules: {
    user,
    home
  }
})

export default store