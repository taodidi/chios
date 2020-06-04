import { ChiosRequestConfig, ChiosResponse, ChiosPromise } from '../types/index'
import { xhr } from '../core/xhr'
import { buildUrl } from '../helpers/url'
import { transformRequest, transformResponse } from '../helpers/data'
import { processHeaders, flattenHeaders } from '../helpers/headers'

export default function dispatchRequest(config: ChiosRequestConfig): ChiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

function processConfig(config: ChiosRequestConfig): void {
  config.url = transformUrl(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
  config.headers = flattenHeaders(config.headers, config.method!)
}

// 编译URL
function transformUrl(config: ChiosRequestConfig): string {
  const { url, params } = config
  return buildUrl(url!, params)
}

// 将普通对象转为JSON字符串
function transformRequestData(config: ChiosRequestConfig): any {
  const { data } = config
  return transformRequest(data)
}

// 兼容头信息
function transformHeaders(config: ChiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

// 处理响应数据
function transformResponseData(res: ChiosResponse): ChiosResponse {
  res.data = transformResponse(res.data)
  return res
}
