
import { route as authorizedRoute } from './components/Authorized'
import { view as component } from './view'
import { route as loginRoute } from './components/Login'

export const route = {
  path: '/',
  component,
  indexRoute: {
    onEnter: ({ location: { pathname } }, replace) => {
      replace(`${pathname}login`)
    }
  },
  childRoutes: [
    authorizedRoute,
    loginRoute
  ]
}
