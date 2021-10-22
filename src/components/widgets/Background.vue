<template>
  <div
    class="bg"
    :style="{ filter: 'blur(' + blur + ')', backgroundImage: 'url(' + bgImage + ')' }"
  ></div>
</template>

<style scoped lang="scss">
.bg {
  background-color: #000;
  position: fixed;
  object-fit: cover;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 0;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: ['blur', 'bgImg'],
  setup() {
    // [todo]默认背景和可选本地背景
    return {
      bgImage: require('@/assets/img/bg.jpg')
    }
  }
})
</script>
