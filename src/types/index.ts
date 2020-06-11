export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'
// request请求配置接口
export interface ChiosRequestConfig {
  url?: string
  method?: Method
  params?: any
  data?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
  transformRequest?: ChiosTransformer | ChiosTransformer[]
  transformResponse?: ChiosTransformer | ChiosTransformer[]
  cancelToken?: CancelToken
  withCredentials?: boolean
  xsrfCookieName?: string
  xsrfHeaderName?: string
  [propName: string]: any
}

// response响应数据接口
export interface ChiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: ChiosRequestConfig
  request: any
}

export interface ChiosPromise<T = any> extends Promise<ChiosResponse<T>> {}

// 错误信息接口
export interface ChiosError extends Error {
  config: ChiosRequestConfig
  isChiosError: boolean
  code?: string
  request?: any
  response?: ChiosResponse
}

// Chios方法集合类接口
export interface Chios {
  defaults: ChiosRequestConfig
  interceptors: {
    request: ChiosInterceptorManager<ChiosRequestConfig>
    response: ChiosInterceptorManager<ChiosResponse>
  }
  request<T = any>(config: ChiosRequestConfig): ChiosPromise<T>

  get<T = any>(url: string, config?: ChiosRequestConfig): ChiosPromise<T>

  delete<T = any>(url: string, config?: ChiosRequestConfig): ChiosPromise<T>

  head<T = any>(url: string, config?: ChiosRequestConfig): ChiosPromise<T>

  options<T = any>(url: string, config?: ChiosRequestConfig): ChiosPromise<T>

  post<T = any>(url: string, data?: any, config?: ChiosRequestConfig): ChiosPromise<T>

  put<T = any>(url: string, data?: any, config?: ChiosRequestConfig): ChiosPromise<T>

  patch<T = any>(url: string, data?: any, config?: ChiosRequestConfig): ChiosPromise<T>
}

export interface ChiosInstance extends Chios {
  <T = any>(config: ChiosRequestConfig): ChiosPromise<T>

  <T = any>(url: string, config?: ChiosRequestConfig): ChiosPromise<T>
}

export interface ChiosStatic extends ChiosInstance {
  create(config?: ChiosRequestConfig): ChiosInstance
  CancelToken: CancelTokenStatic
  Cancel: CancelStatic
  isCancel: (value: any) => boolean
}

// 拦截器管理类接口
export interface ChiosInterceptorManager<T> {
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number
  eject(id: number): void
}

// 拦截器处理函数
export interface ResolvedFn<T> {
  (val: T): T | Promise<T>
}

// 拦截器错误处理函数
export interface RejectedFn {
  (error: any): any
}

// 请求响应配置处理函数接口
export interface ChiosTransformer {
  (data: any, header?: any): any
}

// 取消请求实例接口
export interface CancelToken {
  reason?: Cancel
  promise: Promise<Cancel>
  throwIfRequested(): void
}

// 取消请求执行函数接口
export interface Canceler {
  (message?: string): void
}

export interface CancelExecutor {
  (cancel: Canceler): void
}

export interface CancelTokenSource {
  token: CancelToken
  cancel: Canceler
}

export interface CancelTokenStatic {
  new (executor: CancelExecutor): CancelToken
  source(): CancelTokenSource
}

export interface Cancel {
  message?: string
}

export interface CancelStatic {
  new (message: string): Cancel
}
