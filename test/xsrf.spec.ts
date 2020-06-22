import chios from '../src/index'
import { getAjaxRequest } from './helper'

describe('xsrf', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })

  afterEach(() => {
    jasmine.Ajax.uninstall()
    document.cookie =
      chios.defaults.xsrfCookieName + '=;expires=' + new Date(Date.now() - 86400000).toUTCString()
  })

  test('should not set xsrf header if cookie is null', () => {
    chios('/foo')

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders[chios.defaults.xsrfHeaderName!]).toBeUndefined()
    })
  })

  test('should set xsrf header if cookie is set', () => {
    document.cookie = chios.defaults.xsrfCookieName + '=12345'

    chios('/foo')

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders[chios.defaults.xsrfHeaderName!]).toBe('12345')
    })
  })

  test('should not set xsrf header for cross origin', () => {
    document.cookie = chios.defaults.xsrfCookieName + '=12345'

    chios('http://example.com/')

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders[chios.defaults.xsrfHeaderName!]).toBeUndefined()
    })
  })

  test('should set xsrf header for cross origin when using withCredentials', () => {
    document.cookie = chios.defaults.xsrfCookieName + '=12345'

    chios('http://example.com/', {
      withCredentials: true
    })

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders[chios.defaults.xsrfHeaderName!]).toBe('12345')
    })
  })
})
