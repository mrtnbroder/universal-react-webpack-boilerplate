
import express from 'express'
import React from 'react'
import Router from 'react-router'
import routes from './routes'
import indexPage from './index'
import { host, expressPort, getClientAppPath } from '../defaults'

var app = express()

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
  let router = createRouter(req.url)

  router.run((Handler) => {
    let content = React.renderToString(React.createElement(Handler))
    let html = indexPage.renderToStaticMarkup({
      content,
      app: getClientAppPath()
    })

    return res.end(html)
  })
})

//
// Initialise Express
// -----------------------------------------------------------------------------

app.listen(expressPort, host, (err) => {
  if ( err ) return console.error('[server.js]: app.listen: ', err)

  console.log('Express server listening on port ', expressPort)
  console.log('\nhttp://%s:%s\n', host, expressPort)
})
