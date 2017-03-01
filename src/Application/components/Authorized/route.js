
import { route as dashboardRoute } from './components/Dashboard'
import { route as profileRoute } from './components/Profile'
import { update as reducer } from './update'
import { view as component } from './view.jsx'

export const route = {
  path: 'authorized',
  component,
  reducer,
  childRoutes: [
    dashboardRoute,
    profileRoute
  ]
}
