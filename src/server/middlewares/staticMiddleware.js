
import express from 'express'
import compression from 'compression'
import { publicPath } from '../../../config'

const DEBUG = process.env.NODE_ENV !== 'production'
const MAX_AGE = DEBUG ? 0 : '1 year'
const staticCache = { maxAge: MAX_AGE }

//
// Static Assets
//

export default function(app) {
  // Compression
  if (!DEBUG) app.use(compression())
  // Assets
  app.use(express.static(publicPath, staticCache))
}
