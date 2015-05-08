
import Rx from 'rx'

var subjects = {
  toggleFluxSubject: new Rx.Subject()
}

export default {
  subjects: subjects,

  toggleFlux() {
    subjects.toggleFluxSubject.onNext()
  }

}
