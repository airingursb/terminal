import express from 'express'
import glob from 'glob'
import fs from 'fs'

const router = express.Router()

router.get('/', (req, res) => {
  return res.json({ title: 'Express' })
})

router.get('/list', (req, res) => {
  // 用于获取所有目录和所有文件
  let { dir } = req.query

  if (dir !== '/') {
    return res.jsonp({ code: 400, message: 'CSRF WARNING!' })
  }

  glob(`src/file${dir}**`, {}, (err, files) => {
    if (dir === '/') {
      files = files.map(i => i.replace('src/file/', ''))
      // files = files.filter(i => !i.includes('/')) // 过滤掉二级目录
    }
    files[0] = '~' // 初始化主目录
    let directory = files.filter(i => !i.includes('.')) // 过滤掉文件
    files = files.filter(i => i.includes('.')) // 只保留文件

    // 文件根据层级排序（默认为首字母排序），以便前端实现最短层级优先匹配
    files = files.sort((a, b) => {
      let deapA = a.match(/\//g) && a.match(/\//g).length || 0
      let deapB = b.match(/\//g) && b.match(/\//g).length || 0

      return deapA - deapB
    })

    return res.jsonp({ code: 0, data: { directory, files } })
  })
})

router.get('/ls', (req, res) => {
  let { dir } = req.query
  glob(`src/file${dir}**`, {}, (err, files) => {
    if (dir === '/') {
      files = files.map(i => i.replace('src/file/', ''))
      files = files.filter(i => !i.includes('/')) // 过滤掉二级目录
    } else {
      // 如果不在根目录，则替换掉当前目录
      dir = dir.substring(1)
      files = files.map(i => i.replace('src/file/', '').replace(dir, ''))
      files = files.filter(i => !i.includes('/') && !i.includes(dir.substring(0, dir.length - 1))) // 过滤掉二级目录和当前目录
    }
    return res.jsonp({ code: 0, data: files.map(i => i.replace('src/file/', '').replace(dir, '')) })
  })
})

router.get('/cat', (req, res) => {
  let { filename, dir } = req.query

  // 多级目录拼接： 位于 ~/blog/img, cat banner/menu.md
  dir = (dir + filename).split('/')
  filename = dir.pop() // 丢弃最后一级，其肯定是文件
  dir = dir.join('/') + '/'

  glob(`src/file${dir}*.md`, {}, (err, files) => {

    // 防止 CSRF
    glob(`src/file/**`, {}, (err, files) => {
      files[0] = '~' // 初始化主目录
      files = files.filter(i => i.includes('.')) // 只保留文件

      dir = dir.substring(1)
      files = files.map(i => i.replace('src/file/', '').replace(dir, ''))
      filename = filename.replace('./', '')

      if (files.indexOf(filename) === -1) {
        return res.jsonp({ code: 404, message: 'cat: no such file or directory: ' + filename })
      } else {
        fs.readFile(`src/file/${dir}/${filename}`, 'utf-8', (err, data) => {
          return res.jsonp({ code: 0, data })
        })
      }
    })
  })
})

router.get('/cd', (req, res) => {
  let { pos, dir } = req.query

  glob(`src/file${pos}**`, {}, (err, files) => {
    pos = pos.substring(1)
    files = files.filter(i => !i.includes('.')) // 过滤掉文件
    files = files.map(i => i.replace('src/file/', '').replace(pos, ''))
    dir = dir.substring(0, dir.length - 1)
    if (files.indexOf(dir) === -1) {
      // 目录不存在
      return res.jsonp({ code: 404, message: 'cd: no such file or directory: ' + dir })
    } else {
      files = files.filter(i => !i.includes('/')) // 过滤掉二级目录
      return res.jsonp({ code: 0 })
    }
  })
})

module.exports = router
