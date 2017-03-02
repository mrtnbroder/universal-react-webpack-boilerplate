
import path from 'path'

/**
 *  ENV
 */

// dev mode or prod
export const isDev = process.env.NODE_ENV !== 'production'
// port used by express
export const PORT = process.env.PORT || 8080
// webpack and server host
export const HOST = process.env.HOST || 'localhost'

export const signal = 'server is running at'

/**
 *  WEBPACK
 */

// styles.css
export const cssName = 'styles'
// app.js
export const appName = 'app'
// vendor.js
export const vendorName = 'vendor'
// inline.js
export const inlineName = 'inline'
// stats.json
export const statsName = 'stats'

/**
 *  PATHS
 */

export const contextPath = path.join(__dirname, '..')
export const distPath = path.join(contextPath, 'build')
export const outputPath = path.join(distPath, 'public')
export const srcPath = path.join(contextPath, 'src')
