/**
 * @description 存储方案选用
 * electron-store：简单数据持久性-保存和加载用户首选项，应用程序状态，缓存
 * 数据库：大量的持久数据
 * 文本文件：以文件系统方式组织
 * 全局变量：运行时数据,store模块下
 * 不使用 window.localStorage
 */

import Strore from 'electron-store'

const store = new Strore({
  name: 'config',
  fileExtension: 'json',
  clearInvalidConfig: true,
  encryptionKey: 'aes-256-cbc'
})

function get(key: string): unknown {

  return store.get(key)
}

export {
  get
}
