
import Dispatcher from '../dispatcher/Dispatcher'
import { ServerActions } from '../constants/ExampleConstants'

export default {

  bar(baz) {
    Dispatcher.handleServerAction({
      type: ServerActions.RECEIVE,
      payload: baz
    })
  }

}
