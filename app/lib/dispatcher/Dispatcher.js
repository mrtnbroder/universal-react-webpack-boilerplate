
import { Dispatcher } from 'flux'
import { assign } from 'lodash'

export default assign(new Dispatcher(), {

  handleViewAction(action) {
    this.dispatch({
      source: 'VIEW_ACTION',
      action
    })
  },

  handleServerAction(action) {
    this.dispatch({
      source: 'SERVER_ACTION',
      action
    })
  }

})
