import { createApp } from 'vue'
import ElementPlus from 'element-plus'
// import 'element-plus/lib/theme-chalk/index.css'
import 'element-plus/dist/index.css'

// 引入公共样式
import '@/assets/fonts/iconfont.css'
import '@/assets/css/app.css'
import '@/assets/css/layout.css'
import '@/assets/css/reset.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import App from './App.vue'
import router from './router'
import store from './store'

createApp(App).use(ElementPlus, { locale: zhCn }).use(store).use(router).mount('#app')
