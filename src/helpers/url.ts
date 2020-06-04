import { isDate, isPlainObject } from './utils'
// 编译特殊字符同时保留指定字符
function encode(str: string): string {
  return encodeURIComponent(str)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}
// 参数绑定
export function buildUrl(url: string, params?: any): string {
  if (!params) {
    return url
  }
  const additions: string[] = []
  Object.keys(params).forEach(key => {
    const val = params[key]
    if (val === null || typeof val === 'undefined') {
      return
    }
    // 将参数值统一为数组处理
    let values: any[] = []
    if (Array.isArray(val)) {
      key += '[]'
      values = val
    } else {
      values = [val]
    }
    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      }
      if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }
      additions.push(`${encode(key)}=${encode(val)}`)
    })
  })

  const serializedParams = additions.join('&')
  if (serializedParams) {
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}
