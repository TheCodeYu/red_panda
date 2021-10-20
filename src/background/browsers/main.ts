
import { BrowserWindow, ipcMain, protocol } from 'electron'
import { EventName } from '../../utils/constants'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
// import { BrowserWindow, protocol } from 'electron'
const mainWindow = (): any => {

  let win: Electron.BrowserWindow | undefined

  const init = async () => {

    // Create the browser window.
    win = new BrowserWindow({
      minHeight: 600,
      minWidth: 450,
      useContentSize: true,
      title: '123',
      titleBarStyle: 'customButtonsOnHover',
      webPreferences: {
        webSecurity: false,
        enableRemoteModule: true,
        backgroundThrottling: false,
        webviewTag: true,
        // Use pluginOptions.nodeIntegration, leave this alone
        // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
        nodeIntegration: (process.env
          .ELECTRON_NODE_INTEGRATION as unknown) as boolean,
        contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
      }
    })

    if (process.env.WEBPACK_DEV_SERVER_URL) {
      // Load the url of the dev server if in development mode
      await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
      if (!process.env.IS_TEST) win.webContents.openDevTools()
    } else {
      createProtocol('app')
      // Load the index.html when not in development
      win.loadURL('app://./index.html')
    }

    protocol.interceptFileProtocol('image', (req, callback) => {
      const url = req.url.substr(8)
      callback(decodeURI(url))
    })

    win.once('ready-to-show', () => win!.show())

    win.on('closed', () => {
      win = undefined
    })

    ipcMain.on(EventName.winMin, () => win!.minimize())
    ipcMain.on(EventName.winMax, () => {
      if (win!.isMaximized()) {
        win!.unmaximize()
      } else {
        win!.maximize()
      }
    })
    ipcMain.on(EventName.winClose, () => win!.close())
  }

  const getWindow = () => win

  return {
    init,
    getWindow
  }
}

export default mainWindow
