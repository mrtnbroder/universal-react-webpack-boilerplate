/* eslint-disable no-console */

import express from 'express'
import compression from 'compression'
import * as m from './middlewares'
import { DEBUG, host, expressPort } from '../../config/config'

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

app.listen(expressPort, host, (err) => {
  if (err) return console.error('[server.js]: app.listen: ', err)

  console.log('Express server listening on port ', expressPort)
  console.log('\nhttp://%s:%s\n', host, expressPort)
})
