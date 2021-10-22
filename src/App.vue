<template>
  <a-config-provider :locale="locale">
    <div class="panda" @mousedown.self="boot" @contextmenu.prevent="onContextShow()">
      <transition name="fade">
        <Background v-if="isBg"/>
      </transition>
      <transition name="fade">
        <Loading v-if="isLoading" @loaded="loaded"/>
      </transition>
      <transition name="fade">
        <Login v-if="isLogin" @logined="logined"/>
      </transition>
      <transition name="fade">
      <DeskTop
        v-if="isDeskTop"
        @lockScreen="lockScreen"
        @shutdown="shutdown"
        @logout="logout"
      />
    </transition>
    </div>
  </a-config-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import Background from '@/components/widgets/Background.vue'
import Loading from '@/components/widgets/Loading.vue'
import Login from '@/components/widgets/Login.vue'
import DeskTop from '@/components/widgets/DeskTop.vue'
export default defineComponent({
  data() { // setup直接声明的变量是非响应式的
    return {
      locale: zhCN,
      isBg: false,
      isLoading: false,
      isLogin: false,
      isDeskTop: false
    }
  },
  created() {
    this.boot()
  },
  methods: {
    /**
     * @description: 鼠标右键拦截
     */
    onContextShow() {
      console.log('onContextShow')
    },
    /**
     * @description: 开机加载通用配置及环境变量
     */
    boot() {
      this.isLoading = true
    },
    /**
     * @description: 加载完成进入登录界面
     */
    loaded() {
      this.isLoading = false
      this.isBg = true
      this.isLogin = true
    },
    /**
     * @description: 登录成功，按照账号信息显示对应的资料
     */
    logined() {
      this.isLogin = false
      this.isDeskTop = true
    },
    /**
     * @description: 锁定屏幕
     */
    lockScreen() {
      this.isLogin = true
    },
    /**
     * @description: 退出登录，用于切换账户
     */
    logout() {
      this.isDeskTop = false
      this.isLogin = true
    },
    /**
     * @description: 关机并保存一些通用配置及关机信息
     */
    shutdown() {
      this.isDeskTop = false
      this.isLogin = false
      this.isLoading = false
      this.isBg = false
    }
  },
  components: {
    Background,
    Loading,
    Login,
    DeskTop
  }
})
</script>

<style scoped lang="scss">
.panda {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
