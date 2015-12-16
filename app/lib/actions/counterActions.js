
import * as types from '../constants/counterTypes'

/*
 * action creators
 */

export function increment() {
  return { type: types.INCREMENT }
}

export function decrement() {
  return { type: types.DECREMENT }
}
