
var config = {
  // Port used by express
  expressPort: 8080,
  // webpack + server
  host: 'localhost',
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
  publicPath: './public',

  getDevAsset: function getDevAsset(name) {
    return config.getDevPublicPath() + '/' + name + '.js'
  },

  getDevPublicPath: function getDevPublicPath() {
    return 'http://' + config.host + ':' + config.webpackDevServerPort + '/'
          + config.tmpDir
  },

  getInlineFile: function getInlineFile() {
    return config.publicPath + '/' + config.inlineName + '.js'
  },

  getStatsFile: function getStatsFile() {
    return config.publicPath + '/' + config.statsName + '.json'
  }

}

module.exports = config
