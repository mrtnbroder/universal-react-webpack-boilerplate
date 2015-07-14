
import React from 'react'
import ExampleViewActions from '../../lib/actions/ExampleViewActions'
import TemplateStore from '../../lib/stores/TemplateStore'

export default class FrontPage extends React.Component {

  static getStateFromStores() {
    return {
      templatestore: TemplateStore.getState()
    }
  }

  constructor(props) {
    super(props)
    this.state = FrontPage.getStateFromStores()
    this._onTemplateStoreChange = this._onTemplateStoreChange.bind(this)
  }

  componentWillMount() {
    TemplateStore.addChangeListener(this._onTemplateStoreChange)
  }

  componentWillUnmount() {
    TemplateStore.removeChangeListener(this._onTemplateStoreChange)
  }

  _onTemplateStoreChange() {
    this.setState(FrontPage.getStateFromStores())
  }

  render() {
    const { templatestore } = this.state

    return (
      <div>
        <p>Hello from FrontPage Component!</p>
        <ul>
          <li>Flux: {String(templatestore.get('flux'))}</li>
          <li>React: {String(templatestore.get('react'))}</li>
        </ul>
      </div>
    )
  }

}
