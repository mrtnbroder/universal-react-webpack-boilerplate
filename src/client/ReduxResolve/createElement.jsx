
import React from 'react'

const createElement = (store) => (Component, props) => {
  const componentProps = {
    ...props,
    dispatch: store.dispatch,
    model: {},
  }

  return (
    <Component {...componentProps}/>
  )
}


export default createElement
