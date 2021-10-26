import state from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

/**
 * 全局共享模块之软件配置
 */

export default {
  namespaced: true, // 加入namespaced属性为true，则之后在不同页面中引入getter、actions、mutations时，需要加上所属的模块名
  state: state,
  mutations: mutations,
  getters: getters,
  actions: actions
}
