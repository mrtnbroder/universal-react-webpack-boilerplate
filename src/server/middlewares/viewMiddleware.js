
//
// View Middleware
//

import configureStore from 'configureStore'
import Html from '../components/Html'
import React from 'react'
import { route as routes } from '../../Application'
import RouterReducer, { loadStateOnServer } from 'react-router-route-reducers'
import { match } from 'react-router/es6'
import { renderToString } from 'react-dom/server'
import reducers from '../../shared/modules'

export default (app) => {
  // match everything else
  app.get('*', handleRequests)

  function handleRequests(req, res) {
    match({ routes, location: req.url }, (err, redirect, renderProps) => {
      if (err)
        res.status(500).send(err.message)
      else if (redirect)
        res.status(302).redirect(redirect.pathname + redirect.search)
      else {
        const store = configureStore(reducers)()
        const nextProps = { ...renderProps, reducers, store }

        loadStateOnServer(nextProps)((initalState) => {
          const html = renderHtml(nextProps, initalState)

          res.status(200).send(html)
        })
      }
    })
  }

  function renderHtml(nextProps, initalState) {
    const component = <RouterReducer {...nextProps}/>
    const content = renderToString(component)

    return Html.renderToStaticMarkup({ content, initalState })
  }
}
