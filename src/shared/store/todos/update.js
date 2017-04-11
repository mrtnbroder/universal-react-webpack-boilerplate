
import { fetchTodos as fetchTodosFromAPI } from 'utils/WebAPIUtil'
import { handleActions } from 'redux-actions'
import { initalModel } from './model'

const FETCH_TODOS = 'FETCH_TODOS'

export const types = {
  FETCH_TODOS
}

const fetchTodos = () => ({
  type: types.FETCH_TODOS,
  payload: {
    promise: fetchTodosFromAPI()
  }
})

export const actions = {
  fetchTodos
}

export const update = handleActions({

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

}, initalModel)
