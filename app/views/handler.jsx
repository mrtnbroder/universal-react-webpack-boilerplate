
import React, { Component, PropTypes as T } from 'react'

export default class Handler extends Component {

  static propTypes = {
    children: T.any
  }

  render() {
    return this.props.children
  }

}
