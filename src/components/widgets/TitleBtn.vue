<template>
  <div class="nt__winbar flexbox flex-alignc">
    <div class="nt__winbar-btns">
      <a class="wbtn" title="最小化">
        <i class="iconfont icon-min" v-on:click="click('win-min')"></i>
      </a>
      <a class="wbtn" :title="store.state.isWinMaximize ? '向下还原' : '最大化'" >
        <i class="iconfont" :class="store.state.isWinMaximize ? 'icon-restore' : 'icon-max'" v-on:click="click('win-max')"></i>
      </a>
      <a class="wbtn close" title="关闭">
        <i class="iconfont icon-quit" v-on:click="click('win-close')"></i>
      </a>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { ipcRenderer as ipc } from 'electron'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'TitleBtn',
  setup() {
    const store = useStore()
    return {
      store
    }
  },
  mounted() {
    const isMax = localStorage.getItem('isWinMaximize') || this.store.state.isWinMaximize
    this.store.commit('SET_WINMAXIMIZE', isMax)
  },
  methods: {
    click: function (e: string) {
      ipc.send(e)
      if (e === 'win-max') {
        this.store.commit('SET_WINMAXIMIZE', !this.store.state.isWinMaximize)
      }
    }
  }
})
</script>
