import { ChiosRequestConfig, ChiosResponse } from '../types/index'

export class ChiosError extends Error {
  isChiosError: boolean
  config: ChiosRequestConfig
  code?: string | null
  request?: any
  response?: ChiosResponse
  constructor(
    message: string,
    config: ChiosRequestConfig,
    code?: string | null,
    request?: any,
    response?: ChiosResponse
  ) {
    super(message)
    this.config = config
    this.code = code
    this.request = request
    this.response = response
    this.isChiosError = true
    Object.setPrototypeOf(this, ChiosError.prototype)
  }
}

export function createError(
  message: string,
  config: ChiosRequestConfig,
  code?: string | null,
  request?: any,
  response?: ChiosResponse
): ChiosError {
  return new ChiosError(message, config, code, request, response)
}
