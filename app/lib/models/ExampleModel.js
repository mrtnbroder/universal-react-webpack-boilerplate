
import Rx from 'rx'
import Immutable from 'immutable'
import ExampleIntent from '../intents/example.intent'

var subject = new Rx.ReplaySubject(1)

const _defaults = {
  flux: true,
  react: true
}

var _state = Immutable.fromJS(_defaults)

ExampleIntent.subjects.toggleFluxSubject.subscribe((payload) => {
  console.log('payload', payload)

  _state = _state.set('flux', !_state.get('flux'))

  subject.onNext(_state)
})

subject.onNext(_state)

export default {
  subject: subject
}
