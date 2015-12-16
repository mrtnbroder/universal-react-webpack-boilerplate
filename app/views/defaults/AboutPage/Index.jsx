
import React, { Component } from 'react'
import { Link } from 'react-router'

class AboutPage extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h2>About Page!</h2>
        <Link to='/'>Home</Link>
      </div>
    )
  }

}

export default AboutPage
