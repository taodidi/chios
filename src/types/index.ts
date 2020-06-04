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

export interface ChiosRequestConfig {
  url?: string
  method?: Method
  params?: any
  data?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
  [propName: string]: any
}

export interface ChiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: ChiosRequestConfig
  request: any
}

export interface ChiosPromise<T = any> extends Promise<ChiosResponse<T>> {}

export interface ChiosError extends Error {
  config: ChiosRequestConfig
  isChiosError: boolean
  code?: string
  request?: any
  response?: ChiosResponse
}

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

export interface ChiosInterceptorManager<T> {
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number
  eject(id: number): void
}

export interface ResolvedFn<T> {
  (val: T): T | Promise<T>
}

export interface RejectedFn {
  (error: any): any
}
