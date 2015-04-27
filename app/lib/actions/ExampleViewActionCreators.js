
import Dispatcher from '../dispatcher/Dispatcher'
import { ViewActions } from '../constants/ExampleConstants'

export default {

  foo(bar) {
    Dispatcher.handleViewAction({
      type: ViewActions.CREATE,
      payload: bar
    })
  }

}
