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

