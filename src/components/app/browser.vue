<template>
  <div class="demo">
    <iframe :src="app.url"></iframe>
  </div>
</template>

<style scoped lang="scss">
.demo {
  display: flex;
  height: 100%;
  width: 100%;
  color: #333;
  text-shadow: none;
  justify-content: center;
  align-items: center;

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
}
</style>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    app: {
      type: Object,
      required: true
    }
  }

})
</script>
