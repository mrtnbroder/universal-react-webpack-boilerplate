
//
// View Middleware
//

import { Provider } from 'react-redux'
import { renderToStaticMarkup } from '../components/Html.jsx'
import { renderToString } from 'react-dom/server'
import { route as routes } from '../../Application'
import { RouterContext, match } from 'react-router'
import configureStore from 'configureStore'
import React from 'react'
import reducers from '../../shared/modules'

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

    return renderToStaticMarkup({ content, initalState })
  }
}
