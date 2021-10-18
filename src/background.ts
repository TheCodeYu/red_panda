'use strict'

import { app, protocol, ipcMain } from 'electron'

import Listener from './background/common/listener'
import { Platform, Config } from './utils/util'
import { main} from '@/background/browsers/main'
const win = main()
console.log(win.getWindow())
win.getWindow.show()
console.log(main())
// if (Platform.production()) {
//   global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
// }
// global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
// console.log(__static)

app.allowRendererProcessReuse = false
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

const listener = new Listener()
class Application {

  launchApp() {
    // 以单例模式启动
    const appLock = app.requestSingleInstanceLock()

    if (!appLock) {
      app.quit()
    } else {
      this.beforeReady()
      this.onReady()
      this.onRunning()
      this.onQuit()
    }
  }

  createWindow() { }

  beforeReady() {
    if (Platform.macOS()) {
      if (Platform.production() && !app.isInApplicationsFolder()) {
        app.moveToApplicationsFolder()
      } else {
        // Electron有API来配置macOS Dock中的应用程序图标
        app.dock.hide()
      }
    } else {
      /**
       * 离屏渲染允许你以位图的方式来获取 BrowserWindow 中的内容，所以它可以在任何地方被渲染
       * 1.GPU加速渲染意味着使用GPU用于合成。 这也就意味着帧必须从GPU拷贝过来，从而需求更多的资源，因此这会比软件输出设备更慢
       * 2.软件输出设备在 CPU 中渲染，因此帧 生成的速度要快得多。 因此，此模式优先于 GPU 加速模式。
       */
      app.disableHardwareAcceleration()
    }
  }

  onReady() {
    const readyFunction = () => {
      this.createWindow()
      // 准备系统托盘
      // autoUpdate()
    }
    if (!app.isReady()) {
      app.on('ready', readyFunction)
    } else {
      readyFunction()
    }
  }

  onRunning() {
    app.on('second-instance', (event, argv, workDir) => {
      // 当运行第二个实例时,将会聚焦到Window这个窗口
      const win = main.getWindow()
      if (win) {
        if (win.isMaximized()) {
          win.restore()
        }
        win.focus()
      }
    })
    app.on('activate', () => {
      if (!main.getWindow()) {
        this.createWindow()
      }
    })

    if (Platform.windows()) {
      app.setAppUserModelId(Config.appInfo.appid)
    }
  }

  onQuit() { }
}

(new Application()).launchApp()
// async function createWindow() {
//   // Create the browser window.
//   const win = new BrowserWindow({
//     minHeight: 200,
//     minWidth: 100,
//     useContentSize: true,
//     frame: false,
//     webPreferences: {

//       // Use pluginOptions.nodeIntegration, leave this alone
//       // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
//       nodeIntegration: (process.env
//         .ELECTRON_NODE_INTEGRATION as unknown) as boolean,
//       contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
//     }
//   })
//   ipcMain.on('min', () => win.minimize())
//   ipcMain.on('max', () => {
//     if (win.isMaximized()) {
//       win.unmaximize()
//     } else {
//       win.maximize()
//     }
//   })
//   ipcMain.on('close', () => win.close())
//   if (process.env.WEBPACK_DEV_SERVER_URL) {
//     // Load the url of the dev server if in development mode
//     await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
//     if (!process.env.IS_TEST) win.webContents.openDevTools()
//   } else {
//     createProtocol('app')
//     // Load the index.html when not in development
//     win.loadURL('app://./index.html')
//   }
// }

// // Quit when all windows are closed.
// app.on('window-all-closed', () => {
//   // On macOS it is common for applications and their menu bar
//   // to stay active until the user quits explicitly with Cmd + Q
//   if (process.platform !== 'darwin') {
//     app.quit()
//   }
// })

// app.on('activate', () => {
//   // On macOS it's common to re-create a window in the app when the
//   // dock icon is clicked and there are no other windows open.
//   if (BrowserWindow.getAllWindows().length === 0) createWindow()
// })

// // This method will be called when Electron has finished
// // initialization and is ready to create browser windows.
// // Some APIs can only be used after this event occurs.
// app.on('ready', async () => {
//   createWindow()
// })

// // Exit cleanly on request from parent process in development mode.
// if (Platform.dev()) {
//   if (process.platform === 'win32') {
//     process.on('message', (data) => {
//       if (data === 'graceful-exit') {
//         app.quit()
//       }
//     })
//   } else {
//     process.on('SIGTERM', () => {
//       app.quit()
//     })
//   }
// }
