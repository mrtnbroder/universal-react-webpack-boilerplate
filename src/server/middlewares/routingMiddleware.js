
import React from 'react'
import fs from 'fs'
import { renderToString } from 'react-dom/server'
import { match, RoutingContext } from 'react-router'
import { Provider } from 'react-redux'
import { getRootStore } from '../../lib/stores'
import routes from '../../lib/routes'
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
  if (DEBUG) return config.getDevAsset(name)

  const file = fs.readFileSync(config.getStatsFile(), { encoding: 'utf8' })
  const stats = JSON.parse(file)

  return stats.assetsByChunkName[name]
}

function getWebpackJsonpInlineScript() {
  if (DEBUG) return false
  return fs.readFileSync(config.getInlineFile(), { encoding: 'utf8' })
}
