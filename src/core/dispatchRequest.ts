import { ChiosRequestConfig, ChiosResponse, ChiosPromise } from '../types/index'
import { xhr } from '../core/xhr'
import { buildUrl } from '../helpers/url'
import { flattenHeaders } from '../helpers/headers'
import transform from './transform'

export default function dispatchRequest(config: ChiosRequestConfig): ChiosPromise {
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
  const { url, params } = config
  return buildUrl(url!, params)
}

// 处理响应数据
function transformResponseData(res: ChiosResponse): ChiosResponse {
  res.data = transform(res.data, res.config.headers, res.config.transformResponse)
  return res
}
