/* eslint-disable no-console */

import express from 'express'
import * as m from './middlewares'
import { host, expressPort } from '../../config'

const app = express()

//
// Express Configuration
// -----------------------------------------------------------------------------

// remove x-powered-by header
app.disable('x-powered-by')
// remove etag header (force browser to rely on our cache-control)
app.disable('etag')

m.staticMiddleware(app)
m.routingMiddleware(app)

//
// Initialise Express
// -----------------------------------------------------------------------------

app.listen(expressPort, host, (err) => {
  if (err) return console.error('[server.js]: app.listen: ', err)

  console.log('Express server listening on port ', expressPort)
  console.log('\nhttp://%s:%s\n', host, expressPort)
})
