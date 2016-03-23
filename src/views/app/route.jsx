
import { view } from './view'
import { route as aboutPageRoute } from './components/about'
import { route as frontPageRoute } from './components/home'

export const route = {
  path: '/',
  component: view,
  indexRoute: frontPageRoute,
  childRoutes: [
    aboutPageRoute
  ]
}
