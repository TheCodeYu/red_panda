
const state = {
  isLogin: false // 当前登录状态
}

const getters = {
}

const mutations = {

  commonUpdate(state: { [x: string]: any }, payload: { [x: string]: any }) :void{

    Object.keys(payload).forEach((key) => {
      state[key] = payload[key]
    })
  }
}

const actions = {

}

/**
 * 全局共享模块之当前登录用户信息
 */
export default {
  namespaced: true,
  state: state,
  mutations: mutations,
  getters: getters,
  actions: actions
}
