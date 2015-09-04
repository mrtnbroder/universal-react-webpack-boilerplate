
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as CounterActions from '../../lib/actions/counterActions'
import Counter from './components/Counter'

class FrontPage extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { increment, decrement, counter } = this.props

    return (
      <div>
        <p>Hello from FrontPage Component!</p>
        <span>{counter}</span>
        <Counter increment={decrement}/>
        <ul>
          <li>Fluxxxxxxxx: </li>
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
