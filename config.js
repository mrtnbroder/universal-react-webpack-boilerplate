
var path = require('path')

var config = {
  // Port used by express
  expressPort: process.env.PORT || 8080,
  // webpack + server
  host: process.env.HOST || 'localhost',
  // Port used by the webpack-dev-server
  webpackDevServerPort: 2992,
  // temp dir created by webpack-dev-server
  tmpDir: '_tmp',
  // app.js
  appName: 'app',
  // vendor.js
  vendorName: 'vendor',
  // inline.js
  inlineName: 'inline',
  // stats.json
  statsName: 'stats',
  // public path
  publicPath: path.join(__dirname, 'public'),

  getDevAsset: function getDevAsset(name) {
    return config.getDevPublicPath() + '/' + name + '.js'
  },

  getDevPublicPath: function getDevPublicPath() {
    return 'http://' + config.host + ':' + config.webpackDevServerPort + '/'
          + config.tmpDir
  },

  getInlineFile: function getInlineFile() {
    var inline = path.join(config.publicPath, config.inlineName + '.js')
    console.log("inline", inline);
    return inline
  },

  getStatsFile: function getStatsFile() {
    var stats = path.join(config.publicPath, config.statsName + '.json')
    console.log("stats", stats);
    return stats
  }

}

module.exports = config
