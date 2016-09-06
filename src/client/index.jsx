
import { Router, browserHistory } from 'react-router/es6'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import React from 'react'
import configureStore from 'configureStore'
import reducers from '../shared/modules'
import { render } from 'react-dom'
import { route as routes } from '../Application'

if (__DEV__) {
  const Perf = require('react/lib/ReactPerf')

  // Export React and Performance Utility for debugging
  window.React = React
  window.Perf = Perf
}

const store = configureStore(reducers)(__INITIAL_STATE__)
const rootEl = document.getElementById('app')

const main = () => {
  render(
    <AppContainer>
      <Provider store={store}>
        <Router history={browserHistory} routes={routes}/>
      </Provider>
    </AppContainer>,
    rootEl
  )
}

if (module.hot)
  module.hot.accept(main)

main()
