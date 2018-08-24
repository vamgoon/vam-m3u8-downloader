import fs from 'fs'
import {Message} from 'iview'
/**
 * 获取当前系统类型
 * 'aix'
 * 'darwin'
 * 'freebsd'
 * 'linux'
 * 'openbsd'
 * 'sunos'
 * 'win32'
 * @returns {*}
 */
export const getOS = () => {
  return process.platform
}

/**
 * 获取系统用户路径
 * @returns {*}
 */
export const getHomePath = () => {
  return process.env.HOME
}

/**
 * 检查输入路径是否存在，若不存在则新建
 * @param path
 */
export const checkPath = (path) => {
  fs.stat(path, (x, y) => {
    if (x) {
      fs.mkdir(path, (err) => {
        if (err) {
          Message.error({
            content: x.toString(),
            duration: 3
          })
        } else {
          Message.success({
            content: `${path}创建成功`,
            duration: 3
          })
        }
      })
    }
  })
  return path
}

/**
 * 将输入的参数格式化为 0000 形式，一般视频ts片段也就几百个
 * @param x
 * @returns {string}
 */
export const formatFileName = (x) => {
  let temp = x + '' // 格式化为字符串
  let len = temp.length
  switch (len) {
    case 1:
      return `000${temp}`
    case 2:
      return `00${temp}`
    case 3:
      return `0${temp}`
    default:
      return temp
  }
}

/**
 * 返回当前时间，格式: 2018-08-23 18:00:00
 * @returns {string}
 */
export const getCurrentTime = () => {
  let month2Num = {
    'Jan': '01',
    'Feb': '02',
    'Mar': '03',
    'Apr': '04',
    'May': '05',
    'Jun': '06',
    'Jul': '07',
    'Aug': '08',
    'Sep': '09',
    'Oct': '10',
    'Nov': '11',
    'Dec': '12'
  }
  let now = new Date().toString().split(' ')
  return `${now[3]}-${month2Num[now[1]]}-${now[2]} ${now[4]}`
}
