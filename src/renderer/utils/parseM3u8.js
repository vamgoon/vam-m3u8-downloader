import m3u8 from 'm3u8'
import request from 'request'
import {Message} from 'iview'
import {formatFileName} from './utils'

let parser = m3u8.createStream()

let _parseM3u8 = (url) => {
  let returnObj = {
    totalTime: 0,
    totalNumber: 0,
    urlList: {}
  }
  return new Promise((resolve, reject) => {
    let qqPreUrl = '' // 腾讯视频需要记录前缀链接

    if (url.indexOf('qq.com') > -1) {
      qqPreUrl = 'http://ltsydzd.qq.com/' + url.substring(url.indexOf('qq.com/') + 7, url.lastIndexOf('/') + 1)
    }
    try {
      let res = request.get(url)
      res.on('response', () => {
        res.pipe(parser)
      })
    } catch (e) {
      // Message.error('')
      reject(e)
    }

    let itemIndex = 0
    parser.on('item', (item) => {
      returnObj.totalTime += item.get('duration')
      returnObj.urlList[formatFileName(itemIndex++)] = qqPreUrl + item.get('uri')
    })

    parser.on('end', () => {
      // 将单位为秒的时间转换成 00:00
      let sec = returnObj.totalTime % 60
      let min = (returnObj.totalTime - sec) / 60
      sec = parseInt(sec)
      sec = sec.toString().length === 1 ? '0' + sec : sec // 将个位数的秒数格式化成 0X
      returnObj.totalTime = min + ':' + sec
      returnObj.totalNumber = itemIndex
      resolve(returnObj)
    })
  })
}

/**
 * 输入m3u8url，解析为包含有所有片段下载链接的对象，并返回
 * @param url
 */
export const parseM3u8 = (url) => {
  if (!url) {
    Message.error('下载链接不能为空')
    return
  }
  return _parseM3u8(url)
}
