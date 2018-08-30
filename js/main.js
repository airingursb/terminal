let usrName = 'usr'
let nowPosition = '~'
let commandList = 'cd ls cat logout hey hi hello help clear exit ~ / ./'.split(' ')
let hisCommand = []
let cour = 0
let isInHis = 0
let directory = []
let files = []

let host = 'http://121.42.167.55:3007'

let e_main = $('#main')
let e_input = $('.input-text')
let e_html = $('body,html')
let e_pos = $('#pos')

let mainFunc = (input, position) => {
  if (input === '') {
    e_main.html($('#main').html() + '[<span id="usr">' + usrName + '</span>@<span class="host">ursb.me</span> ' + position + ']% ' + '<br/>')
    e_html.animate({ scrollTop: $(document).height() }, 0)
  } else {
    command = input.split(' ')[0]
    if (commandList.indexOf(command) === -1) {
      e_main.html($('#main').html() + '[<span id="usr">' + usrName + '</span>@<span class="host">ursb.me</span> ' + position + ']% ' + input + '<br/>' + 'zsh: command not found: ' + command + '<br/>')
      e_html.animate({ scrollTop: $(document).height() }, 0)
    } else {
      switch (command) {
        case 'help':
          e_main.html($('#main').html() + '[<span id="usr">' + usrName + '</span>@<span class="host">ursb.me</span> ' + position + ']% ' + input + '<br/>' + '[sudo ]command[ Options...]<br/>You can use following commands:<br/><br/>cd<br/>ls<br/>cat<br/>clear<br/>help<br/>exit<br/><br/>Besides, there are some hidden commands, try to find them!<br/>')
          e_html.animate({ scrollTop: $(document).height() }, 0)
          break
        case 'exit':
          e_main.html($('#main').html() + '[<span id="usr">' + usrName + '</span>@<span class="host">ursb.me</span> ' + position + ']% ' + input + '<br/>(๑˘̴͈́꒵˘̴͈̀)۶ˮ вyё вyё~<br/>')
          e_html.animate({ scrollTop: $(document).height() }, 0)
          window.open("http://ursb.me")
          break
        case 'hi':
        case 'hey':
        case 'hello':
          e_main.html($('#main').html() + '[<span id="usr">' + usrName + '</span>@<span class="host">ursb.me</span> ' + position + ']% ' + input + '<br/>Nice to Meet U : )<br/>')
          e_html.animate({ scrollTop: $(document).height() }, 0)
          break
        case 'clear':
          e_main.html('')
          e_html.animate({ scrollTop: $(document).height() }, 0)
          break
        case 'ls':
          // dir: /dir/
          $.ajax({
            url: host + '/ls',
            data: { dir: position.replace('~', '') + '/' },
            dataType: 'jsonp',
            success: (res) => {
              if (res.code === 0) {
                let data = res.data.map(i => {
                  if (!i.includes('.')) {
                    // 目录
                    i = `<span class="ls-dir">${i}</span>`
                  }
                  return i
                })
                e_main.html($('#main').html() + '[<span id="usr">' + usrName + '</span>@<span class="host">ursb.me</span> ' + position + ']% ' + input + '<br/>' + data.join('&nbsp;&nbsp;') + '<br/>')
                e_html.animate({ scrollTop: $(document).height() }, 0)
              }
            }
          })
          break
        case 'cat':
          file = input.split(' ')[1]
          $.ajax({
            url: host + '/cat',
            data: { filename: file, dir: position.replace('~', '') + '/' },
            dataType: 'jsonp',
            success: (res) => {
              if (res.code === 0) {
                e_main.html($('#main').html() + '[<span id="usr">' + usrName + '</span>@<span class="host">ursb.me</span> ' + position + ']% ' + input + '<br/>' + res.data.replace(/\n/g, '<br/>') + '<br/>')
                e_html.animate({ scrollTop: $(document).height() }, 0)
              } else if (res.code === 404) {
                e_main.html($('#main').html() + '[<span id="usr">' + usrName + '</span>@<span class="host">ursb.me</span> ' + position + ']% ' + input + '<br/>' + res.message + '<br/>')
                e_html.animate({ scrollTop: $(document).height() }, 0)
              }
            }
          })
          break
        case 'cd':
          // nowPosition: ~/dir/dir
          if (!input.split(' ')[1] || input.split(' ')[1] === '~' || input.split(' ')[1] === '~/') {
            // 回退到主目录：cd || cd ~ || cd ~/
            nowPosition = '~'
            e_main.html($('#main').html() + '[<span id="usr">' + usrName + '</span>@<span class="host">ursb.me</span> ' + position + ']% ' + input + '<br/>')
            e_html.animate({ scrollTop: $(document).height() }, 0)
            e_pos.html(nowPosition)
          } else {
            // 切换到其他目录
            if (nowPosition === '~') {
              // 用户在主目录：cd ~/dir || cd ./dir || cd dir
              dir = input.split(' ')[1].replace('./', '').replace('~/', '') + '/'
              $.ajax({
                url: host + '/cd',
                data: { dir, pos: nowPosition.replace('~', '') + '/' },
                dataType: 'jsonp',
                success: (res) => {
                  if (res.code === 0) {
                    nowPosition = '~/' + dir.substring(0, dir.length - 1)
                    e_main.html($('#main').html() + '[<span id="usr">' + usrName + '</span>@<span class="host">ursb.me</span> ' + position + ']% ' + input + '<br/>')
                    e_html.animate({ scrollTop: $(document).height() }, 0)
                    e_pos.html(nowPosition)
                  } else if (res.code === 404) {
                    e_main.html($('#main').html() + '[<span id="usr">' + usrName + '</span>@<span class="host">ursb.me</span> ' + position + ']% ' + input + '<br/>' + res.message + '<br/>')
                    e_html.animate({ scrollTop: $(document).height() }, 0)
                  }
                }
              })
            } else {
              // 用户在二级目录：cd .. || cd ../ || cd ../dir || cd dir || cd ./dir
              dir = input.split(' ')[1].replace(/\.\.\//g, '')

              let backCount = 0 // 回退层级
              if (dir === '' || dir === '..') {
                // 情境一：回退到上一级：cd .. || cd ../
                if (dir === '..') {
                  backCount = 1
                } else {
                  // 回退多级：cd ../../
                  backCount = input.split(' ')[1].match(/\.\.\//g) && input.split(' ')[1].match(/\.\.\//g).length || 0
                }
                let pos = nowPosition.split('/') // [~, blog, img]
                nowPosition = pos.slice(0, pos.length - backCount) // [~, blog]
                nowPosition = nowPosition.join('/') // ~/blog

                e_main.html($('#main').html() + '[<span id="usr">' + usrName + '</span>@<span class="host">ursb.me</span> ' + position + ']% ' + input + '<br/>')
                e_html.animate({ scrollTop: $(document).height() }, 0)
                e_pos.html(nowPosition)
              } else {
                // 情境二：切换到绝对路径的其他层级：cd ~/dir
                if (dir.startsWith('~/')) {
                  dir = input.split(' ')[1].replace('~/', '') + '/'
                  $.ajax({
                    url: host + '/cd',
                    data: { dir, pos: '/' },
                    dataType: 'jsonp',
                    success: (res) => {
                      if (res.code === 0) {
                        nowPosition = '~/' + dir.substring(0, dir.length - 1)
                        e_main.html($('#main').html() + '[<span id="usr">' + usrName + '</span>@<span class="host">ursb.me</span> ' + position + ']% ' + input + '<br/>')
                        e_html.animate({ scrollTop: $(document).height() }, 0)
                        e_pos.html(nowPosition)
                      } else if (res.code === 404) {
                        e_main.html($('#main').html() + '[<span id="usr">' + usrName + '</span>@<span class="host">ursb.me</span> ' + position + ']% ' + input + '<br/>' + res.message + '<br/>')
                        e_html.animate({ scrollTop: $(document).height() }, 0)
                      }
                    }
                  })
                } else {
                  // 情境三：切换为相对路径的其他层级：cd dir || cd ./dir || cd ../dir
                  // pos: /dir/
                  let pos = '/' + nowPosition.replace('~/', '') + '/'
                  let backCount = input.split(' ')[1].match(/\.\.\//g) && input.split(' ')[1].match(/\.\.\//g).length || 0

                  pos = nowPosition.split('/') // [~, blog, img]
                  nowPosition = pos.slice(0, pos.length - backCount) // [~, blog]
                  nowPosition = nowPosition.join('/') // ~/blog

                  pos = '/' + nowPosition.replace('~', '').replace('/', '')  + '/'
                  dir = dir + '/'
                  dir = dir.startsWith('./') && dir.substring(1) || dir // 适配：cd ./dir
                  $.ajax({
                    url: host + '/cd',
                    data: { dir, pos },
                    dataType: 'jsonp',
                    success: (res) => {
                      if (res.code === 0) {
                        nowPosition = '~' + pos + dir.substring(0, dir.length - 1) // ~/blog/img
                        e_main.html($('#main').html() + '[<span id="usr">' + usrName + '</span>@<span class="host">ursb.me</span> ' + position + ']% ' + input + '<br/>')
                        e_html.animate({ scrollTop: $(document).height() }, 0)
                        e_pos.html(nowPosition)
                      } else if (res.code === 404) {
                        e_main.html($('#main').html() + '[<span id="usr">' + usrName + '</span>@<span class="host">ursb.me</span> ' + position + ']% ' + input + '<br/>' + res.message + '<br/>')
                        e_html.animate({ scrollTop: $(document).height() }, 0)
                      }
                    }
                  })
                }
              }
            }
          }
          break;
      }
    }
  }
}

// 命令自动补全
let pressTab = (input) => {
  if (input !== '') {
    command = input.split(' ')[0]
    if (command === 'l') e_input.val('ls')
    if (command === 'c') {
      e_main.html($('#main').html() + '[<span id="usr">' + usrName + '</span>@<span class="host">ursb.me</span> ' + nowPosition + ']% ' + input + '<br/>cat&nbsp;&nbsp;cd&nbsp;&nbsp;claer<br/>')
    }

    if (command === 'ca') e_input.val('cat')
    if (command === 'cl' || command === 'cle' || command === 'clea') e_input.val('clea')

    // cd 命令自动补全：只适配目录
    if (input.split(' ')[1] && command === 'cd') {
      dir = input.split(' ')[1]
      let prefix = ''
      if (nowPosition === '~') {
        // 用户在主目录
        if (dir.startsWith('./')) {
          prefix = './'
          dir = dir.replace('./', '')
        }
        if (dir.startsWith('~/')) {
          prefix = '~/'
          dir = dir.replace('~/', '')
        }

        // 路径最短匹配
        directory.every(i => {
          if (i.startsWith(dir)) {
            e_input.val('cd ' + prefix + i)
            return false
          }
          return true
        })
      } else {
        // 用户在二级目录或更深层目录
        let pos = nowPosition.replace('~/', '') + '/'

        if (dir.startsWith('~/')) {
          prefix = '~/'
          dir = dir.replace('~/', '')

          // 路径最短匹配
          directory.every(i => {
            if (i.startsWith(dir)) {
              e_input.val('cd ' + prefix + i)
              return false
            }
            return true
          })
        } else {
          if (dir.startsWith('./')) {
            prefix = './'
            dir = dir.replace('./', '')
          }

          // 路径最短匹配
          directory.every(i => {
            if (i.startsWith(pos + dir)) {
              i = i.replace(pos, '')
              e_input.val('cd ' + prefix + i)
              return false
            }
            return true
          })
        }
      }
    }

    // cat 命令自动补全：只适配文件
    if (input.split(' ')[1] && command === 'cat') {
      file = input.split(' ')[1]
      let pos = nowPosition.replace('~', '').replace('/', '') // 去除主目录的 ~ 和其他目录的 ~/ 前缀
      let prefix = ''

      if (file.startsWith('./')) {
        prefix = './'
        file = file.replace('./', '')
      }

      if (nowPosition === '~') {
        files.every(i => {
          if (i.startsWith(pos + file)) {
            e_input.val('cat ' + prefix + i)
            return false
          }
          return true
        })
      } else {
        pos = pos + '/'
        files.every(i => {
          if (i.startsWith(pos + file)) {
            e_input.val('cat ' + prefix + i.replace(pos, ''))
            return false
          }
          return true
        })
      }
    }
  }
}

window.onresize = function () {
  e_input.width($(document).width() - $('.prefix').width() - 160)
};

let historyCmd = (k) => {
  $('body,html').animate({ scrollTop: $(document).height() }, 0)

  if (k !== 'up' || isInHis) {
    if (k === 'up' && isInHis) {
      if (cour >= 1) {
        cour--
        e_input.val(hisCommand[cour])
      }
    }
    if (k === 'down' && isInHis) {
      if (cour + 1 <= hisCommand.length - 1) {
        cour++
        $(".input-text").val(hisCommand[cour])
      } else if (cour + 1 === hisCommand.length) {
        $(".input-text").val(inputCache)
      }
    }
  } else {
    inputCache = e_input.val()
    e_input.val(hisCommand[hisCommand.length - 1])
    cour = hisCommand.length - 1
    isInHis = 1
  }
}

$(document).bind('keydown', function (b) {
  e_input.focus()
  if (b.keyCode === 13) {
    e_main.html($('#main').html())
    e_html.animate({ scrollTop: $(document).height() }, 0)
    mainFunc(e_input.val(), nowPosition)
    hisCommand.push(e_input.val())
    isInHis = 0
    e_input.val('')
  }
  if (b.keyCode === 9) {
    pressTab(e_input.val())
    b.preventDefault()
    e_html.animate({ scrollTop: $(document).height() }, 0)
    e_input.focus()
  }

  if (b.keyCode === 38) historyCmd('up')
  if (b.keyCode === 40) historyCmd('down')

  // Ctrl + U 清空输入快捷键
  if (b.keyCode === 85 && b.ctrlKey === true) {
    e_input.val('')
    e_input.focus()
  }
})

$(document).ready(() => {
  // 初始化目录和文件
  $.ajax({
    url: host + '/list',
    data: { dir: '/' },
    dataType: 'jsonp',
    success: (res) => {
      if (res.code === 0) {
        directory = res.data.directory
        directory.shift(); // 去掉第一个 ~
        files = res.data.files
        console.log(res.data)
      }
    }
  })
})