
import React from 'react'
import { Route, DefaultRoute } from 'react-router'

export default (
  <Route handler={require('./views/handler')}>
    <DefaultRoute handler={require('./views/default/frontpage')}/>
  </Route>
)
