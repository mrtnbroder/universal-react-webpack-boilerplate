
const path = require('path')

/**
 *  ENV
 */

// dev mode or prod
const isDev = exports.isDev = process.env.NODE_ENV !== 'production'
// port used by express
const PORT = exports.PORT = process.env.PORT || 8080
// webpack and server host
const HOST = exports.HOST = process.env.HOST || 'localhost'

const signal = exports.signal = 'express.js is listening on'

/**
 *  WEBPACK
 */

// styles.css
const cssName = exports.cssName = 'styles'
// app.js
const appName = exports.appName = 'app'
// vendor.js
const vendorName = exports.vendorName = 'vendor'
// inline.js
const inlineName = exports.inlineName = 'inline'
// stats.json
const statsName = exports.statsName = 'stats'

/**
 *  PATHS
 */

const contextPath = exports.contextPath = path.join(__dirname, '..')
const distPath = exports.distPath = path.join(contextPath, 'dist')
const outputPath = exports.outputPath = path.join(distPath, 'public')
const srcPath = exports.srcPath = path.join(contextPath, 'src')
