const toString = Object.prototype.toString
// 日期对象
export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}
// 普通对象
export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

//is FormData
export function isFormData(val: any): val is FormData {
  return typeof val !== 'undefined' && val instanceof FormData
}
//is URLSearchParams
export function isURLSearchParams(val: any): val is URLSearchParams {
  return typeof val !== 'undefined' && val instanceof URLSearchParams
}
// 对象扩展
export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

// 对象深拷贝
export function deepMerge(...params: any[]): any {
  const result = Object.create(null)
  params.forEach(obj => {
    if (obj) {
      // 遍历要合并的对象
      Object.keys(obj).forEach(key => {
        // 如果是对象则继续递归拷贝
        if (isPlainObject(obj[key])) {
          // 如果result已经存在key则合并拷贝
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], obj[key])
          } else {
            result[key] = deepMerge(obj[key])
          }
        } else {
          result[key] = obj[key]
        }
      })
    }
  })
  return result
}
