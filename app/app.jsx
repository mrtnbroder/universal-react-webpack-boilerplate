
import React from 'react'
import routes from './routes'
import Router from 'react-router'
import a11y from 'react-a11y'

if (__DEV__) a11y()

Router.run(routes, Router.HistoryLocation, function renderApp(Handler) {
  React.render(<Handler/>, document.getElementById('app'))
})
