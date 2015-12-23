
import { Component, PropTypes as PT } from 'react'

export default class Handler extends Component {

  static propTypes = {
    children: PT.any
  }

  render() {
    return this.props.children
  }

}
