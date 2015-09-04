
import React, { Component, PropTypes } from 'react'

export default class Counter extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { increment } = this.props

    return (
      <button onClick={increment}>+</button>
    )
  }

}
