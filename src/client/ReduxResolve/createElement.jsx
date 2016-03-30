
import React from 'react'
import { getNestedState } from './nestedState'

const createElement = (store) => (Component, props) => {
  const { routes, route } = props
  const depth = routes.indexOf(route)
  const state = store.getState().reduxresolve
  const { self: model } = getNestedState(state, depth)

  const componentProps = {
    ...props,
    dispatch: store.dispatch,
    model,
  }

  return (
    <Component {...componentProps}/>
  )
}


export default createElement
