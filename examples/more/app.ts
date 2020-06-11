import chios, { ChiosError } from '../../src/index'
import qs from 'qs'
//
// import 'nprogress/nprogress.css'
//
// import NProgress from 'nprogress'

// document.cookie = 'c=d'

// // chios.get('/more/get').then(res => {
// //   console.log(res)
// // })

// chios
//   .post(
//     'http://127.0.0.1:8088/more/server2',
//     {},
//     {
//       withCredentials: true
//     }
//   )
//   .then(res => {
//     console.log(res)
//   })
// //
const instance = chios.create({
  xsrfCookieName: 'XSRF-TOKEN-D',
  xsrfHeaderName: 'X-XSRF-TOKEN-D'
})
// //
instance.get('/more/get').then(res => {
  console.log(res)
})
// const instance = chios.create()
//
// function calculatePercentage(loaded: number, total: number) {
//   return Math.floor(loaded * 1.0) / total
// }
//
// function loadProgressBar() {
//   const setupStartProgress = () => {
//     instance.interceptors.request.use(config => {
//       NProgress.start()
//       return config
//     })
//   }
//
//   const setupUpdateProgress = () => {
//     const update = (e: ProgressEvent) => {
//       console.log(e)
//       NProgress.set(calculatePercentage(e.loaded, e.total))
//     }
//     instance.defaults.onDownloadProgress = update
//     instance.defaults.onUploadProgress = update
//   }
//
//   const setupStopProgress = () => {
//     instance.interceptors.response.use(response => {
//       NProgress.done()
//       return response
//     }, error => {
//       NProgress.done()
//       return Promise.reject(error)
//     })
//   }
//
//   setupStartProgress()
//   setupUpdateProgress()
//   setupStopProgress()
// }
//
// loadProgressBar()
//
// const downloadEl = document.getElementById('download')
//
// downloadEl!.addEventListener('click', e => {
//   instance.get('https://img.mukewang.com/5cc01a7b0001a33718720632.jpg')
// })
//
// const uploadEl = document.getElementById('upload')
//
// uploadEl!.addEventListener('click', e => {
//   const data = new FormData()
//   const fileEl = document.getElementById('file') as HTMLInputElement
//   if (fileEl.files) {
//     data.append('file', fileEl.files[0])
//
//     instance.post('/more/upload', data)
//   }
// })

// chios.post('/more/post', {
//   a: 1
// }, {
//   auth: {
//     username: 'Yee',
//     password: '123456'
//   }
// }).then(res => {
//   console.log(res)
// })

// chios.get('/more/304').then(res => {
//   console.log(res)
// }).catch((e: AxiosError) => {
//   console.log(e.message)
// })
//
// chios.get('/more/304', {
//   validateStatus(status) {
//     return status >= 200 && status < 400
//   }
// }).then(res => {
//   console.log(res)
// }).catch((e: AxiosError) => {
//   console.log(e.message)
// })
//
// chios.get('/more/get', {
//   params: new URLSearchParams('a=b&c=d')
// }).then(res => {
//   console.log(res)
// })
//
// chios.get('/more/get', {
//   params: {
//     a: 1,
//     b: 2,
//     c: ['a', 'b', 'c']
//   }
// }).then(res => {
//   console.log(res)
// })
//
// const instance = chios.create({
//   paramsSerializer(params) {
//     return qs.stringify(params, { arrayFormat: 'brackets' })
//   }
// })
//
// instance.get('/more/get', {
//   params: {
//     a: 1,
//     b: 2,
//     c: ['a', 'b', 'c']
//   }
// }).then(res => {
//   console.log(res)
// })

// const instance = chios.create({
//   baseURL: 'https://img.mukewang.com/'
// })
//
// instance.get('5cc01a7b0001a33718720632.jpg')
//
// instance.get('https://img.mukewang.com/szimg/5becd5ad0001b89306000338-360-202.jpg')

// function getA() {
//   return chios.get('/more/A')
// }

// function getB() {
//   return chios.get('/more/B')
// }

// chios.all([getA(), getB()]).then(
//   chios.spread(function(resA, resB) {
//     console.log(resA.data)
//     console.log(resB.data)
//   })
// )

// chios.all([getA(), getB()]).then(([resA, resB]) => {
//   console.log(resA.data)
//   console.log(resB.data)
// })

// const fakeConfig = {
//   baseURL: 'https://www.baidu.com/',
//   url: '/user/12345',
//   params: {
//     idClient: 1,
//     idTest: 2,
//     testString: 'thisIsATest'
//   }
// }
// console.log(chios.getUri(fakeConfig))
