<template>
    <webview
      id="webview"
      :src="app.url"
      :preload="preload"
    />
</template>

<script >
import { defineComponent } from 'vue'
import path from 'path'
import { webviewTag } from 'electron'
export default defineComponent({
  props: {
    app: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      preload: `File://${path.join(process.cwd(), './preload.js')}`
    }
  },
  created() {
    // console.log(this.app.url)
    // console.log(this.preload)
    // console.log(process.cwd())

  },
  mounted() {
    let webview = document.querySelector('webview')
    webview.addEventListener('dom-ready', () => {
      webview.openDevTools()
    })

  }
})
</script>

<style scoped lang="scss">
#webview {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 0;
  color: #333;
  text-shadow: none;
  font-weight: 300;
}

</style>
