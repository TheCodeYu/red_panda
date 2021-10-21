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

const app = createApp(App)

app.use(Antd)
app.use(store)
app.use(router)
app.mount('#app')
