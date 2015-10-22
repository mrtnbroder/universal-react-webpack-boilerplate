
import React from 'react'
import { Route, IndexRoute } from 'react-router'

export default (
  <Route component={require('./views/handler')} path='/'>
    <IndexRoute component={require('./views/default/frontpage')}/>
  </Route>
)
