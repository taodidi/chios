import chios from '../../src/index'

chios.interceptors.request.use(config => {
  config.headers.test += '1'
  return config
})
chios.interceptors.request.use(config => {
  config.headers.test += '2'
  return config
})
chios.interceptors.request.use(config => {
  config.headers.test += '3'
  return config
})

chios.interceptors.response.use(res => {
  res.data += '1'
  return res
})
let interceptor = chios.interceptors.response.use(res => {
  res.data += '2'
  return res
})
chios.interceptors.response.use(res => {
  res.data += '3'
  return res
})

chios.interceptors.response.eject(interceptor)

chios({
  url: '/interceptor/get',
  method: 'get',
  headers: {
    test: ''
  }
}).then(res => {
  console.log(res.data)
})
