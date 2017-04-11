
import React, { PropTypes as PT } from 'react'
import { Link } from 'react-router'

export const view = ({ children }) => {
  return (
    <div>
      <h2>Authorized</h2>
      <button>Fetch Todos</button>
      <Link to='/authorized/dashboard'>Dashboard</Link>
      {children}
    </div>
  )
}

view.propTypes = {
  children: PT.any,
  model: PT.object
}
