import { createStore } from 'vuex'

export default createStore({
  state: {
    isWinMaximize: false
  },
  mutations: {
    SET_WINMAXIMIZE(state, data) {
      state.isWinMaximize = data
    }
  },
  actions: {
  },
  modules: {
  }
})
