
import Dispatcher from '../dispatcher/Dispatcher'
import { ViewActions } from '../constants/TemplateConstants'

export default {

  foo(bar) {
    Dispatcher.handleViewAction({
      type: ViewActions.CREATE,
      payload: bar
    })
  }

}
