
import configureStore from 'configureStore'
import React from 'react'
import reducers from '../shared/modules'
import RouterReducer from 'react-router-route-reducers'
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
  <RouterReducer
    {...props}
    reducers={reducers}
    store={store}
    />
)

const main = () => {
  const store = configureStore(reducers)()
  const rootEl = document.getElementById('app')

  render(
    <Router history={browserHistory} render={onRender(store)}>
      {routes}
    </Router>,
    rootEl
  )
}

main()
