import { ChiosRequestConfig } from '../types'
import { isPlainObject, deepMerge } from '../helpers/utils'

// 策略对象
const strats = Object.create(null)
// 合并策略一如果有自定义配置则使用自定义配置
function defaultStrat(val1: any, val2: any): any {
  return typeof val2 === 'undefined' ? val1 : val2
}

// 合并策略二只使用自定义配置
function fromVal2Strat(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : undefined
}

// 合并策略三深度合并
function deepMergeStart(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isPlainObject(val1)) {
    deepMerge(val1)
  } else {
    return val1
  }
}

// 指定每个key需要的策略
const stratKeysFromVal2 = ['url', 'params', 'data']
const stratKeysDeepMerge = ['headers', 'auth']

stratKeysFromVal2.forEach(key => {
  strats[key] = fromVal2Strat
})
stratKeysDeepMerge.forEach(key => {
  strats[key] = deepMergeStart
})

// 合并函数
export default function mergeConfig(
  config1: ChiosRequestConfig,
  config2?: ChiosRequestConfig
): ChiosRequestConfig {
  if (!config2) {
    config2 = {}
  }
  const config = Object.create(null)
  for (let key in config2) {
    mergeField(key)
  }

  for (let key in config1) {
    if (!config2[key]) {
      mergeField(key)
    }
  }

  function mergeField(key: string): void {
    const stratFun = strats[key] || defaultStrat
    config[key] = stratFun(config1[key], config2![key])
  }
  console.log(1111)
  return config
}
