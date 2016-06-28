/* eslint-disable no-console */

import express from 'express'
import compression from 'compression'
import * as m from './middlewares'
import { DEBUG, host, port, signal } from '../../config/config'

const app = express()

//
// Express Configuration
// -----------------------------------------------------------------------------

// disable x-powered-by header
app.disable('x-powered-by')

// Compression
if (!DEBUG) app.use(compression())

// I. Static Assets
m.staticMiddleware(app)
// II. API
m.apiMiddleware(app)
// III. Views
m.viewMiddleware(app)

//
// Initialise Express
// -----------------------------------------------------------------------------

app.listen(port, host, (err) => {
  if (err) return console.error('[server.js]: Error: ', err)

  return console.log(`${signal} http://%s:%s`, host, port)
})
