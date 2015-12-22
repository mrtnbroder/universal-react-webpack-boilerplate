
import React from 'react'
import fs from 'fs'
import path from 'path'
import { renderToString } from 'react-dom/server'
import { match, RoutingContext } from 'react-router'
import { Provider } from 'react-redux'
import { getRootStore } from '../../lib/stores'
import routes from '../../lib/routes'
import IndexPage from '../../views/IndexPage'
import { DEBUG, appName, vendorName, statsName, inlineName } from '../../../config'
import paths from '../../../paths'

export default function(app) {
  const appScript = getScript(appName)
  const vendorScript = getScript(vendorName)
  const inlineScript = getWebpackJsonpInlineScript()

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
      app: appScript,
      content: renderToString(provider),
      inline: inlineScript,
      vendor: vendorScript
    })
  }
}

function getScript(name) {
  if (DEBUG) return `${paths.devPublicDir()}/${name}.js`

  const file = fs.readFileSync(path.join(paths.publicDir(), `${statsName}.json`), { encoding: 'utf8' })
  const stats = JSON.parse(file)

  return stats.assetsByChunkName[name]
}

function getWebpackJsonpInlineScript() {
  if (DEBUG) return false
  return fs.readFileSync(path.join(paths.publicDir(), `${inlineName}.js`), { encoding: 'utf8' })
}
