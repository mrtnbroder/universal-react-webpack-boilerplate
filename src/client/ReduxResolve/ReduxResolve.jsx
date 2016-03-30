
import React, { PropTypes as PT, Component } from 'react'
import baseCreateElement from './createElement'
import { combineReducers } from 'redux'
import { RouterContext } from 'react-router/es6'
import { connect } from 'react-redux'

const NAMESPACE = 'reduxresolve'
const STORE_INIT = '@@reduxresolve/INIT'

const render = (props) => {
  const { store } = props
  const createElement = baseCreateElement(store)
  const contextProps = { ...props, createElement }

  return (
    <RouterContext {...contextProps}/>
  )
}

const getReducerOfRoute = (route) => route.reducer

const identityReducer = (state = {}) => state

const createShape = (self, child) => ({ self, child })

const nestReducers = (routes) => (state, action) => {
  const currentState = action.state || createShape()
  const { self: prevSelf } = currentState

  return routes.reduceRight((prev, routeReducer = identityReducer) => {
    const reducer = combineReducers(createShape(routeReducer, identityReducer))
    const next = reducer(createShape(prevSelf, prev), action)

    return next
  }, null)
}

const mkReducers = ({ store, routes, reducers }) => {
  // const routes = normalizeRoutes(initalRoutes)
  const routeReducers = routes.map(getReducerOfRoute)
  const nestedReducer = nestReducers(routeReducers)
  const rootReducer = combineReducers({ ...reducers, [NAMESPACE]: nestedReducer })
  // debugger

  store.replaceReducer(rootReducer)
  store.dispatch({ type: STORE_INIT, state: store.getState() })
}

// const normalizeRoutes = (routes) => routes.map((route) => {
//   if (!route.reducer) route.reducer = identityReducer
//   return route
// })

class ReduxResolve extends Component {

  static propTypes = {
    // render: PT.func.isRequired,
    routes: PT.array.isRequired,
    location: PT.object.isRequired,
    router: PT.object.isRequired,
    store: PT.object.isRequired,
    params: PT.object.isRequired,
    // initialData: PT.object.isRequired,
    reducers: PT.object.isRequired,
    // serializer: PT.func.isRequired,
    // deserializer: PT.func.isRequired,
    // combineReducers: PT.func,
  }

  constructor(props, ...rest) {
    super(props, ...rest)

    mkReducers(props)
  }

  // componentWillReceiveProps(nextProps) {
  //   mkReducers(nextProps)
  // }

  render() {
    return render(this.props)
  }

}

export default connect(identityReducer)(ReduxResolve)
