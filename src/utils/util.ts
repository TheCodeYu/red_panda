import pkg from '../../package.json'

export const Platform = {
  linux: function (): boolean {
    return process.platform === 'linux'
  },
  macOS(): boolean {
    return process.platform === 'darwin'
  },
  windows(): boolean {
    return process.platform === 'win32'
  },
  production: function (): boolean {
    return process.env.NODE_ENV !== 'development'
  },
  dev: function (): boolean {
    return process.env.NODE_ENV === 'development'
  }
}

/**
 * 全局配置信息
 * 如外部一些开放平台API
 */
export const Config = {
  appInfo: {
    name: pkg.name,
    version: pkg.version,
    author: pkg.author,
    description: pkg.description,
    license: pkg.license,
    appid: pkg.appid
  }
}
