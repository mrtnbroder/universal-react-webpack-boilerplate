
import Dispatcher from '../dispatcher/Dispatcher'
import Immutable from 'immutable'
import { ViewActions, ServerActions } from '../constants/ExampleConstants'
import { EventEmitter } from 'events'
import { assign } from 'lodash'

var CHANGE_EVENT = 'change'

var _defaults = {
  flux: true,
  react: true
}

var ExampleStore = assign({}, EventEmitter.prototype, {

  init() {
    this._state = Immutable.fromJS(_defaults)
  },

  getState() {
    return this._state
  },

  setState(state) {
    this._state = state
  },

  emitChange() {
    this.emit(CHANGE_EVENT)
  },

  onChange(callback) {
    this.on(CHANGE_EVENT, callback)
  },

  offChange(callback) {
    this.off(CHANGE_EVENT, callback)
  }

})

ExampleStore.dispatchToken = Dispatcher.register(function(action) {
  if ( __DEV__ ) console.log('ExampleStore:', action.type, action.payload)

  var currState = ExampleStore.getState()

  switch (action.type) {

    case ViewActions.CREATE:
      let newState = currState.update('flux', (val) => { return !val } )

      ExampleStore.setState(newState)

      ExampleStore.emitChange()
      break

    case ServerActions.RECEIVE:

      break

    default:
      return true
  }

  return true

})

ExampleStore.init()

export default ExampleStore
