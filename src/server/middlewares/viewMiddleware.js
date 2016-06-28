
//
// View Middleware
//

import React from 'react'
import Html from '../components/Html'
import configureStore from 'configureStore'
import reducers from '../../shared/modules'
import { route as routes } from '../../Application'
import { Provider } from 'react-redux'
import { RouterContext, match } from 'react-router/es6'
import { renderToString } from 'react-dom/server'

export default (app) => {
  // match everything else
  app.get('*', handleRequests)

  function handleRequests({ url: location }, res) {
    match({ routes, location }, (err, redirect, renderProps) => {
      if (err)
        res.status(500).send(err.message)
      else if (redirect)
        res.status(302).redirect(redirect.pathname + redirect.search)
      else {
        const store = configureStore(reducers)()
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
