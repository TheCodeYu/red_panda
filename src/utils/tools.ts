/**
 * 一些工具函数
 */
export default {

  /**
     * @description: 格式化时间
     * @param {any} date
     * @param {string} format
     */
  formatTime(date:string|number|Date, format: string):string {
    if (!format) format = 'yyyy-MM-dd'
    switch (typeof date) {
      case 'string':
        date = new Date(date.replace(/-/, '/'))
        break
      case 'number':
        date = new Date(date)
        break
      default:
    }
    let dict = {
      yyyy: date.getFullYear(),
      M: date.getMonth() + 1,
      d: date.getDate(),
      H: date.getHours(),
      m: date.getMinutes(),
      s: date.getSeconds(),
      MM: ('' + (date.getMonth() + 101)).substr(1),
      dd: ('' + (date.getDate() + 100)).substr(1),
      HH: ('' + (date.getHours() + 100)).substr(1),
      mm: ('' + (date.getMinutes() + 100)).substr(1),
      ss: ('' + (date.getSeconds() + 100)).substr(1)
    }
    return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function (e) {
      return dict[e]
    })
  }
}
