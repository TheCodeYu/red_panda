<template>
  <div class="desktop">
    <div class="top">
      <a-dropdown :trigger="['click']">
        <div class="logo" @click="hideAllController();">
          <i class="iconfont icon-apple1"></i>
        </div>
        <template #overlay>
          <a-menu>
            <a-menu-item @click="openAppByKey('system_about')">
              <div>关于本站</div>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item @click="openAppByKey('system_setting')">
              <div>系统偏好设置</div>
            </a-menu-item>
            <a-menu-item @click="openAppByKey('system_task')">
              <div>强制退出...</div>
            </a-menu-item>
            <a-menu-item @click="lockScreen">
              <div>锁定屏幕</div>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item @click="shutdown">
              <div>关机...</div>
            </a-menu-item>
            <a-menu-item @click="logout">
              <div>退出登录 {{ userName }}...</div>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      <div class="menu" v-for="item in menu" :key="item.value">
        <a-dropdown :trigger="['click']">
          <div class="item" @click="hideAllController();">{{ item.title }}</div>
          <template #overlay>
            <a-menu>
              <template v-for="subItem in item.sub" :key="subItem.value">
                <a-menu-divider v-if="subItem.isLine" />
                <a-menu-item v-else>
                  <div>{{ subItem.title }}</div>
                </a-menu-item>
              </template>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
      <div class="space"></div>
      <div class="status">
        <div class="audio">
          <i
            class="iconfont icon-changyongtubiao-xianxingdaochu-zhuanqu-39"
            @click="showOrHideVolumn"
          ></i>

          <transition name="fade">
            <a-slider
              class="slider"
              v-show="isVolumnShow"
              :value="volumn"
              reverse
              vertical
              @change="handleChange"
            />
          </transition>
        </div>
        <div class="datetime" @click.self="showOrHideCalendar">
          {{ timeString }}
          <transition name="fade">
            <a-calendar
              class="calendar"
              v-model="nowDate"
              v-if="isCalendarShow"
              :fullscreen="false"
              @select="selectDay"
            />
          </transition>
        </div>
        <div class="notification">
          <i class="iconfont icon-changyongtubiao-xianxingdaochu-zhuanqu-25"></i>
        </div>
      </div>
    </div>
    <div
      class="body"
      @contextmenu.prevent.self="
  hideAllController();
openMenu($event);
      "
      @click.stop="hideAllController()"
    >
      <!-- <div class="desktop-app">
        <template v-for="item in deskTopAppList" :key="item.key">
          <div
            class="app-item"
            v-on:dblclick="$store.commit('openApp', item)"
            v-if="!item.hideInDesktop"
          >
            <div class="icon">
              <i
                :style="{
                  backgroundColor: item.iconBgColor,
                  color: item.iconColor,
                }"
                class="iconfont"
                :class="item.icon"
              ></i>
            </div>
            <div class="title">{{ item.title }}</div>
          </div>
        </template>
      </div>-->
      <transition-group name="fade-window">
        <template v-for="item in openAppList" :key="item.pid">
          <App
            v-show="!item.hide"
            :app="item"
          ></App>
        </template>
      </transition-group>
      <transition name="fade-menu">
        <div
          v-show="rightMenuVisible"
          :style="{ left: rightMenuLeft + 'px', top: rightMenuTop + 'px' }"
          class="contextmenu"
        >
          <div @click="lockScreen">锁定屏幕...</div>
          <hr />
          <div @click="openAppByKey('system_setting')">系统偏好设置...</div>
          <div @click="openAppByKey('system_task')">强制退出...</div>
          <hr />
          <div @click="('即将上线，敬请期待')">设置壁纸...</div>
          <div @click="openAppByKey('system_about')">关于我们</div>
        </div>
      </transition>
    </div>
    <Dock></Dock>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { mapMutations, mapState } from 'vuex'
