import { createStore } from 'vuex'
import global from './global'
import user from './user'
import app from './app'
/**
 * @description 运行时数据存储方法
 * state?: S | (() => S);         存储基本数据
 * getters?: GetterTree<S, S>;    从基本数据(state)派生的数据，相当于state的计算属性
 * actions?: ActionTree<S, S>;    包含异步操作（请求API方法）、回调函数提交mutaions更改state数据状态，使之可以异步。
 * mutations?: MutationTree<S>;   store中更改state数据状态的唯一方法（mutations必须是同步函数）
 * modules?: ModuleTree<S>;       模块化Vuex（将store分割成不同的模块）
 * plugins?: Plugin<S>[];
 * strict?: boolean;
 * devtools?: boolean;
 */
export default createStore({
  modules: {
    global,
    user,
    app
  },
  strict: process.env.NODE_ENV !== 'production'
})
