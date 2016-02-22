
import React, { Component, PropTypes as PT } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as todoActions from '../../shared/actions/todoActions'
import { Link } from 'react-router'

class FrontPage extends Component {
  render() {
    const { todos, getTodos } = this.props

    return (
      <div>
        <h2>FrontPage</h2>
        <button onClick={getTodos}>Fetch Todos</button>
        <Link to='/about'>About</Link>
        <ul>
          {todos.todos.map(t => <li key={t.id}>{t.title}</li>)}
        </ul>
      </div>
    )
  }
}

FrontPage.propTypes = {
  getTodos: PT.func.isRequired,
  todos: PT.shape({
    error: PT.string.isRequired,
    isPending: PT.bool.isRequired,
    todos: PT.arrayOf(PT.shape({
      userId: PT.number.isRequired,
      id: PT.number.isRequired,
      title: PT.string.isRequired,
      completed: PT.bool.isRequired
    })).isRequired
  })
}

function mapStateToProps({ todos }) {
  return {
    todos
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(todoActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FrontPage)
