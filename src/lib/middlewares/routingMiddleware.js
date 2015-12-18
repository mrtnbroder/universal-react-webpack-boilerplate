
import React from 'react'
import fs from 'fs'
import path from 'path'
import { renderToString } from 'react-dom/server'
import { match, RoutingContext } from 'react-router'
import { Provider } from 'react-redux'
import { getRootStore } from '../stores'
import routes from '../../routes'
import IndexPage from '../../views/IndexPage'
import config from '../../../config'

const DEBUG = process.env.NODE_ENV !== 'production'

export default function(app) {
  // Routing
  app.get('/*', handleRequests)

  function handleRequests(req, res) {
    match({ routes, location: req.url }, (err, redirect, renderProps) => {
      if (err)
        res.status(500).send(err.message)
      else if (redirect)
        res.status(302).redirect(redirect.pathname + redirect.search)
      else if (renderProps) {
        const html = renderIndex(renderProps)

        res.status(200).send(html)
      } else
        res.status(400).send('404')
    })
  }

  function renderIndex(nextProps) {
    const store = getRootStore()
    const provider = (
      <Provider store={store}>
        <RoutingContext {...nextProps}/>
      </Provider>
    )

    return IndexPage.renderToStaticMarkup({
      app: getScript(config.appName),
      content: renderToString(provider),
      inline: getWebpackJsonpInlineScript(),
      vendor: getScript(config.vendorName)
    })
  }
}

function getScript(name) {
  const options = { encoding: 'utf8' }
  const file = fs.readFileSync(path.resolve(config.getStatsFile()), options)
  const stats = JSON.parse(file)

  if (DEBUG) return config.getDevAsset(name)
  return stats.assetsByChunkName[name]
}

function getWebpackJsonpInlineScript() {
  if (DEBUG) return false
  return fs.readFileSync(path.resolve(config.getInlineFile()), {
    encoding: 'utf8'
  })
}
