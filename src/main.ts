import { createApp } from 'vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

// 引入公共样式
import '@/assets/fonts/iconfont.css'
import '@/assets/css/layout.css'
import '@/assets/css/app.css'
import '@/assets/css/animation.css'

import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)
app.use(ElementPlus, { locale: zhCn })
app.use(store)
app.use(router)
app.mount('#app')
