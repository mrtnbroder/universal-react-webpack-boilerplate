
import React, { PropTypes as PT } from 'react'
import { Link } from 'react-router/es6'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'modules/todos'

export const component = ({ children, fetchTodos, ...props}) => {
  console.log('profile', props)
  return (
    <div {...props}>
      <h2>Profile</h2>
      <button onClick={fetchTodos}>Change Name</button>
      <Link to='/'>Index</Link>
      {children}
    </div>
  )
}

component.propTypes = {
  children: PT.any,
  fetchTodos: PT.func.isRequired
}

const mapStateToProps = (state) => {
  console.log("state", state);

  return { todos: state.todos }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchTodos: actions.fetchTodos }, dispatch)

export const view = connect(mapStateToProps, mapDispatchToProps)(component)
