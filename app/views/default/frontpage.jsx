
import React from 'react'
// import ExampleViewActionCreators from '../../lib/actions/ExampleViewActionCreators'
import ExampleModel from '../../lib/models/ExampleModel'
import ExampleIntent from '../../lib/intents/example.intent'

export default class FrontPage extends React.Component {

  constructor() {
    super()
    this.getState()
    this.toggleFlux = ExampleIntent.toggleFlux
  }

  getState() {
    ExampleModel.subject.subscribe((state) => {
      this.state = state
      this.forceUpdate()
    })
  }

  componentWillMount() {
    // ExampleStore.addChangeListener(this._onExampleStoreChange)
  }

  componentWillUnmount() {
    // ExampleStore.removeChangeListener(this._onExampleStoreChange)
  }

  _onExampleStoreChange() {
    // this.setState(FrontPage.getStateFromStores())
  }

  render() {

    return (
      <div>
        <p>Hello from FrontPage Component!</p>
        <p>Flux: {String(this.state.get('flux'))}</p>
        <button onClick={this.toggleFlux}>
          View Action!
        </button>
        <ul>
          <li>Isomorphic</li>
          <li>React + React Router {String(this.state.get('react'))}</li>
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

}
