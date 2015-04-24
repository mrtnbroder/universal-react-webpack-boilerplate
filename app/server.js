
import express from 'express'
import React from 'react'
import Router from 'react-router'
import routes from './routes'
import indexPage from './index'
import { host, expressPort, getClientAppPath } from '../defaults'

// Initialise
var app = express()

//
// Express Configuration
// -----------------------------------------------------------------------------
app.use(express.static('public'))

app.get('/*', (req, res) => {

  Router.run(routes, req.url, (Handler) => {
    let content = React.renderToString(React.createElement(Handler))
    let html = indexPage.renderToStaticMarkup({
      content: content,
      app: getClientAppPath()
    })

    return res.end(html)
  })
})

//
// Start Express
// -----------------------------------------------------------------------------
app.listen(expressPort, () => {
  // if ( err ) return console.error('[server.js]: app.listen: ', err)
  console.log('Express server listening on port ', expressPort)
  console.log(`\nhttp://${host}:${expressPort}'\n`)
})
