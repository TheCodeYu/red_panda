<template>
  <div id="mytitle">
    <el-row justify="space-between">
      <el-col :span="6">
        <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect" menu-trigger="click">
          <el-menu-item index="1">Processing Center</el-menu-item>
          <el-sub-menu index="2" menu-trigger="hover">
            <template #title>Workspace</template>
            <el-menu-item index="2-1">item one</el-menu-item>
            <el-menu-item index="2-2">item two</el-menu-item>
            <el-menu-item index="2-3">item three</el-menu-item>
            <el-sub-menu index="2-4">
              <template #title>item four</template>
              <el-menu-item index="2-4-1">item one</el-menu-item>
              <el-menu-item index="2-4-2">item two</el-menu-item>
              <el-menu-item index="2-4-3">item three</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-menu-item index="3" disabled>Info</el-menu-item>
          <el-menu-item index="4">Orders</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple-light">3222222222222222222222</div>
      </el-col>
      <el-col :span="6">
        <TitleBtn />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import TitleBtn from '../widgets/TitleBtn.vue'
const remote = require('electron').remote
const Menu = remote.Menu
const temp = [{
  label: '文件'
},
{
  label: '文件1'
}, {
  label: '文件2'
}]
const m = Menu.buildFromTemplate(temp)
Menu.setApplicationMenu(m)
window.addEventListener('contextmenu', (e) => {
  e.preventDefault()
  m.popup({ window: remote.getCurrentWindow() })
})
export default defineComponent({
  name: 'Header',
  setup() {
    const activeIndex = ref('1')
    const activeIndex2 = ref('1')
    const handleSelect = (key: any, keyPath: any) => {
      console.log(key, keyPath)
    }
    return {
      activeIndex,
      activeIndex2,
      handleSelect
    }
  },
  mounted() {

  },
  methods: {
  },
  components: {
    TitleBtn
  }
})
</script>

<style>
#mytitle {
  width: 100%;
  background-color: aquamarine;
  -webkit-app-region: drag;
}
.el-menu {
  -webkit-app-region: no-drag;
}
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}

.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
