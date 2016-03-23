
//
// View Middleware
//

import configureStore from 'configureStore'
import Html from '../components/Html'
import React from 'react'
import { route } from '../../views/app'
import GroundControl, { loadStateOnServer } from 'ground-control'
import { match } from 'react-router/es6'
import { renderToString } from 'react-dom/server'

export default (app) => {
  // match everything else
  app.get('*', handleRequests)

  function handleRequests(req, res) {
    match({ routes: route, location: req.url }, (
      err,
      redirect,
      renderProps
    ) => {
      const store = configureStore()

      loadStateOnServer({ props: renderProps, store }, (
        loadDataErr,
        loadDataRedirectLocation,
        initialData
      ) => {
        if (loadDataErr)
          res.status(500).send(loadDataErr.message)
        else if (loadDataRedirectLocation)
          res.status(302).redirect(loadDataRedirectLocation.pathname + loadDataRedirectLocation.search)
        else {
          const html = renderHtml(renderProps, store, initialData)

          res.status(200).send(html)
        }
      })
    })
  }

  function renderHtml(nextProps, store, initialData) {
    const provider = (
      <GroundControl
        initialData={initialData}
        store={store}
        {...nextProps}
        />
    )
    const content = renderToString(provider)

    return Html.renderToStaticMarkup({ content, initialData })
  }
}
