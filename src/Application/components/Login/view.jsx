
import React from 'react'
import { Link } from 'react-router/es6'

export const view = () => {
  return (
    <div>
      <h2>Login</h2>
      <Link to='/authorized'>Authorized</Link>
    </div>
  )
}
