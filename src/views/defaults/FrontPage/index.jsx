
import React, { Component, PropTypes as PT } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as todoActions from '../../../lib/actions/todoActions'
import { Link } from 'react-router'

class FrontPage extends Component {

  static propTypes = {
    getTodos: PT.func.isRequired,
    todos: PT.shape({
      userId: PT.number,
      id: PT.number,
      title: PT.string,
      completed: PT.bool
    }).isRequired
  };

  render() {
    const { todos, getTodos } = this.props

    return (
      <div>
        <h2>FrontPage</h2>
        <button onClick={getTodos}>Fetch Todos</button>
        <Link to='/about'>About</Link>
        <ul>
          {todos.todos.map(t => <li key={t.id}>{t.title} {t.completed}</li>)}
        </ul>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    todos: state.todos
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(todoActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FrontPage)
