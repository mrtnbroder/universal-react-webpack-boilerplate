
import Dispatcher from '../dispatcher/Dispatcher'
import { ServerActions } from '../constants/ExampleConstants'

export default {

  bar(baz) {
    Dispatcher.dispatch({
      type: ServerActions.RECEIVE,
      payload: baz
    })
  }

}
