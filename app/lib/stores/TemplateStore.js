
import alt from '../dispatcher/alt'
import ImmutableUtil from 'alt/utils/ImmutableUtil'
import Immutable from 'immutable'
import ExampleViewActions from '../actions/ExampleViewActions'
import ExampleServerActions from '../actions/ExampleServerActions'

@ImmutableUtil
class TemplateStore {

  constructor() {
    this.state = Immutable.fromJS({
      react: true,
      flux: true
    })

    this.bindListeners({
      handleFluxUpdate: ExampleViewActions.UPDATE_FLUX,
      handleReactUpdate: ExampleServerActions.UPDATE_REACT
    })
  }

  handleFluxUpdate(val) {
    this.setState(this.state.set('flux', val))
  }

  handleReactUpdate(val) {
    this.setState(this.state.set('flux', val))
  }

}

export default alt.createStore(TemplateStore, 'TemplateStore')
