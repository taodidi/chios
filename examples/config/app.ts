import chios from '../../src/index'
import qs from 'qs'

chios.defaults.headers.common['test2'] = 123
chios({
  url: '/config/post',
  method: 'post',
  data: qs.stringify({
    a: 1
  }),
  headers: {
    test: '321'
  }
}).then(res => {
  console.log(res.data)
})

// chios({
//   transformRequest: [(function(data) {
//     return qs.stringify(data)
//   }), ...(chios.defaults.transformRequest as AxiosTransformer[])],
//   transformResponse: [...(chios.defaults.transformResponse as AxiosTransformer[]), function(data) {
//     if (typeof data === 'object') {
//       data.b = 2
//     }
//     return data
//   }],
//   url: '/config/post',
//   method: 'post',
//   data: {
//     a: 1
//   }
// }).then((res) => {
//   console.log(res.data)
// })

// const instance = chios.create({
//   transformRequest: [(function(data) {
//     return qs.stringify(data)
//   }), ...(chios.defaults.transformRequest as AxiosTransformer[])],
//   transformResponse: [...(chios.defaults.transformResponse as AxiosTransformer[]), function(data) {
//     if (typeof data === 'object') {
//       data.b = 2
//     }
//     return data
//   }]
// })

// instance({
//   url: '/config/post',
//   method: 'post',
//   data: {
//     a: 1
//   }
// }).then((res) => {
//   console.log(res.data)
// })
