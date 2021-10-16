<template>
  <el-container style="height:100%;position: relative;">
    <el-header height="29px">wq</el-header>
    <el-container style="margin-top: 30px;">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-button type="danger">测试</el-button>
        <router-link to="/">Home</router-link>|
        <router-link to="/about">About</router-link>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
    <el-footer height="29px"></el-footer>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
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
.el-header {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  text-align: center;
  -webkit-app-region: drag;
  position:  fixed;
  width: 100%;
}

.el-footer {
  text-align: center;
  border-top: 1px solid #08090a;
  bottom: 0;
  left: 0;
  padding: 10px 20px;
  position:  fixed;
  width: 100%;
  background: rgb(109, 77, 77);
}

.el-aside {
  background-color: #d3dce6;
  color: var(--el-text-color-primary);
  text-align: center;
  height: 100%;
}

.el-main {
  background-color: #e9eef3;
  color: var(--el-text-color-primary);
  text-align: center;
  height: 100%;
}

html,
body {
  height: 100%;
  margin: 0px;
  background: #f8f8f8;
}
</style>
