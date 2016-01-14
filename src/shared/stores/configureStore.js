
import { createStore, applyMiddleware, compose } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

export default function configureStore() {
  const middleware = [promiseMiddleware(), thunk]
  const store = compose(
    applyMiddleware(...middleware)
  )(createStore)(rootReducer)

  if (module.hot)
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')

      store.replaceReducer(nextReducer)
    })

  return store
}
