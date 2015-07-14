
import alt from '../dispatcher/alt'
import ExampleViewActions from '../actions/ExampleViewActions'
import ExampleServerActions from '../actions/ExampleServerActions'

class TemplateStore {

  constructor() {
    this.flux = true
    this.react = true

    this.bindListeners({
      handleFluxUpdate: ExampleViewActions.UPDATE_FLUX,
      handleReactUpdate: ExampleServerActions.UPDATE_REACT
    })
  }

  handleFluxUpdate(val) {
    this.flux = val
  }

  handleReactUpdate(val) {
    this.react = val
  }

}

export default alt.createStore(TemplateStore, 'TemplateStore')
