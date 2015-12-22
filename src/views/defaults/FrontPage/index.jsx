
import React, { Component, PropTypes as PT } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as CounterActions from '../../../lib/actions/counterActions'
import { Link } from 'react-router'

class FrontPage extends Component {

  static propTypes = {
    counter: PT.number,
    decrement: PT.func,
    increment: PT.func
  }

  constructor(props) {
    super(props)
  }

  render() {
    const { decrement, increment, counter } = this.props

    return (
      <div>
        <p>CCCombobreaker!!</p>
        <span>{counter}</span>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
        <Link to='/about'>About</Link>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    counter: state.counter
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CounterActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FrontPage)
