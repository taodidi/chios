import { isPlainObject } from './utils'
// 如果为普通对象转为字符串
export function transformRequest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

// 如果为普通JSON转为对象
export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (error) {}
  }
  return data
}
