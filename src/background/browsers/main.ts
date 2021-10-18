
import { BrowserWindow, protocol } from 'electron'

import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
// import { BrowserWindow, protocol } from 'electron'

let win: Electron.BrowserWindow | undefined

const init = async () => {

  // Create the browser window.
  win = new BrowserWindow({
    minHeight: 200,
    minWidth: 100,
    useContentSize: true,
    frame: false,
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

  // win.once('ready-to-show', () => win?.show())

  win.on('closed', () => {
    win = undefined
  })
}

const getWindow = () => win

module.exports = {
  init: init,
  getWindow: getWindow
}
