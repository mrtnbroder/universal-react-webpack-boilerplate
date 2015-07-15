
import alt from '../dispatcher/alt'
import Immutable from 'immutable'
import ExampleViewActions from '../actions/ExampleViewActions'
import ExampleServerActions from '../actions/ExampleServerActions'

class TemplateStore {

  constructor() {
    this.data = Immutable.fromJS({
      react: true,
      flux: true
    })

    this.bindListeners({
      handleFluxUpdate: ExampleViewActions.UPDATE_FLUX,
      handleReactUpdate: ExampleServerActions.UPDATE_REACT
    })
  }

  handleFluxUpdate(val) {
    this.data = this.data.set('flux', val)
  }

  handleReactUpdate(val) {
    this.data = this.data.set('react', val)
  }

}

export default alt.createStore(TemplateStore, 'TemplateStore')
