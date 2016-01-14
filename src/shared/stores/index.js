
import configureStore from './configureStore'

const rootStore = configureStore()

export const getRootStore = () => rootStore
