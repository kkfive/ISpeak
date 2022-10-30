import { format } from 'timeago.js'
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

export const timeAgo = (date: Date | number) => {
  if (isValidDate(date)) {
    return format(new Date(date), 'zh_CN')
  } else {
    return ''
  }
}
