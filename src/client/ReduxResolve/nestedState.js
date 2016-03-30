
import { reduce } from 'ramda'

export const getNestedState = (state, depth) => {
  return reduce((prev) => {
    return prev.child || {}
  }, state)(Array(depth))
}
