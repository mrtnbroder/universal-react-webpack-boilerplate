
import configureStore from 'configureStore'
import { Provider } from 'react-redux'
import React from 'react'
import { routes } from '../views/app'
import { Router, browserHistory } from 'react-router/es6'
import { render } from 'react-dom'

if (__DEV__) {
  const Perf = require('react/lib/ReactDefaultPerf')
  // const a11y = require('react-a11y')

  // Export React and Performance Utility for debugging
  window.React = React
  window.Perf = Perf
  // a11y(React)
}

function main() {
  const store = configureStore(__INITIAL_STATE__)
  const rootEl = document.getElementById('app')

  render(
    <Provider store={store}>
      <Router history={browserHistory}>
        {routes}
      </Router>
    </Provider>,
    rootEl
  )
}

main()
