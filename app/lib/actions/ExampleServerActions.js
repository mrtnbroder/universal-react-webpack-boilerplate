
import alt from '../dispatcher/alt'

class ExampleServerActions {

  updateReact(val) {
    this.dispatch(val)
  }

}

export default alt.createActions(ExampleServerActions)
