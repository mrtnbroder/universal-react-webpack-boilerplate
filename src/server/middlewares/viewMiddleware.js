
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import { Provider } from 'react-redux'
import { getRootStore } from '../../shared/stores'
import routes from '../../shared/routes'
import Html from '../../views/root'

//
// View Middleware
//

export default function(app) {
  // match everything else
  app.get('*', handleRequests)

  function handleRequests(req, res) {
    match({ routes, location: req.url }, (err, redirect, renderProps) => {
      if (err)
        res.status(500).send(err.message)
      else if (redirect)
        res.status(302).redirect(redirect.pathname + redirect.search)
      else if (renderProps) {
        const html = renderHtml(renderProps)

        res.status(200).send(html)
      } else
        res.status(400).send('404')
    })
  }

  function renderHtml(nextProps) {
    const store = getRootStore()
    const provider = (
      <Provider store={store}>
        <RouterContext {...nextProps}/>
      </Provider>
    )
    const content = renderToString(provider)

    return Html.renderToStaticMarkup({ content })
  }
}
