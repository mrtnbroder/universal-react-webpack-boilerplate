
//
// View Middleware
//

import configureStore from 'configureStore'
import Html from '../components/Html'
import React from 'react'
import { routes } from '../../views/app'
import { Provider } from 'react-redux'
import { RouterContext, match } from 'react-router/es6'
import { renderToString } from 'react-dom/server'

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
        const store = configureStore()
        const html = renderHtml(renderProps, store)

        res.status(200).send(html)
      }
    })
  }

  function renderHtml(nextProps, store) {
    const initalState = store.getState()
    const provider = (
      <Provider store={store}>
        <RouterContext {...nextProps}/>
      </Provider>
    )
    const content = renderToString(provider)

    return Html.renderToStaticMarkup({ content, initalState })
  }
}
