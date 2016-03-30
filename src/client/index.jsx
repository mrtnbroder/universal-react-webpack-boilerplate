
import configureStore from 'configureStore'
import GroundControl from 'ground-control'
import React from 'react'
import reducers from '../shared/modules'
import ReduxResolve from './ReduxResolve'
// import { Provider } from 'react-redux'
import { render } from 'react-dom'
import { route as routes } from '../Application'
import { Router, browserHistory } from 'react-router/es6'

if (__DEV__) {
  const Perf = require('react/lib/ReactDefaultPerf')
  // const a11y = require('react-a11y')

  // Export React and Performance Utility for debugging
  window.React = React
  window.Perf = Perf
  // a11y(React)
}

const onRender = (store) => (props) => (
  <ReduxResolve
    reducers={reducers}
    store={store}
    {...props}
    />
)

const main = () => {
  const store = configureStore(reducers)(__INITIAL_STATE__)
  const rootEl = document.getElementById('app')

  render(
    <Router history={browserHistory} render={onRender(store)}>
      {routes}
    </Router>,
    rootEl
  )
}

main()
