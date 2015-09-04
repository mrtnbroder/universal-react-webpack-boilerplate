/* eslint-disable no-console, no-process-env */

import express from 'express'
import React from 'react'
import { Provider } from 'react-redux'
import configureStore from './lib/stores/configureStore'
import FrontPage from './views/default/frontpage'
// import routes from './routes'
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
const store = configureStore()

//
// Express Configuration
// -----------------------------------------------------------------------------

// Static Assets
app.use(express.static('public'))

app.get('/*', (req, res) => {
  const provider = (
    <Provider store={store}>
      {() => <FrontPage/>}
    </Provider>
  )
  const content = React.renderToString(provider)
  const html = indexPage.renderToStaticMarkup({
    content,
    app: DEBUG ? getDevClientApp() : getClientApp()
  })

  return res.end(html)
})

//
// Initialise Express
// -----------------------------------------------------------------------------

app.listen(PORT, host, (err) => {
  if (err) return console.error('[server.js]: app.listen: ', err)

  console.log('Express server listening on port ', PORT)
  console.log('\nhttp://%s:%s\n', host, PORT)
})
