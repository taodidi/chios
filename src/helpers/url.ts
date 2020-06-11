import { isDate, isPlainObject } from './utils'
interface URLOrigin {
  protocol: string
  host: string
}
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

// 判断URL是否同源
export function isURLSameOrigin(requestURL: string): boolean {
  const parsedOrigin = resolveURL(requestURL)
  return (
    parsedOrigin.protocol === currentOrigin.protocol && parsedOrigin.host === currentOrigin.host
  )
}

// 创建元素节点
const elementNode = document.createElement('a')
// 获取当前域
const currentOrigin = resolveURL(window.location.href)
// 解析域
function resolveURL(url: string): URLOrigin {
  // 获取协议与主机IP
  elementNode.setAttribute('href', url)
  const { protocol, host } = elementNode
  return {
    protocol,
    host
  }
}
