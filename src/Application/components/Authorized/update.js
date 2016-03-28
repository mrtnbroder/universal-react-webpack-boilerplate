
import { handleActions } from 'redux-actions'
import { initalModel } from './model'

// TYPES

export const types = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT'
}

// ACTIONS

export const actions = {
  increment: () => ({ type: types.INCREMENT }),
  decrement: () => ({ type: types.DECREMENT })
}

// UPDATE

export const update = handleActions({

  [`${types.INCREMENT}`]: (state) => {
    return {
      ...state,
      counter: state.counter + 1
    }
  },

  [`${types.DECREMENT}`]: (state) => {
    return {
      ...state,
      counter: state.counter - 1
    }
  }

}, initalModel)
