import { createError } from '../../src/helpers/error'
import { ChiosRequestConfig, ChiosResponse } from '../../src/types'

describe('helpers::error', function() {
  test('should create an Error with message, config, code, request, response and isChiosError', () => {
    const request = new XMLHttpRequest()
    const config: ChiosRequestConfig = { method: 'post' }
    const response: ChiosResponse = {
      status: 200,
      statusText: 'OK',
      headers: null,
      request,
      config,
      data: { foo: 'bar' }
    }
    const error = createError('Boom!', config, 'SOMETHING', request, response)
    expect(error instanceof Error).toBeTruthy()
    expect(error.message).toBe('Boom!')
    expect(error.config).toBe(config)
    expect(error.code).toBe('SOMETHING')
    expect(error.request).toBe(request)
    expect(error.response).toBe(response)
    expect(error.isChiosError).toBeTruthy()
  })
})
