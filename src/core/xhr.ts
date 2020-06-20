import { ChiosRequestConfig, ChiosResponse, ChiosPromise, ChiosError } from './../types/index'
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'
import { isURLSameOrigin } from '../helpers/url'
import { isFormData } from '../helpers/utils'
import cookie from '../helpers/cookie'

export function xhr(config: ChiosRequestConfig): ChiosPromise {
  return new Promise((resolve, reject) => {
    const {
      url,
      method = 'GET',
      data = null,
      headers,
      responseType,
      timeout,
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName,
      onDownloadProgress,
      onUploadProgress,
      auth,
      validateStatus
    } = config
    // 创建xhr对象
    const request = new XMLHttpRequest()
    // 设置异步请求
    request.open(method.toLocaleUpperCase(), url!, true)

    // 初始化
    configureRequest()

    addEvents()

    processHeaders()

    processCancel()

    // request对象配置
    function configureRequest(): void {
      // 设置响应数据类型
      if (responseType) {
        request.responseType = responseType
      }
      // 响应时间
      if (timeout) {
        request.timeout = timeout
      }
      // 跨域请求是否携带cookie
      if (withCredentials) {
        request.withCredentials = withCredentials
      }
    }

    // 事件绑定
    function addEvents(): void {
      // 监听xhr状态
      request.onreadystatechange = () => {
        if (request.readyState !== 4) {
          return
        }
        if (request.status === 0) {
          return
        }

        const data =
          responseType && responseType === 'text' ? request.responseText : request.response
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
      // 下载进度配置
      if (onDownloadProgress) {
        request.onprogress = onDownloadProgress
      }
      // 上传进度配置
      if (onUploadProgress) {
        request.upload.onprogress = onUploadProgress
      }
    }

    function processHeaders(): void {
      // 如果是FormData则删除content-type
      if (isFormData(data)) {
        delete headers['Content-Type']
      }
      if (auth) {
        headers['Authorization'] = 'Basic ' + btoa(auth.username + ':' + auth.password)
      }
      // 设置token
      if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName) {
        const xsrfValue = cookie.read(xsrfCookieName)
        if (xsrfValue && xsrfHeaderName) {
          headers[xsrfHeaderName] = xsrfValue
        }
      }
      // 设置请求头
      Object.keys(headers).forEach(key => {
        if (data === null && key.toLowerCase() === 'content-type') {
          delete headers[key]
        } else {
          request.setRequestHeader(key, headers[key])
        }
      })
    }

    function processCancel(): void {
      // 取消发送请求
      if (cancelToken) {
        cancelToken.promise.then(reason => {
          request.abort()
          reject(reason)
        })
      }
    }

    // 发送数据
    request.send(data)

    // 处理响应结果
    function handleResponse(response: ChiosResponse): void {
      if (!validateStatus || validateStatus(request.status)) {
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
