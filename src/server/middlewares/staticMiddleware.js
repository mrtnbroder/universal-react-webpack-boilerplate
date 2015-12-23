
import express from 'express'
import { publicDir } from '../../../paths'
import { DEBUG } from '../../../config'

const MAX_AGE = DEBUG ? 0 : '1 year'
const staticCache = { maxAge: MAX_AGE, etag: true, lastModified: false }

//
// Static Assets
//

export default function(app) {
  // Assets
  app.use(express.static(publicDir, staticCache))
}
