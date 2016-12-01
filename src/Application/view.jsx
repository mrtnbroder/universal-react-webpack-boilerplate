
import React, { PropTypes as PT } from 'react'

import 'styles/html.css' // eslint-disable-line sort-imports

export const view = ({ children }) => children

view.propTypes = {
  children: PT.any
}
