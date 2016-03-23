
import promiseMiddleware from 'redux-promise-middleware'
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../modules'

export default (initalState = {}) => {
  const middleware = [promiseMiddleware()]
  const store = compose(
    applyMiddleware(...middleware),
    __BROWSER__ ? window.devToolsExtension ? window.devToolsExtension() : (f) => f : (f) => f
  )(createStore)(rootReducer, initalState)

  // if (module.hot)
  //   // Enable Webpack hot module replacement for reducers
  //   module.hot.accept('../reducers', () => {
  //     const nextReducer = require('../reducers')
  //
  //     store.replaceReducer(nextReducer)
  //   })

  return store
}
