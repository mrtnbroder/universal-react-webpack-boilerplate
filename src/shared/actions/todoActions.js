
import { fetchTodos } from '../utils/WebAPIUtil'
import * as types from '../constants/todoTypes'

export const getTodos = () => ({
  type: types.FETCH_TODOS,
  payload: {
    promise: fetchTodos()
  }
})
