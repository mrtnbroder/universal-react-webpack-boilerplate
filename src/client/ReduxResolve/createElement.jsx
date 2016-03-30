
import React from 'react'

const createElement = (Component, props) => {
  // console.log('props', props);
  return (
    <Component
      {...props}
      />
  )
}


export default createElement
