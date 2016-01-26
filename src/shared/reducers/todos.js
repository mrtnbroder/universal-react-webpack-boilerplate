
import { handleActions } from 'redux-actions'
import * as types from '../constants/todoTypes'

const initalState = {
  error: '',
  isPending: false,
  todos: []
}

export default handleActions({

  [`${types.FETCH_TODOS}_PENDING`]: (state) => {
    return {
      ...state,
      isPending: true
    }
  },

  [`${types.FETCH_TODOS}_FULFILLED`]: (state, { payload }) => {
    return {
      ...state,
      isPending: false,
      todos: payload
    }
  },

  [`${types.FETCH_TODOS}_REJECTED`]: (state, { payload }) => {
    return {
      ...state,
      isPending: false,
      error: payload
    }
  }

}, initalState)
