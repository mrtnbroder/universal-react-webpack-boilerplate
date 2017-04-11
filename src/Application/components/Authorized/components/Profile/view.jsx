
import React, { PropTypes as PT } from 'react'
import { Link } from 'react-router'

export const view = ({ children }) => {
  return (
    <div>
      <h2>Profile</h2>
      <button>Change Name</button>
      <Link to='/'>Index</Link>
      {children}
    </div>
  )
}

view.propTypes = {
  children: PT.any,
}
