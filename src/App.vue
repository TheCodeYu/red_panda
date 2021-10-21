<template>
  <a-config-provider :locale="locale">
    <div class="desktop" @mousedown.self="boot" @contextmenu.prevent="onContextShow()"></div>
    <transition name="fade">
      <Background v-if="isBg"></Background>
    </transition>
    <transition name="fade">
      <Loading v-if="isLoading" @loaded="loaded"></Loading>
    </transition>
  </a-config-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import Background from '@/components/widgets/Background.vue'
import Loading from '@/components/widgets/Loading.vue'
export default defineComponent({
  setup() {
    return {
      locale: zhCN,
      isBg: true,
      isLoading: false,
      isLogin: false,
      isDeskTop: false
    }
  },
  created() {
    this.boot()
  },
  methods: {
    onContextShow() {
      console.log('onContextShow')
    },
    boot() {
      this.isLoading = true
    },
    loaded() {
      this.isLoading = false
      this.isBg = true
      this.isLogin = true
    }
  },
  components: {
    Background,
    Loading
  }
})
</script>

<style scoped lang="scss">
.desktop {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
