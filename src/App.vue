<template>

    <el-container>
      <el-header height="29px">wq</el-header>

      <el-container>
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">32</el-aside>
        <el-main>12</el-main>
      </el-container>
      <el-footer height="29px"></el-footer>
    </el-container>

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const item = {
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    }

    const tableData = ref(Array(20).fill(item))

    return {
      tableData
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
.el-header{
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  text-align: center;
  -webkit-app-region: drag;
}

.el-footer {
    text-align: center;
    border-top: 1px solid #08090a;
    bottom: 0;
    left: 0;
    padding: 10px 20px;
    position: absolute;
    right: 0;
    background: rgb(109, 77, 77);
}

.el-aside {
  background-color: #d3dce6;
  color: var(--el-text-color-primary);
  text-align: center;
}

.el-main {
  background-color: #e9eef3;
  color: var(--el-text-color-primary);
  text-align: center;
}

body {
  height: 100%;
  margin: 0px;
  background: #f8f8f8;
  height: auto;
  min-height: 100%;
}
</style>
