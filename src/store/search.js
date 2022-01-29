import {reqSearchInfo} from '@/api'
// 这个是search的vuex模块

// vuex当中的4个核心概念
const state ={
  //存数据
  searchInfo: {}
}

const mutations = {
  // 直接修改数据
  RECEIVE_SEARCHINFO(state, searchInfo) {
    state.searchInfo = searchInfo
  }
}

const actions = {
  // 与组件单中用户对接
  // 一般是异步发请求
  // 提交mutation
  async getSearchInfo({commit}, searchParams) {
    // searchParams 这个参数，是用户发请求的时候，也就是dispatch的时候给我们传递的对象
    // 这个参数在actions的函数当中只能放在{commit}后面
    const result = await reqSearchInfo(searchParams)
    if(result.code === 200) {
      commit('RECEIVE_SEARCHINFO', result.data)
    }
  }
}

const getters = {
  // 后面用来简化数据的操作
  // 为什么要getters，是因为我们获取的数据内部结构比较复杂，使用起来不方便，甚至会出现小问题（假报错）
  // 所以我们拿到复杂的数据之后，会把这个数据先做计算，计算出来我们药直接使用高德数据，简化数据操作
  attrsList(state) {
    return state.searchInfo.attrsList || [] // 是为了后期不出现假报错，所以给[]
  },
  goodsList(state) {
    return state.searchInfo.goodsList || []
  },
  trademarkList(state) {
    return state.searchInfo.trademarkList || []
  },
}

export default {
  state,
  mutations,
  actions,
  getters
}