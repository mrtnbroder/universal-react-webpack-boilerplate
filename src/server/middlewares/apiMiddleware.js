
//
// API Middleware
//

import * as resources from '../resources'
import bodyParser from 'body-parser'
import express from 'express'

const API_URL = '/api/v1'

const app = express.Router()

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

export default app
