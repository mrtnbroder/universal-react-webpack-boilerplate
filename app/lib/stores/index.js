
import configureStore from './configureStore'

const initalState = { counter: 5 }
const store = configureStore(initalState)

export const getStore = () => store
