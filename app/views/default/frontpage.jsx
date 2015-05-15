
import React from 'react'
import ExampleViewActionCreators from '../../lib/actions/ExampleViewActionCreators'
import ExampleStore from '../../lib/stores/ExampleStore'

export default class FrontPage extends React.Component {

  static getStateFromStores() {
    return {
      examplestore: ExampleStore.getState()
    }
  }

  constructor(props) {
    super(props)
    this.state = FrontPage.getStateFromStores()
    this._onExampleStoreChange = this._onExampleStoreChange.bind(this)
  }

  componentWillMount() {
    ExampleStore.addChangeListener(this._onExampleStoreChange)
  }

  componentWillUnmount() {
    ExampleStore.removeChangeListener(this._onExampleStoreChange)
  }

  _onExampleStoreChange() {
    this.setState(FrontPage.getStateFromStores())
  }

  render() {
    // var { examplestore } = this.state

    return (
      <div>
        <p>Hello from FrontPage Component!</p>
      </div>
    )
  }

}
