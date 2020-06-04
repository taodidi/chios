import { ChiosInstance, ChiosRequestConfig } from './types'
import Chios from './core/Chios'
import { extend } from './helpers/utils'
import defaults from './defaults'

function createInstance(defaults: ChiosRequestConfig): ChiosInstance {
  const context = new Chios(defaults)
  const instrance = Chios.prototype.request.bind(context)
  extend(instrance, context)
  return instrance as ChiosInstance
}

const chios = createInstance(defaults)

export default chios
