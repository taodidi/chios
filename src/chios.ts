import { ChiosStatic, ChiosRequestConfig } from './types'
import CancelToken from './cancel/CancelToken'
import Cancel, { isCancel } from './cancel/Cancel'
import Chios from './core/Chios'
import { extend } from './helpers/utils'
import defaults from './defaults'
import mergeConfig from './core/mergeConfig'

function createInstance(defaults: ChiosRequestConfig): ChiosStatic {
  const context = new Chios(defaults)
  const instrance = Chios.prototype.request.bind(context)
  extend(instrance, context)
  return instrance as ChiosStatic
}

const chios = createInstance(defaults)

chios.CancelToken = CancelToken
chios.Cancel = Cancel
chios.isCancel = isCancel

chios.all = function all(promises) {
  return Promise.all(promises)
}

chios.spread = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr)
  }
}

chios.create = function create(config) {
  return createInstance(mergeConfig(defaults, config))
}

chios.Chios = Chios

export default chios
