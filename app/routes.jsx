
import React from 'react'
import { Route, IndexRoute } from 'react-router'

export default (
  <Route handler={require('./views/handler')} path='/'>
    <IndexRoute handler={require('./views/default/frontpage')}/>
  </Route>
)
