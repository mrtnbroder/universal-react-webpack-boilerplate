
import React from 'react'
import configureStore from 'configureStore'
import reducers from '../shared/modules'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import { route as routes } from '../Application'
import { Router, browserHistory } from 'react-router'

if (__DEV__) {
  const Perf = require('react/lib/ReactPerf')
  // const a11y = require('react-a11y')

  // Export React and Performance Utility for debugging
  window.React = React
  window.Perf = Perf
  // a11y(React)
}

const main = () => {
  const store = configureStore(reducers)(__INITIAL_STATE__)
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
