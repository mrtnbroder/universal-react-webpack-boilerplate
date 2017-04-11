
import React, { PropTypes as PT } from 'react'
import { Link } from 'react-router'

export const view = ({ children }) => {
  return (
    <div>
      <h2>Dashboard</h2>
      <button>Change Name</button>
      <Link to='/authorized/profile'>Profile</Link>
      {children}
    </div>
  )
}

view.propTypes = {
  children: PT.any,
}
