
import AppDispatcher from '../dispatcher/AppDispatcher'
import { ViewActions, ServerActions } from '../constants/AppConstants'

module.exports = {

  foo(bar) {
    AppDispatcher.dispatch({
      type: ViewActions.CREATE,
      payload: bar
    })
  },

  bar(baz) {
    AppDispatcher.dispatch({
      type: ServerActions.RECEIVE,
      payload: baz
    })
  }

}
