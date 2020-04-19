// 1.引入vuex
import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

// 2.使用插件
Vue.use(Vuex)

const state = {
  cartList: []
};

// 3.创建vuex实例对象
const store = new Vuex.Store({
  state,

  //mutations 唯一的目的就是修改state中的状态
  //mutations 中的方法尽可能完成的比较单一点
  mutations,

  //actions 是处理异步请求，也可以处理判断逻辑
  actions,
  getters,
})

// 4.挂在实例
export default store
