
const PORT = 8080

module.exports = {
  DEBUG: process.env.NODE_ENV !== 'production',
  // Port used by express
  port: process.env.PORT || PORT,
  // webpack + server
  host: process.env.HOST || 'localhost',

  signal: 'server is running at',
  // style.css
  cssName: 'style.css',
  // app.js
  appName: 'app',
  // vendor.js
  vendorName: 'vendor',
  // inline.js
  inlineName: 'inline',
  // stats.json
  statsName: 'stats'
}
