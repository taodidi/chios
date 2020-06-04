import { isPlainObject, deepMerge } from './utils'
import { Method } from '../types'

function normalizeHeaderName(headers: any, normalizedName: string): any {
  Object.keys(headers).forEach(name => {
    // 设置了'Content-Type'但大小写不规范
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

export function processHeaders(headers: any, data: any): any {
  // 如果设置了'Content-Type'但大小写不规范进行处理
  normalizeHeaderName(headers, 'Content-Type')
  // 如果是Object对象但没何止'Content-Type'进行处理
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

// 解析响应头
export function parseHeaders(headers: string): any {
  const result = Object.create(null)
  if (!headers) {
    return result
  }
  headers.split('\r\n').forEach(line => {
    let [key, value] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) {
      return
    }
    if (value) {
      value = value.trim()
    }
    result[key] = value
  })
  return result
}

// 格式化headers
export function flattenHeaders(headers: any, method: Method): any {
  if (!headers) {
    return headers
  }
  headers = deepMerge(headers.common, headers[method], headers)
  const methodsToDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common']

  methodsToDelete.forEach(method => {
    delete headers[method]
  })

  return headers
}
