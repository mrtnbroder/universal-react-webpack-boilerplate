
import { route as authorizedRoute } from './components/Authorized'
import { route as loginRoute } from './components/Login'
import { view as component } from './view'

export const route = {
  path: '/',
  component,
  indexRoute: loginRoute,
  childRoutes: [
    authorizedRoute,
    loginRoute
  ]
}
