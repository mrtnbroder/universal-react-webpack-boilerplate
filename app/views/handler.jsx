
import React from 'react'
import { RouteHandler } from 'react-router'

export default class Handler extends React.Component {

  render() {
    return <RouteHandler {...this.props}/>
  }

}
