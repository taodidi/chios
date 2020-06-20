import { ChiosRequestConfig, ChiosResponse, ChiosPromise } from '../types/index'
import { xhr } from '../core/xhr'
import { buildUrl } from '../helpers/url'
import { flattenHeaders } from '../helpers/headers'
import { isAbsoluteURL, combineURL } from '../helpers/url'
import transform from './transform'

export default function dispatchRequest(config: ChiosRequestConfig): ChiosPromise {
  throwIfCancellationRequested(config)
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

function processConfig(config: ChiosRequestConfig): void {
  config.url = transformUrl(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
}

// 编译URL
function transformUrl(config: ChiosRequestConfig): string {
  let { baseURL, url, params, paramsSerializer } = config
  if (baseURL && !isAbsoluteURL(url!)) {
    url = combineURL(baseURL, url)
  }
  return buildUrl(url!, params, paramsSerializer)
}

// 处理响应数据
function transformResponseData(res: ChiosResponse): ChiosResponse {
  res.data = transform(res.data, res.config.headers, res.config.transformResponse)
  return res
}

// 如果canceler已经触发则直接返回Cancel实例
function throwIfCancellationRequested(config: ChiosRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}
