
//
// Static Middleware
//

import { isDev, outputPath } from '../../../webpack/env'
import express from 'express'

const MAX_AGE = isDev ? 0 : '1 year'
const staticCache = { maxAge: MAX_AGE, etag: true, lastModified: false }

export default (app) => {
  // root dir assets
  app.use(express.static(outputPath, staticCache))
}
