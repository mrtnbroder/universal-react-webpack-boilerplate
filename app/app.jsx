
import React from 'react'
import routes from './routes'
import Router from 'react-router'

if (__DEV__) {
  const Perf = require('react/lib/ReactPerf')
  const a11y = require('react-a11y')

  // Export React and Performance Utility for debugging
  window.React = React
  window.Perf = Perf
  a11y(React)
}

Router.run(routes, Router.HistoryLocation, function renderApp(Handler) {
  React.render(<Handler/>, document.getElementById('app'))
})
