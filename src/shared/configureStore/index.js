
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'

export default (reducers = {}) => (initalState = {}) => {
  const rootReducer = combineReducers(reducers)
  const middleware = [promiseMiddleware()]
  const store = compose(
    applyMiddleware(...middleware),
    __BROWSER__ ? window.devToolsExtension ? window.devToolsExtension() : (f) => f : (f) => f
  )(createStore)(rootReducer, initalState)

  return store
}
