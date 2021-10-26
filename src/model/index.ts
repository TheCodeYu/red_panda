import { Application } from './application'

/**
 * 内置app应用
 */
export default {

  appList: [
    new Application({
      isUnintsll: false,
      icon: 'icon-question',
      title: '关于本站',
      key: 'system_about',
      iconColor: '#fff',
      iconBgColor: '#23282d'
    }),
    new Application({
      isUnintsll: false,
      icon: 'icon-MIS_chanpinshezhi',
      title: '文件管理',
      key: 'system_file',
      keepInDock: true,
      iconColor: '#fff',
      iconBgColor: '#db5048'
    }),
    new Application({
      isUnintsll: false,
      icon: 'icon-shezhi',
      title: '系统偏好设置',
      key: 'system_setting',
      keepInDock: true,
      iconColor: '#333',
      iconBgColor: '#d4dbef'
    }),
    new Application({
      isUnintsll: false,
      icon: 'icon-MIS_bangongOA',
      component: 'Demo',
      title: 'Demo内置应用',
      key: 'system_demo',
      keepInDock: true,
      iconColor: '#333',
      iconBgColor: '#d4dbef'
    }),
    new Application({
      isUnintsll: false,
      icon: 'icon-chrome',
      component: 'Browser',
      title: '百度一下',
      key: 'system_baidu',
      disableResize: false,
      keepInDock: true,
      iconColor: '#333',
      iconBgColor: '#d4dbef',
      url: 'https://www.baidu.com'
    })
  ]
}
