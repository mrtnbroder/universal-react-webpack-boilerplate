
import { view as component } from './view'
import { route as aboutPageRoute } from './components/about'
import { route as frontPageRoute } from './components/home'

export const routes = {
  path: '/',
  component,
  indexRoute: frontPageRoute,
  childRoutes: [
    aboutPageRoute
  ]
}
