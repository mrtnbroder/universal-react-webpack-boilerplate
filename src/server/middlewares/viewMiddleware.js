
//
// View Middleware
//

import { Provider } from 'react-redux'
import { renderToStaticMarkup, renderToString } from 'react-dom/server'
import { RouterContext, match } from 'react-router'
import { createElement } from 'react'

import { route as routes } from '../../Application'
import configureStore from 'configureStore'
import Html from '../components/Html.jsx'
import reducers from '../../shared/modules'

function handleRequests({ url: location }, res) {
  match({ routes, location }, (err, redirect, renderProps) => {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirect) {
      res.status(302).redirect(redirect.pathname + redirect.search)
    } else if (renderProps) {
      const store = configureStore(reducers)()
      const html = renderHtml(renderProps, store)

      res.status(200).send(html)
    } else {
      res.status(404).send('404')
    }
  })
}

function renderHtml(nextProps, store) {
  const initalState = store.getState()
  const provider = (
    createElement(Provider, { store },
      createElement(RouterContext, nextProps)
    )
  )
  const content = renderToString(provider)
  const markup = renderToStaticMarkup(
    createElement(Html, { content, initalState })
  )

  return `<!doctype html>${markup}`
}

export default handleRequests
