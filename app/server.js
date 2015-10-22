/* eslint-disable no-console */

import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RoutingContext } from 'react-router'
import { Provider } from 'react-redux'
import configureStore from './lib/stores/configureStore'
import routes from './routes'
import indexPage from './index'
import {
  host,
  expressPort,
  getClientApp,
  getDevClientApp
} from '../config'

const PORT = process.env.PORT || expressPort
const DEBUG = process.env.NODE_ENV !== 'production'
const app = express()
const store = configureStore({ counter: 5 })
//
// Express Configuration
// -----------------------------------------------------------------------------

// Static Assets
app.use(express.static('public'))

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
  const provider = (
    <Provider store={store}>
      <RoutingContext {...nextProps}/>
    </Provider>
  )
  const content = renderToString(provider)
  const html = indexPage.renderToStaticMarkup({
    content,
    app: DEBUG ? getDevClientApp() : getClientApp()
  })

  return html
}

//
// Initialise Express
// -----------------------------------------------------------------------------

app.listen(PORT, host, (err) => {
  if (err) return console.error('[server.js]: app.listen: ', err)

  console.log('Express server listening on port ', PORT)
  console.log('\nhttp://%s:%s\n', host, PORT)
})
