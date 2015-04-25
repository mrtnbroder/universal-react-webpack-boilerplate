
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
  }

  componentWillMount() {
    ExampleStore.onChange(this._onAppStoreChange.bind(this))
  }

  componentWillUnmount() {
    ExampleStore.offChange(this._onAppStoreChange.bind(this))
  }

  render() {
    var { examplestore } = this.state

    return (
      <div>
        <p>Hello from FrontPage Component!</p>
        <p>Flux: {String(examplestore.get('flux'))}</p>
        <button onClick={ExampleViewActionCreators.foo.bind(this, 'HELLO')}>
          View Action!
        </button>
        <ul>
          <li>Isomorphic</li>
          <li>React + React Router {String(examplestore.get('react'))}</li>
          <li>ES6 (babel)</li>
          <li>Webpack + Hot Module Replacement + React Hot</li>
          <li>ESLint</li>
          <li>React A11y</li>
          <li>Flux</li>
          <li>Immutable</li>
          <li>TODO: JSCS</li>
          <li>TODO: Jest</li>
          <li>TODO: Flow</li>
        </ul>
        <div onClick={() => {}}>Oh noes, react-a11y will warn!</div>
        <img alt='React Rocks!' src='/images/react-logo.png'/>
      </div>
    )
  }

  _onAppStoreChange() {
    this.setState(FrontPage.getStateFromStores())
  }
}
