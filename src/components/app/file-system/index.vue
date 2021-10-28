<template>
  <a-row class="wrapper">
    <a-col :span="6" >
      <left-bar></left-bar>
    </a-col>
    <a-col :span="12" class="container">
      <div class="header">
        <header>文件管理器</header>
      </div>
    </a-col>
    <a-col :span="6"></a-col>
  </a-row>>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import leftBar from './leftBar.vue'
// 文件管理器
export default defineComponent({
  components: {
    leftBar
  }
})
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter,
.fade-leave {
  opacity: 0;
}
.wrapper {
  height: 100%;
  overflow-y: auto;
}
.ivu-col-span-6 {
  height: 100%;
}
.header {
  padding: 10px;
  header {
    font: bold 20px/150% "Microsoft Yahei";
  }
}
.container {
  position: relative;
  height: 100%;
  .footer-bread {
    position: fixed;
    left: 26%;
    top: 10px;
    z-index: 100;
  }
}
.ivu-table-wrapper {
  border: none !important;
}
</style>
