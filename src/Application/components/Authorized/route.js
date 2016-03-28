
import { route as dashboardRoute } from './components/Dashboard'
import { update as reducer } from './update'
import { view as component } from './view'

export const route = {
  path: 'authorized',
  component,
  reducer,
  childRoutes: [
    dashboardRoute
  ]
}
