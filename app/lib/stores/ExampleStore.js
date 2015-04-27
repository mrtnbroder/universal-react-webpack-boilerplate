
import Dispatcher from '../dispatcher/Dispatcher'
import Immutable from 'immutable'
import { ViewActions, ServerActions } from '../constants/ExampleConstants'
import { EventEmitter } from 'events'

const CHANGE_EVENT = 'change'

const _defaults = {
  flux: true,
  react: true
}

class ExampleStore extends EventEmitter {

  constructor() {
    super()
    this._state = Immutable.fromJS(_defaults)
  }

  getState() {
    return this._state
  }

  setState(state) {
    if (this._state !== state) this._state = state
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

ExampleStore.dispatchToken = Dispatcher.register(function dispatchToken(source) {
  var currState = _ExampleStore.getState()
  var action = source.action

  if (__DEV__) console.log('ExampleStore:', source.source, action)

  switch (action.type) {

    case ViewActions.CREATE:
      const newState = currState.update('flux', (val) => { return !val })

      _ExampleStore.setState(newState)

      _ExampleStore.emitChange()
      break

    case ViewActions.RECEIVE:

      break

    default:
      return true
  }

  return true

})
