
import configureStore from './configureStore'

const rootState = { counter: 10 }
const rootStore = configureStore(rootState)

export const getRootStore = () => rootStore
