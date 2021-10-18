<template>
  <div class="nt__winbar flexbox flex-alignc">
    <div class="nt__winbar-btns">
      <a class="wbtn" title="最小化">
        <i class="iconfont icon-min" v-on:click="click('min')"></i>
      </a>
      <a class="wbtn" :title=" '最大化'" >
        <i class="iconfont" :class="'icon-max'" v-on:click="click('max')"></i>
      </a>
      <a class="wbtn close" title="关闭">
        <i class="iconfont icon-quit" v-on:click="click('close')"></i>
      </a>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { ipcRenderer as ipc } from 'electron'

export default defineComponent({
  name: 'TitleBtn',
  methods: {
    click: function (e: string) {
      console.log(e)
      ipc.send(e)
    }
  }
})
</script>
