
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import thunk from 'redux-thunk'

export default (reducers = {}) => (initalState = {}) => {
  const rootReducer = combineReducers(reducers)
  const middleware = [promiseMiddleware(), thunk]

  return compose(
    applyMiddleware(...middleware),
    __BROWSER__ ? window.devToolsExtension ? window.devToolsExtension() : (f) => f : (f) => f
  )(createStore)(rootReducer, initalState)
}
