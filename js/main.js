let usrName = 'usr'
let nowPosition = '~'
let commandList = 'cd ls cat logout hey hi hello help clear exit ~ / ./'.split(' ')
let hisCommand = []
let cour = 0
let isInHis = 0

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
        window.open("http://ursb.me");
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
        if (position === '~') {
          e_main.html($('#main').html() + '[<span id="usr">' + usrName + '</span>@<span class="host">ursb.me</span> ' + position + ']% ' + input + '<br/>' + '<span class="ls-dir">blog</span>&nbsp;&nbsp;<span class="ls-dir">contact</span>&nbsp;&nbsp;<span class="ls-dir">projects</span>&nbsp;&nbsp;introduction.md<br/>')
          e_html.animate({ scrollTop: $(document).height() }, 0)
        }
        if (position === '~/blog') {
          e_main.html($('#main').html() + '[<span id="usr">' + usrName + '</span>@<span class="host">ursb.me</span> ' + position + ']% ' + input + '<br/>' + '_post.md<br/>')
          e_html.animate({ scrollTop: $(document).height() }, 0)
        }
        if (position === '~/contact') {
          e_main.html($('#main').html() + '[<span id="usr">' + usrName + '</span>@<span class="host">ursb.me</span> ' + position + ']% ' + input + '<br/>' + 'README.md<br/>')
          e_html.animate({ scrollTop: $(document).height() }, 0)
        }
        if (position === '~/projects') {
          e_main.html($('#main').html() + '[<span id="usr">' + usrName + '</span>@<span class="host">ursb.me</span> ' + position + ']% ' + input + '<br/>' + 'README.md<br/>')
          e_html.animate({ scrollTop: $(document).height() }, 0)
        }
        break
      case 'cat':
        file = input.split(' ')[1]
        if (position === '~') {
          if (file === 'introduction.md' || file === './introduction.md') {
            e_main.html($('#main').html() + '[<span id="usr">' + usrName + '</span>@<span class="host">ursb.me</span> ' + position + ']% ' + input + '<br/>' + '# Hi, I am Airing! <br/> 欢迎来到 Airing 的 Mac Pro，我是 Airing，95 小鲜肉，目前研一。٩(´0`)۶ <br/> 本科广州大学，主修教育技术学，辅修软件工程，硕士中山大学哲学系♂。<br/> 爱好动漫、电影、技术、捣鼓一些新奇玩意_(:3」∠)_ <br/> 学的很杂，没有特别擅长的技术，但是基本都会一点儿。<br/> 嗯啊，在这台电脑上，你可以看到更多有关我的信息~ 欢迎您来和我做朋友！<br/> 最后，祝您玩得愉快！<br/>')
            e_html.animate({ scrollTop: $(document).height() }, 0)
          } else {
            e_main.html($('#main').html() + '[<span id="usr">' + usrName + '</span>@<span class="host">ursb.me</span> ' + position + ']% ' + input + '<br/>' + 'cat: no such file or directory: ' + file + '<br/>')
            e_html.animate({ scrollTop: $(document).height() }, 0)
          }
        }
        if (position === '~/blog') {
          if (file === '_post.md' || file === './_post.md') {
            e_main.html($('#main').html() + '[<span id="usr">' + usrName + '</span>@<span class="host">ursb.me</span> ' + position + ']% ' + input + '<br/>' + 'Sorry! 本模块正在搭建中……<br/>')
            e_html.animate({ scrollTop: $(document).height() }, 0)
          } else {
            e_main.html($('#main').html() + '[<span id="usr">' + usrName + '</span>@<span class="host">ursb.me</span> ' + position + ']% ' + input + '<br/>' + 'cat: no such file or directory: ' + file + '<br/>')
            e_html.animate({ scrollTop: $(document).height() }, 0)
          }
        }
        if (position === '~/contact') {
          if (file === 'README.md' || file === './README.md') {
            e_main.html($('#main').html() + '[<span id="usr">' + usrName + '</span>@<span class="host">ursb.me</span> ' + position + ']% ' + input + '<br/>' + '# Contact<br/> - [Home](<a href="http://ursb.me" target="_blank">ursb.me</a>) <br/> - [Blog](<a href="http://blog.ursb.me" target="_blank">blog.ursb.me</a>) <br/> - [GitHub](<a href="https://github.com/airingursb" target="_blank">github.com/airingursb</a>) <br/> - [Dribbble](<a href="https://dribbble.com/airingursb" target="_blank">dribbble.com/airingursb</a>) <br/> - [E-Mail](airing@ursb.me) <br/> - [知乎](<a href="https://www.zhihu.com/people/airing/activities" target="_blank">Airing</a>) <br/> - [微博](<a href="https://weibo.com/601241434/" target="_blank">Airing</a>) <br/>')
            e_html.animate({ scrollTop: $(document).height() }, 0)
          } else {
            e_main.html($('#main').html() + '[<span id="usr">' + usrName + '</span>@<span class="host">ursb.me</span> ' + position + ']% ' + input + '<br/>' + 'cat: no such file or directory: ' + file + '<br/>')
            e_html.animate({ scrollTop: $(document).height() }, 0)
          }
        }
        if (position === '~/projects') {
          e_main.html($('#main').html() + '[<span id="usr">' + usrName + '</span>@<span class="host">ursb.me</span> ' + position + ']% ' + input + '<br/>' + '# Projects <br/> <br/>## App <br/> 1. [双生](<a href="https://github.com/oh-bear/2life" target="_blank">oh-bear/2life</a>): 基于 React Native 的 Android & iOS App，已上架 App Store，GitHub 上 Star 77，上架当天用户数突破 100。(目前2.0版本正在开发中...)<br/> 2. [一图](<a href="https://1ibrary.github.io/" target="_blank">https://1ibrary.github.io/</a>): 高校图书馆 APP，产品线拥有 iOS 端、Android 端，已上架 App Store，已对接南昌大学和广州大学，月用户2000+。 2017 年中国高校计算机竞赛第十名作品。<br/> 3. [四时](<a href="https://github.com/airingursb/4times-front-end" target="_blank">airingursb/4times-front-end</a>): 晴宝3.0版本，全靠颜值的炒鸡漂亮天气APP，最高排名 APP Store 天气类付费榜第三。<br/> 4. [晴宝](<a href="https://github.com/airingursb/sunnybaby" target="_blank">airingursb/sunnybaby</a>): 基于 Ionic2 构建的 Android & iOS App，已上架 App Store，GitHub 上 Star 131 Fork 39。后基于Swift重构，现已暂停维护。<br/> <br/>## Web <br/> 1. [Sophia](<a href="https://github.com/airingursb/sophia" target="_blank">airingursb/sophia</a>): 基于 Vue2 + Vuex + vue-router + express 构建的哲学知识共享社区。 <br/> 2. [算室](<a href="https://github.com/airingursb/algorithm-lab" target="_blank">airingursb/algorithm-lab</a>): 基于 Typescript + express 构建的可视化算法实验室。 <br/> 3. [Bilibili数据报告](<a href="https://github.com/airingursb/algorithm-lab" target="_blank">airingursb/algorithm-lab</a>): 基于 B站 2000 万用户数据制作而成的web app，纯 js 组件化实现，项目附有爬虫。 <br/><br/> ## 物联网 <br/> 1. [基于激光雷达点云的移动地理信息采集系统](<a href="https://github.com/airingursb/EMPs" target="_blank">airingursb/EMPs</a>): 智能车可视化系统，可以在网页上查看小车的行驶路径、小车的环境温度表与湿度表、以及小车的速度变化折线图。 <br/> 2. [基于C/S的闭环控制智能药柜系统](<a href="https://github.com/airingursb/drug" target="_blank">airingursb/drug</a>): 通过 APP 操作中药柜，自动化取药、抓药流程。 <br/> 3. [自动打印女友微博情绪变化的咕咕机](<a href="https://github.com/airingursb/Weibo2RSS" target="_blank">airingursb/Weibo2RSS</a>): 树莓派+MEMOBIRD实现的物联网系统：监控女朋友的微博，她有更新的时候采用文智语言分析计算情绪值，随后发邮件告知你，同时自动打印微博内容～ <br/><br/> ## Others <br/> To be continue... <br/>')
          e_html.animate({ scrollTop: $(document).height() }, 0)
        }
        break
      case 'cd':
        if (!input.split(' ')[1]) {
          e_main.html($('#main').html() + '[<span id="usr">' + usrName + '</span>@<span class="host">ursb.me</span> ' + '~' + ']% ' + input + '<br/>')
          e_html.animate({ scrollTop: $(document).height() }, 0)
        } else {
          dir = input.split(' ')[1]
          if (nowPosition === '~') {
            if (dir === 'blog' || dir === '~/blog' || dir === './blog' || dir === 'contact' || dir === '~/contact' || dir === './contact' || dir === 'projects' || dir === '~/projects' || dir === './projects') {
              if (dir === 'blog' || dir === '~/blog' || dir === './blog') nowPosition = '~/blog'
              if (dir === 'contact' || dir === '~/contact' || dir === './contact') nowPosition = '~/contact'
              if (dir === 'projects' || dir === '~/projects' || dir === './projects') nowPosition = '~/projects'
              e_main.html($('#main').html() + '[<span id="usr">' + usrName + '</span>@<span class="host">ursb.me</span> ' + position + ']% ' + input + '<br/>')
              e_html.animate({ scrollTop: $(document).height() }, 0)
            } else {
              e_main.html($('#main').html() + '[<span id="usr">' + usrName + '</span>@<span class="host">ursb.me</span> ' + position + ']% ' + input + '<br/>' + 'cd: no such file or directory: ' + dir + '<br/>')
              e_html.animate({ scrollTop: $(document).height() }, 0)
            }
          } else {
            if (dir === '..' || dir === '../' || dir === '../blog' || dir === '../contact' || dir === '../projects') {
              if (dir === '..' || dir === '../') nowPosition = '~'
              if (dir === '../blog') nowPosition = '~/blog'
              if (dir === '../contact') nowPosition = '~/contact'
              if (dir === '../projects') nowPosition = '~/projects'
              e_main.html($('#main').html() + '[<span id="usr">' + usrName + '</span>@<span class="host">ursb.me</span> ' + position + ']% ' + input + '<br/>')
              e_html.animate({ scrollTop: $(document).height() }, 0)
            } else {
              e_main.html($('#main').html() + '[<span id="usr">' + usrName + '</span>@<span class="host">ursb.me</span> ' + position + ']% ' + input + '<br/>' + 'cd: no such file or directory: ' + dir + '<br/>')
              e_html.animate({ scrollTop: $(document).height() }, 0)
            }
          }
        }
        break;
      }
    }
  }
  e_pos.html(nowPosition)
}

