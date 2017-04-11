
import React, { PropTypes as PT } from 'react'
import { Link } from 'react-router'

import styles from './styles.css' // eslint-disable-line sort-imports

export const view = ({ children }) => {
  return (
    <div className={styles.Login}>
      <h2>Login</h2>
      <button>Login</button>
      <Link to='/authorized'>Authorized</Link>
      {children}
    </div>
  )
}

view.propTypes = {
  children: PT.any,
  model: PT.object
}
