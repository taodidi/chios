import dispatchRequest from './dispatchRequest'
import {
  ChiosRequestConfig,
  ChiosPromise,
  ChiosResponse,
  ChiosInstance,
  Method,
  ResolvedFn,
  RejectedFn
} from '../types'
import InterceptorManager from './InterceptorManager'
import mergeConfig from './mergeConfig'

interface Interceptors {
  request: InterceptorManager<ChiosRequestConfig>
  response: InterceptorManager<ChiosResponse>
}

interface PromiseChain<T> {
  resolved: ResolvedFn<T> | ((config: ChiosRequestConfig) => ChiosPromise)
  rejected?: RejectedFn
}

export default class Chios {
  interceptors: Interceptors
  defaults: ChiosRequestConfig
  constructor(initConfig: ChiosRequestConfig) {
    this.defaults = initConfig
    this.interceptors = {
      request: new InterceptorManager<ChiosRequestConfig>(),
      response: new InterceptorManager<ChiosResponse>()
    }
  }
  request(url: any, config?: any): ChiosPromise {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }

    // 合并config对象
    config = mergeConfig(this.defaults, config)
    // 拦截器执行链条
    const chain: Array<PromiseChain<any>> = [
      {
        resolved: dispatchRequest,
        rejected: undefined
      }
    ]
    // 后添加的request拦截器先执行再发送请求
    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor)
    })

    // 先添加的response拦截器先执行
    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor)
    })
    // 默认执行resolve
    let promise = Promise.resolve(config)

    while (chain.length) {
      const { resolved, rejected } = chain.shift()!
      promise = promise.then(resolved, rejected)
    }
    // 返回处理后的promise
    return promise
  }
  get(url: string, config?: ChiosRequestConfig): ChiosPromise {
    return this._sendRequestWithoutData('get', url, config)
  }
  delete(url: string, config?: ChiosRequestConfig): ChiosPromise {
    return this._sendRequestWithoutData('delete', url, config)
  }

  head(url: string, config?: ChiosRequestConfig): ChiosPromise {
    return this._sendRequestWithoutData('head', url, config)
  }

  options(url: string, config?: ChiosRequestConfig): ChiosPromise {
    return this._sendRequestWithoutData('options', url, config)
  }

  post(url: string, data?: any, config?: ChiosRequestConfig): ChiosPromise {
    return this._sendRequestWithData('post', url, data, config)
  }

  put(url: string, data?: any, config?: ChiosRequestConfig): ChiosPromise {
    return this._sendRequestWithData('put', url, data, config)
  }

  patch(url: string, data?: any, config?: ChiosRequestConfig): ChiosPromise {
    return this._sendRequestWithData('patch', url, data, config)
  }
  // 发送无数据请求
  _sendRequestWithoutData(method: Method, url: string, config?: ChiosRequestConfig): ChiosPromise {
    return this.request(Object.assign(config || {}, { method, url }))
  }

  // 发送有数据请求
  _sendRequestWithData(
    method: Method,
    url: string,
    data?: any,
    config?: ChiosRequestConfig
  ): ChiosPromise {
    return this.request(Object.assign(config || {}, { method, url, data }))
  }
}
