
import React, { Component, PropTypes as T } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as CounterActions from '../../lib/actions/counterActions'
import Counter from './components/Counter'

class FrontPage extends Component {

  static propTypes = {
    counter: T.number,
    decrement: T.func,
    increment: T.func
  }

  constructor(props) {
    super(props)
  }

  render() {
    const { decrement, counter } = this.props

    return (
      <div>
        <p>Live! from FrontPage Component!</p>
        <span>{counter}</span>
        <Counter increment={decrement}/>
        <ul>
          <li>Fluxxxxx: </li>
          <li>React: </li>
        </ul>
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
