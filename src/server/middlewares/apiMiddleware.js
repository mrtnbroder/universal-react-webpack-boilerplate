
//
// API Middleware
//

import express from 'express'
import bodyParser from 'body-parser'
import * as resources from '../resources'

const API_URL = '/api/v1'

export default (app) => {
  // Parse application/json bodys
  app.use(bodyParser.json())
  // Parse application/x-www-form-urlencoded bodys
  app.use(bodyParser.urlencoded({ extended: true }))
  // create restful routes
  Object.keys(resources).forEach(makeResource)

  function makeResource(routeName) {
    const router = express.Router()

    resources[routeName](router)

    app.use(`${API_URL}/${routeName}`, router)
  }
}
