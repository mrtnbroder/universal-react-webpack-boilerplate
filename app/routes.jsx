
import React from 'react'
import { Route, DefaultRoute } from 'react-router'

let routes = (
  <Route handler={require('./views/handler')}>
    <DefaultRoute handler={require('./views/default/frontpage')}/>
  </Route>
)

module.exports = routes
