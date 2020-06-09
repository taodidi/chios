import { ChiosTransformer } from '../types'

export default function transform(
  data: any,
  headers: any,
  transformFns?: ChiosTransformer | ChiosTransformer[]
): any {
  if (!transformFns) {
    return data
  }
  if (!Array.isArray(transformFns)) {
    transformFns = [transformFns]
  }
  transformFns.forEach(fun => {
    data = fun(data, headers)
  })
  return data
}
