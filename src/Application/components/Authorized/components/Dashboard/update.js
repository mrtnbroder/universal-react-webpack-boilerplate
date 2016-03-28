
import { handleActions } from 'redux-actions'
import { initalModel } from './model'

// TYPES

export const types = {
  MODIFY: 'MODIFY'
}

// ACTIONS

export const actions = {
  modify: () => ({ type: types.MODIFY })
}

// UPDATE

export const update = handleActions({

  [`${types.MODIFY}`]: (state, { payload }) => {
    return {
      ...state,
      forename: payload.forename,
      lastname: payload.lastname
    }
  }

}, initalModel)
