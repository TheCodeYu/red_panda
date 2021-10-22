import { createApp } from 'vue'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

// 引入公共样式
// import '@/assets/fonts/iconfont.css'
import '@/assets/css/icon-font.css'
import '@/assets/css/layout.css'
import '@/assets/css/app.css'
import '@/assets/css/animation.css'

import App from './App.vue'
import router from './router'
import store from './store'
import Http from './utils/http'
import Tools from './utils/tools'

const app = createApp(App)

/**
 * @description ts对变量进行检测，此加入去除编译器检查
 * 考虑是不是要做成class
 */
declare module '@vue/runtime-core'{
  interface ComponentCustomProperties {
    $tools: any,
    $http: any
  }
}
app.config.globalProperties.$tools = Tools
app.config.globalProperties.$http = Http

app.use(Antd)
app.use(store)
app.use(router)
app.mount('#app')
