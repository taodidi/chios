import chios, { ChiosResponse, ChiosTransformer } from '../src/index'
import { getAjaxRequest } from './helper'

describe('transform', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })

  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  test('should transform JSON to string', () => {
    const data = {
      foo: 'bar'
    }

    chios.post('/foo', data)

    return getAjaxRequest().then(request => {
      expect(request.params).toBe('{"foo":"bar"}')
    })
  })

  test('should transform string to JSON', done => {
    let response: ChiosResponse

    chios('/foo').then(res => {
      response = res
    })

    getAjaxRequest().then(request => {
      request.respondWith({
        status: 200,
        responseText: '{"foo": "bar"}'
      })

      setTimeout(() => {
        expect(typeof response.data).toBe('object')
        expect(response.data.foo).toBe('bar')
        done()
      }, 100)
    })
  })

  test('should override default transform', () => {
    const data = {
      foo: 'bar'
    }

    chios.post('/foo', data, {
      transformRequest(data) {
        return data
      }
    })

    return getAjaxRequest().then(request => {
      expect(request.params).toEqual({ foo: 'bar' })
    })
  })

  test('should allow an Array of transformers', () => {
    const data = {
      foo: 'bar'
    }

    chios.post('/foo', data, {
      transformRequest: (chios.defaults.transformRequest as ChiosTransformer[]).concat(function(
        data
      ) {
        return data.replace('bar', 'baz')
      })
    })

    return getAjaxRequest().then(request => {
      expect(request.params).toBe('{"foo":"baz"}')
    })
  })

  test('should allowing mutating headers', () => {
    const token = Math.floor(Math.random() * Math.pow(2, 64)).toString(36)

    chios('/foo', {
      transformRequest: (data, headers) => {
        headers['X-Authorization'] = token
        return data
      }
    })

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders['X-Authorization']).toBe(token)
    })
  })
})
