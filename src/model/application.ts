/**
 * App应用类
 */
export class Application {
  constructor(obj: { [x: string]: any }) {
    Object.keys(obj).forEach((key) => {
      this[key] = obj[key]
    })
  }

  readonly isUnintsll!: boolean

  readonly key!: string

  pid = 0

  title!: string

  icon!: string

  width = 300

  height = 400

  disableResize = true

  keepInDock = false

  iconColor = '#000'

  iconBgColor = '#000'

  component = ''

  url = ''
}
