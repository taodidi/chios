import chios, { Canceler } from '../../src/index'

const CancelToken = chios.CancelToken
const source = CancelToken.source()

chios
  .get('/cancel/get', {
    cancelToken: source.token
  })
  .catch(function(e) {
    if (chios.isCancel(e)) {
      console.log('Request canceled', e.message)
    }
  })

setTimeout(() => {
  source.cancel('Operation canceled by the user.')
  setTimeout(() => {
    chios.post('/cancel/post', { a: 1 }, { cancelToken: source.token }).catch(function(e) {
      if (chios.isCancel(e)) {
        console.log(e.message)
      }
    })
  }, 0)
}, 100)

let cancel: Canceler

chios
  .get('/cancel/get', {
    cancelToken: new CancelToken(c => {
      cancel = c
    })
  })
  .catch(function(e) {
    if (chios.isCancel(e)) {
      console.log('Request canceled')
    }
  })

setTimeout(() => {
  cancel()
}, 200)
