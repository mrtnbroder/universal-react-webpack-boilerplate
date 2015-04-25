
import Dispatcher from '../dispatcher/Dispatcher'
import { ViewActions } from '../constants/ExampleConstants'

export default {

  foo(bar) {
    Dispatcher.dispatch({
      type: ViewActions.CREATE,
      payload: bar
    })
  }

}
