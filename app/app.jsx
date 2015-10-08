
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import FrontPage from './views/default/frontpage'
import configureStore from './lib/stores/configureStore'

if (__DEV__) {
  const Perf = require('react/lib/ReactPerf')
  const a11y = require('react-a11y')

  // Export React and Performance Utility for debugging
  window.React = React
  window.Perf = Perf
  a11y(React)
}

const store = configureStore()
const rootEl = document.getElementById('app')

render(
  <Provider store={store}>
    <FrontPage/>
  </Provider>,
  rootEl
)
