
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { getRootStore } from '../lib/stores'
import createHistory from 'history/lib/createHistory'
import { Router } from 'react-router'
import routes from '../lib/routes'

if (__DEV__) {
  const Perf = require('react/lib/ReactPerf')
  const a11y = require('react-a11y')

  // Export React and Performance Utility for debugging
  window.React = React
  window.Perf = Perf
  a11y(React)
}

const store = getRootStore()
const history = createHistory()
const rootEl = document.getElementById('app')

render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>,
  rootEl
)
