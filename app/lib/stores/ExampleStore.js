
import Dispatcher from '../dispatcher/Dispatcher'
import Immutable from 'immutable'
import { ViewActions, ServerActions } from '../constants/ExampleConstants.js'
import { EventEmitter } from 'events'

const CHANGE_EVENT = 'change'

// -----------------------------------------------------------------------------
// STORE STATE
// -----------------------------------------------------------------------------

var _state = Immutable.fromJS({
  flux: true,
  react: true
})

// -----------------------------------------------------------------------------
// ACTIONS
// -----------------------------------------------------------------------------

// ...

class TemplateStore extends EventEmitter {

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

const _TemplateStore = new TemplateStore()

export default _TemplateStore

// -----------------------------------------------------------------------------
// STORE
// -----------------------------------------------------------------------------

_TemplateStore.dispatchToken = Dispatcher.register((source) => {
  const action = source.action

  switch (action.type) {

    // -------------------------------------------------------------------------
    // VIEW ACTIONS
    // -------------------------------------------------------------------------

    case ViewActions.CREATE:
      const newState = _state.update('flux', (val) => { return !val })

      _state = newState

      _TemplateStore.emitChange()
      break

    // -------------------------------------------------------------------------
    // SERVER ACTIONS
    // -------------------------------------------------------------------------

    // ...

    // -------------------------------------------------------------------------
    // INIT
    // -------------------------------------------------------------------------

    default:
      // Nothing
  }

})
