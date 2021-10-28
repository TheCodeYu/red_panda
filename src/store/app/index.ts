import AppModel from '@/model/index'
const state = {
  dockAppList: [],
  openAppList: [],
  nowApp: {}
}

const getters = {

}

const mutations = {

  /**
   * @description 双击文件或者按钮根据后缀名打开对应的软件
   * @param state
   * @param app App参数
   */
  openApp(state: { [x: string]: any }, app: { [x: string]: any }): void {

    // 打开外部链接，禁用
    if (app.outLink) {

    }
    app.hide = false
    let isExist = false // 判断是否已经打开
    for (let i in state.openAppList) {
      if (state.openAppList[i].key === app.key) {
        isExist = true
        break
      }
    }
    if (isExist) {
      // this.showApp(state, app)
      (this as any).commit('app/showApp', app) // 解决编译器不过的问题
    } else {
      app.pid = (Math.random() * 99999999)
      app = JSON.parse(JSON.stringify(app))
      state.openAppList.push(app)
      let isExistDock = false
      for (let i in state.dockAppList) {
        if (state.dockAppList[i].key === app.key) {
          // dock里已经有相同的应用了 不push
          isExistDock = true
          break
        }
      }
      if (!isExistDock) {
        state.dockAppList.push(app)
      }
      state.nowApp = JSON.parse(JSON.stringify(app))
    }
  },
  showApp(state: { [x: string]: any }, app: { [x: string]: any }): void {

    state.nowApp = JSON.parse(JSON.stringify(app))
  },
  /**
   * @description 获取常驻Dock的APP列表
   * @param state
   */
  getDockAppList(state: { [x: string]: any }): void {
    let arr = []
    let appList = AppModel.appList
    for (let app of appList) {
      if (app.keepInDock) {
        arr.push(app)
      }
    }
    state.dockAppList = arr
  }
}

const actions = {

}
/**
 * 全局共享模块之APP的相关操作
 */
export default {
  namespaced: true,
  state: state,
  mutations: mutations,
  getters: getters,
  actions: actions
}
