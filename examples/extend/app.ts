import chios from '../../src/index'

// chios({
//   url: '/extend/post',
//   method: 'post',
//   data: {
//     msg: 'hi'
//   }
// })

// chios.request({
//   url: '/extend/post',
//   method: 'post',
//   data: {
//     msg: 'hello'
//   }
// })

// chios.get('/extend/get')
// //
// chios.options('/extend/options')
// //
// chios.delete('/extend/delete')

// chios.head('/extend/head')

// chios.post('/extend/post', { msg: 'post' })

// chios.put('/extend/put', { msg: 'put' })

// chios.patch('/extend/patch', { msg: 'patch' })

// chios({
//   url: '/extend/post',
//   method: 'post',
//   data: {
//     msg: 'hi'
//   }
// })

// chios('/extend/post', {
//   method: 'post',
//   data: {
//     msg: 'hello'
//   }
// })

interface ResponseData<T = any> {
  code: number
  result: T
  message: string
}

interface User {
  name: string
  age: number
}

function getUser<T>() {
  return chios<ResponseData<T>>('/extend/user')
    .then(res => res.data)
    .catch(err => console.error(err))
}

async function test() {
  const user = await getUser<User>()
  if (user) {
    console.log(user.result.age)
  }
}

test()
