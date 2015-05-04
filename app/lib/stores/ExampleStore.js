
import Dispatcher from '../dispatcher/Dispatcher'
import Immutable from 'immutable'
import { ViewActions, ServerActions } from '../constants/ExampleConstants'
import { EventEmitter } from 'events'

const CHANGE_EVENT = 'change'

const _defaults = {
  flux: true,
  react: true
}

var _state = Immutable.fromJS(_defaults)

class ExampleStore extends EventEmitter {

  constructor() {
    super()
  }

  getState() {
    return _state
  }

  emitChange() {
    this.emit(CHANGE_EVENT)
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback)
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  }

}

const _ExampleStore = new ExampleStore()

export default _ExampleStore

_ExampleStore.dispatchToken = Dispatcher.register((source) => {
  var action = source.action

  if (__DEV__) console.log('ExampleStore:', source.source, action)

  switch (action.type) {

    case ViewActions.CREATE:
      let newState = _state.update('flux', (val) => { return !val })

      _state = newState

      _ExampleStore.emitChange()
      break

    case ViewActions.RECEIVE:

      break

    default:
      return true
  }

  return true

})
