
import React, { PropTypes as PT } from 'react'
import { Link } from 'react-router'
import { Actions } from './update'

import styles from './styles.css' // eslint-disable-line sort-imports

export const view = ({ children, dispatch }) => {
  return (
    <div className={styles.Login}>
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
