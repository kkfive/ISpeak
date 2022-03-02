const dateFormat = (date) => {
  const vDay = padWithZeros(date.getDate(), 2)
  const vMonth = padWithZeros(date.getMonth() + 1, 2)
  const vYear = padWithZeros(date.getFullYear(), 2)
  return `${vYear}-${vMonth}-${vDay}`
}

function isValidDate(date: any) {
  return date instanceof Date && !isNaN(date.getTime())
}
const padWithZeros = (vNumber, width) => {
  let numAsString = vNumber.toString()
  while (numAsString.length < width) {
    numAsString = '0' + numAsString
  }
  return numAsString
}

/**
 * 格式化标签颜色
 * @param color 颜色
 * @returns
 */
export const formatFontColor = (color) => {
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
  // eslint-disable-next-line no-extend-native
  String.prototype['colorRgb'] = function () {
    var sColor = this.toLowerCase()
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        var sColorNew = '#'
        for (var i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
        }
        sColor = sColorNew
      }
      //处理六位的颜色值
      var sColorChange: any[] = []
      for (var i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
      }
      return 'RGB(' + sColorChange.join(',') + ')'
    } else {
      return sColor
    }
  }
  var flag = 'white'
  var rgbColor = color.colorRgb()

  rgbColor = rgbColor.replace('RGB(', '')
  rgbColor = rgbColor.replace(')', '')
  var temp = rgbColor.split(',')
  if (parseInt(temp[0]) + parseInt(temp[1]) + parseInt(temp[2]) > 450) {
    // console.log(parseInt(temp[0]) + parseInt(temp[1]) + parseInt(temp[2]));
    flag = 'black'
  }
  return flag
}
export const timeAgo = (date: Date | number) => {
  date = new Date(date || '')

  if (isValidDate(date)) {
    try {
      const oldTime = date.getTime()
      const currTime = Date.now()
      const diffValue = currTime - oldTime

      const days = Math.floor(diffValue / (24 * 3600 * 1000))
      if (days === 0) {
        // 计算相差小时数
        const leave1 = diffValue % (24 * 3600 * 1000) // 计算天数后剩余的毫秒数
        const hours = Math.floor(leave1 / (3600 * 1000))
        if (hours === 0) {
          // 计算相差分钟数
          const leave2 = leave1 % (3600 * 1000) // 计算小时数后剩余的毫秒数
          const minutes = Math.floor(leave2 / (60 * 1000))
          if (minutes === 0) {
            // 计算相差秒数
            const leave3 = leave2 % (60 * 1000) // 计算分钟数后剩余的毫秒数
            const seconds = Math.round(leave3 / 1000)
            return seconds + ` 秒前`
          }
          return minutes + ` 分前`
        }
        return hours + ` 小时前`
      }
      if (days < 0) return '刚刚'

      if (days < 8) {
        return days + ` 天前`
      } else {
        return dateFormat(date)
      }
    } catch (error) {
      console.error('timeAgo 错误', error)
    }
  } else {
    return ''
  }
}
