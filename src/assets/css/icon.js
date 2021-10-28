var fs = require('fs')
var file = fs.readFileSync('./icon-font.css').toString()
var os = require('os')

var icons = file.split(os.EOL)

var html = '<!DOCTYPE html>' +
  '<html lang="en">' +
  '<head>' +
  '    <meta charset="UTF-8">' +
  '    <title>iconfont示例</title>' +
  '<link rel="stylesheet" href="./icon-font.css">' +
  '<style>.iconfont{font-size: 44px;height: 44px;width: 44px;margin: 4px;}' +
  '.app-item {' +
  '  padding: 10px 0px;' +
  'float: left;' +
  'flex-direction: column;' +
  '  text-align: center;' +
  '  text-shadow: 0px 0px 2px rgb(0 0 0 / 50%);' +
  '  cursor: pointer;' +
  '  border-radius: 10px;' +
  '  border: 2px solid transparent;' +
  '  justify-content: center;' +
  '  align-items: center;' +
  '  width: 80px;' +
  '}' +
  '  .title {' +
  'width: 80px;' +
  '    font-size: 8px;' +
  '    margin-top: 5px;' +
  'white-space: nowrap;' +
  '    text-overflow: ellipsis;' +
  'overflow: hidden;' +
  ' }' +
  '</style>' +
  '</head>' +
  '<body>'
console.log('start\n')
console.log('icons.length\n', icons.length)

html += '<div > 一共有' + icons.length + '个图标<div></br>'
for (var i = 0; i < icons.length; i++) {
  var icon = icons[i]
  if (icon.includes('icon-')) {
    var className = icon.split('.')[1].split(':')[0]
    html += '<div class="app-item" title=' + className + '><i class="iconfont ' + className + '"></i><div class="title">' + className + '</div></div>'
  }
}

html += '<script>\n' +
  '    var getColor = function () {\n' +
  '        return \'#\' + Math.random().toString(16).substr(-6);\n' +
  '    }\n' +
  '    var copyUrl2 = function(e) {\n' +
  '        console.log(this)\n' +
  '    }\n' +
  '    var icons = document.getElementsByTagName(\'i\')\n' +
  '    for (var i = 0; i < icons.length; i++) {\n' +
  '        var icon = icons[i];\n' +
  '        //icon.style.color = getColor()\n' +
  '        icon.addEventListener("click", (icon) => {\n' +
  '         window.getSelection() \n ' +
           ' document.execCommand("copy")\n' +
  '         console.log(document.execCommand("copy"),icon.target.classList[1])\n' +
  '       })\n' +
  '    }\n' +
  '</script></body>' +
  '</html>'

fs.writeFileSync('./icon.html', html)
