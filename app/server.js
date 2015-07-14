
import express from 'express'
import React from 'react'
import Router from 'react-router'
import routes from './routes'
import indexPage from './index'
import {
  host,
  expressPort,
  getClientAppPath,
  getDevClientAppPath
} from '../defaults'

const DEBUG = process.env.NODE_ENV !== 'production'
const app = express()

//
// Express Configuration
// -----------------------------------------------------------------------------

// Static Assets
app.use(express.static('public'))

// 404
function render404() {}

// Page
function createRouter(location) {
  return Router.create({
    routes,
    location,
    onError: (err) => {
      console.error('onError', err)
    },
    onAbort: (abortReason) => {
      console.error('onAbort', abortReason)
    }
  })
}

app.get('/*', (req, res) => {
  const router = createRouter(req.url)

  router.run((Handler) => {
    const content = React.renderToString(React.createElement(Handler))
    const html = indexPage.renderToStaticMarkup({
      content,
      app: DEBUG ? getDevClientAppPath() : getClientAppPath()
    })

    return res.end(html)
  })
})

//
// Initialise Express
// -----------------------------------------------------------------------------

app.listen(expressPort, host, (err) => {
  if (err) return console.error('[server.js]: app.listen: ', err)

  console.log('Express server listening on port ', expressPort)
  console.log('\nhttp://%s:%s\n', host, expressPort)
})
