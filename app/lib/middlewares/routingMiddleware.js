
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RoutingContext } from 'react-router'
import { Provider } from 'react-redux'
import { getRootStore } from '../stores'
import routes from '../../routes'
import IndexPage from '../../views/IndexPage'
import { getClientApp, getDevClientApp } from '../../../config'

const DEBUG = process.env.NODE_ENV !== 'production'

export default function(app) {
  // Routing
  app.get('/*', (req, res) => {
    match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
      if (err)
        res.status(500).send(err.message)
      else if (redirectLocation)
        res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
      else if (renderProps) {
        const html = renderIndex(renderProps)

        res.status(200).send(html)
      } else
        res.status(400).send('404')
    })
  })

  function renderIndex(nextProps) {
    const store = getRootStore()
    const provider = (
      <Provider store={store}>
        <RoutingContext {...nextProps}/>
      </Provider>
    )
    const content = renderToString(provider)
    const html = IndexPage.renderToStaticMarkup({
      content,
      app: DEBUG ? getDevClientApp() : getClientApp()
    })

    return html
  }
}
