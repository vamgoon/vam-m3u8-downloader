/**
 * 获取下载链接中文件的后缀名
 * @param {*} url
 */
export const getSuffixFromUrl = (url) => {
  let fileName = url.match(/^.+\/(\w+\.\w+)/i)
  return fileName.split('.')[1]
}

/**
 * 获取下载链接中文件的名称
 * @param {*} url
 */
export const getNameFromUrl = (url) => {
  let fileName = url.match(/^.+\/(\w+\.\w+)/i)
  return fileName.split('.')[0]
}
