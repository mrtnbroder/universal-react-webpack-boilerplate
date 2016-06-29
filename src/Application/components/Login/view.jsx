
import React, { PropTypes as PT } from 'react'
import { Link } from 'react-router'
import { Actions } from './update'

export const view = ({ children, dispatch, ...props }) => {
  return (
    <div {...props}>
      <h2>Login</h2>
      <button onClick={() => dispatch(Actions.update({ username: 'Harald', password: 'Francois' }))}>Login</button>
      <Link to='/authorized'>Authorized</Link>
      {children}
    </div>
  )
}

view.propTypes = {
  children: PT.any,
  model: PT.object
}
