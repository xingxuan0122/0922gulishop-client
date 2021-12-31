// 这个是user的vuex模块

// vuex当中的4个核心概念
const state ={
  //存数据
}

const mutation = {
  // 直接修改数据
}

const action = {
  // 与组件单中用户对接
  // 一般是异步发请求
  // 提交mutation
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