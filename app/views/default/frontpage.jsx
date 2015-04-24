
import React from 'react'
import AppActionCreators from '../../lib/actions/AppActionCreators'
import AppStore from '../../lib/stores/AppStore'

class FrontPage extends React.Component {

  static getStateFromStores() {
    return {
      appstore: AppStore.getState()
    }
  }

  constructor(props) {
    super(props)
    this.state = FrontPage.getStateFromStores()
  }

  _onAppStoreChange() {
    this.setState(FrontPage.getStateFromStores())
  }

  componentWillMount() {
    AppStore.onChange(this._onAppStoreChange.bind(this))
  }

  componentWillUnmount() {
    AppStore.offChange(this._onAppStoreChange.bind(this))
  }

  render() {

    return (
      <div>
        <p>Hello from FrontPage Component!</p>
        <p>Flux: {'' + this.state.appstore.get('flux')}</p>
        <button onClick={AppActionCreators.foo.bind(this, 'HELLO')}>Hello</button>
        <button onClick={AppActionCreators.bar.bind(this, 'STORE')}>Store</button>
        <ul>
          <li>Isomorphic</li>
          <li>React + React Router</li>
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
        <img src='/images/react-logo.png' alt='React Rocks!'/>
      </div>
    )
  }
}

module.exports = FrontPage
