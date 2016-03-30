
import React, { PropTypes as PT } from 'react'
import { Link } from 'react-router/es6'
import { actions } from './update'

export const view = ({ data: model, children, dispatch, ...props }) => {
  console.log('login', model)
  return (
    <div {...props}>
      <h2>Login</h2>
      <button onClick={() => dispatch(actions.update({ username: 'Harald', password: 'Francois' }))}>Login</button>
      <Link to='/authorized'>Authorized</Link>
      {children}
    </div>
  )
}

view.propTypes = {
  children: PT.any,
  model: PT.object
}
