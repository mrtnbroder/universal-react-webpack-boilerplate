
//
// Static Middleware
//

import express from 'express'
import { publicDir } from '../../../paths'
import { DEBUG } from '../../../config'

const MAX_AGE = DEBUG ? 0 : '1 year'
const staticCache = { maxAge: MAX_AGE, etag: true, lastModified: false }

export default (app) => {
  // root dir assets
  app.use(express.static(publicDir, staticCache))
}
