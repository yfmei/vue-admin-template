import Vue from "vue/types"
import Vuex from "vuex/types"

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    adminType: ""
  },
  mutations: { // 不能直接调用changeType，需要提交 事件类型和回调函数，回调函数接受state作为第一个参数, 剩余的参数作为它的参数
    // store.commit("changeType", "adminType")
    changeType(state, adminType) {
      state.adminType = adminType
    }
  },
  actions: {

  }
})
export default store
