
import React, { PropTypes as PT } from 'react'
import { Link } from 'react-router/es6'
import { actions } from './update'

export const view = ({ model, children, dispatch, ...props }) => {
  return (
    <div {...props}>
      <h2>Authorized</h2>
      <p>{model.counter}</p>
      <button onClick={() => dispatch(actions.increment())}>Fetch Todos</button>
      <Link to='/authorized/dashboard'>Dashboard</Link>
      {children}
    </div>
  )
}

view.propTypes = {
  children: PT.any,
  model: PT.object
}
