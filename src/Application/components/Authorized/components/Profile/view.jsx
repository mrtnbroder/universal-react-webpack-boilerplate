
import React, { PropTypes as PT } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'modules/todos'

export const component = ({ children, fetchTodos, ...props }) => {
  return (
    <div {...props}>
      <h2>Profile</h2>
      <button onClick={fetchTodos}>Change Name</button>
      <Link to='/'>Index</Link>
      <ul>
        {props.todos.todos.map((todo) => <li>{todo.title}</li>)}
      </ul>
      {children}
    </div>
  )
}

component.propTypes = {
  children: PT.any,
  fetchTodos: PT.func.isRequired
}

const mapStateToProps = ({ todos }) => ({ todos })
const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchTodos: actions.fetchTodos }, dispatch)

export const view = connect(mapStateToProps, mapDispatchToProps)(component)
