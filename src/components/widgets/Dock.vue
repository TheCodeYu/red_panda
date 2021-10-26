<template>
  <div class="footer">
    <div class="space"></div>
    <div class="dock">
      <template v-for="item in dockAppList" :key="item.key">
        <div class="item" @dblclick="openDockApp(item)" :class="nowApp.pid == item.pid ? 'jump' : ''">
          <i
            :style="{
              backgroundColor: item.iconBgColor,
              color: item.iconColor,
            }"
            class="iconfont"
            :class="item.icon"
          ></i>
          <div class="dot" v-if="isAppInOpenList"></div>
          <div class="title">{{ item.title }}</div>
        </div>
      </template>
    </div>
    <div class="space"></div>
  </div>
</template>

<script lang="ts">
import { Application } from '@/model/application'
import { defineComponent } from 'vue'
import { mapMutations, mapState } from 'vuex'
export default defineComponent({
  methods: {
    ...mapMutations('app', ['openApp']),
    openDockApp(item: Application) {
      // this.openApp({ ...item, arg: [] })
      this.$store.commit('app/openApp', item)
    },
    /**
     * @description: APP是否常驻Dock
     */
    isAppInKeepList(app: Application): boolean {
      for (let item of this.dockAppList) {
        if (item.key === app.key) {
          return true
        }
      }
      return false
    }
  },
  computed: {
    ...mapState('app', ['dockAppList', 'openAppList', 'nowApp']),
    /**
     * @description: APP打开
     */
    isAppInOpenList(): boolean {
      for (let item of this.openAppList) {
        if (item.key === arguments[1]) {
          return true
        }
      }
      return true
    }
  }
})
</script>

<style scoped lang="scss">
.dock {
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(20px);
  border-radius: 10px;
  flex-direction: row;
  display: flex;
  padding: 5px;
  margin-bottom: 20px;
  .item {
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .iconfont {
      cursor: pointer;
      border-radius: 20px;
      padding: 2px;
      display: inline-block;
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      height: 36px;
      width: 36px;
      text-align: center;
      font-size: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.3s, margin 0.3s;
    }
  }
  .item:hover {
    .iconfont {
      transform: scale(2) translateY(-10px);
      margin: 0px 15px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
    }
    .title {
      position: absolute;
      display: inherit;
      word-break: keep-all;
      background: rgba(0, 0, 0, 0.3);
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      padding: 5px 10px;
      font-size: 12px;
      animation: dockTitleAnimation 0.5s ease 1 forwards;
    }
  }
  .dot {
    width: 8px;
    height: 8px;
    background: rgba(4, 179, 248, 0.8);
    position: absolute;
    bottom: 0px;
    border-radius: 5px;
    display: inline-block;
    font-size: 0;
  }
  .title {
    display: none;
  }
  .jump {
    animation: jumpAnimation 0.5s ease 1;
    animation-iteration-count: 2;
  }
}
</style>
