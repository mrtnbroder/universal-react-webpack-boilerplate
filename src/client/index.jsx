
import configureStore from 'configureStore'
import GroundControl from 'ground-control'
import React from 'react'
import { route } from '../views/app'
import { Router, browserHistory } from 'react-router/es6'
import { render } from 'react-dom'

if (__DEV__) {
  const Perf = require('react/lib/ReactPerf')
  // const a11y = require('react-a11y')

  // Export React and Performance Utility for debugging
  window.React = React
  window.Perf = Perf
  // a11y(React)
}

const store = configureStore(__INITIAL_STATE__)
const rootEl = document.getElementById('app')

render(
  <Router
    history={browserHistory}
    render={(props) => (<GroundControl {...props} store={store}/>)}>
    {route}
  </Router>,
  rootEl
)
