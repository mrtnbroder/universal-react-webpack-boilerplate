
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import thunk from 'redux-thunk'

export default (reducers) => (initalState) => compose(
  applyMiddleware(
    promiseMiddleware(),
    thunk
  ),
  typeof window === 'object' && window.devToolsExtension ? window.devToolsExtension() : (x) => x
)(createStore)(combineReducers(reducers), initalState)
