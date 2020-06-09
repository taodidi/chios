import { ChiosRequestConfig, ChiosResponse, ChiosPromise, ChiosError } from './../types/index'
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'

export function xhr(config: ChiosRequestConfig): ChiosPromise {
  return new Promise((resolve, reject) => {
    const { url, method = 'GET', data = null, headers, responseType, timeout } = config
    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }
    // 响应时间
    if (timeout) {
      request.timeout = timeout
    }
    // 错误处理
    request.onerror = () => {
      reject(createError('Network Error', config, null, request))
    }
    // 响应超时
    request.ontimeout = () => {
      reject(
        createError(`Timeout of ${config.timeout} ms exceeded`, config, 'ECONNABORTED', request)
      )
    }

    // 设置异步请求
    request.open(method.toLocaleUpperCase(), url!, true)
    // 监听xhr状态
    request.onreadystatechange = () => {
      if (request.readyState !== 4) {
        return
      }
      if (request.status === 0) {
        return
      }

      const data = responseType && responseType === 'text' ? request.responseText : request.response
      const status = request.status
      const statusText = request.statusText
      const headers = parseHeaders(request.getAllResponseHeaders())
      // 封装返回信息
      const response: ChiosResponse = {
        data,
        status,
        statusText,
        headers,
        config,
        request
      }
      // 处理响应
      handleResponse(response)
    }
    // 设置请求头
    Object.keys(headers).forEach(key => {
      if (data === null && key.toLowerCase() === 'content-type') {
        delete headers[key]
      } else {
        request.setRequestHeader(key, headers[key])
      }
    })

    // 取消发送请求
    if (config.cancelToken) {
      config.cancelToken.promise.then(reason => {
        request.abort()
        reject(reason)
      })
    }
    // 发送数据
    request.send(data)

    // 处理响应结果
    function handleResponse(response: ChiosResponse): void {
      if (request.status >= 200 && request.status < 300) {
        // 封装
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }
  })
}
