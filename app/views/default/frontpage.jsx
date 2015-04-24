
import React from 'react'

class FrontPage extends React.Component {

  render() {
    return (
      <div>
        <p>Hello from FrontPage Component!</p>
        <ul>
          <li>Isomorphic</li>
          <li>React + React Router</li>
          <li>ES6 (babel)</li>
          <li>Webpack + Hot Module Replacement + React Hot</li>
          <li>TODO: ESLint</li>
          <li>TODO: JSCS</li>
          <li>TODO: React Ally</li>
          <li>TODO: Jest</li>
          <li>TODO: Flux</li>
          <li>TODO: Immutable</li>
          <li>Flow</li>
        </ul>
        <img src='/images/react-logo.png' alt='React Rocks!'/>
      </div>
    )
  }
}

module.exports = FrontPage
