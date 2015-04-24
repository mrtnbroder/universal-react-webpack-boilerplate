
import React from 'react'
import { RouteHandler } from 'react-router'

class Handler extends React.Component {

  render() {
    return <RouteHandler {...this.props}/>
  }
}

module.exports = Handler
