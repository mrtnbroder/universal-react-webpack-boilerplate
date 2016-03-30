
import React, { PropTypes as PT } from 'react'
import { Link } from 'react-router/es6'
import { actions } from './update'

export const view = ({ model, children, dispatch, ...props }) => {
  console.log('dashboard', model)
  return (
    <div {...props}>
      <h2>Dashboard</h2>
      <button onClick={() => dispatch(actions.modify({ forename: 'Hans', lastname: 'Jürgen' }))}>Change Name</button>
      <Link to='/authorized/profile'>Profile</Link>
      {children}
    </div>
  )
}

view.propTypes = {
  children: PT.any,
  model: PT.object
}
