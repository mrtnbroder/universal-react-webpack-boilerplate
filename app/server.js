/* eslint-disable no-console */

import express from 'express'
import * as m from './lib/middlewares'
import { host, expressPort } from '../config'

const PORT = process.env.PORT || expressPort
const app = express()

//
// Express Configuration
// -----------------------------------------------------------------------------

m.staticMiddleware(app)
m.routingMiddleware(app)

//
// Initialise Express
// -----------------------------------------------------------------------------

app.listen(PORT, host, (err) => {
  if (err) return console.error('[server.js]: app.listen: ', err)

  console.log('Express server listening on port ', PORT)
  console.log('\nhttp://%s:%s\n', host, PORT)
})
