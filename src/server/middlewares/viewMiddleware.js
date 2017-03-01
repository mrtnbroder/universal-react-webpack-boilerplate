
//
// View Middleware
//

import { RouterContext, match } from 'react-router'
import Html from '../components/Html.jsx'
import { Provider } from 'react-redux'
import React from 'react'
import configureStore from 'configureStore'
import reducers from '../../shared/modules'
import { renderToString } from 'react-dom/server'
import { route as routes } from '../../Application'

export default (app) => {
  // match everything else
  app.get('*', handleRequests)

  function handleRequests({ url: location }, res) {
    match({ routes, location }, (err, redirect, renderProps) => {
      if (err)
        res.status(500).send(err.message)
      else if (redirect)
        res.status(302).redirect(redirect.pathname + redirect.search)
      else if (renderProps) {
        const store = configureStore(reducers)()
        const html = renderHtml(renderProps, store)

        res.status(200).send(html)
      } else
        res.status(404).send('404')
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
