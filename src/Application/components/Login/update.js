
import { handleActions } from 'redux-actions'
import { initalModel } from './model'

// TYPES

export const types = {
  UPDATE: 'UPDATE'
}

// ACTIONS

export const actions = {
  update: () => ({ type: types.UPDATE })
}

// UPDATE

export const update = handleActions({

  [`${types.UPDATE}`]: (state, { payload }) => {
    return {
      ...state,
      ...payload
    }
  }

}, initalModel)
