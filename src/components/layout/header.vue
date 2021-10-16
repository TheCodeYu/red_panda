<template>
  <el-row :gutter="0" justify="space-between">
    <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">Processing Center</el-menu-item>
        <el-sub-menu index="2">
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
    <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
      <div class="grid-content bg-purple"></div>
    </el-col>
    <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
      <el-icon :size="20">
        <i-minus />
      </el-icon>
      <el-icon :size="20">
        <i-close />
      </el-icon>
      <el-icon :size="20">
        <i-close />
      </el-icon>
    </el-col>
  </el-row>
  <div class="header">
    <div class="left">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          Dropdown List
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item icon="el-icon-plus">Action 1</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus">Action 2</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus-outline">Action 3</el-dropdown-item>
            <el-dropdown-item icon="el-icon-check">Action 4</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-check">Action 5</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          Dropdown List
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item icon="el-icon-plus">Action 1</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus">Action 2</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus-outline">Action 3</el-dropdown-item>
            <el-dropdown-item icon="el-icon-check">Action 4</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-check">Action 5</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          Dropdown List
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item icon="el-icon-plus">Action 1</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus">Action 2</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus-outline">Action 3</el-dropdown-item>
            <el-dropdown-item icon="el-icon-check">Action 4</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-check">Action 5</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="center">
      <span class="logo">RXStudio</span>
    </div>
    <div class="right">
      <!-- <el-button  icon="el-icon-minus"/>
      <el-button  icon="el-icon-edit"/>
      <el-button  icon="el-icon-close"/>-->
      <el-icon :size="20" color="#ffffff">
        <i-minus />
      </el-icon>
      <el-icon :size="20" color="#ffffff">
        <i-close />
      </el-icon>
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const activeIndex = ref('1')
    const activeIndex2 = ref('1')
    const handleSelect = (key: unknown, keyPath: unknown) => {
      console.log(key, keyPath)
    }
    return {
      activeIndex,
      activeIndex2,
      handleSelect
    }
  }
})
</script>

<style>
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
