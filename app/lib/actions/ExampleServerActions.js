
import Dispatcher from '../dispatcher/Dispatcher'
import { ServerActions } from '../constants/TemplateConstants'

export default {

  bar(baz) {
    Dispatcher.handleServerAction({
      type: ServerActions.RECEIVE,
      payload: baz
    })
  }

}
