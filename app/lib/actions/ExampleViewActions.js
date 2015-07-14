
import alt from '../dispatcher/alt'

class ExampleViewActions {

  updateFlux(val) {
    this.dispatch(val)
  }

}

export default alt.createActions(ExampleViewActions)
