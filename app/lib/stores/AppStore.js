
import AppDispatcher from '../dispatcher/AppDispatcher'
import Immutable from 'immutable'
import { ViewActions, ServerActions } from '../constants/AppConstants'
import { EventEmitter } from 'events'
import { assign } from 'lodash'

var CHANGE_EVENT = 'change'

var _defaults = new Immutable.Map({
  flux: true,
  react: true
})

var AppStore = assign({}, EventEmitter.prototype, {

  init() {
    this._state = _defaults
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

AppStore.dispatchToken = AppDispatcher.register(function(action) {
  if ( __DEV__ ) console.log('AppStore:', action.type, action.payload)

  var currState = AppStore.getState()

  switch (action.type) {

    case ViewActions.CREATE:
      let newState = currState.update('flux', (val) => { return !val } )

      AppStore.setState(newState)

      AppStore.emitChange()
      break

    case ServerActions.RECEIVE:

      break

    default:
      return true
  }

  return true

})

AppStore.init()

module.exports = AppStore