let pressTab = (input) => {
  if (input === '') {
  }
  else {
    command = input.split(' ')[0]
    if (command === 'l') e_input.val('ls')
    if (command === 'c') {
      e_main.html($('#main').html() + '[<span id="usr">' + usrName + '</span>@<span class="host">ursb.me</span> ' + nowPosition + ']% ' + input + '<br/>cat&nbsp;&nbsp;cd&nbsp;&nbsp;claer<br/>')
    }

    if (command === 'ca') e_input.val('cat')
    if (command === 'cl' || command === 'cle' || command === 'clea') e_input.val('clea')

    if (input.split(' ')[1] && command === 'cd') {
      dir = input.split(' ')[1]
      if (nowPosition === '~') {
        if ('blog'.startsWith(dir)) e_input.val('cd blog')
        if ('contact'.startsWith(dir)) e_input.val('cd contact')
        if ('projects'.startsWith(dir)) e_input.val('cd projects')

        if (dir.startsWith('./')) {
          dir = dir.replace('./', '')
          if (dir === '') {
            e_main.html($('#main').html() + '[<span id="usr">' + usrName + '</span>@<span class="host">ursb.me</span> ' + nowPosition + ']% ' + input + '<br/>' + '<span class="ls-dir">blog</span>&nbsp;&nbsp;<span class="ls-dir">contact</span>&nbsp;&nbsp;<span class="ls-dir">projects</span><br/>')
            e_html.animate({ scrollTop: $(document).height() }, 0)
          } else {
            if ('blog'.startsWith(dir)) e_input.val('cd ./blog')
            if ('contact'.startsWith(dir)) e_input.val('cd ./contact')
            if ('projects'.startsWith(dir)) e_input.val('cd ./projects')
          }
        }
      }
      if (dir.startsWith('~/')) {
        dir = dir.replace('~/', '')
        if (dir !== '') {
          if ('blog'.startsWith(dir)) e_input.val('cd ~/blog')
          if ('contact'.startsWith(dir)) e_input.val('cd ~/contact')
          if ('projects'.startsWith(dir)) e_input.val('cd ~/projects')
        }
      }
    }

    if (input.split(' ')[1] && command === 'cat') {
      file = input.split(' ')[1]
      switch (nowPosition) {
      case '~':
        if ('introduction.md'.startsWith(file)) e_input.val('cat introduction.md')
        if (file.startsWith('./') && './introduction.md'.startsWith(file)) e_input.val('cat ./introduction.md')
        break
      case '~/blog':
        if ('_post.md'.startsWith(file)) e_input.val('cat _post.md')
        if (file.startsWith('./') && './_post.md'.startsWith(file)) e_input.val('cat ./_post.md')
        break
      case '~/contact':
        if ('README.md'.startsWith(file)) e_input.val('cat README.md')
        if (file.startsWith('./') && './README.md'.startsWith(file)) e_input.val('cat ./README.md')
        break
      case '~/projects':
        if ('README.md'.startsWith(file)) e_input.val('cat README.md')
        if (file.startsWith('./') && './README.md'.startsWith(file)) e_input.val('cat ./README.md')
        break
      }
    }
  }
}


window.onresize = function () {
  e_input.width($(document).width() - $('.prefix').width() - 160)
};

let historyCmd = (k) => {
  $("body,html").animate({ scrollTop: $(document).height() }, 0)

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
  if (b.keyCode === 85 && b.ctrlKey === true) {
    e_input.val('')
    e_input.focus()
  }
})
