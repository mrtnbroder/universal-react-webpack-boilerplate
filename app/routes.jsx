
import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Handler from './views/Handler'
import { FrontPage } from './views/defaults'

export default (
  <Route component={Handler} path='/'>
    <IndexRoute component={FrontPage}/>
  </Route>
)
