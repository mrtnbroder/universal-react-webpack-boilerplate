
import React, { PropTypes as PT, Component } from 'react'
import { combineReducers } from 'redux'
import { RouterContext } from 'react-router/es6'
import createElement from './createElement'
import { connect } from 'react-redux'

const NAMESPACE = 'reduxresolve'
const HYDRATE_STORE = '@@reduxresolve/HYDRATE_STORE'

const render = (props, routes) => {
  const contextProps = { ...props, routes, createElement }

  return (
    <RouterContext {...contextProps}/>
  )
}

const getReducerOfRoute = (route) => route.reducer

const identityReducer = (state = {}) => state

const setShape = (self, child) => ({ self, child })

const nestReducers = (routes) => (state, action) => {
  const currentState = state || action.state || setShape()
  const { self: prevSelf } = currentState

  const nested = routes.reduceRight((prev, routeReducer) => {
    const reducer = combineReducers(setShape(routeReducer, identityReducer))
    const next = reducer(setShape(prevSelf, prev), action)
    // console.log(next);
    return next
  }, null)

  console.log('nested', { ...nested })

  return nested
}

const normalizeRoutes = (routes) => routes.map((route) => {
  if (!route.reducer) route.reducer = identityReducer
  return route
})

class ReduxResolve extends Component {

  static propTypes = {
    routes: PT.array.isRequired
  }

  constructor(props, ...rest) {
    super(props, ...rest)

    const { store, routes: initalRoutes, reducers } = props
    const routes = normalizeRoutes(initalRoutes)
    const routeReducers = routes.map(getReducerOfRoute)
    const nestedReducer = nestReducers(routeReducers)
    const rootReducer = combineReducers({ ...reducers, [NAMESPACE]: nestedReducer })
    // debugger

    store.replaceReducer(rootReducer)
    // store.dispatch({ type: HYDRATE_STORE, state: store.getState() })

    this.state = {
      routes
    }
  }

  render() {
    return render(this.props, this.state.routes)
  }

}

export default connect((s) => s)(ReduxResolve)
