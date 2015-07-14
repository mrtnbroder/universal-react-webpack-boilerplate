
import React from 'react'
import ExampleViewActions from '../../lib/actions/ExampleViewActions'
import TemplateStore from '../../lib/stores/TemplateStore'

export default class FrontPage extends React.Component {

  static getState() {
    return {
      templatestore: TemplateStore.getState()
    }
  }

  constructor(props) {
    super(props)
    this.state = FrontPage.getState()
    this._onTemplateStoreChange = this._onTemplateStoreChange.bind(this)
  }

  componentWillMount() {
    TemplateStore.listen(this._onTemplateStoreChange)
  }

  componentWillUnmount() {
    TemplateStore.unlisten(this._onTemplateStoreChange)
  }

  _onTemplateStoreChange(state) {
    this.setState({ templatestore: state })
  }

  render() {
    const { templatestore } = this.state

    return (
      <div>
        <p>Hello from FrontPage Component!</p>
        <button onClick={ExampleViewActions.updateFlux.bind(this, !templatestore.flux)}>Blaa</button>
        <ul>
          <li>Flux: {String(templatestore.flux)}</li>
          <li>React: {String(templatestore.react)}</li>
        </ul>
      </div>
    )
  }

}
