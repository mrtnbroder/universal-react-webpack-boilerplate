
import React, { createElement } from 'react'
import { Router, browserHistory } from 'react-router'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { render } from 'react-dom'

import { route as routes } from '../Application'
import reducers, { configureStore } from 'store'

if (__DEV__) {
  // Export React and Performance Utility for debugging
  window.React = React
}

const store = configureStore(reducers)(window.__INITIAL_STATE__)
const rootEl = document.getElementById('app')

const main = () => {
  render(
    createElement(AppContainer, null,
      createElement(Provider, { store },
        createElement(Router, { history: browserHistory, routes })
      )
    ),
    rootEl
  )
}

if (module.hot) module.hot.accept(main)

main()