import Dock from './Dock.vue'
import App from './App.vue'
export default defineComponent({
  data() {
    let volumnDelayTimer: any
    let volumn = 80 // 读取初始化音量
    let menu: any
    return {
      isCalendarShow: false,
      nowDate: new Date(),
      volumnDelayTimer,
      volumn,
      isVolumnShow: false,
      rightMenuVisible: false,
      rightMenuLeft: 0,
      rightMenuTop: 0,
      userName: '',
      menu,
      timeString: '',
      deskTopAppList: [],
      deskTopMenu: [
        {
          key: 'desktop',
          title: '桌面',
          sub: [
            {
              key: 'big_icon',
              title: '大图标'
            },
            {
              key: 'big_icon',
              title: '小图标'
            },
            {
              isLine: true
            },
            {
              key: 'align_left',
              title: '左侧排列'
            },
            {
              key: 'align_right',
              title: '右侧排列'
            },
            {
              isLine: true
            },
            {
              key: 'wall',
              title: '更换壁纸...'
            }
          ]
        }
      ]
    }
  },
  created() {
    this.menu = this.deskTopMenu
    this.userName = localStorage.getItem('user_name') || ''
    // this.deskTopAppList = this.tool.getDeskTopApp()
    this.startTimer()
    this.getDockAppList()
    // this.$store.commit('app', 'getDockAppList')
  },
  methods: {
    ...mapMutations('app', ['getDockAppList']),
    /**
     * @description: 显示或隐藏日历
     */
    showOrHideCalendar() {
      this.isCalendarShow = !this.isCalendarShow
    },
    /**
     * @description: 显示或隐藏音量操作
     */
    showOrHideVolumn() {
      this.hideAllController()
      this.isVolumnShow = !this.isVolumnShow
      this.volumn = 50
      if (this.isVolumnShow) {
        clearTimeout(this.volumnDelayTimer)
        this.volumnDelayTimer = setTimeout(() => {
          this.isVolumnShow = false
        }, 3000)
      }
    },
    handleChange(volumn: number) {
      this.volumn = volumn
      clearTimeout(this.volumnDelayTimer)
      this.volumnDelayTimer = setTimeout(() => {
        this.isVolumnShow = false
      }, 3000)

    },
    /**
     * @description 选择一个日期增加日志
     */
    selectDay(date: Date) {
      console.log(date)
    },
    /**
     * @description: 隐藏所有弹出的控制器
     */
    hideAllController() {
      this.isVolumnShow = false
      this.rightMenuVisible = false
      this.isCalendarShow = false
    },
    /**
     * @description: 打开右键菜单
     */
    openMenu(e: { clientX: number; clientY: number }) {
      // console.log((this.$refs.contextmenu as any).offsetWidth)
      // console.log((this.$refs.contextmenu as any).offsetHeight)
      const menuMinWidth = 200
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const offsetWidth = this.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = e.clientX - offsetLeft // margin right

      if (left > maxLeft) {
        this.rightMenuLeft = maxLeft
      } else {
        this.rightMenuLeft = left
      }

      this.rightMenuTop = e.clientY - 30
      this.rightMenuVisible = true
    },
    /**
     * @description: 打开时间计时器
     */
    startTimer() {
      setInterval(() => {
        this.timeString = this.$tools.formatTime(new Date(), 'MM-dd HH:mm')
      }, 1000)
    },
    /**
     * @description: 打开指定key的应用
     */
    openAppByKey(key: string) {
      this.$http.a(key)
      // this.$store.commit('openAppByKey', key)
    },
    /**
     * @description: 锁定屏幕
     */
    lockScreen() {
      this.$emit('lockScreen')
    },
    /**
     * @description: 关机
     */
    shutdown() {
      this.$emit('shutdown')
    },
    /**
     * @description: 注销登录
     */
    logout() {
      this.$emit('logout')
    }
  },
  components: {
    Dock,
    App
  },
  computed: {
    ...mapState('app', ['openAppList'])
  }
})
</script>

<style scoped lang="scss">
.desktop {
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  color: white;
  overflow: hidden;
  text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
  .top {
    height: 28px;
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(20px);
    display: flex;
    flex-direction: row;
    font-size: 14px;
    align-items: center;
    justify-content: center;
    padding: 0px 5px;
    z-index: 100;
    .logo {
      height: 100%;
      align-items: center;
      justify-content: center;
      padding: 0px 15px;
      cursor: pointer;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      .iconfont {
        font-size: 16px;
        margin-top: -3px;
      }
      .a-select {
        position: absolute;
        opacity: 0;
      }
    }

    .logo:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
    .space {
      flex-grow: 1;
    }
    .menu {
      display: flex;
      flex-direction: row;
      font-size: 13px;
      height: 100%;
      font-weight: 500;
      .item {
        font-size: 13px;
        padding: 0px 15px;
        display: inline-block;
        flex-grow: 1;
        cursor: pointer;
        display: flex;
        height: 100%;
        align-items: center;
        justify-content: center;
      }
      .item:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }

    .status {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      height: 100%;

      .audio {
        cursor: pointer;
        padding: 0px 10px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        position: relative;
        .iconfont {
          font-size: 20px;
        }
        .slider {
          position: absolute;
          top: 32px;
          height: 80px;
        }
      }
      .audio:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
      .datetime {
        cursor: pointer;
        padding: 0px 10px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        position: relative;
        .calendar {
          color: #333;
          background: rgba(255, 255, 255, 0.98);
          position: fixed;
          top: 40px;
          right: 20px;
          width: 500px;
          border-radius: 10px;
        }
      }
      .datetime:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
      .notification {
        cursor: pointer;
        padding: 0px 10px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        .iconfont {
          font-size: 20px;
        }
        .notification:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }
      }
    }
  }

  .body {
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: relative;
    .desktop-app {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-end;
      padding: 20px;
      flex-wrap: wrap-reverse;
      .app-item {
        padding: 10px 0px;
        flex-direction: column;
        text-align: center;
        text-shadow: 0px 0px 2px rgb(0 0 0 / 50%);
        cursor: pointer;
        border-radius: 10px;
        border: 2px solid transparent;
        justify-content: center;
        align-items: center;
        width: 80px;
        .icon {
          border-radius: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
        }
        .iconfont {
          font-size: 28px;
          border-radius: 10px;
          padding: 8px;
        }
        .title {
          font-size: 12px;
          margin-top: 5px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
      .app-item:hover {
        border: 2px solid rgba(255, 255, 255, 0.5);
      }
    }

    .contextmenu {
      position: absolute;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 5px;
      box-shadow: 0px 0px 10px rgb(0 0 0 / 30%);
      color: #333;
      font-size: 14px;
      text-align: left;
      width: 200px;
      overflow: hidden;
      padding: 2px 0px;
      text-shadow: none;
      z-index: 100;
      hr {
        border: none;
        border-top: 1px solid #ddd;
      }
      div {
        cursor: pointer;
        font-size: 13px !important;
        color: #333;
        border-radius: 5px;
        line-height: 2;
        padding: 0px 12px;
        display: flex;
        align-items: center;
        margin: 3px 5px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      div:hover {
        background: #4b9efb;
        color: white;
        border-radius: 5px;
      }
    }
  }
  .footer {
    display: flex;
    z-index: 100;
    .space {
      flex-grow: 1;
    }
  }
}
</style>
