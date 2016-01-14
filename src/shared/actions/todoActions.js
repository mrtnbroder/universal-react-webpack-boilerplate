
import { fetchTodos } from '../utils/todosAPIUtil'
import * as types from '../constants/todoTypes'

export const getTodos = () => ({
  type: types.FETCH_TODOS,
  payload: {
    promise: fetchTodos()
  }
})
